mongoose =require("mongoose");


stuSchema = new mongoose.Schema({
        name:String,
        price:Number,
        description:String,
        category:String,
        image:String
})

module.exports = mongoose.model("student", stuSchema)