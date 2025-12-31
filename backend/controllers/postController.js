const catchAsyncError =require("../Middlewares/catchAsyncError")
const ErrorHandler = require("../utils/errorHandler");
const Post= require("../models/postModel")
const User= require("../models/userModel")

//create post by user
exports.createPost=catchAsyncError(async(req,res,next)=>{
    try{
    const {content}=req.body;
    if(!content){
        return next (new ErrorHandler("Please enter Content",402))
    }
    const post=await Post.create({userId:req.user.id,content})

    res.status(200).json({
        success:true,
        message:"Post created",
        post
    })}
    catch(err){
        console.log(err); 
        res.status(403).json({err, message:"Email existed already"})
    }
})

// delete own post
exports.deleteMyPost = catchAsyncError(async (req, res, next) => {
    console.log(req.params.id);
    
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  // check if the post belongs to the logged-in user
  if (post.userId.toString() !== req.user.id.toString()) {
    return next(new ErrorHandler("You are not authorized to delete this post", 403));
  }

  await post.deleteOne();

  res.status(200).json({
    success: true,
    message: "Your post has been deleted successfully",
  });
});


//get detailed post
exports.getPost=catchAsyncError(async(req,res,next)=>{
    const post=await Post.findById(req.params.id);

    res.status(200).json({
        sucess:true,
        message:"detailed Post",
        post
    })
})


//update user Post
exports.updatePost=catchAsyncError(async(req,res,next)=>{
    const {content}=req.body;
    const post = await Post.findById(req.params.id);
    if(!post){
        return next (new ErrorHandler("Post Not Found",401))
    }
    post.content=content;
    await post.save();

    res.status(200).json({
        success:true,
        message:"Post edited successfully",
        post
    })
    
})

//get all post
exports.getAllPost=catchAsyncError(async(req,res,next)=>{
    const totalPosts = await Post.countDocuments();
    console.log(totalPosts);
    const page=req.query.page || 1;
    
    const limit=5;
    const skip=(page-1)*limit;
    const posts=await Post.find().sort({ _id: -1 }).populate("userId", "name email").skip(skip).limit(limit);
        console.log(skip + posts.length < totalPosts);

    res.status(200).json({
        success:true,
        message:"All Post",
        posts,
        hasMore: skip + posts.length < totalPosts
    })
})

//create and update comment  
exports.createComment=catchAsyncError(async(req,res,next)=>{
    console.log(req.user.id)
    const post= await Post.findById(req.params.id);
    const userName=await User.findById(req.user.id).select("name");
    if(!post){
        return next (new ErrorHandler("Post Not Found",401))
    }
    const {comment}=req.body;
    if(!comment){
        return next (new ErrorHandler("Please type comment",401))
    }

    const isCommented= post.comments.find(c=>c.user.toString()===req.user.id.toString())
    if(isCommented){
        post.comments.forEach(c=>{
            if(c.user.toString()===req.user.id.toString()){
                c.comment=comment
            }
        })
    }else{
        post.comments.push({
            user:req.user.id,comment,userName:userName.name
        })
    }
    
   await post.save()
   const updatedPost = await Post.findById(post._id).populate("comments.user", "name");
    res.status(200).json({
        success:true,
        message:"comment added",
        post:updatedPost
    })
})

//delete comment by user
exports.deleteComment=catchAsyncError(async(req,res,next)=>{
    const post=await Post.findById(req.params.id);
    if(!post){
        return next (new ErrorHandler("Post Not Found",401))
    }
    post.comments=post.comments.filter(c=>c.user.toString()!==req.user.id.toString())

    await post.save();

    res.status(200).json({
        success:true,
        message:"Comment deleted successfully",
        post
    })
})

//get your all posts
exports.userPosts=catchAsyncError(async(req,res,next)=>{
    const posts = await Post.find({userId: req.user.id});
    if(posts.length===0){
        return res.status(200).json({
            message:"you do not have any post"
        })
    }
    res.status(200).json({
        success:true,
        message:"all posts created by you",
        posts
    })
})

//get all post - ADMIN
exports.getAllPosts=catchAsyncError(async(req,res,next)=>{
    const posts= await Post.find();
    if(!posts){
        return next(new ErrorHandler("No Post available "))
    }
    res.status(200).json({
        success:true,
        message:"all posts",
        posts
    })
})

//delete post -ADMIN
exports.deletePost=catchAsyncError(async(req,res,next)=>{
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true,
        message:"post deleted",
    })
})


// Toggle like/unlike
exports.likePost = async (req, res) => {
  let postId=req.params.id
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  let liked=false;
  const userId = req.user._id;

  if (post.likes.includes(userId)) {
    post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
  } else {
    post.likes.push(userId);
    liked=true;
  }

  await post.save();
  res.status(200).json({ success: true, likesCount: post.likes.length ,postId,liked,userId});
};
