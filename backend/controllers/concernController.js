const catchAsyncError =require("../Middlewares/catchAsyncError")
const ErrorHandler = require("../utils/errorHandler");
const Concern= require("../models/concernModel")

exports.createConcern=catchAsyncError(async(req,res,next)=>{
    try{
    const {email,concern}=req.body;
    if(!email || !concern){
        return next (new ErrorHandler("Please enter all the fields",402));
    }
    const newConcern=await Concern.create({email,concern});
    res.status(200).json({
        success:true,
        message:"Concern submitted successfully",
        newConcern
    })
    }catch(err){
        console.log(err);
        return next (new ErrorHandler("Internal server error",500));
    }
    }
)