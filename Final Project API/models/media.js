const mongoose=require('mongoose')
var Schema=mongoose.Schema


var mediaSchema= new Schema({
    username:String,
    password:String,
    Fname:String,
    Lname:String,
    city:String,
    State:String,
    Zip:String,
    email:String,
    Cashapp:String,
    Patreon:String,
    Venmo:String,
    Amazon:String,
    Zelle:String

})


module.exports= mongoose.model("Media",mediaSchema,"media") 