const express = require('express');
const router = express.Router();
const request = require('request');
const mockRecipe = '../mockRecipe.json';
const helper = require('./helper');
const querystring = require('querystring');
const options = helper.options;
const spoonacularAPI = helper.spoonacularEndpoint;
const recipeSearchPath = '/recipes/searchComplex';
const validQueryParms = helper.validQueryParams;

// advanced recipe search
router.get('/', function(req, res) {
    helper.handleRequest(req, res, getSearchResults);
})

// get a recipe by ID
router.get('/:id', function(req, res) {
    helper.handleRequest(req, res, getRecipe);
})

function getSearchResults(req, res) {
    const qs = createQueryString(Object.assign(req.query));
    const url = `${spoonacularAPI}${recipeSearchPath}?${qs}`;
    request.get(url, options, function(error, response, body) {
        if (error) console.log('error', error);
        helper.updateRequestsRemaining(response.headers["x-ratelimit-requests-remaining"]);
    }).pipe(res);
}

function getRecipe(req, res) {
    const id = req.params['id'];
    const url = `${spoonacularAPI}/recipes/${id}/information`;

    // if using mock
    // res.send(mockRecipe);

    request.get(url, options, function(error, response, body) {
        if (error) console.log('error', error);
        helper.updateRequestsRemaining(response.headers["x-ratelimit-requests-remaining"]);
        console.log(response);
    }).pipe(res);
}

function createQueryString(paramsReceived) {
    let paramsToSend = {};
    validQueryParms.forEach(key => {
        if (paramsReceived.hasOwnProperty(key)) {
            paramsToSend[key] = paramsReceived[key];
        }
    });
    paramsToSend['limitLicense'] = true;
    paramsToSend['instructionsRequired'] = true;
    return querystring.stringify(paramsToSend);
}

module.exports = router;