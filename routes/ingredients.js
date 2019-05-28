const express = require('express');
const router = express.Router();
const request = require('request');
const helper = require('./helper');
const options = helper.options;
const spoonacularAPI = helper.spoonacularEndpoint;

// autocomplete for ingredients search
router.get('/suggestions', function(req, res) {
  helper.handleRequest(req, res, getAutoCompleteSuggestions);
});

function getAutoCompleteSuggestions(req, res) {
  const term = req.query['term'];
  const url = `${spoonacularAPI}/food/ingredients/autocomplete?query=${term}`;
  request
    .get(url, options, function(error, response, body) {
      if (error) console.error(error);
      helper.updateRequestsRemaining(
        response.headers['x-ratelimit-requests-remaining']
      );
    })
    .pipe(res);
}

module.exports = router;
