
export const getTableHeaders = (language: string) => {
  if (language === 'en') {
    return {
      year: 'Year',
      sweden: 'Sweden',
      denmark: 'Denmark',
      norway: 'Norway',
      kievrus: 'Kievrus'
    };
  }
  
  return {
    year: 'År',
    sweden: 'Sverige',
    denmark: 'Danmark',
    norway: 'Norge',
    kievrus: 'Kievrus'
  };
};

export const getDialogLabels = (language: string) => {
  if (language === 'en') {
    return {
      region: 'Region',
      reignPeriod: 'Reign period',
      statusAndEvidence: 'Status and evidence',
      nameVariations: 'Name variations',
      dynasty: 'Dynasty',
      description: 'Description',
      sourceMentions: 'Sources mentioning this king',
      mentionedAs: 'Mentioned as',
      author: 'Author',
      writtenYear: 'Written year',
      language: 'Language',
      coversPeriod: 'Covers period',
      reliability: 'Reliability',
      identifiedBias: 'Identified bias',
      archaeologicalEvidence: 'Archaeological evidence',
      runestoneNotations: 'Runestone notations'
    };
  }
  
  return {
    region: 'Region',
    reignPeriod: 'Regeringstid',
    statusAndEvidence: 'Status och bevis',
    nameVariations: 'Namnvarianter',
    dynasty: 'Dynasti',
    description: 'Beskrivning',
    sourceMentions: 'Källor som nämner denna kung',
    mentionedAs: 'Nämns som',
    author: 'Författare',
    writtenYear: 'Skriven år',
    language: 'Språk',
    coversPeriod: 'Täcker period',
    reliability: 'Tillförlitlighet',
    identifiedBias: 'Identifierat bias',
    archaeologicalEvidence: 'Arkeologiska bevis',
    runestoneNotations: 'Runstensnoteringar'
  };
};

export const getSectionTitles = (language: string) => {
  if (language === 'en') {
    return {
      nordicKings: 'Nordic Kings - Table View',
      clickableDynasties: 'Clickable dynasties',
      clickableSources: 'Clickable sources'
    };
  }
  
  return {
    nordicKings: 'Kungalängder - Tabellvy',
    clickableDynasties: 'Klickbara dynastier',
    clickableSources: 'Klickbara källor'
  };
};
