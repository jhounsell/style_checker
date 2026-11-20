function mapRule(rule) {

    const llmType = rule.check?.llm || 'none';

    return {
        id: `govuk:${rule.rule_id}`,
        title: rule.rule,
        guidance: rule.details,
        llmType,
        executable: llmType === 'none',
        check: rule.check
    };
}
module.exports = mapRule;