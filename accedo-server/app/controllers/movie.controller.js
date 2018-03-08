var Movie = require('../models/movie.model');

exports.create = function(req, res) {
    if(!req.body.content) {
        return res.status(400).send({message: "Movie can not be empty"});
    }

    var movie = new Movie(req.body);

    movie.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Movie."});
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res) {
    Movie.find(function(err, movies){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving movies."});
        } else {
            res.send(movies);
        }
    });
};

exports.findOne = function(req, res) {
    Movie.findOne({'id': req.params.movieId}, function(err, movie) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Movie not found with id " + req.params.movieId});                
            }
            return res.status(500).send({message: "Error retrieving movie with id " + req.params.movieId});
        } 

        if(!movie) {
            return res.status(404).send({message: "Movie not found with id " + req.params.movieId});            
        }

        res.send(movie);
    });
};

exports.update = function(req, res) {
    Movie.findOne({'id': req.params.movieId}, function(err, movie) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Mvie not found with id " + req.params.movieId});                
            }

            return res.status(500).send({message: "Error finding movie with id " + req.params.movieId});
        }

        if(!movie) {
            return res.status(404).send({message: "Movie not found with id " + req.params.movieId});            
        }

        movie = req.body;
      
        movie.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update movie with id " + req.params.movieId});
            } else {
                res.send(data);
            }
        });
    });
};

exports.delete = function(req, res) {
    Movie.findOneAndRemove({ 'id': req.params.movieId}, function(err, movie) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Movie not found with id " + req.params.movieId});                
            }
            return res.status(500).send({message: "Could not delete movie with id " + req.params.movieId});
        }

        if(!movie) {
            return res.status(404).send({message: "Movie not found with id " + req.params.movieId});
        }

        res.send({message: "Movie deleted successfully!"})
    });
};
