var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GifSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

var gif = mongoose.model("gif", GifSchema);
module.exports = gif;