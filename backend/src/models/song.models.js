const mongoose = require("mongoose")
const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true }
}); 


const song =mongoose.model('song',songSchema)


module.exports = song