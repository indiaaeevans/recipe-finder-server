
module.exports = {
    spoonacularEndpoint: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    options: {
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY
        }
    },
    requestsRemaining: 0,
    handleRequest: function(req,res,actionFn) {
        if (this.requestsRemaining > 0) actionFn(req, res);
        else res.send('No free requests remaining');
    },
    updateRequestsRemaining: function(amount) {
        this.requestsRemaining = amount;
        console.log('requestsRemaining updated to: ', this.requestsRemaining);
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
}