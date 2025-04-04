function checkTextRules(userText) {
  let results = '';

  // GENERAL RULES
  const rules = [
    
    //Initial few lines are commented out - they are GDS style guide (experimental) and not Home Office style guide
    // { word: 'example', message: 'Avoid using the word example.' },
    // { word: 'advisor', message: 'Use adviser instead of advisor. Unless using the word advisory.' },
    // { word: ['whitelist', 'white list', 'white-list'], message: 'Use allow list as a noun instead of whitelist. Use allow as the verb.' },
    // { word: ['al-Qaeda', 'al-Qaida'], message: 'Use al-Qa\'ida instead of al-Qaeda or al-Qaida.' },
    // { word: '&', message: 'Use and rather than an ampersand, unless it\'s in the name or image of a company or department.' },
    // { word: 'arms length body', message: 'Spell arm\'s length body lowercase and without a hyphen.' },
    // { word: ['abroad', 'overseas'], message: 'Abroad and overseas can cause confusion. Try to use plain English.'},
    { word: ['alter', 'modify', 'switch'], message: 'Use change instead of alter, modify or switch.'},
    // Add more rules as needed
  ];

  //PRECISE REGEX PATTERNS

  const regexPatterns = [
    { regex: /anti[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D]social/gi, message: "Antisocial should be spelt without hyphens."},
   /// { regex: /EXAMPLE/g, message: "" },
    { regex: /(register(ing|s|ed)?|(set(s|ting)?\s*up)|(establish(es|ed|ing)?))\s+an\s+account/gi, message: "Use 'create' instead of 'register' or 'set up' when you want people to create an account." },
    { regex: /(Authorising\sofficer|authorising\sOfficer|Authorising\sOfficer)/g, message: "authorising officer should be lower case." },
    { regex: /(epassport|\se\spassport|e[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D]passport)/g , message: "Use biometric passport instead of ePassport when referring to passports with a chip."},
  ]

  // Split the text into sentences
  const sentences = userText.match(/[^\.!\?]+[\.!\?]+/g);

  // Ensure sentences is an array
  if (!sentences) {
    return 'no-sentences';
  }

  // GENERAL RULES CHECK
  rules.forEach(rule => {
    const regex = new RegExp(`(${rule.word})`, 'gi');
    sentences.forEach(sentence => {
      if (regex.test(sentence)) {
        const highlightedSentence = sentence.replace(regex, '<strong>$1</strong>');
        results += `<p class="govuk-body">${rule.message} </p> <div class="govuk-inset-text">${highlightedSentence.trim()}</div>`;
      }
    });
  });

  // REGEX PATTERNS CHECK
    sentences.forEach(sentence => {
      regexPatterns.forEach(pattern => {
        if (pattern.regex.test(sentence)) {
          const highlightedSentence = sentence.replace(pattern.regex, '<strong>$&</strong>');
          results += `<p class="govuk-body">${pattern.message}</p> <div class="govuk-inset-text">${highlightedSentence.trim()}</div>`;
        }
      });
    });
  

  return results;
}

module.exports = checkTextRules;
