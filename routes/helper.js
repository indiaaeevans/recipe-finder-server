require('dotenv').config();

module.exports = {
  spoonacularEndpoint:
    'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
  options: {
    headers: {
      'X-RapidAPI-Key': process.env.SPOONACULAR_API_KEY
    }
  },
  requestsRemaining: 50,
  handleRequest: function(req, res, actionFn) {
    if (this.requestsRemaining > 0) actionFn(req, res);
    else res.send('No free requests remaining');
  },
  updateRequestsRemaining: function(amount) {
    this.requestsRemaining = amount;
    console.log('free requests remaining: ', this.requestsRemaining);
  },
  validQueryParams: [
    'query',
    'cuisine',
    'includeIngredients',
    'excludeIngredients',
    'intolerances',
    'type',
    'offset',
    'number'
  ]
};
