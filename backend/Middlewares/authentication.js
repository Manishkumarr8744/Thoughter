const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt=require("jsonwebtoken")
const User= require("../models/userModel")



exports.isAuthenticated=catchAsyncError(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(res.status(401).json("please sign or login to access this resource"))
    }
    const decodeToken=jwt.verify(token,process.env.JWT_SECRET)
    req.user=await User.findById(decodeToken.id)
    next()
})

exports.authorizeRole=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Roles:${req.user.role} is not allowed to use this resource`))
        }else{
            next()
        }
    }
}