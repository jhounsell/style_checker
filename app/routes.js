const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();
const checkTextRules = require('./assets/javascripts/text-checker');

router.get('/check-controls', (req, res) => {

  if (!req.session.rulesets) {
    req.session.rulesets = [
      'hods',
      'acronyms',
    ];
  }

  res.render('check-controls');
});

router.get('/reset-controls', (req, res) => {
  req.session.rulesets = [
    'hods',
    'acronyms',
  ];
  return res.redirect('/check-controls');
});

router.post('/check-text-router', (req, res, next) => {
  const userText = req.body['user-text'];
  const selectedRules = req.session.rulesets || ['default'];
  const results = checkTextRules (userText, selectedRules);

  if (results === 'no-sentences') {
    return res.redirect ('/no-sentences');
  }
    else if (results) {
      req.session.data ['results'] = results;
      return res.redirect('/results');
    }
    
    else {
      return res.redirect('/no-issues');
    }

  })

router.post('/rulesets-router', (req, res, next) => {
  let selectedRulesets = req.body.rulesets || [];

  if (!Array.isArray(selectedRulesets)) {
    selectedRulesets = [selectedRulesets];
  }

  req.session.rulesets = selectedRulesets;

  selectedRulesets = selectedRulesets.filter(
    rule => rule !== '_unchecked'
  );

  console.log('Selected rulesets:', selectedRulesets);

  return res.redirect('/check-text');
});

router.get('/results', (req, res) => {
  res.render('results', { results: req.session.data['results'] });
});

router.get('/no-issues', (req, res) => {
  res.render('no-issues');
});

module.exports = router;
