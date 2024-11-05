const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    band: {
        type:String,
        require: true,
    },
    title: String,
    url: {
        type: String,
        require:true,
    },
    
});


const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;