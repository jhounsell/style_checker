const rules = require('../govuk-assist/rule_mapping.json');

const activeRules = rules.filter(
    rule => !rule.redundant
);

const runtimeRules = activeRules.map( rule => ({
    id:`govuk: ${rule.rule_id}`,
    title: rule.rule,
    guidance: rule.details,
    check: rule.check
}));
//console.log('Exporting rules: ', runtimeRules)
module.exports = runtimeRules;

