function checkTextRules(userText) {
  let results = '';

  // Define your style rules here
  const rules = [
    { word: 'example', message: 'Avoid using the word example.' },
    { word: 'advisor', message: 'Use adviser instead of advisor. Unless using the word advisory.' },
    { word: ['whitelist', 'white list', 'white-list'], message: 'Use allow list as a noun instead of whitelist. Use allow as the verb.' },
    { word: ['al-Qaeda', 'al-Qaida'], message: 'Use al-Qa\'ida instead of al-Qaeda or al-Qaida.' },
    { word: '&', message: 'Use and rather than an ampersand, unless it\'s in the name or image of a company or department.' },
    { word: 'arms length body', message: 'Spell arm\'s length body lowercase and without a hyphen.' },
    // Add more rules as needed
  ];

  // Split the text into sentences
  const sentences = userText.match(/[^\.!\?]+[\.!\?]+/g);

  // Ensure sentences is an array
  if (!sentences) {
    return '<p class="govuk-body">You must enter at least 1 full sentence.</p>';
  }

  // Check each rule
  rules.forEach(rule => {
    const regex = new RegExp(`(${rule.word})`, 'gi');
    sentences.forEach(sentence => {
      if (regex.test(sentence)) {
        const highlightedSentence = sentence.replace(regex, '<strong>$1</strong>');
        results += `<p class="govuk-body">${rule.message} </p> <div class="govuk-inset-text">${highlightedSentence.trim()}</div>`;
      }
    });
  });

  // Check for 'antisocial' with hyphens
  const antisocialRegex = /anti[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D]social/g;
  sentences.forEach(sentence => {
    if (antisocialRegex.test(sentence)) {
      const highlightedSentence = sentence.replace(antisocialRegex, '<strong>$&</strong>');
      results += `<p class="govuk-body">'Antisocial' should be spelt without hyphens. Found in: "${highlightedSentence.trim()}"</p>`;
    }
  });

  return results;
}

module.exports = checkTextRules;
