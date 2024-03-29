const mongoose=require("mongoose");
const Schema=mongoose.Schema
const articleSchema=new Schema({
    title:String,
    body:String,
    num_likes : Number,
    altitude:String,
    location:String
})
const Article=mongoose.model("Article",articleSchema)
module.exports=Article
