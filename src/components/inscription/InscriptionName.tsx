import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
import { RunicInscription } from "@/types/inscription";

interface InscriptionNameProps {
  inscription: RunicInscription;
  variant?: "default" | "compact" | "detailed";
  showAlternatives?: boolean;
}

export const InscriptionName = ({ 
  inscription, 
  variant = "default", 
  showAlternatives = false 
}: InscriptionNameProps) => {
  const { language } = useLanguage();
  
  // Get the primary name based on language preference
  const primaryName = language === 'en' ? inscription.name_en : inscription.name;
  const fallbackName = inscription.name || inscription.name_en;
  const displayName = primaryName || fallbackName;
  
  // If no name is available, show just the signum
  if (!displayName) {
    return (
      <span className="font-medium text-foreground">
        {inscription.signum}
      </span>
    );
  }
  
  switch (variant) {
    case "compact":
      return (
        <span className="font-medium text-foreground">
          {displayName}
          {inscription.signum && (
            <span className="text-muted-foreground ml-1">
              ({inscription.signum})
            </span>
          )}
        </span>
      );
      
    case "detailed":
      return (
        <div className="space-y-2">
          {displayName && (
            <h3 className="text-lg font-semibold text-foreground">
              {displayName}
            </h3>
          )}
          
          <div className="flex flex-wrap gap-2 items-center">
            {/* Primary signum - always shown prominently */}
            <Badge variant="default" className="text-sm font-medium">
              {inscription.signum}
            </Badge>
            
            {showAlternatives && inscription.alternative_signum && inscription.alternative_signum.length > 0 && (
              <>
                <span className="text-muted-foreground text-xs">även:</span>
                <div className="flex flex-wrap gap-1">
                  {inscription.alternative_signum.map((altSig, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {altSig}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </div>
          
          {showAlternatives && inscription.also_known_as && inscription.also_known_as.length > 0 && (
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Även känd som: </span>
              {inscription.also_known_as.join(', ')}
            </div>
          )}
        </div>
      );
      
    default:
      return (
        <div className="flex items-center gap-2">
          {displayName ? (
            <>
              <h3 className="text-base font-semibold text-foreground">
                {displayName}
              </h3>
              <Badge variant="default" className="text-xs font-medium">
                {inscription.signum}
              </Badge>
            </>
          ) : (
            <Badge variant="default" className="text-sm font-medium">
              {inscription.signum}
            </Badge>
          )}
        </div>
      );
  }
};