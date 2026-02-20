function checkTextRules(userText) {
  let results = '';

const hodsRules = require('./hods.js');
const govukRules = require ('./govuk-style.js');
const ukEnglishRules = require ('./uk-english.js');

//combine all regex patterns into a single array
const regexPatterns = [
  ...hodsRules,
  ...govukRules,
  ...ukEnglishRules
];


//Split the textinto sentences
const sentences = userText.match(/[^\.!\?]+[\.!\?]+/g);

  // Ensure sentences is an array
  if (!sentences) {
    return 'no-sentences';
  }

  // Concatenate sentences into a single string
  const concatenatedText = sentences.join('');

  //Collect matches for each pattern
  const matchesBypattern = regexPatterns.map(pattern => {
    const matches = [];
    sentences.forEach(sentence => {
      if (pattern.regex.test(sentence)) {
        const highlightedSentence = sentence.replace(pattern.regex, '<strong>$&</strong>');
        matches.push (highlightedSentence.trim());
      }
    });
    return { pattern, matches };
  });



  // === ACRONYM EXPLANATION CHECK ===

  const explainedAcronyms = new Set();
  const excludedAcronyms = new Set ([
    'UK',
    'USA',
    'DVLA',
    'EU',
    'VAT',
    'MP',
    'BBC',
    'VPN',
    'ID',
    'URL',
    'GOV',
    'CCTV',
    'NHS',
    'IT',
    'PDF',
    'DNA',
    'PO',
  ]);
  
  // match acronym-like patterns

  const explanationPatterns = [
      /\b([A-Z]{2,})\s*\([^)]+\)/g, // ACRONYM (Explanation)
      /\([^)]+\)\s*([A-Z]{2,})\b/g, // (Explanation) ACRONYM
      /\(([A-Z]{2,})\)/g            // (ACRONYM)
    ];
    
  explanationPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(concatenatedText)) !== null) {
      explainedAcronyms.add(match[1]);
    }
  });

  
  //track first occurrences
const acronymPattern = /\b[A-Z]{2,}\b/g;
const seenAcronyms = new Set();
const unexplained = [];

let match;
while ((match = acronymPattern.exec(concatenatedText)) !==null) {
  const acronym = match[0];
  if (!seenAcronyms.has(acronym)) {
    seenAcronyms.add(acronym);
    if (!explainedAcronyms.has(acronym) && !excludedAcronyms.has(acronym)) {
      unexplained.push(acronym);
    }
  }
}


    if (unexplained.length > 0 ) {
      results += `<h2 class="govuk-heading-s">Unexplained acronyms</h2>`;
      results += `<p class="govuk-body">You have used acronyms without explaining them the first time you use them.</p>`;
      results += `<p class="govuk-body">Matches found: ${unexplained.length} unexplained acronym${unexplained.length > 1 ? 's' : ''}</p>`;
      unexplained.forEach(acronym => {
        const regex = new RegExp(`\\b${acronym}\\b`);
        const sentenceWithAcronym = sentences.find(sentence => regex.test(sentence));
        if (sentenceWithAcronym) {
          const highlighted = sentenceWithAcronym.replace(regex, '<strong>$&</strong>');
          results += `<div class="govuk-inset-text">${highlighted.trim() }</div>`;
        }
      });
      
        results += `<hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">`;
    }

  // Format results
  matchesBypattern.forEach(({ pattern, matches }) => {
    if (matches.length > 0) {
      results += `<h2 class="govuk-heading-s">${pattern.title}</h2>`;
      results += `<p class="govuk-body">${pattern.message}</p>`;
      results += `<p class="govuk-body">Matches found: ${matches.length}</p>`;
      matches.forEach (match => {
        results += `<div class="govuk-inset-text">${match}</div>`;
      });
      results += `<hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">`;
    }
  });


// Term consistency check
  const term1 = /asylum\sclaimant/gi;
  const term2 = /asylum\sapplicant/gi;
  const hasTerm1 = term1.test(concatenatedText);
  const hasTerm2 = term2.test(concatenatedText);

  if (hasTerm1 && hasTerm2) {
    const highlightedText = concatenatedText
      .replace(term1, '<strong>$&</strong>')
      .replace(term2, '<strong>$&</strong>');
     results += `<h2 class="govuk-heading-s">Asylum applicant/claimant</h2>`;
     results += `<p class="govuk-body">Do not use both 'asylum claimant' or 'asylum applicant' in the same product or service, use one consistently.</p> <div class="govuk-inset-text">${highlightedText.trim()}</div>`;
   }

  return results;
}

module.exports = checkTextRules;
