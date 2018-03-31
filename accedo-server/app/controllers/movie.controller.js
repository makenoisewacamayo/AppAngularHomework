var Movie = require('../models/movie.model');


exports.create = async function (req, res) {
    const id = req.body.id;
    if(!id) {
        return res.status(400).send({message: "Movie Id cannot be empty"});
    }
    
    var movie = new Movie(req.body);

    let data;
    try {
        data = await movie.save();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Some error occurred while creating the Movie."})
    }
};

exports.findAll = async function (req, res) {
   let movies;
   try {
      movies = await Movie.find().exec();
      res.send(movies);
   } catch(err) {
     res.status(500).send({message: "Some error occurred while retrieving movies."});
   }
 };

exports.findOne = async function (req, res) {
    const id = req.params.movieId;
    let movie;
    try {
       movie = await Movie.findOne({'id': id}).exec();
       res.send(movie);
    }
    catch (error) {
        if (error.kind === 'ObjectId') {
          return  res.status(404).send({message: `Movie not found with id: ${id}`});
        }
        res.status(500).send({message: `Error retrieving movie with id: ${id}`});
    }
};

exports.update = async function (req, res) {
    const id = req.body.id;
    if(!id) {
        return res.status(400).send({message: "Movie Id cannot be empty"});
    }
    let movie;
    try {
       movie = await Movie.findOne({'id': id}).exec();
    } catch(error) {
        if (error.kind === 'ObjectId') {
          return  res.status(404).send({message: `Movie not found with id: ${id}`});
        }
        return res.status(500).send({message: `Error retrieving movie with id: ${id}`});
    }

    Object.keys(req.body)
        .map((key) => {
            if ( movie.hasOwnProperty(key) && !!req.body[key] && movie[key] !==  req.body[key]) {
                movie[key] = req.body[key]
            }
            return key;
        }); 

    let data;
    try {
        data = await movie.save();
        res.send(data);
    } catch(error) {
        res.status(500).send({message: `Could not update movie with id: ${id}`});
    }

};

exports.delete = async function (req, res) {
    const id = req.body.id;
    if(!id) {
        return res.status(400).send({message: "Movie Id cannot be empty"});
    }
    let response;
    try {
        response = await Movie.findOneAndRemove({'id': id}).exec();
        res.send({message: "Movie deleted successfully!"})
    } catch(error) {
        if (error.kind === 'ObjectId') {
          return  res.status(404).send({message: `Movie not found with id: ${id}`});
        }
        res.status(500).send({message: `Error retrieving movie with id: ${id}`});
    }
  
};
