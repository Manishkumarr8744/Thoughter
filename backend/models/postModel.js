const mongoose= require("mongoose")

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
    },
  },
  { timestamps: true } // each comment gets createdAt, updatedAt
);

const postSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    likes:[{
        type: mongoose.Schema.ObjectId,
        ref:"User"
      }],
    comments:[
        commentSchema
    ],
    
} , { timestamps: true } // each comment gets createdAt, updatedAt

)

module.exports=mongoose.model("Post",postSchema)