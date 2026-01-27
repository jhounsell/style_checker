function checkTextRules(userText) {
  let results = '';

  //Regex rule set
  const regexPatterns = [
    //HODS Style Rules
    { regex: /anti[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D]social/gi, message: "Antisocial should be spelt without hyphens.", title: "Antisocial"},
    { regex: /alter(s|ing|ed|ation)?\b|modif(y(ing)?|ie(s|d)|ication)|switch(es|ed|ing)?/gi, message: "Use change instead of alter, modify or switch.", title: "Alter, switch, modify"},
    { regex: /(register(ing|s|ed)?|(set(s|ting)?\s*up)|(establish(es|ed|ing)?))\s+an\s+account/gi, message: "Use create instead of register or set up when you want people to create an account.", title: "Register/set up" },
    { regex: /(Authorising\sofficer|authorising\sOfficer|Authorising\sOfficer)/g, message: "authorising officer should be lower case.", title: "Authorising officer" },
    { regex: /(epassport|\se\spassport|e[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D]passport)/g , message: "Use biometric passport instead of ePassport when referring to passports with a chip.", title: "ePassport"},
    { regex: /(biometrics\b|biometric\sinformation)/gi , message: "When using biometrics or biometric information in public-facing services, explain what it means first.", title: "Biometrics"},
    { regex: /Biometric\sResidenc(e|ey)\sPermit/g, message: "Spell biometric residence permit in lower case. You can use the acronym BRP after the first mention.", title: "Biometric residence permit"},
    { regex: /Biometric\sResidenc(e|ey)\sCard/g, message: "Spell biometric residence card in lower case. You can use the acronym BRC after the first mention.", title: "Biometric residence card"},
    { regex: /(border\sforce|Border\sforce|border\sForce|BORDER\sFORCE)/g, message: "Capitalise the first letters of Border Force.", title: "Border Force"},
    { regex: /(passport\scontrol|primary\scontrol\spoint)/gi, message: "Use border control rather than passport control or primary control point.", title: "Border control"},
    { regex: /(UK|United\sKingdom|U\.K\.)\s(c|C)itizen/g, message: "Do not use UK citizen. Be specific about which <a href=https://www.gov.uk/types-of-british-nationality>type of nationality</a> you mean.", title: "UK citizen"},
    { regex: /(British|UK|U\.K\.|United\sKingdom)\s(Overseas\sTerritories|overseas\sTerritories|Overseas\sterritories)/g, message: "Write overseas territories in lower case", title: "British overseas territories"},
    { regex: /\bBAME|BME\b/g, message: "In the context of inclusivity, do not use acronyms like 'BAME' or 'BME' - they do not refer to a singular homogenous ethnic group.", title: "BAME/BME"},
    { regex: /business\s(days?|weeks?)/gi, message: "Use working day instead of business day. Consider explaining what you mean by a working day.", title: "Business day"},
    { regex: /(case\swork|case[\u002D\u2013\u2014\u2012\u2015\u2212\uFE58\uFF0D]work)/gi, message: "Spell casework, caseworker or caseworking without a space or hyphen.", title: "Casework"},
    { regex: /(Certificate\sof\ssponsorship|certificate\sof\sSponsorship|Certificate\sof\sSponsorship)/g, message: "Spell certificate of sponsorship in lower case. You can use the acronym CoS after the first full mention.", title: "Certificate of sponsorship"},
    { regex: /(?<!life\sevents\s)verif(y(ing)?|ie(s|d)|ication)/gi, message: "Consider using check instead of verify if you are asking users to check the accuracy of something.", title: "Verify"},
    { regex: /clandestine/gi, message: "Do not refer to people as a clandestine or clandestine entrant. Try to be specific, like 'a person hidden in a vehicle, ship or plane'.", title: "Clandestine"},
    { regex: /(click|tap)/gi, message: "Use select rather than click or tap because not everyone uses a mouse.", title: "Click"},
    { regex: /(Common\sTravel\sarea|Common\stravel\sArea|common\sTravel\sArea|common\stravel\sArea|Common\stravel\sarea|common\stravel\sarea|common\sTravel\sArea|common\sTravel\sarea)/g, message: "Capitalise the initials of Common Travel Area.", title: "Common Travel Area"},
    { regex: /validat(e(s|d)?|ing|ion)/g, message: "Consider using confirm or prove instead of validate if you are asking users to provide additional evidence.", title: "Validate"},
    { regex: /\b(?!(Confirmation of Acceptance for Studies)\b)[cC]onfirmation\s[oO]f\s[aA]cceptance\s[fF]or\s[sS]tudies/g, message: "Spell the initials of Confirmation of Acceptance for Studies in upper case.", title: "Confirmation of Acceptance for Studies"},
    { regex: /\bconsignee/gi, message: "Prefer recipient. If you need to use consignee, use it with recipient. For example, recipient (consignee).", title: "Consignee"},
    { regex: /\bconsignor/gi, message: "Prefer sender. If you need to use consignor, use it with sender. For example, sender (consignor).", title: "Consignor"},
    { regex: /\bright\b(?!\s(not\s)?to)/gi, message: "Use correct rather than right.", title: "Correct"},
    { regex: /\bcorrespondence/gi, message: "Correspondence is not plain English. Try to be specific, like postal address, contact address or email address.", title:"Correspondence"},
    { regex: /counter(\s|\u002D|\u2013|\u2014|\u2012|\u2015|\u2212|\u00AD|\uFE58|\uFF0D)?sign(ator(y|ies))?/gi, message: "Countersignatory is not plain English. Instead, try the person who can confirm your identity or you must have your application signed by someone else.", title:"Countersignatory"},
    { regex: /(?!criminal\sjustice\ssystem)[cC]riminal\s[jJ]ustice\s[sS]ystem/g, message: "Spell criminal justice system in lower case.", title:"Criminal justice system"},
    { regex: /\bcustomer/gi, message: "Avoid calling the people who use our services customers. Use you or be specific when describing them, for example applicant or asylum seeker.", title: "Customers"},
    { regex: /\bsecondary\scontrol/gi, message: "Use customs rather than secondary control", title:"Secondary control"},
    { regex: /customs\sofficer/gi, message: "Use Border Force officer rather than customs officer", title:"Customs officer"},
    { regex: /\bdependant\s(.*\s)?(up)?on/gi, message: "Use dependant as a noun and dependent as an adjective. For example 'The dependant is dependent on support'.", title:"Dependant/dependent"}, // Won't catch relative pronoun sentences, e.g. "Upon her I am dependant" - although this is not plain English!
    { regex: /(?!DBS\sadult\sfirst)DBS\s[aA]dult\s[fF]irst/g, message: "Use lower case for adult first.", title: "DBS adult first"},
    { regex: /(?!DBS\sadults\sbarred\slist)DBS\s[aA]dults\s[bB]arred\s[Ll]ist/g, message: "Use lower case for adults barred list.", title: "DBS adults barred list"},
    { regex: /([Dd][Bb][Ss])\s[dD]isclosure(?!\sservice)/g, message: "Use DBS certificate rather than DBS disclosure.", title: "DBS disclosure"},
    { regex: /([Dd][Bb][Ss])\s[dD]isclosure\s[sS]ervice/g, message: "Use DBS checking service rather than DBS disclosure service.", title: "DBS checking service"},
    { regex: /(?!DBS\schildren's\sbarred\sservice)([Dd][Bb][Ss])\s[cC]hildren(‘|'|’)s\s[bB]arred\s[sS]ervice/g, message: "Use lower case for children's barred list.", title: "DBS children's barred list"},
    { regex: /Decision\sMaker/g, message: "Spell decision maker in lower case.", title: "Decision maker"},
    { regex: /[Dd]ecision\s[Mm]aking\s[Uu]nit/g, message: "Spell decision making unit in lower case.", title: "Decision making unit"},
    { regex: /digital\sstatus/gi, message: "Avoid using 'digital status' in public-facing services. Instead use 'eVisa' or 'online immigration status'.", title: "Digital status"},
    { regex: /(?!Disclosure\sand\sBarring\sService)[dD]isclosure\sand\s[bB]arring\s[sS]ervice/g, message: "Capitalise Disclosure and Barring Service thusly.", title: "Disclosure and Barring Service"},
    { regex: /\b(e[-]?gates|e[-]?Gates|E[-]?gates|E[-]?Gates?)\b(?!\s*\([^)]*\))/, message: "Explain what eGates means the first time you use it. For example 'You can use an eGate (electronic passport gate)'.", title: "Exlaining eGates on first use"},
    { regex: /(?<!\()\b(e[-]?visa|e[-]?Visa|E[-]?visa|E[-]?Visa?)\b(?!\s*\([^)]*\))/, message: "Explain what eVisa means the first time you use it. For example 'prove your online immigration status (eVisa)'.", title: "Exlaining eVisa on first use"},
    { regex: /(?!eGates)\b[eE][\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D\s]?[gG]ates?\b/g, message: "Spell 'eGates' with a lower case 'e', and without any spaces or hyphens.", title: "eGates"},
    { regex: /(?!eGates)\b[eE][\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D\s]?[gG]visa\b/g, message: "Spell 'eVisa' with a lower case 'e', and without any spaces or hyphens.", title: "eVisa"},
    { regex: /(?!electronic\stravel\sauthorisation)[eE]lectronic\s[tT]ravel\s[aA]uthorisation/g, message: "Use lower case initial letters on electronic travel authorisation. You can use the acronym ETA after the first mention.", title: "electronic travel authorisation"},
    { regex: /enhanced\sdisclosure/gi, message: "Use 'enhanced DBS check' rather than 'enhanced disclosure'.", title: "enhanced disclosure"},
    { regex: /(?!EU\sSettlement\sScheme)EU\s[Ss]ettlement\s[Ss]cheme/g, message: "Capitalise EU Settlement Scheme thusly. You can use the initials EUSS after the first full mention.", title: "EU Settlement Scheme"},  
    { regex: /(?!General\sRegister\sOffice)[Gg]eneral\s[Rr]egist(er|ry|ration)\s[oO]ffice/g, message: "Capitalise General Register Office thusly. It is 'register' not 'registry'. You can use the initials 'GRO' after the first full mention.", title: "General Register Office"},  
    { regex: /[Hh]is\s[mM]ajesty(‘|'|’)s\s[A-Z]/g, message: "Use 'HM' rather than 'His Majesty's' in front of the name of the relevant public body. For example, 'HM Revenue & Customs'.", title: "His Majesty's"},  
    { regex: /\bHMPO\b/g, message: "Do not use 'HMPO' in public-facing services.", title: "HMPO"},  
    { regex: /(?!HM\sPassport\sOffice)HM\s[Pp]assport\s[Oo]ffice/g, message: "Capitalise HM Passport Office thusly.", title: "HM Passport Office"},  
    { regex: /(?!Home\sOffice\sreference\snumber)(HO|Home\sOffice)\s[Rr]eference\s[nN]umber/g, message: "Use lower case for 'reference number' on 'Home Office reference number'.", title: "Home Office reference number"},  
    { regex: /([iI]mmigration\s[aA]dvisor|Immigration\sAdviser)/g, message: "Spell immigration adviser lower case and with an e, not an o.", title: "Immigration adviser"},  
    { regex: /(?!immigration\sbail)[iI]mmigration\s[bB]ail/g, message: "Spell immigration bail in lower case.", title: "Immigration bail"},  
    { regex: /(?!immigration\shealth\ssurcharge)[iI]mmigration\s[hH]ealth\s[sS]urcharge/g, message: "Spell immigration health surcharge in lower case.", title: "Immigration health surcharge"},  
    { regex: /immigration\sofficer/g, message: "Use 'Border Force officer' rather than 'immigration officer'. Only use 'immigration officer' if you have a specific reason.", title: "Immigration officer"},  
    { regex: /(?!Immigration\sRules)[iI]mmigration\s[rR]ules/g, message: "Capitalise 'Immigration Rules'.", title:"Immigration Rules"},  
    { regex: /([iI]ndefinite\sleave\sto\s([eE]nter|[rR]emain)|ILE|ILR)/g, message: "'Indefinite leave to enter' and 'indefinite leave to remain' are officially called 'settlement'.", title: "Settlement"},  
    { regex: /(?!King(‘|'|’)s\sSpeech)[Kk]ing(‘|'|’)s\s[sS]peech/g, message: "Capitalise 'King's Speech' thusly.", title: "King's Speech"},  
    { regex: /(?<!indefinite\s)(limited\s)?leave\sto\senter/gi, message: "Use 'permission to enter' instead of 'leave to enter' or 'limited leave to enter'.", title: "Permission to enter"},  
    { regex: /(?<!indefinite\s)(limited\s)?leave\sto\sremain/gi, message: "Use 'permission to stay' instead of 'leave to remain' or 'limited leave to remain'.", title: "Permission to stay"},  
    { regex: /(?!letter\sof\sauthority)[Ll]etter\s[oO]f\s[aA]uthority/g, message: "Spell letter of authority in lower case.", title: "Letter of authority"},  
    { regex: /(?!Life\sin\sthe\sUK\sTest)[lL]ife\s[iI]n\s[tT]he\s([uU]\.?[kK]\.?|[uU]nited\s[kK]ingdom)\s[tT]est/g, message: "Life in the UK Test should be spelled thusly, with capitals on the L and T.", title: "Life in the UK Test"},  
    { regex: /\blog(\s||\u002D|\u2013|\u2014|\u2012|\u2015|\u2212|\u00AD|\uFE58|\uFF0D)in\b|\blogin\b/gi, message: "Use 'sign in' rather than 'log in'.", title: "Sign in"},  
    { regex: /\bsign\sinto\b/gi, message: "Use 'sign in to' rather than 'sign into'.", title: "Sign into"},  
    { regex: /(?!Migrant\sHelp)\b[mM]igrants?\b/gi, message: "Avoid using 'migrants'. Try to be specific, such as 'applicant', 'claimant', 'employee' or 'worker'. If you cannot be specific, use 'people'.", title: "Migrants"},  
    { regex: /can('|’|‘)t|won('|’|‘)t|don('|’|‘)t|isn('|’|‘)t|aren('|’|‘)t|wasn('|’|‘)t|weren('|’|‘)t|doesn('|’|‘)t|didn('|’|‘)t|hasn('|’|‘)t|haven('|’|‘)t|hadn('|’|‘)t/gi, message: "Avoid all contractions. Research shows that contractions make content difficult to understand for people with limited fluency.", title: "Negative contractions"},  
    { regex: /you('|’|‘)re|it('|’|‘)s|we('|’|‘)re|they('|’|‘)re|I('|’|‘)ve|you('|’|‘)ve|we('|’|‘)ve|they('|’|‘)ve|there('|’|‘)s|that('|’|‘)s|who('|’|‘)s|what('|’|‘)s|where('|’|‘)s|when('|’|‘)s|why('|’|‘)s|how('|’|‘)s|let('|’|‘)s/gi, message: "Avoid all contractions. Research shows that contractions make content difficult to understand for people with limited fluency.", title: "Present tense contractions"},  
    { regex: /I('|’|‘)ll|you('|’|‘)ll|we('|’|‘)ll|they('|’|‘)ll|he('|’|‘)ll|she('|’|‘)ll|it('|’|‘)ll|there('|’|‘)ll|that('|’|‘)ll|who('|’|‘)ll|what('|’|‘)ll|where('|’|‘)ll|when('|’|‘)ll|why('|’|‘)ll|how('|’|‘)ll/gi, message: "Avoid all contractions. Research shows that contractions make content difficult to understand for people with limited fluency.", title: "Future tense contractions"},  
    { regex: /I('|’|‘)d|you('|’|‘)d|we('|’|‘)d|they('|’|‘)d|he('|’|‘)d|it('|’|‘)d|there('|’|‘)d|that('|’|‘)d|who('|’|‘)d|what('|’|‘)d|where('|’|‘)d|when('|’|‘)d|why('|’|‘)d|how('|’|‘)d/gi, message: "Avoid all contractions. Research shows that contractions make content difficult to understand for people with limited fluency.", title: "Other contractions"},  
    { regex: /\bnotif(ying|ication|ie(d|s))/gi, message: "Avoid using 'notification' or 'notify'. Try to be specific about contact, such as, 'we will send you an email' or 'how do you want to be contacted?'.", title: "Notification"},  
    { regex: /(?<!GOV\.UK\s)\bnotify/gi, message: "Avoid using 'notification' or 'notify'. Try to be specific about contact, such as, 'we will send you an email' or 'how do you want to be contacted?'.", title: "Notify"},  
    { regex: /(online|digital)\s(?<!immigration\s)status/gi, message: "Avoid using 'online status' or 'digital status' when referring to someone's immigration status. Use 'online immigration status' instead.", title: "Online status"},  
    { regex: /\bpersons|individuals\b/gi, message: "Use 'people' as a plural of person, rather than 'persons' or 'individuals'.", title: "People"},  
    { regex: /\bplease\b/gi, message: "Use 'please' sparingly. See guidance in <a href=https://www.gov.uk/service-manual/design/writing-for-user-interfaces>Writing for user interfaces</a> on GOV.UK.", title: "Please"},  
    { regex: /(?!points[\u002D\u2013\u2014\u2012\u2015\u2212\uFE58\uFF0D]based\ssystem)\b[pP]oints(\s|[\u002D\u2013\u2014\u2012\u2015\u2212\uFE58\uFF0D])[Bb]ased\s[Ss]ystem/g, message: "Spell points-based system in lower case and hyphenate.", title: "points-based system"},  
    { regex: /(?!Police\sNational\sComputer)[Pp]olice\s[Nn]ational\s[Cc]omputer/g, message: "Spell the initial letters of Police National Computer in upper case.", title:"Police National Computer"},  
    { regex: /\bpurdah/gi, message: "Use 'pre-election period', rather than 'purdah'.", title:"Purdah"},  
    { regex: /\b(trooper|gunner|signaller|sapper|guardsman|rifleman|kingsman|lance\scorporal|corporal|sergeant|staff\ssergeant|colour\ssergeant|(warrant\sofficer\sclass\s(two|2)|wo2)|sergeant\smajor|(warrant\sofficer\sclass\s(one|1)|wo1)|regimental\ssergeant\smajor|officer\scadet|second\slieutenant|lieutenant|captain|major|lieutenant\scolonel|commanding\sofficer|colonel|brigadier|major\sgeneral|lieutenant\sgeneral|field\smarshal)\s[A-Z]\w*/gi, message: "Capitalise the rank before the name, as in 'Field Marshal Joan Smith'.", title:"Military rank"},  
    { regex: /\b(constable|sergeant|inspector|chief\sinspector|superintendent|chief\ssuperintendent|commander|assistant\schief\sconstable|deupty\sassistant\scommissioner|deputy\schief\sconstable|assistant\scommissioner|deputy\scommissioner|commissioner|chief\sconstable)\s[A-Z]\w*/gi, message: "Capitalise the rank before the name, as in 'Detective Inspector Joan Smith'.", title:"Police rank"},  
    { regex: /\brefugees?\b/gi, message: "Make sure you only use refugee to describe an asylum claimant who has been granted refugee status.", title:"Refugee"},  
    { regex: /(?!senior\scivil\sservice)[sS]enior\s[cC]ivil\s[sS]ervice/g, message: "Lower case the initial letters of 'senior civil service'. You can use the acronym SCS after the first full mention.", title: "Senior civil service"},  
    { regex: /Sponsor[s‘'’]?s?\b/g, message: "Lower case the word 'sponsor' when referring to a company or person sponsoring a person to work in the UK.", title: "Sponsor"},  
    { regex: /(?!sponsorship\sreference\snumber)[Ss]ponsorship\s[rR]eference\s[Nn]umber/g, message: "Spell 'sponsorship reference number' in lower case.", title: "Sponsorship reference number"},  
    { regex: /sorry/gi, message: "Avoid using 'sorry'. See guidance in <a href=https://www.gov.uk/service-manual/design/writing-for-user-interfaces Writing for user interfaces</a> on GOV.UK.", title: "Sorry"},  
    { regex: /(?!Sovereign\sBase\sAreas)[sS]overeign\s[bB]ase\s[aA]reas/g, message: "Capitalise 'Sovereign Base Areas' thusly", title: "Sovereign Base Areas"},  
    { regex: /\bthank\syou\b/gi, message: "Use 'thank you' sparingly. See guidance in <a href=https://www.gov.uk/service-manual/design/writing-for-user-interfaces>Writing for user interfaces</a> on GOV.UK.", title: "Thank you"},
    { regex: /(?!EEA\sbiometric\sresidence\scard)[Ee][Ee][Aa]\s[Bb]iometric\s[Rr]esidenc[ey]\s[Cc]ard/g, message: "Spell 'EEA biometric residence card' thusly, with upper case 'EEA' and lower case 'biometric residence card'.", title: "EEA biometric residence card"},
    { regex: /(?!UK\sVisa\sand\sCitizenship\sApplication\sServices)[uU]\.?[kK]\.?\s[vV]isa\s(&|and)\s[cC]itizenship\s[aA]pplication\s[sS]ervices/g, message: "Spell 'UK Visa and Citizenship Services' thusly, without a & and with first-letter capitals.", title: "UK Visa and Citizenship Services"},
    { regex: /(?!UK\sVisas\sand\sImmigration)[uU]\.?[kK]\.?\s[vV]isas\s(&|and)\s[iI]mmigration/g, message: "Spell 'UK Visas and Immigration' thusly, without a & and with first-letter capitals.", title: "UK Visas and Immigration"},
    { regex: /(?!unique\sapplication\snumber)[uU]nique\s[aA]pplication\s[nN]umber/g, message: "Spell 'unique application number' thusly, with lower case first letters.", title: "Unique application number"},
    { regex: /(be(ing)?|is|are|were|was|am|makes?|made|making)\s.*user-centred.*/gi, message: "Do not hyphenate user centred when using as a noun, as in 'teams need to be user centred'.", title: "User centred"},
    { regex: /\buser\scentred\s\w*/gi, message: "Hyphenate user-centred when using as an adjective, as in 'user-centred design'.", title: "User-centred"},
    { regex: /(global\stalent|high\spotential|graduate|family|Ukraine|mobility|visitor|business|british\snational(\(*overseas\)*)*|(skilled|temporary|secondment)\sworker|right\sof\sabode|tier\s[1-5]|transit|marriage|student|study|scheme|representative|scale-up|founder|spouse|partner|ancestry|reunion|refugee|asylum|dependant).*\sroutes?.*/gi, message: "Use 'visa' rather than terms like 'route'. For example, use 'graduate visa' rather than 'graduate route'.", title: "visa"},
    { regex: /(?!Visa\sApplication\sCentre)[vV]isa\s[aA]pplication\s[cC]ent(re|er)/g, message: "Spell 'Visa Application Centre' using UK English spelling and uppercase first letters.", title: "Visa Application Centre"},
    { regex: /((visa)*\sprocessing\spost|visa\ssection|(visa)*\sissuing\soffice)/gi, message: "In the context of visas, do not use 'processing post', 'section' or 'issuing office'. Use 'Visa Application Centre' instead.", title: "Processing post/section/issuing office"},
    { regex: /.*\b(watch[\s\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D]list|Watchlist)/g, message: "Spell 'watchlist' in lower case and as one word.", title: "Watchlist"},
  
    //GOV.UK Style Rules
    { regex: /\ba\*./g, message:"When referring to educational grades, spell the letter in uppercase.", title: "A* (case)" },
    { regex: /\ba\s\*/gi, message:"Spell A* without a space", title: "A* (spacing)" },
    { regex: /(?<!(follow.*|like|upon|bec\wm.+|dr\ww.*))\sa[\s\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D]?stars?\b(?!(.+ed|\son\sthe|\soverhead|\sabove|sky))/gi, message:"When referring to educational grades, use the character '*' and do not use 'star'.", title: "A* (typography)" },
    { regex: /\b(an\s)?a level(s)?\b(?=\s+(in\b|subject(s)?\b|exam(s)?\b|coursework\b|grades?\b|results?\b|revision\b|choices?\b|studies\b|topics?\b|qualifications?\b))/g, message:"Spell A levels with an uppercase 'a'.", title: "A level (case)" },
    { regex: /(?<!A\slevel)(a[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D](l|L)evel|A[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D](l|L)evel)/g, message:"Spell A levels with a space between the words and a lowercase 'l'.", title: "A level (spacing)" },
    { regex: /(?![Tt]he\sacademies\sprogramme)[tT]he\s[aA]cademies\s[pP]rogramme/g, message:"Spell 'the academies programme' in lower case.", title: "The academies programme" },
    { regex: /(?!academy\sconverters)[aA]cademy\s[Cc]onverters/g, message:"Spell 'academy converters' in lower case.", title: "Academy converters" },
    { regex: /(?<!(\b[A-Z][a-z]+\b\s|\.\s))Act\b(?!(\s\d+|\s.+[A-Z]))/g, message:"Spell act lower case unless using the full title of the act.", title: "Act" },
    { regex: /(?!Adoption\sRegister)[aA]doption\s[rR]egister/g, message:"Spell 'Adoption Register' in upper case.", title: "Adoption Register" },
    { regex: /(under|over)[\u002D\u2013\u2014\u2012\u2015\u2212\uFE58\uFF0D\s]\d\d?s/gi, message:"Avoid using 'the over 50s' or 'under-18s'. Make it clear who's included.", title: "Age (descriptors)" },
    { regex: /\d\d?[\u002D\u2013\u2014\u2012\u2015\u2212\uFE58\uFF0D\s]year[\u002D\u2013\u2014\u2012\u2015\u2212\uFE58\uFF0D\s]old/gi, message:"Do not use hyphens in ages unless to avoid confusion. Make it clear who's included.", title: "Age (compound adjective)" },
    { regex: /(aged\s\d+[\u002D\u2013\u2014\u2012\u2015\u2212\uFE58\uFF0D]\d+(\syears)?|\d+[\u002D\u2013\u2014\u2012\u2015\u2212\uFE58\uFF0D]\d+\syears)/gi, message:"Do not use hyphens in age ranges.", title: "Age (ranges)" },
    { regex: /white[\u002D\u2013\u2014\u2012\u2015\u2212\uFE58\uFF0D\s]?list/gi, message:"Use 'allow' or 'allow list' instead of 'whitelist'.", title: "Allow list" },
    { regex: /al[\u002D\u2013\u2014\u2012\u2015\u2212\uFE58\uFF0D\s]qa(?!'|’)[ie]da/gi, message:"Spell the terrorist organisation as 'al-Qa’ida'.", title: "al-Qa’ida" },
    { regex: /(?!alternative\sprovision)[Aa]lternative\s[Pp]rovision\b/g, message:"Spell 'alternative provision' in lower case.", title: "Alternative provision" },
    { regex: /(?<![A-Z][a-z]*\s)&(?![A-Z])/g, message:"Only use ampersands (&) in company or departmental names.", title: "Ampersand" },
    { regex: /\bAnimal\s[Hh]ealth\b/g, message:"Spell 'animal health' in lower case.", title: "Animal health" },
    { regex: /anti[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D\s]social/g, message:"Spell 'antisocial' without a hyphen or space.", title: "Antisocial" },
    { regex: /(?!applied\sgeneral\squalifications)[aA]pplied\s[gG]eneral\s[qQ]ualifications/g, message:"Spell 'applied general qualifications' in lower case.", title: "Applied general qualifications" },
    { regex: /(?!apprenticeship\sprogramme)[aA]pprenticeship\s[pP]rogramme/g, message:"Spell 'apprenticeship programme' in lower case.", title: "Apprenticeship programme" },
    { regex: /A\sroads?/g, message:"Spell 'A-road' with a hyphen.", title: "A-road" },
    { regex: /(?!armed\sforces)[aA]rmed\s[fF]orces/g, message:"Spell 'armed forces' in lower case.", title: "Armed forces" },
    { regex: /arms\s[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D\s]?length\sbody/g, message:"Spell 'arm's length body' in lower case, with an apostrophe and without a hyphen.", title: "Armed forces" },
    { regex: /(?!assembly\sministers)[Aa]ssembly\s[Mm]inister/g, message:"Spell 'assembly ministers' in lower case.", title: "Assembly ministers" },
    { regex: /(?!Attendance\sAllowance)[Aa]ttendance\s[Aa]llowance/g, message:"Spell 'Attendance Allowance' with uppercase on the first letters.", title: "Attendance Allowance" },
    { regex: /\bBACS\b/g, message:"Use the acronym 'Bacs' not 'BACS'.", title: "Bacs" },
    { regex: /(back|front)[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D\s]end\b/gi, message:"Spell 'frontend' or 'backend' without any hyphens or spaces.", title: "Backend/frontend" },
    { regex: /sort\scode\s?[:\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D\s]{1,2}\d\d[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D]\d\d[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D]\d\d\s/gi, message:"Use spaces rather than hyphens in sort codes.", title: "Bank details (sort codes)" },
    { regex: /account\snumber\s?[:\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D\s]{1,2}((\d{2}\s){3}\d\d|\d{4}\s\d{4}|(\d{3}\s){2}\d\d)/gi, message:"Avoid using spaces or separators in account numbers", title: "Bank details (account numbers)" },
    { regex: /base[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D\s]line/gi, message:"Spell 'baseline' as one word.", title: "Baseline" },
    { regex: /(?!Bereavement\sPayment)[Bb]ereavement\s[Pp]ayment/g, message:"Spell 'Bereavement Payment' in uppercase.", title: "Bereavement Payment" },
    { regex: /(£|\$|₩|лв|₭|ден|₨|₮|€|¥|₹|CHF|Fr|R\$|₽|₿)\d{1,3}(\s?(billions|millions)|([bBmM][nN]?))/g, message:"When talking about money, use the singular form and do not abbreviate the amount. For example, '£12 billion'.", title: "Billions/millions" },
    { regex: /(?!Blind\sPerson[’‘']s\sAllowance)[bB]lind\s[pP]erson[’‘']s\s[aA]llowance/g, message:"Spell 'Blind Person's Allowance in upper case.", title: "Blind Person's Allowance" },
    { regex: /black[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D\s]?list/gi, message:"Do not use blacklist. Use 'block list' instead.", title: "Black list" },
    { regex: /blog[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D]?post/gi, message:"Spell 'blog post' as 2 words.", title: "Blog post" },
    { regex: /\w{3,}\(s\)./gi, message:"Do not use brackets to refer to something that could be singular or plural. Always use the plural instead.", title: "Brackets (plural and singular)" },
    { regex: /(?<!["“][^"\n\r]*?)\[[^\]]+\](?![^"\n\r]*?["”])/gi, message:"Only use square brackets when giving explanations inside quoted text.", title: "Brackets (round)" },
    { regex: /\bbrexit/gi, message:"Only use 'brexit' to provide historical context. Use specific dates where possible.", title: "Brexit" },
    { regex: /(?!BTEC\sNational\sDiploma)BTEC\s[nN]ational\s[dD]iploma/g, message:"Spell 'BTEC National Diploma' with upper case acronym and initial letters.", title: "BTEC National Diploma" },
    { regex: /(?!(business\scontinuinty\smanagement|Business\scontinuity\smanagement))Business\s[cC]ontinuity\s[mM]anagement/g, message:"Spell 'business continuity management' in lower case.", title: "Business continuity management" },
    { regex: /(?!Business\sIdentifier\sCode)[bB]usiness\s[iI]dentifier\s[cC]ode/g, message:"Spell 'Business Identifier Code (BIC)' in upper case with accompanying acronym.", title: "Business Identifier Code" },
    { regex: /(?!business\splan)[bB]usiness\s[pP]lan/g, message:"Spell 'business plan' in lower case.", title: "Business plan" },
    { regex: /(?!business\sstatement)[bB]usiness\s[sS]tatement/g, message:"Spell 'business statement' in lower case.", title: "Business statement" },
    { regex: /(?!C\sof\sE)[cC]\s[oO]f?\s[eE]\b/g, message:"Use 'C of E' when referring to school names.", title: "C of E" },
    { regex: /\bCabinet\b/g, message:"Lower case 'cabinet' when referring to the government agency.", title: "Cabinet" },
    { regex: /(?!Capital\sGains\sTax)[Cc]apital\s[gG]ains\s[tT]ax(es)?/g, message:"Upper case the initial letters on 'Capital Gains Tax'.", title: "Capital Gains Tax" },
    { regex: /(?!chair\sof\sgovernors)[cC]hair((wo)?man|person)?\s[oO]f\s[gG]overnors/g, message:"Use the official, lower case title: 'chair of governors'.", title: "Chair of governors" },
    { regex: /(?!chair(person|(wo)?man))(?<!\.\sChair)Chair(((wo)?man)?|person)(?<!\.\sChair(person|(wo)?man)?)/g, message:"Spell 'chair, chairwoman, chairperson and chairman' in lower case. Also, consider using gender-neutral language.", title: "Chairman, chairwoman, chairperson" },
    { regex: /(?<!(to|I|we|you|they)\s)change\slogs?\b/gi, message:"Spell 'change log' as 2 words.", title: "Change log" },
    { regex: /Clearing\sHouse\sAutomated\sPayment\sSystem(?=\s\(CHAPS\))/gi, message:"Put the acronym before the full explanation", title: "CHAPS" },
    { regex: /(?<!(to|we|I|you|they)\s)check[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D\s]box(es)?/gi, message:"Spell 'checkbox' as a singular word", title: "Checkbox" },
    { regex: /(?!chemical\,?\sbiological\,?\sradiological\,?\sand\snuclear\s(\(CBRN\)\s)?materials?)[cC]hemical\,?\s[bB]iological\,?\s[rR]adiological\,?\s(and\s)?[nN]uclear\s(\(CBRN\)\s)[Mm]aterials?/g, message:"Lower case. Upper case for the acronym.", title: "chemical, biological, radiological and nuclear (CBRN) materials" },
    { regex: /(?<!chief\sconstable)[cC]hief\s[C]onstable(?!\s[A-Z]+\.?\s?[A-Z]?)/g, message:"Use lower case for 'chief constable' unless using as an official title with a name.", title: "Chief constable" },
    { regex: /(?!Child\sBenefit)[Cc]hild\s[Bb]enefit/g, message:"Spell 'Child Benefit' with upper case initial letters.", title: "Child Benefit" },
    { regex: /(?!Child\sTax\sCredit)[Cc]hild\s[tT]ax\s[Cc]redit/g, message:"Spell 'Child Tax Credit' with upper case initial letters.", title: "Child Tax Credit" },
    { regex: /(?!childcare)[Cc]hild[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D\s]care/g, message:"Spell 'childcare' in lower case and as 1 word.", title: "childcare" },
    { regex: /(?!Childcare\sGrant)[Cc]hildcare\s[Gg]rant/g, message:"Spell 'Childcare Grant' with upper case initial letters.", title: "Childcare Grant" },
    { regex: /child[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D\s]mind(er|ing)?/g, message:"Spell 'childminder/ing' as 1 word.", title: "Childminder, childminding" },
    { regex: /(?!Children\sin\sNeed)(?!children\sin\sneed\scensus)[Cc]hildren\s[iI]n\s[nN]eed/g, message:"Upper case for the BBC fundraising event, lower case for children in need census.", title: "Children in Need" },
    { regex: /(?!Civil\sContingencies\sSecretariat)[Cc]ivil\s[Cc]ontingencies\s[Ss]ecretariat/g, message:"Upper case the initial letters.", title: "Civil Contingencies Secretariat" },
    { regex: /(?!Civil\sService)[cC]ivil\s[sS]ervice/g, message:"Upper case initial letters.", title: "Civil Service" },
    { regex: /(?<![.?!]\s)(?!civil\sservants)[cC]ivil\s[sS]ervants?/g, message:"Lower case 'civil servants'.", title: "Civil servants" },
    { regex: /class[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D\s]work/g, message:"Spell 'classwork' as 1 word.", title: "Classwork" },
    { regex: /\bCoalition\b/g, message:"Spell 'coalition' in lower case in all instances.", title: "Coalition" },
    { regex: /\b(?!CO2)[Cc][o0O][2\u2082]\b/g, message:"Use capital letters and a regular 2 on 'CO2'.", title: "CO2" },
    { regex: /(?!coastguard)[Cc]oast[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D\s]guards?/g, message:"Spell 'coastguard' in lower case as 1 word.", title: "Coastguard" },
    { regex: /(?!code\sof\spractice)[cC]ode\s[oO]f\s[pP]racti[cs]e/g, message:"Spell 'code of practice' in lower case.", title: "Code of practice" },
    { regex: /(?!command\spaper)[cC]ommand\s[Pp]apers?/g, message:"Spell 'command paper' in lower case.", title: "Command paper" },
    { regex: /third[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D\s]party\ssoftware/g, message:"Use 'commercial software' instead of 'third-party software'.", title: "Third-party software" },
    { regex: /(?!Community\sCare\sGrant)[Cc]ommunity\s[Cc]are\s[Gg]rant/g, message:"Upper case the initial letters.", title: "Community Care Grant" },
    { regex: /(?!community\sresilience)[Cc]ommunity\s[rR]esilience/g, message:"Spell 'community resilience' in lower case.", title: "Community resilience" },
    { regex: /(?<![.?!]\s)(?!(community|voluntary|foundation)\sschools)([Cc]ommunity|[vV]oluntary|[fF]oundation)\s[Ss]chools?/g, message:"Spell 'community/voluntary/foundation schools' in lower case.", title: "Community, voluntary and foundation schools" },
    { regex: /(?<![.?!]\s)(?!competence\sorder)[Cc]ompetence\s[Oo]rder/g, message:"Spell 'competence order' in lower case.", title: "Competence order" },
    { regex: /(master|slave|child|parent)\scomponent/gi, message:"Use 'primary' and 'secondary' when referring to components (not master/slave or child/parent).", title: "Component that controls other components" },
    { regex: /(?!conduct\sof\sbusiness\srules)[cC]onduct\s[oO]f\s[bB]usiness\s[rR]ules/g, message:"Spell 'conduct of business rules' in lower case.", title: "Conduct of business rules" },
    { regex: /(?<!UK)[A-Z]+\s([A-Z]\s?)+[?.!:;-]/g, message:"Do not use BLOCK CAPITALS.", title: "Block capitals" },
    { regex: /(?<![.?!]\s)(?!consultation\sresponses?)[Cc]onsultation\s[rR]esponses?/g, message:"Spell 'consultation responses' in lower case.", title: "Consultation responses" },
    { regex: /(?<![.?!]\s)(?!continuous\simprovement)[Cc]ontinuous\s[iI]mprovement/g, message:"Spell 'continuous improvement' in lower case.", title: "Continuous improvement" },
    { regex: /\bco\s?operat(ion|ive|e(s|d?))/g, message:"Spell 'co-operation' (or its variants) with a hyphen.", title: "Co-operation" },
    { regex: /(?<![.?!]\s)(?!core\sstandards)[cC]ore\s[sS]tandards/g, message: "Lower case.", title: "core standards" },
    { regex: /(?<![.?!]\s)(?!credit\sunions)[cC]redit\s[uU]nions/g, message: "Lower case.", title: "credit unions" },
    { regex: /(?<![.?!]\s)(?!critical\snational)[cC]ritical\s[nN]ational\s[iI]nfrastructure/g, message: "Lower case.", title: "critical national infrastructure" },
    { regex: /(?<![.?!]\s)(?!critical\sworker)[cC]ritical\s[wW]orker/g, message: "Lower case. Use only in relation to educational provision. Do not use ‘keyworker’.", title: "critical worker" },
    { regex: /(?<![.?!]\s)(?!crown\sservants)[cC]rown\s[sS]ervants/g, message: "Lower case.", title: "crown servants" },
    { regex: /(?<![.?!]\s)(?!customs\sduty)[cC]ustoms\s[dD]uty/g, message: "Lower case.", title: "customs duty" },
    { regex: /(?<![.?!]\s)(?!customs\sunion)[cC]ustoms\s[uU]nion/g, message: "Lower case. Use upper case only when part of a specific title.", title: "customs union" },
    { regex: /(?<![.?!]\s)(?!cyber\sbullying)[cC]yber\s[bB]ullying/g, message: "Two words. Lower case.", title: "cyber bullying" },
    { regex: /cyber[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D]?bully(ing)?/g, message: "Two words. Lower case.", title: "cyber bullying" },
    { regex: /(?<![.?!]\s)(?!dedicated\sschools)[dD]edicated\s[sS]chools\s[gG]rant/g, message: "Lower case.", title: "dedicated schools grant" },
    { regex: /(?<![.?!]\s)(?!defence\steam)[dD]efence\s[tT]eam/g, message: "Lower case.", title: "defence team" },
    { regex: /(?<![.?!]\s)(?!defence)[dD]efence/g, message: "Lower case even when referring to the MOD defence team.", title: "defence" },
    { regex: /(?<![.?!]\s)[dD]evolved\s[aA]dministrations?/g, message: "Use 'devolved governments' instead.", title: "devolved administrations" },
    { regex: /(?<![.?!]\s)(?!director\sgeneral)[dD]irector\s[gG]eneral/g, message: "Lower case. No hyphen.", title: "director general" },
    { regex: /(?<![.?!]\s)(?!director)[dD]irector/g, message: "Lower case in text. Use upper case in titles.", title: "director" },
    { regex: /(?<![.?!]\s)(?!dispensation)[dD]ispensation/g, message: "Lower case.", title: "dispensation" },
    { regex: /(?<![.?!]\s)(?!early\scareer)[eE]arly\s[cC]areer\s[tT]eacher/g, message: "Lower case.", title: "early career teacher" },
    { regex: /(?<![.?!]\s)(?!early\syears)[eE]arly\s[yY]ears/g, message: "Lower case.", title: "early years" },
    { regex: /(?<![.?!\n\r]\s)(?<!^Email)(?!email)[eE][\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D\s]?mail/g, message: "Lower case and spell as 1 word.", title: "email" },
    { regex: /(?<![.?!]\s)(?!emergency\splan)[eE]mergency\s[pP]lan/g, message: "Lower case.", title: "emergency plan" },
    { regex: /(?<![.?!]\s)(?!endpoint)[eE]ndpoint/g, message: "Lower case. Not 'end point' in the context of APIs.", title: "endpoint" },
    { regex: /(?<![.?!]\s)(?!enrolment)[eE]nrolment/g, message: "Lower case.", title: "enrolment" },
    { regex: /(?<![.?!]\s)(?!enrolling)[eE]nrolling/g, message: "Lower case.", title: "enrolling" },
    { regex: /(?<![.?!]\s)(?!enrol)[eE]nrol/g, message: "Lower case.", title: "enrol" },
    { regex: /(?<![.?!]\s)(?!ethnic\sminorities)[eE]thnic\s[mM]inorities/g, message: "Lower case. Refer to groups individually where possible.", title: "ethnic minorities" },
    { regex: /(?<![.?!]\s)(?!euros,\sthe\seuro)[eE]uros,\sthe\s[eE]uro/g, message: "Lower case, if referring to the currency.", title: "euros, the euro" },
    { regex: /(?<![.?!]\s)(?!executive\sdirector)[eE]xecutive\s[dD]irector/g, message: "Lower case in running text.", title: "executive director" },
    { regex: /(?<![.?!]\s)(?!diploma)[dD]iploma/g, message: "Lower case unless part of a qualification title.", title: "diploma" },
    { regex: /(?<![.?!]\s)(?!Corporation\sTax)[cC]orporation\s[tT]ax/g, message: "Use upper case.", title: "Corporation Tax" },
    { regex: /(?<![.?!]\s)(?!Corporation\sTax\sfor\sAgents\sonline\sservice)[cC]orporation\s[tT]ax\s[fF]or\s[aA]gents\s[oO]nline\s[sS]ervice/g, message: "Use upper case.", title: "Corporation Tax for Agents online service" },
    { regex: /(?<![.?!]\s)(?!Corporation\sTax\sOnline)[cC]orporation\s[tT]ax\s[oO]nline/g, message: "Use upper case 'Online' if referring to the actual service, not when describing using the service.", title: "Corporation Tax Online" },
    { regex: /(?<![.?!]\s)(?!Council\sTax)[cC]ouncil\s[tT]ax/g, message: "Use upper case.", title: "Council Tax" },
    { regex: /(?<![.?!]\s)(?!County\sCourt)[cC]ounty\s[cC]ourt/g, message: "Upper case as it represents a single court system.", title: "County Court" },
    { regex: /(?<![.?!]\s)(?!Daycare\sTrust)[dD]aycare\s[tT]rust/g, message: "Two words. Upper case.", title: "Daycare Trust" },
    { regex: /(?<![.?!]\s)(?!Direct\sDebit)[dD]irect\s[dD]ebit/g, message: "Upper case.", title: "Direct Debit" },
    { regex: /(?<![.?!]\s)(?!Direct\sDebit\sInstruction)[dD]irect\s[dD]ebit\s[iI]nstruction/g, message: "Upper case.", title: "Direct Debit Instruction" },
    { regex: /(?<![.?!]\s)(?!Disability\sLiving\sAllowance)[dD]isability\s[lL]iving\s[aA]llowance/g, message: "Upper case.", title: "Disability Living Allowance" },
    { regex: /(?<![.?!]\s)(?!Discretionary\sHousing\sPayment)[dD]iscretionary\s[hH]ousing\s[pP]ayment/g, message: "Upper case.", title: "Discretionary Housing Payment" },
    { regex: /(?<![.?!]\s)(?!East\sEnd\s\(London\))[eE]ast\s[eE]nd\s(\(lL]ondon\))?/g, message: "Upper case.", title: "East End (London)" },
    { regex: /(?<![.?!]\s)(?!Excel\sspreadsheet)[eE]xcel\s[sS]preadsheet/g, message: "Upper case because Excel is a brand name. Lower case spreadsheet.", title: "Excel spreadsheet" },
    { regex: /(?<![.?!]\s)(?!Extended\sProject\sQualification)[eE]xtended\s[pP]roject\s[qQ]ualification/g, message: "Upper case.", title: "Extended Project Qualification" },
    { regex: /(?!EBacc)\b[eE][bB][Aa][cC]{2}\b/g, message: "A performance measure linked to GCSEs. Upper case E and B.", title: "EBacc" },
    { regex: /(?!COTS)\bCots\b/g, message: "Meaning “commercial-off-the-shelf software”. Not “cots” or “Cots”. Explain the acronym at first use.", title: "COTS" },
    { regex: /(?<![.?!]\s)(?<!([A-Z][a-z]+\s){1,})Councils?\b/g, message: "Use lower case when writing about local councils in general. Use capitals for the official name of a local council. For example ‘Reading Borough Council’, ‘Warwick District Council’ and ‘Swanage Town Council’.", title: "council" },
    { regex: /(?!COVID-19)([cC][oO][vV][iI][dD][\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D\s]19|coronavirus)/g, message: "Only use COVID-19 for the specific condition.", title: "COVID-19" },
    { regex: /\bcourse[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D\s]work/gi, message: "One word.", title: "Coursework" },
    { regex: /\bcross\s?curricular\slearning/gi, message: "Hyphenated", title: "cross-curricular learning" },
    { regex: /\bcurricula/gi, message: "Use curriculums", title: "curriculums" },
    { regex: /\bdata\s+(are|have|were|show|indicate|suggest|reveal|demonstrate|highlight|support|reflect|contain|include|comprise|originate|undergo)\b/gi, message: "Treat as a singular noun: The data is stored on a secure server.", title: "data" },
    { regex: /\bdata[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D]?centres?\b/gi, message: "2 words. Not 'datacentre'.", title: "data centre" },
    { regex: /\bdata[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D]?sets?\b/gi, message: "2 words. Not 'dataset'.", title: "data set" },
    { regex: /\b(?:\d{1,2}\s)?(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may(?=\s(?:\d{1,2}|\d{4}))|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)(?:\s\d{4})?\b/g, message: "Upper-case the first letter on months.", title: "months (case)" },
    { regex: /(\d{1,2}\s)?(january|february|march|april|may|june|july|august|september|october|november|december)\s(\d{2,4})?[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D]\s(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|\d{2,4}\s(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec))/gi, message: "Use 'to' in date ranges, not dashes.", title: "months (ranges)" },
    { regex: /\b(\d{4}|\d{1,2})\s?[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D]\s?(\d{4}|\d{1,2})\s?(january|february|march|april|may|june|july|august|september|october|november|december|\bjan\b|\bfeb\b|\bmar\b|\bapr\b|\bmay\b|\bjun\b|\bjul\b|\baug\b|\bsep\b|\boct\b|\bnov\b|\bdec\b)?/gi, message: "Use 'to' in date ranges, not dashes.", title: "dates (ranges)" },
    { regex: /(january|february|march|april|may|june|july|august|september|october|november|december|\bjan\b|\bfeb\b|\bmar\b|\bapr\b|\bmay\b|\bjun\b|\bjul\b|\baug\b|\bsep\b|\boct\b|\bnov\b|\bdec\b)\,\s\d{4}/gi, message: "Do not use a comma between the month and year", title: "months (comma)" },
    { regex: /\b(eg\b|e\.g\.?\b)(\s|,)/gi, message: "Do not use e.g. Use 'for example' or an alternative instead.", title: "eg" },
    { regex: /\b(etc\b|e\.t\.c\.\b)(\s|,)/gi, message: "Do not use e.t.c. Use an alternative instead.", title: "etc" },
    { regex: /(\bie\b|\bi\.e\.\b)(\s|,)/gi, message: "Do not use i.e. Use an alternative instead.", title: "ie" },
    { regex: /\be[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D\s]mail/gi, message: "One word.", title: "email" },
    { regex: /(?=[^@\s]*[A-Z])[\w.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, message: "Write email addresses in lower case.", title: "email addresses" },
    // The above rule is redundant due to the way the JS splits the text into strings. Kept for when eventual bug fix is implemented.
    //Writing about disability rules - won't flag 'attack' 'fit' or 'spell' - these are too generic
    { regex: /(the\s)?handicapped/gi, message:"Use 'disabled' instead of 'handicapped'.", title:"Writing about disability", },
    { regex: /wheelchair[\s\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D]bound|confined\sto\sa\swheelchair/gi, message:"Use 'wheelchair user' instead.", title:"Writing about disability", },
    { regex: /(afflicted\sby|suffer(s|ing|ed)?\s(from|with))/gi, message:"Use 'has [name of condition or impairment]' instead of 'afflicted by' or similar.", title:"Writing about disability", },
    { regex: /mentally\s(handicapped|defective|challenged)|retarded|subnormal/gi, message:"Use 'with a learning disability/disabilities' instead.", title:"Writing about disability", },
    { regex: /cripple/gi, message:"Use 'disabled person' instead.", title:"Writing about disability", },
    { regex: /spastic/gi, message:"Use 'person with cerebral palsy' instead.", title:"Writing about disability", },
    { regex: /able[\s\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D]bodied/gi, message:"Use 'non-disabled' instead.", title:"Writing about disability", },
    { regex: /insane|mental\spatient|mad/gi, message:"Use 'person with a mental health condition' instead.", title:"Writing about disability", },
    { regex: /deaf\sand\sdumb|deaf\smute/gi, message:"Use 'deaf, user of British Sign Language (BSL), or person with a hearing impairment' instead.", title:"Writing about disability", },
    { regex: /the\sblind/gi, message:"Use 'people with visual impairments', 'blind people', or 'blind and partially sighted people' instead.", title:"Writing about disability", },
    { regex: /(an?|is|are)?\sepileptics?/gi, message:"Use 'people with epilepsy'instead.", title:"Writing about disability", },
    { regex: /(an?|is|are)?\sdiabetics?/gi, message:"Use 'people with diabetes'instead.", title:"Writing about disability", },
    { regex: /(an?|is|are)?\sdepressives?/gi, message:"Use 'people with depression'instead.", title:"Writing about disability", },
    { regex: /\bdwarf\b|\bmidget\b/gi, message:"Use 'someone with restricted growth or short stature'instead.", title:"Writing about disability", },
    { regex: /the\sdisabled|(people|person)\swith\s(disabilities|a\sdisability)/gi, message: "Use 'disabled people' instead of 'the disabled' or 'people with disabilities'.", title: "disabled people" },
    { regex: /\b[eE]\.?g\.?\b|\b[eE]\.?t\.?\.c?\b|\b[Ii]\.?e\.?\b/gi, message: "Use alternatives to latin abbreviations: 'for example', 'like', 'including', 'meaning' or 'that is'.", title: "Eg, etc and ie" },
    { regex: /[Ee]uropean\s[Ee]conomic\s[Aa]rea|\bEEA\b/g, message: "Avoid using as it is not widely understood. Say ‘the EU, Norway, Iceland and Liechtenstein. When rules covering the EEA also cover Switzerland, say ‘the EU, Switzerland, Norway, Iceland and Liechtenstein’.", title: "European Economic Area (EEA)" },
    { regex: /\bEuros?(zone)?\b|the\sEuro\b/g, message: "Lower case, if referring to the currency.", title: "Euros, the euro" },
    { regex: /\bFAQs?\b|[Ff]requently\s[Aa]sked\s[Qq]uestions/g, message: "Do not use FAQs on GOV.UK. If you write content by starting with user needs, you will not need to use FAQs.", title: "FAQs (frequently asked questions)" },
    { regex: /(financial\spenalt(ies|y)|financially\spenalis(e(d|s)?|ing))/gi, message: "Use ‘fine’ instead of ‘financial penalty’. For example, 'You’ll pay a £50 fine.'", title: "Fine" },
    { regex: /civil\spenalt(ies|y)/gi, message: "Only say ‘civil penalty’ if there’s evidence users are searching for the term. Otherwise, say what will happen to the user.", title: "Civil penalty" },
    { regex: /(?<![.?!]\s)(?!fire\sand\srescue\sservice)[fF]ire\s[aA]nd\s[rR]escue\s[sS]ervice/g, message: "Lower case.", title: "fire and resuce service" },
    { regex: /(?<=.)(?<![.?!]\s)(?<!\b\d{4}\s)\b(?!general\selection)[gG]eneral\s[eE]lections?\b/g, message: "Lower case when talking generally and not referring to a specific election.", title: "general elections (lower case)" },
    { regex: /\b\d{4}\s\bgeneral\selections?\b/g, message: "Upper case when talking about a specific election. Lower case when talking about a quantity or number of general elections. For example, 'the 2019 General Election'.", title: "general elections (upper case)" },
    { regex: /(?!((North|South)\sPole|(West|East)\sEnd)|(West|East)\sMidlands|(Central|South|North)\sAmerica)([eE]ast|[wW]est|[Nn]orth|[sS]outh)\b\s([pP]ole|[eE]nd|[mM]idlands|[aA]merica)\b/g, message: "Use upper case when talking about places that are part of recognised names or regions", title: "Geography and regions (recognised)" },
    { regex: /(?!(Middle|Far)\sEast)([mM]iddle|[fF]ar)\s[eE]ast/g, message: "Use upper case when talking about recognised regions (Far/Middle East)", title: "Geography and regions (Far/Middle East)" },
    { regex: /(?<!(\.|\?|\!|^)\s)(?!Northern\sIreland)(Northern|Southern|Eastern|Western)\s(Africa|Europe|America|England|Scotland|Wales|Asia|Ireland)/g, message: "Use upper case when talking about recognised regions (Far/Middle East)", title: "Geography and regions (Far/Middle East)" },
    { regex: /(?!GOV\.UK)[Gg][Oo0][Vv]\.?[\.\s]?\.?[Uu][Kk]/g, message: "Spell GOV.UK in all upper case with the full stop", title: "GOV.UK" },
    { regex: /(?<![.?!]\s)(?<!^)(?<!(Welsh\s|Scottish\s|His\sMajesty[\u2019\u0027]s\s))Government\b/g, message: "Lower case unless it’s a full title. For example: ‘UK government’, but ‘His Majesty’s Government of the United Kingdom of Great Britain and Northern Ireland’.", title: "government" },
    { regex: /(?<!\bon\s+(?:your|the)\s+)\b(the|your|next|this|that|a|an|current|previous)\s(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|\d+(?:st|nd|rd|th)|last|previous|home|log[\s-]?(in|on)|sign[\s-]?(in|up)|registration|confirmation|profile|settings?|check[\s-]out|results?|dashboard|landing|help|support|details?)?\s?screen\b(?![^A-Za-z]*(brightness|resolution|reader|capture|record(?:er|ing|ings)?|size|pixels?|display|time|protector|glass|bezel|saver|dpi|orientation|touch\s*screen|touchscreen|full\s*screen|split\s*screen|screen[-\s]?shot|screenshot|mirror(?:ing)?|cast(?:ing)?|share|sharing|chromecast|airplay|sunscreen|screening|screened|green[-\s]?screen))(?=[\s,.:;!?)]|$)/gi, message: "Do not use ‘screen’ unless you’re referring to part of a device, for example ‘the oval on your screen’. If you ever need to describe what the user is actually interacting with, use ‘page’. This applies to both web and app interfaces.", title: "screen" },
    { regex: /home[\u002D\u2013\u2014\u2012\u2015\u2212\u00AD\uFE58\uFF0D\s]pages?|(?<![.?!]\s)Homepages?\b/g, message: "Spell lower case and as 1 word.", title: "homepage" },
    { regex: /(?<![.?!]\s)Internet/g, message: "Spell lower case.", title: "internet" },
    { regex: /(deputy\s|shadow\s|lord\s)?(privy|prime|deputy|foreign|home|foreign|attorney|paymaster)\s(seal|minister|secretary|general)/g, message: "Specific job titles and ministers' titles are upper case: Home Secretary.", title: "job titles (2 words)" },
    { regex: /(shadow\s|home\s|foreign\s|parliamentary\s|deputy\s|chief\s|lord\s|junior\s)?((prime\s)?ministers?|(under-?)?secretar(y|ies)|chancellors?|president|whip)\s?((for|of|to|without)\s)(the|state|portfolio)?/g, message: "Specific job titles and ministers' titles are upper case: Minister for Housing.", title: "job titles (over 2 words)" },


  ];

  const ukEnglishregexPatterns = [
    //A
    { regex: /accessoriz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /Acclimatiz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /Activiz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /adaptor/gi, message: "Use 'adapter' in UK English", title: "US spelling detected", },    
    { regex: /Advertiz(?!em)/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /Aerosoliz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /\baging\b/gi, message: "Use 'ageing' in UK English", title: "US spelling detected", },    
    { regex: /Agonis(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /\bairplane\b|\bairplanes\b/gi, message: "Use 'aeroplane' in UK English", title: "US spelling detected", },    
    { regex: /Alchemiz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /Alkaliniz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /Alkaliz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /Allegoriz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /Alkaliz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /Alphabetiz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /aluminum/gi, message: "Use 'aluminium' in UK English", title: "US spelling detected", },    
    { regex: /amortiz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /Analogiz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /analyz(?!(iz|t|es))/gi, message: "Prefer -lys spellings and use UK English", title: "US spelling detected", },    
    { regex: /Anatomiz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /anemi/gi, message: "Use 'anaemia' in UK English", title: "US spelling detected", },    
    { regex: /anesthe/gi, message: "Use 'anaesthesia/anaesthetic' in UK English", title: "US spelling detected", },    
    { regex: /anatomiz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /anesthetiz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /angliciz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /animaliz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /anodiz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /antagoniz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /anodiz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /antenna/gi, message: "Usually localised to 'aerial' in UK English", title: "US spelling detected", },    
    { regex: /anthologiz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /anyplace/gi, message: "Use 'anywhere' in UK English", title: "US spelling detected", },    
    { regex: /aphoriz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /apologiz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /apostatiz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /apostatiz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /\bappalls?\b/gi, message: "Use 'appal(s)' in UK English", title: "US spelling detected", },    
    { regex: /appetiz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /appriz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /arabiz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /arboriz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /archaiz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },    
    { regex: /archeolog/gi, message: "Use 'archaeology' in UK English", title: "US spelling detected", },    
    { regex: /\barmor(?!eal)/gi, message: "Use 'armour' in UK English", title: "US spelling detected", },    
    { regex: /aromatiz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /artifact/gi, message: "Use 'artefact' in UK English", title: "US spelling detected", },
    { regex: /arugula/gi, message: "Use 'rocket' for UK English", title: "US spelling detected", },
    { regex: /asphalt/gi, message: "Use 'tarmac' instead of asphalt in UK English", title: "US spelling detected", },
    { regex: /atomiz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /atticiz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /(?<!power\sof\s)attorney/gi, message: "Check the context: 'attorney' can normally be localised in UK English", title: "US spelling detected", },
    { regex: /authoriz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /automatiz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /autotomis/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /avianiz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /\bax\b/gi, message: "Use 'axe' for UK English", title: "US spelling detected", },
    { regex: /axiomatiz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /azotiz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },

    //B
    { regex: /bacteriz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /\bbalk\b|\bbalked\b|\bbalks\b|\bbalking\b/gi, message: "'Balk' becomes 'baulk' in UK English", title: "US spelling detected", },
    { regex: /banaliz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /\bband(-|\s)?aid/gi, message: "Use 'plaster' in UK English", title: "US spelling detected", },
    { regex: /\bbanisters?/gi, message: "Use 'bannister' in UK English", title: "US spelling detected", },
    { regex: /baptiz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /bastardiz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /behavior/gi, message: "Use 'behaviour' in UK English", title: "US spelling detected", },
    { regex: /behoove/gi, message: "Use 'behove' in UK English", title: "US spelling detected", },
    { regex: /beltway/gi, message: "'Beltway' > 'ringroad' in UK English", title: "US spelling detected", },
    { regex: /beveled/gi, message: "Use 'bevelled' in UK English", title: "US spelling detected", },
    { regex: /bipolariz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /birthdate/gi, message: "Use 'date of birth' in UK English", title: "US spelling detected", },
    { regex: /\bblond\b/gi, message: "Use 'blonde' in UK English", title: "US spelling detected", },
    { regex: /botaniz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /breathalyz/gi, message: "Use 'breathalyse' in UK English", title: "US spelling detected", },
    { regex: /bromiz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /brutaliz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /burglariz/gi, message: "Use 'burgle' in UK English", title: "US spelling detected", },
    { regex: /burned/gi, message: "Prefer 'burnt' in UK English", title: "US spelling detected", },

    //C
    { regex: /calisthenics/gi, message: "Use 'callisthenics' in UK English", title: "US spelling detected", },
    { regex: /caloriz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /canaliz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /cancelatio/gi, message: "Use 'cancellation' in UK English", title: "US spelling detected", },
    { regex: /canceled/gi, message: "Use 'cancelled' in UK English", title: "US spelling detected", },
    { regex: /canceling/gi, message: "Use 'cancelling' in UK English", title: "US spelling detected", },
    { regex: /candor/gi, message: "Use 'candour' in UK English", title: "US spelling detected", },
    { regex: /cannibaliz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /canoniz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /capitaliz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /caponiz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /capsuliz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /carameliz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /carboliz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /carboniz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /carburetor/gi, message: "Use 'carburettor' in UK English", title: "US spelling detected", },
    { regex: /carburiz/gi, message: "Use 'carburettor' in UK English", title: "US spelling detected", },
    { regex: /cataboliz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /catalyz/gi, message: "Use 'catalyse' in UK English", title: "US spelling detected", },
    { regex: /categoriz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /catheteriz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /catholiciz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /cauteriz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /\bcenter\b|\bcenters\b/gi, message: "Use 'centre' in UK English", title: "US spelling detected", },
    { regex: /centered/gi, message: "Use 'centred' in UK English", title: "US spelling detected", },
    { regex: /centering/gi, message: "Use 'centring' in UK English", title: "US spelling detected", },
    { regex: /centerfol/gi, message: "Use 'centrefold' in UK English", title: "US spelling detected", },
    { regex: /centerpiec/gi, message: "Use 'centrepiece' in UK English", title: "US spelling detected", },
    { regex: /centraliz/gi, message: "Use 'centralise' in UK English", title: "US spelling detected", },
    { regex: /cesarea/gi, message: "Use 'caesarean' in UK English", title: "US spelling detected", },
    { regex: /channeled/gi, message: "Use 'channelled' in UK English", title: "US spelling detected", },
    { regex: /channeling/gi, message: "Use 'channelling' in UK English", title: "US spelling detected", },
    { regex: /channeliz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /checkbook/gi, message: "Use 'cheque book' in UK English", title: "US spelling detected", },
    //Checkboxes regex would normally go here, but omitted due to design system wording
    { regex: /checkered/gi, message: "Use 'chequered' in UK English", title: "US spelling detected", },
    { regex: /chili/gi, message: "Use 'chilli' in UK English", title: "US spelling detected", },
    { regex: /chiseled/gi, message: "Use 'chiselled' in UK English", title: "US spelling detected", },
    { regex: /chromiz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /cinematiz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /\bcipher/gi, message: "Use 'cypher' in UK English", title: "US spelling detected", },
    { regex: /circulariz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /civilianiz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /civiliz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /clamor/gi, message: "Use 'clamour' in UK English", title: "US spelling detected", },
    { regex: /classiciz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /classiciz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /climatiz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /(?<!(come\sout\sof\sthe\s|skeletons?\sin\s\w+\s))closet/gi, message: "Use 'wardrobe' in UK English", title: "US spelling detected", },
    { regex: /cogniz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /colonializ/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /coloniz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /color/gi, message: "Use 'colour' in UK English", title: "US spelling detected", },
    { regex: /coloriz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /communaliz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /communiz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /compartmentaliz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /compriz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /computeriz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /concertiz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /concretiz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /conveyoriz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /conveyoriz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /cosmeticiz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /councilor/gi, message: "Use councillor in UK English", title: "US spelling detected", },
    { regex: /counsel(ed|ing|or)/gi, message: "Use 'counselling/counsellor/counselled' in UK English", title: "US spelling detected", },
    { regex: /coverall/gi, message: "Use 'overall' in UK English", title: "US spelling detected", },
    { regex: /cozy/gi, message: "Use 'cosy' in UK English", title: "US spelling detected", },
    { regex: /crenelated/gi, message: "Use 'crenellated' in UK English", title: "US spelling detected", },
    { regex: /crenelated/gi, message: "Use 'crenellated' in UK English", title: "US spelling detected", },
    { regex: /creolize/gi, message: "Use 'creolise' in UK English", title: "US spelling detected", },
    { regex: /\bcribs?\b/gi, message: "Use 'cot' in UK English", title: "US spelling detected", },
    { regex: /criminaliz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /criticiz/gi, message: "Use 'cot' in UK English", title: "US spelling detected", },
    { regex: /cruele(st|r)/gi, message: "Use 'crueller/cruellest' in UK English", title: "US spelling detected", },
    { regex: /crystaliz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /customiz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /cutiniz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /cycliz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },

    //C
    { regex: /decimaliz/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
  ];

  // Split the text into sentences
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
