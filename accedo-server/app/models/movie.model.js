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


var Content = new Schema({
    url: { type: String, required: true },
    format: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    language: String,
    duration: Number,
    geoLock : Boolean,
    id: String
});


var parentalRating = new Schema({
    scheme: String,
    rating: String
});


var Image = new Schema({
    type: String,
    url: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
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



var MovieExtended = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: String,
    publishedDate: Number,
    availableDate: Number,
    metadata : [metaData],
    contents : [{type: Content, required:true}],
    credits: [credit],
    parentalRatings: [parentalRating],
    categories : [category],
    images : [{type: Image, required:true}],
    id: {type: String, required: true, index: true},
    dateViewed: { type: Date, default: Date.now}
}, { useNestedStrict: true});



module.exports = mongoose.model('Movie', MovieExtended);