var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var metaData = new Schema({
    value: String,
    name: String
});


var credit = new Schema({
    role: String,
    name: String
});


var content = new Schema({
    url: String,
    format: String,
    width: Number,
    height: Number,
    language: String,
    duration: Number,
    geoLock : Boolean,
    id: String
});


var parentalRating = new Schema({
    scheme: String,
    rating: String
});


var image = new Schema({
    type: String,
    url: String,
    width: Number,
    height: Number,
    id: String
});


var coverImage = new Schema({
    type: String,
    src: String,
    width: String,
    height: String,
    alt: String,
    title: String,
    id: String,
    crossorigin: String,
    decoding: String,
    referrerpolicy: String
});


var category = new Schema({
    title: String,
    description: String,
    id: String
});


var Movie = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    type: String,
    publishedDate: Number,
    availableDate: Number,
    metadata : [metaData],
    contents : [content],
    credits: [credit],
    parentalRatings: [parentalRating],
    categories : [category],
    images : [image],
    id: {type: String, required: true}
});


var MovieExtended = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: String,
    publishedDate: Number,
    availableDate: Number,
    metadata : [metaData],
    contents : [content],
    credits: [credit],
    parentalRatings: [parentalRating],
    categories : [category],
    images : [image],
    id: {type: String, required: true},
    dateViewed: { type: Date, default: Date.now}
});



module.exports = mongoose.model('Movie', MovieExtended);