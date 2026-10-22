const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();
const checkTextRules = require('./assets/javascripts/text-checker'); // Adjust the path as needed

router.post('/check-text-router', (req, res, next) => {
  const userText = req.body['user-text'];
  // Apply style rules from the external file

  // Redirect based on results
  if (!userText || !userText.trim()) {
    return res.redirect('/no-sentences')
  }
  // Get the results of checkTextRules function and store the data for use in both /results and /no-issues
  const results = checkTextRules(userText)
  req.session.data['results'] = results;

  if (results.hasStyleIssues) {
    return res.redirect('/results')
  }

  else {
    req.session.data ['results'] = results;
    return res.redirect('/no-issues');
  }
  })

router.get('/results', (req, res) => {
  res.render('results', { results: req.session.data['results'] });
});

router.get('/no-issues', (req, res) => {
  res.render('no-issues');
});

module.exports = router;
