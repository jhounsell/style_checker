function checkTextRules(userText) {
  let results = '';

  //PRECISE REGEX PATTERNS

  const regexPatterns = [
    { regex: /anti[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D]social/gi, message: "Antisocial should be spelt without hyphens."},
    { regex: /(alter|modif(y|ie(|d)|ying)|switch)/gi, message: "Use change instead of alter, modify or switch."},
    { regex: /(alteration|modification)/gi, message: "Use change instead of alteration or modification." },
    { regex: /(register(ing|s|ed)?|(set(s|ting)?\s*up)|(establish(es|ed|ing)?))\s+an\s+account/gi, message: "Use create instead of register or set up when you want people to create an account." },
    { regex: /(Authorising\sofficer|authorising\sOfficer|Authorising\sOfficer)/g, message: "authorising officer should be lower case." },
    { regex: /(epassport|\se\spassport|e[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D]passport)/g , message: "Use biometric passport instead of ePassport when referring to passports with a chip."},
    { regex: /(biometrics\b|biometric\sinformation)/gi , message: "When using biometrics or biometric information in public-facing services, explain what it means first."},
    { regex: /Biometric\sResidenc(e|ey)\sPermit/g, message: "Spell biometric residence permit in lower case. You can use the acronym BRP after the first mention."},
    { regex: /Biometric\sResidenc(e|ey)\sCard/g, message: "Spell biometric residence card in lower case. You can use the acronym BRC after the first mention."},
    { regex: /(border\sforce|Border\sforce|border\sForce|BORDER\sFORCE)/g, message: "Capitalise the first letters of Border Force."},
    { regex: /(passport\scontrol|primary\scontrol\spoint)/gi, message: "Use border control rather than passport control or primary control point."},
    { regex: /(UK|United\sKingdom|U\.K\.)\s(c|C)itizen/g, message: "Do not use UK citizen. Be specific about which <a href=https://www.gov.uk/types-of-british-nationality>type of nationality</a> you mean."},
    { regex: /(British|UK|U\.K\.|United\sKingdom)\s(Overseas\sTerritories|overseas\sTerritories|Overseas\sterritories)/g, message: "Write overseas territories in lower case"},
    { regex: /business\sdays?/gi, message: "Use working day instead of business day. Consider explaining what you mean by a working day."},
    { regex: /(case\swork|case[\u002D\u2013\u2014\u2012\u2015\u2212\uFE58\uFF0D]work)/gi, message: "Spell casework, caseworker or caseworking without a space or hyphen."},
    { regex: /(Certificate\sof\ssponsorship|certificate\sof\sSponsorship|Certificate\sof\sSponsorship)/g, message: "Spell certificate of sponsorship in lower case. You can use the acronym CoS after the first full mention."},
    { regex: /verif(y(ing)?|ie(s|d)|ication)/gi, message: "Consider using check instead of verify if you are asking users to check the accuracy of something."},
    { regex: /clandestine/gi, message: "Do not refer to people as a clandestine or clandestine entrant. Try to be specific, like 'a person hidden in a vehicle, ship or plane'."},
    { regex: /(click|tap)/gi, message: "Use select rather than click or tap because not everyone uses a mouse."},
    { regex: /(Common\sTravel\sarea|Common\stravel\sArea|common\sTravel\sArea|common\stravel\sArea|Common\stravel\sarea|common\stravel\sarea|common\sTravel\sArea|common\sTravel\sarea)/g, message: "Capitalise the initials of Common Travel Area."},
    { regex: /validat(e(s|d)?|ing|ion)/g, message: "Consider using confirm or prove instead of validate if you are asking users to provide additional evidence."},
    { regex: /\b(?!(Confirmation of Acceptance for Studies)\b)[cC]onfirmation\s[oO]f\s[aA]cceptance\s[fF]or\s[sS]tudies)/g, message: "Spell the initials of Confirmation of Acceptance for Studies in upper case."},
    { regex: /\bconsignee/gi, message: "Prefer recipient. If you need to use consignee, use it with recipient. For example, recipient (consignee)."},
    { regex: /\bconsignor/gi, message: "Prefer sender. If you need to use consignor, use it with sender. For example, sender (consignor)."},
    { regex: /\bright\b/gi, message: "Use correct rather than right."},
    { regex: /\bcorrespondence/gi, message: "Correspondence is not plain English. Try to be specific, like postal address, contact address or email address."},
    { regex: /counter(\s|\u002D|\u2013|\u2014|\u2012|\u2015|\u2212|\u00AD|\uFE58|\uFF0D)?sign(ator(y|ies))?/gi, message: "Countersignatory is not plain English. Instead, try the person who can confirm your identity or you must have your application signed by someone else."},
    { regex: /(?!criminal\sjustice\ssystem)[cC]riminal\s[jJ]ustice\s[sS]ystem/g, message: "Spell criminal justice system in lower case."},
    { regex: /\bcustomer/gi, message: "Avoid calling the people who use our services customers. Use you or be specific when describing them, for example applicant or asylum seeker."},
    { regex: /\bsecondary\scontrol/gi, message: "Use customs rather than secondary control"},
  ];

  // Split the text into sentences
  const sentences = userText.match(/[^\.!\?]+[\.!\?]+/g);

  // Ensure sentences is an array
  if (!sentences) {
    return 'no-sentences';
  }


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
