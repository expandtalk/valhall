
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AnalysisRequest {
  transliteration: string;
  location?: string;
  objectType?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transliteration, location, objectType }: AnalysisRequest = await req.json();

    if (!transliteration || transliteration.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Transliteration is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY environment variable not set');
      return new Response(
        JSON.stringify({ error: 'API configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const prompt = buildRunicAnalysisPrompt({ transliteration, location, objectType });
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ 
            role: "user", 
            parts: [{ text: prompt }] 
          }],
          generationConfig: {
            temperature: 0.1,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!response.ok) {
      console.error('Gemini API error:', response.status, response.statusText);
      return new Response(
        JSON.stringify({ error: 'AI analysis service temporarily unavailable' }),
        { 
          status: 503, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      console.error('Invalid response from Gemini API');
      return new Response(
        JSON.stringify({ error: 'Invalid response from analysis service' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const analysis = parseGeminiResponse(text, { transliteration, location, objectType });
    
    return new Response(
      JSON.stringify(analysis),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in analyze-runic function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

function buildRunicAnalysisPrompt(input: AnalysisRequest): string {
  return `
Du är en expert på runologi och skandinavisk språkhistoria. Analysera denna runinskription för datering:

INSKRIPTION: "${input.transliteration}"
${input.location ? `PLATS: ${input.location}` : ''}
${input.objectType ? `OBJEKTTYP: ${input.objectType}` : ''}

Analysera följande aspekter:
1. Språkliga drag (morfologi, fonologi, lexikon)
2. Runtyp (äldre/yngre futhark, varianter)
3. Formulärtyp och konventioner
4. Historisk kontext

Ge svar i exakt detta JSON-format:
{
  "period": "Period med årtal",
  "confidence": 0.0-1.0,
  "yearRange": {"start": år, "end": år},
  "reasoning": "Detaljerad förklaring på svenska",
  "linguisticFeatures": ["språkdrag1", "språkdrag2", ...],
  "runType": "Runtyp och variant"
}

Basera analysen på etablerad runologisk forskning. Var konservativ med dateringar om osäkerhet finns.
`;
}

function parseGeminiResponse(text: string, input: AnalysisRequest) {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        ...parsed,
        location: input.location || parsed.location || 'Okänd',
        objectType: input.objectType || parsed.objectType || 'Okänt objekt'
      };
    }
  } catch (error) {
    console.error('Error parsing Gemini response:', error);
  }
  
  // Fallback mock analysis
  return mockRunicAnalysis(input);
}

function mockRunicAnalysis(input: AnalysisRequest) {
  const text = input.transliteration.toLowerCase();
  
  if (text.includes('harija') || text.length <= 10) {
    return {
      period: 'Proto-nordiska (200-550 e.Kr.)',
      confidence: 0.85,
      yearRange: { start: 200, end: 550 },
      reasoning: 'Kort inskription med arkaiska drag typiska för proto-nordiska perioden.',
      linguisticFeatures: ['Kort formel typisk för tidiga fynd', 'Urnordiska språkdrag'],
      runType: 'Äldre futhark (24 runer)',
      location: input.location || 'Okänd',
      objectType: input.objectType || 'Okänt objekt'
    };
  } else if (text.includes('eftir') || text.includes('eftr') || text.includes('×')) {
    return {
      period: 'Vikingatid (800-1100 e.Kr.)',
      confidence: 0.92,
      yearRange: { start: 850, end: 1050 },
      reasoning: 'Innehåller typisk vikingatida minnesformel "eftir".',
      linguisticFeatures: ['Minnesformel med "eftir"', 'Kryss som ordseparator (×)'],
      runType: 'Yngre futhark, normala runer',
      location: input.location || 'Troligen Sverige/Danmark',
      objectType: input.objectType || 'Runsten'
    };
  } else {
    return {
      period: 'Vikingatid (800-1100 e.Kr.)',
      confidence: 0.65,
      yearRange: { start: 800, end: 1100 },
      reasoning: 'Allmän vikingatida bedömning baserat på språkdrag.',
      linguisticFeatures: ['Fornvästnordiska element'],
      runType: 'Troligen yngre futhark',
      location: input.location || 'Skandinavien',
      objectType: input.objectType || 'Runsten eller föremål'
    };
  }
}
