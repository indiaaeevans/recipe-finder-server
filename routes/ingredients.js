const express = require('express');
const router = express.Router();
const request = require('request');
const helper = require('./helper');
const querystring = require('querystring');
const options = helper.options;
const spoonacularAPI = helper.spoonacularEndpoint;
const recipeSearchPath = '/recipes/searchComplex';
const validQueryParms = helper.validQueryParams;

// advanced recipe search
router.get('/suggestions', function(req, res) {
    helper.handleRequest(req, res, getAutoCompleteSuggestions);
})

function getAutoCompleteSuggestions(req, res) {
    const term = req.params['term'];
    const url = `${spoonacularAPI}/food/ingredients/autocomplete?query=${term}`;
    request.get(url, options, function(error, response, body) {
        if (error) console.log('error', error);
        helper.updateRequestsRemaining(response.headers["x-ratelimit-requests-remaining"]);
        console.log(response);
    }).pipe(res);
}

module.exports = router;