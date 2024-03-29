
const mongoose=require("mongoose");
const Schema=mongoose.Schema
const articleSchemaa=new Schema({
   
    altitude:String,
    location:String
})
const Articlee=mongoose.model("Articlee",articleSchemaa)
module.exports=Articlee