const fs = require('fs');
const path = require('path');
const mapRule = require('./map-rule')

const rules = JSON.parse(fs.readFileSync('app/external/govuk-assist/rule_mapping.json', 'utf8'));
const activeRules = rules.filter(rule => !rule.redundant);

// Analysis of rule types
const types = {};

for (const rule of activeRules) {
    if (rule.check?.llm !== 'none'){
        continue;
    }
    const check = rule.check || {};
    let type = 'unknown';

    if (check.patterns) {
        type = 'patterns';
    }
    else if (check.correct_forms) {
        type = 'correct_forms';
    }
    else if (check.matcher) {
        type = 'matcher';
    }
    else {
        //console.log('Unknown deterministic rule:',rule.rule_id)
    }    
    types[type] = (types[type] || 0) + 1;
}
console.log(types);

for (const rule of activeRules) {
    if (rule.check?.matcher){
        //console.log(JSON.stringify(rule, null, 2));
    }
}

const correctFormRules = activeRules.filter(
    rule => rule.check?.correct_forms
);
console.log(JSON.stringify(correctFormRules.slice(0, 50), null, 2));


// Mapping
const mappedRules = activeRules.map(mapRule);
//console.log(mappedRules.slice(0, 10));