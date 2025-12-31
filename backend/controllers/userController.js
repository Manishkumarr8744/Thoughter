const catchAsyncError =require("../Middlewares/catchAsyncError")
const User=require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken=require("../utils/sendToken")


//resgiter User
exports.registerUser=catchAsyncError(async(req,res,next)=>{
    try{
        const {name,email,password}=req.body;
    const user= await User.create({name,email,password});

    res.status(200).json({
        success:true,
        user,
        message:"user created"
    })
    }catch(err){
        console.log(err);
        res.status(501).json({err})
        
    }
})

//login user 
exports.loginUser=catchAsyncError(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next( new ErrorHandler("Please enter email and password"))
    }
    console.log(email,password);
    

    const user = await User.findOne({email}).select("+password");
    console.log(user);
    
    if(!user){
        console.log("user not found");
        return res.status(400).json({ success: false, message: "Invalid email or password" });
    }
    const passwordMatched=await user.comparePassword(password);
    if(!passwordMatched){
        console.log("invalid password");
        return res.status(400).json({ success: false, message: "Invalid email or password" });
    }
    user.password = undefined;
    sendToken(user,200,res)
    
})

//logout
exports.logout=catchAsyncError(async(req,res)=>{
    res.cookie('token',null,{expires:new Date(Date.now()),httpOnly:true})

    res.status(200).json({
        success:true,
        message:"Logout successfully"
    })
})

//get user details
exports.getUserDetails=catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id)
    res.status(200).json({
        sucess:true,
        user
    })
})

//update user name aur email
exports.updateUser=catchAsyncError(async(req,res,next)=>{
    
    const {name ,email}=req.body;
    const updateUser= await User.findByIdAndUpdate(req.user.id,{email,name},{new:true,
    runValidators:true,
    useFindAndModify:false});

    res.status(200).json({
        success:true,
        updateUser,
        message:"user updated"
    })
    

})

//update user password 
exports.UpdateUserPassword=catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select('+password')

    if(!user){
        return next(new ErrorHandler("User not Found",401));
    }
    const passwordMatched= await user.comparePassword(req.body.oldPassword)
    if(!passwordMatched){
        return res.status(400).json({ success: false, message: "old password  not matched" });
    }
    user.password=req.body.newPassword;
    await user.save();
    sendToken(user,200,res)
})


//Get all user - ADMIN 
exports.getAllUsers=catchAsyncError(async (req,res,next)=>{
    const users=await User.find();
    res.status(200).json({
        success:true,
        message:"All Users",
        users
    })
})

//update user role - Admin
exports.updateUserRole=catchAsyncError(async(req,res,next)=>{
    const user= await User.findById(req.params.id);
    user.role=req.body.role;
    await user.save();

    res.status(200).json({
        success:true,
        message:"User Role updated",
        user
    })

})

//delete user - ADMIN
exports.deleteUser=catchAsyncError(async(req,res,next)=>{
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true,
        message:"user deleted successfully",
        
    })
})

