const mongoose= require("mongoose")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
// const dotenv=require("dotenv")

// dotenv.config({path:"../config/config.env"})


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:[30,"Name Cannot exceed 30 charcter"],
        minLength:[4,"Name should be greater than 4 charcater"]
    },
    email:{
        type:String,
        required:[true,"please enter your Email"],
        unique:true,
    },
    password:{    
        type:String,
        required:[true,"please enter your password"],
        minLength:[6,"Name should be greater than 6 character"],
        select:false
    },
    role:{
        type:String,
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

userSchema.pre("save",async function(next){
        if(!this.isModified("password")){
            next()
        }
        this.password=await bcrypt.hash(this.password,10)
        next();
})

userSchema.methods.getJWTToken=function(){
    return jwt.sign(
        { id:this.id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE}
    )
}

userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

module.exports=mongoose.model("User",userSchema)