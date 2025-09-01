const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();
const checkTextRules = require('./assets/javascripts/text-checker');

router.post('/check-text-router', (req, res, next) => {
  const userText = req.body['user-text'];
  let results = '';

  results = checkTextRules(userText);

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

router.get('/results', (req, res) => {
  res.render('results', { results: req.session.data['results'] });
});

router.get('/no-issues', (req, res) => {
  res.render('no-issues');
});

module.exports = router;
