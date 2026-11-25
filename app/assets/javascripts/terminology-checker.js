const govukRules = require('../../external/importers/govuk-rules')

//Pattern matching engine

function getSentenceContainingMatch(text, position) {
    let start = position;
    let end = position;

    while (start > 0 &&
        !['.', '!', '?', '\n'].includes(text[start-1])
    ) {
        start--;
    }
    while (end < text.length &&
        !['.', '!', '?', '\n'].includes(text[end])
    ){
        end++;
    }
    if (end < text.length) {
        end++;
    }
    return {
        sentence: text.slice(start, end).trim(),
        sentenceStart: start,
        sentenceEnd: end
    };
}

function highlightMatch(sentence, matchText, relativePosition) {
    return (sentence.slice(0, relativePosition) + `<strong>${matchText}</strong>` + sentence.slice(relativePosition + matchText.length));
}

function checkTerminology(concatenatedText) {
    const findings = [];
    //GOVUK Assist rules
    const antisocialRule = govukRules.find(rule => rule.title === 'antisocial');
    const patterns = antisocialRule?.check?.patterns || [];
    for (const pattern of patterns ) {
            const regex = new RegExp (pattern, 'gi')
            const matches = [...concatenatedText.matchAll(regex)];
        for (const match of matches) {
            const foundText = match[0];
            const position = match.index;
            const containingSentence = getSentenceContainingMatch(concatenatedText, position);
            const relativePosition = position-containingSentence.sentenceStart;
            const highlightedSentence = highlightMatch(containingSentence.sentence, foundText, relativePosition)
            findings.push({
                source: 'govuk',
                ruleId: antisocialRule.id,
                title: antisocialRule.title,
                guidance: antisocialRule.guidance,
                sentence: highlightedSentence
            });
        };
    };
    console.log(findings)

  //Correct_forms engine



    //HO style rules
    const term1 = /asylum\sclaimant/gi;
    const term2 = /asylum\sseeker/gi;

    const hasTerm1 = term1.test(concatenatedText);
    const hasTerm2 = term2.test(concatenatedText);

    if (hasTerm1 && hasTerm2) {
        findings.push( {
            title: "Asylum claimant and asylum seeker",
            message: "Do not use both 'asylum claimant' and 'asylum seeker' in the same service. Use one consistently throughout."
        });
    };


    return findings;

};

module.exports = checkTerminology;