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
    { regex: /verif(y(ing)?|ie(s|d)|ication)/gi, message: "Consider using check instead of verify if you are asking users to check the accuracy of something.", title: "Verify"},
    { regex: /clandestine/gi, message: "Do not refer to people as a clandestine or clandestine entrant. Try to be specific, like 'a person hidden in a vehicle, ship or plane'.", title: "Clandestine"},
    { regex: /(click|tap)/gi, message: "Use select rather than click or tap because not everyone uses a mouse.", title: "Click"},
    { regex: /(Common\sTravel\sarea|Common\stravel\sArea|common\sTravel\sArea|common\stravel\sArea|Common\stravel\sarea|common\stravel\sarea|common\sTravel\sArea|common\sTravel\sarea)/g, message: "Capitalise the initials of Common Travel Area.", title: "Common Travel Area"},
    { regex: /validat(e(s|d)?|ing|ion)/g, message: "Consider using confirm or prove instead of validate if you are asking users to provide additional evidence.", title: "Validate"},
    { regex: /\b(?!(Confirmation of Acceptance for Studies)\b)[cC]onfirmation\s[oO]f\s[aA]cceptance\s[fF]or\s[sS]tudies/g, message: "Spell the initials of Confirmation of Acceptance for Studies in upper case.", title: "Confirmation of Acceptance for Studies"},
    { regex: /\bconsignee/gi, message: "Prefer recipient. If you need to use consignee, use it with recipient. For example, recipient (consignee).", title: "Consignee"},
    { regex: /\bconsignor/gi, message: "Prefer sender. If you need to use consignor, use it with sender. For example, sender (consignor).", title: "Consignor"},
    { regex: /\bright\b/gi, message: "Use correct rather than right.", title: "Correct"},
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
    { regex: /(?!GOV\.UK)[Gg][Oo][Vv]\.[Uu][Kk][^\/]/g, message: "Spell GOV.UK in all upper case.", title: "GOV.UK"},  
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
    { regex: /\b(private|trooper|gunner|signaller|sapper|guardsman|rifleman|kingsman|lance\scorporal|corporal|sergeant|staff\ssergeant|colour\ssergeant|(warrant\sofficer\sclass\s(two|2)|wo2)|sergeant\smajor|(warrant\sofficer\sclass\s(one|1)|wo1)|regimental\ssergeant\smajor|officer\scadet|second\slieutenant|lieutenant|captain|major|lieutenant\scolonel|commanding\sofficer|colonel|brigadier|major\sgeneral|lieutenant\sgeneral|field\smarshal)\s[A-Z]\w*/gi, message: "Capitalise the rank before the name, as in 'Field Marshal Joan Smith'.", title:"Military rank"},  
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
    { regex: /REGEXRULEGOESHERE/g, message:"", title: "" },
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
    { regex: /authoris/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /automatiz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /autotomis/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /avianiz(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /\bax\b/gi, message: "Use 'axe' for UK English", title: "US spelling detected", },
    { regex: /axiomatis(?!(m|t))/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },
    { regex: /azotis/gi, message: "Prefer -ise spellings and use UK English", title: "US spelling detected", },

    //B

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
