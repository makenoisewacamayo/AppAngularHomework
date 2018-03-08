module.exports = function(app) {

    var movie = require('../controllers/movie.controller');

    // Create a new movie
    app.post('/api/history', movie.create);

    // Retrieve all movies
    app.get('/api/history', movie.findAll);

    // Retrieve a single Movie with movieId
    app.get('/api/history/:movieId', movie.findOne);

    // Update a Movie with movieId
    app.put('/api/history/:movieId', movie.update);

    // Delete a Movie with movieId
    app.delete('/api/history/:movieId', movie.delete);
}