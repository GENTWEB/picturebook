var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GifSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique:true
    },
    url: {
        type: String,
        required: true,
        unique: true
    }
});

var gif = mongoose.model("dbgif", GifSchema);
module.exports = gif;