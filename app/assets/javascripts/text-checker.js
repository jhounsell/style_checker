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
    { regex: /\b(?!(Confirmation of Acceptance for Studies)\b)[cC]onfirmation\s[oO]f\s[aA]cceptance\s[fF]or\s[sS]tudies/g, message: "Spell the initials of Confirmation of Acceptance for Studies in upper case."},
    { regex: /\bconsignee/gi, message: "Prefer recipient. If you need to use consignee, use it with recipient. For example, recipient (consignee)."},
    { regex: /\bconsignor/gi, message: "Prefer sender. If you need to use consignor, use it with sender. For example, sender (consignor)."},
    { regex: /\bright\b/gi, message: "Use correct rather than right."},
    { regex: /\bcorrespondence/gi, message: "Correspondence is not plain English. Try to be specific, like postal address, contact address or email address."},
    { regex: /counter(\s|\u002D|\u2013|\u2014|\u2012|\u2015|\u2212|\u00AD|\uFE58|\uFF0D)?sign(ator(y|ies))?/gi, message: "Countersignatory is not plain English. Instead, try the person who can confirm your identity or you must have your application signed by someone else."},
    { regex: /(?!criminal\sjustice\ssystem)[cC]riminal\s[jJ]ustice\s[sS]ystem/g, message: "Spell criminal justice system in lower case."},
    { regex: /\bcustomer/gi, message: "Avoid calling the people who use our services customers. Use you or be specific when describing them, for example applicant or asylum seeker."},
    { regex: /\bsecondary\scontrol/gi, message: "Use customs rather than secondary control"},
    { regex: /customs\sofficer/gi, message: "Use Border Force officer rather than customs officer"},
    { regex: /(?!DBS\sadult\sfirst)DBS\s[aA]dult\s[fF]irst/g, message: "Use lower case for adult first."},
    { regex: /(?!DBS\sadults\sbarred\slist)DBS\s[aA]dults\s[bB]arred\s[Ll]ist/g, message: "Use lower case for adults barred list."},
    { regex: /([Dd][Bb][Ss])\s[dD]isclosure(?!\sservice)/g, message: "Use DBS certificate rather than DBS disclosure."},
    { regex: /([Dd][Bb][Ss])\s[dD]isclosure\s[sS]ervice/g, message: "Use DBS checking service rather than DBS disclosure service."},
    { regex: /(?!DBS\schildren's\sbarred\sservice)([Dd][Bb][Ss])\s[cC]hildren(‘|'|’)s\s[bB]arred\s[sS]ervice/g, message: "Use lower case for children's barred list."},
    { regex: /Decision\sMaker/g, message: "Spell decision maker in lower case."},
    { regex: /[Dd]ecision\s[Mm]aking\s[Uu]nit/g, message: "Spell decision making unit in lower case."},
    { regex: /digital\sstatus/gi, message: "Avoid using 'digital status' in public-facing services. Instead use 'eVisa' or 'online immigration status'."},
    { regex: /(?!Disclosure\sand\sBarring\sService)[dD]isclosure\sand\s[bB]arring\s[sS]ervice/g, message: "Capitalise Disclosure and Barring Service thusly."},
    { regex: /(?!electronic\stravel\sauthorisation)[eE]lectronic\s[tT]ravel\s[aA]uthorisation/g, message: "Use lower case initial letters on electronic travel authorisation. You can use the acronym ETA after the first mention."},
    { regex: /enhanced\sdisclosure/gi, message: "Use 'enhanced DBS check' rather than 'enhanced disclosure'."},
    { regex: /(?!EU\sSettlement\sScheme)EU\s[Ss]ettlement\s[Ss]cheme/g, message: "Capitalise EU Settlement Scheme thusly. You can use the initials EUSS after the first full mention.."},  
    { regex: /(?!General\sRegister\sOffice)[Gg]eneral\s[Rr]egist(er|ry|ration)\s[oO]ffice/g, message: "Capitalise General Register Office thusly. It is 'register' not 'registry'. You can use the initials 'GRO' after the first full mention."},  
    { regex: /(?!GOV\.UK)[Gg][Oo][Vv]\.[Uu][Kk][^\/]/g, message: "Spell GOV.UK in all upper case."},  
    { regex: /[Hh]is\s[mM]ajesty(‘|'|’)s\s[A-Z]/g, message: "Use 'HM' rather than 'His Majesty's' in front of the name of the relevant public body. For example, 'HM Revenue & Customs'."},  
    { regex: /\bHMPO\b/g, message: "Do not use 'HMPO' in public-facing services."},  
    { regex: /(?!HM\sPassport\sOffice)HM\s[Pp]assport\s[Oo]ffice/g, message: "Capitalise HM Passport Office thusly."},  
    { regex: /(?!Home\sOffice\sreference\snumber)(HO|Home\sOffice)\s[Rr]eference\s[nN]umber/g, message: "Use lower case for 'reference number' on 'Home Office reference number'."},  
    { regex: /([iI]mmigration\s[aA]dvisor|Immigration\sAdviser)/g, message: "Spell immigration adviser lower case and with an e, not an o."},  
    { regex: /(?!immigration\sbail)[iI]mmigration\s[bB]ail/g, message: "Spell immigration bail in lower case."},  
    { regex: /(?!immigration\shealth\ssurcharge)[iI]mmigration\s[hH]ealth\s[sS]urcharge/g, message: "Spell immigration health surcharge in lower case."},  
    { regex: /immigration\sofficer/g, message: "Use 'Border Force officer' rather than 'immigration officer'. Only use 'immigration officer' if you have a specific reason."},  
    { regex: /(?!Immigration\sRules)[iI]mmigration\s[rR]ules/g, message: "Capitalise 'Immigration Rules'."},  
    { regex: /([iI]ndefinite\sleave\sto\s([eE]nter|[rR]emain)|ILE|ILR)/g, message: "'Indefinite leave to enter' and 'indefinite leave to remain' are officially called 'settlement'."},  
    { regex: /(?!King(‘|'|’)s\sSpeech)[Kk]ing(‘|'|’)s\s[sS]peech/g, message: "Capitalise 'King's Speech' thusly."},  
    { regex: /(?<!indefinite\s)(limited\s)?leave\sto\senter/gi, message: "Use 'permission to enter' instead of 'leave to enter' or 'limited leave to enter'."},  
    { regex: /(?<!indefinite\s)(limited\s)?leave\sto\sremain/gi, message: "Use 'permission to stay' instead of 'leave to remain' or 'limited leave to remain'."},  
    { regex: /(?!letter\sof\sauthority)[Ll]etter\s[oO]f\s[aA]uthority/g, message: "Spell letter of authority in lower case."},  
    { regex: /(?!Life\sin\sthe\sUK\sTest)[lL]ife\s[iI]n\s[tT]he\s([uU]\.?[kK]\.?|[uU]nited\s[kK]ingdom)\s[tT]est/g, message: "Life in the UK Test should be spelled thusly, with capitals on the L and T."},  
    { regex: /\blog(\s||\u002D|\u2013|\u2014|\u2012|\u2015|\u2212|\u00AD|\uFE58|\uFF0D)in\b|\blogin\b/gi, message: "Use 'sign in' rather than 'log in'."},  
    { regex: /\bsign\sinto\b/gi, message: "Use 'sign in to' rather than 'sign into'."},  
    { regex: /(?!Migrant\sHelp)\b[mM]igrants?\b/gi, message: "Avoid using 'migrants'. Try to be specific, such as 'applicant', 'claimant', 'employee' or 'worker'. If you cannot be specific, use 'people'."},  
    { regex: /\bnotif(ying|ication|ie(d|s))/gi, message: "Avoid using 'notification' or 'notify'. Try to be specific about contact, such as, 'we will send you an email' or 'how do you want to be contacted?'."},  
    { regex: /(?<!GOV\.UK\s)\bnotify/gi, message: "Avoid using 'notification' or 'notify'. Try to be specific about contact, such as, 'we will send you an email' or 'how do you want to be contacted?'."},  
    { regex: /(online|digital)\s(?<!immigration\s)status/gi, message: "Avoid using 'online status' or 'digital status' when referring to someone's immigration status. Use 'online immigration status' instead."},  
    { regex: /\bpersons|individuals\b/gi, message: "Use 'people' as a plural of person, rather than 'persons' or 'individuals'."},  
    { regex: /\bplease\b/gi, message: "Use 'please' sparingly. See guidance in <a href=https://www.gov.uk/service-manual/design/writing-for-user-interfaces>Writing for user interfaces</a> on GOV.UK."},  
    { regex: /(?!points[\u002D\u2013\u2014\u2012\u2015\u2212\uFE58\uFF0D]based\ssystem)\b[pP]oints(\s|[\u002D\u2013\u2014\u2012\u2015\u2212\uFE58\uFF0D])[Bb]ased\s[Ss]ystem/g, message: "Spell points-based system in lower case and hyphenate."},  
    { regex: /(?!Police\sNational\sComputer)[Pp]olice\s[Nn]ational\s[Cc]omputer/g, message: "Spell the initial letters of Police National Computer in upper case."},  
    { regex: /\bpurdah/gi, message: "Use 'pre-election period', rather than 'purdah'."},  
    { regex: /(?!senior\scivil\sservice)[sS]enior\s[cC]ivil\s[sS]ervice/g, message: "Lower case the initial letters of 'senior civil service'. You can use the acronym SCS after the first full mention."},  
    { regex: /Sponsor[s‘'’]?s?\b/g, message: "Lower case the word 'sponsor' when referring to a company or person sponsoring a person to work in the UK."},  
    { regex: /(?!sponsorship\sreference\snumber)[Ss]ponsorship\s[rR]eference\s[Nn]umber/g, message: "Spell 'sponsorship reference number' in lower case."},  
    { regex: /sorry/gi, message: "Avoid using 'sorry'. See guidance in <a href=https://www.gov.uk/service-manual/design/writing-for-user-interfaces Writing for user interfaces</a> on GOV.UK."},  
    { regex: /(?!Sovereign\sBase\sAreas)[sS]overeign\s[bB]ase\s[aA]reas/g, message: "Capitalise 'Sovereign Base Areas' thusly"},  
    { regex: /\bthank\syou\b/gi, message: "Use 'thank you' sparingly. See guidance in <a href=https://www.gov.uk/service-manual/design/writing-for-user-interfaces>Writing for user interfaces</a> on GOV.UK."},
    { regex: /(?!EEA\sbiometric\sresidence\scard)[Ee][Ee][Aa]\s[Bb]iometric\s[Rr]esidenc[ey]\s[Cc]ard/g, message: "Spell 'EEA biometric residence card' thusly, with upper case 'EEA' and lower case 'biometric residence card'."},
    { regex: /(?!UK\sVisa\sand\sCitizenship\sApplication\sServices)[uU]\.?[kK]\.?\s[vV]isa\s(&|and)\s[cC]itizenship\s[aA]pplication\s[sS]ervices/g, message: "Spell 'UK Visa and Citizenship Services' thusly, without a & and with first-letter capitals."},
    { regex: /(?!UK\sVisas\sand\sImmigration)[uU]\.?[kK]\.?\s[vV]isas\s(&|and)\s[iI]mmigration/g, message: "Spell 'UK Visas and Immigration' thusly, without a & and with first-letter capitals."},
    { regex: /(?!unique\sapplication\snumber)[uU]nique\s[aA]pplication\s[nN]umber/g, message: "Spell 'unique application number' thusly, with lower case first letters."},
    { regex: /(be(ing)?|is|are|were|was|am|makes?|made|making)\s.*user-centred.*/gi, message: "Hyphenate user-centred when using as an adjective, as in 'user-centred design'. Do not hyphenate when using as a noun, as in 'teams need to be user centred'."},
    { regex: /(global\stalent|high\spotential|graduate|family|Ukraine|mobility|visitor|business|british\snational(\(*overseas\)*)*|(skilled|temporary|secondment)\sworker|right\sof\sabode|tier\s[1-5]|transit|marriage|student|study|scheme|representative|scale-up|founder|spouse|partner|ancestry|reunion|refugee|asylum|dependant).*\sroutes?.*/gi, message: "Use 'visa' rather than terms like 'route'. For example, use 'graduate visa' rather than 'graduate route'."},
    { regex: /(?!Visa\sApplication\sCentre)[vV]isa\s[aA]pplication\s[cC]ent(re|er)/g, message: "Spell 'Visa Application Centre' using UK English spelling and uppercase first letters."},
    { regex: /((visa)*\sprocessing\spost|visa\ssection|(visa)*\sissuing\soffice)/gi, message: "In the context of visas, do not use 'processing post', 'section' or 'issuing office'. Use 'Visa Application Centre' instead."},
    { regex: /.*\b(watch[\s\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D]list|Watchlist)/g, message: "Spell 'watchlist' in lower case and as one word."},
    { regex: /business\s(day|week)/gi, message: "Spell 'watchlist' in lower case and as one word."},
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
