const express=require("express")
const router=express.Router();
const { isAuthenticated, authorizeRole } = require("../Middlewares/authentication");
const {createPost,userPosts ,deletePost,getAllPost,createComment,deleteComment,updatePost, getPost,getAllPosts, deleteMyPost, likePost }=require("../controllers/postController")




router.route("/post/new").post(isAuthenticated,createPost)
router.route("/posts").get(getAllPost)
router.route("/post/:id").put(isAuthenticated,createComment)
router.route("/post/:id").delete(isAuthenticated,deleteComment)
router.route("/post/:id/like").put(isAuthenticated,likePost)
router.route("/post/:id/edit").put(isAuthenticated,updatePost)
router.route("/post/:id/delete").delete(isAuthenticated,deleteMyPost)
router.route("/post/:id").get(isAuthenticated,getPost)
router.route("/yourposts").get(isAuthenticated,userPosts)



//admin routes
router.route("/admin/posts").get(isAuthenticated,authorizeRole("admin"),getAllPosts)
router.route("/admin/post/:id").get(isAuthenticated,getPost).delete(isAuthenticated,authorizeRole("admin"),deletePost)
    

module.exports=router;
