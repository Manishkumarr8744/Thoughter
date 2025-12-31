const mongoose= require("mongoose")

const concernSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    concern:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model("Concern",concernSchema);