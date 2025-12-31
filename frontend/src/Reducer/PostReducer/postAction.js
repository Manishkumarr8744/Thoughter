import axios from "axios";
import { allPostFail,allPostRequest, allPostSuccess, commentPostFail, commentPostRequest, commentPostSuccess, likePostFail, likePostSuccess, postDeleteFail, postDeleteRequest, postDeleteSuccess, updatePostFail, updatePostRequest, updatePostSuccess, userPostFail, userPostRequest, userPostSuccess } from "./postReducer";
import { newPostFail, newPostRequest, newPostSuccess } from "./newPostReducer";


//get all posts
export const getAllPosts=(page)=>async(dispatch)=>{
    try{
        console.log("this is " ,page);
        
        dispatch(allPostRequest(page));
        const {data}=await axios.get(`/api/v1/posts?page=${page}`);
        
        
        dispatch(allPostSuccess(data));
    }catch(err){
        console.log("error in get all post");
        dispatch(allPostFail(err));
        
    }
}

//create new post
export const createNewPost=(content)=>async(dispatch)=>{
    try{
        dispatch(newPostRequest());
        const config = {headers: { "Content-Type": "application/json" },withCredentials: true,  };  
        const {data}=await axios.post("/api/v1/post/new",{content},config);
        dispatch(newPostSuccess(data.success));
    }catch(err){
        dispatch(newPostFail(err));
        console.log("error in creating post");
        
    }
}

//get your all post
export const getYourPost=()=>async(dispatch)=>{
    try{
        dispatch(userPostRequest());
        const {data}=await axios.get("/api/v1/yourposts");
        dispatch(userPostSuccess(data.posts));
    }catch(err){
        console.log("error in fecthing post");
        dispatch(userPostFail(err));
    }
}

//user delete their post
export const userPostDelete=(id)=>async(dispatch)=>{
    console.log(id);
    
    try{
        dispatch(postDeleteRequest());
        const {data}= await axios.delete(`/api/v1/post/${id}/delete`);
        dispatch(postDeleteSuccess(data.success))
    }catch(err){
        console.log(err);
        dispatch(postDeleteFail(err));
    }
}

export const likePost = (postId) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/v1/post/${postId}/like`);
    
    // data.likesCount should come from your backend response
    dispatch(likePostSuccess({ postId, likesCount: data.likesCount ,userId:data.userId}));
  } catch (error) {
    dispatch(likePostFail(error.response?.data));
  }
};

//comment on post
export const commentOnPost = (postId, comment) => async (dispatch) =>{
    try{
        dispatch(commentPostRequest());
        const config = {headers: { "Content-Type": "application/json" },withCredentials: true,  };  
        const {data}=await axios.put(`/api/v1/post/${postId}`,{comment},config);
        dispatch(commentPostSuccess(data));
    }catch(err){
        dispatch(commentPostFail(err));
        console.log("error in commenting post");
    }
}

//update user Post
export const updateUserPost = (postId, content) => async (dispatch) => {
    try {
        dispatch(updatePostRequest());
        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
        const { data } = await axios.put(`/api/v1/post/${postId}/edit`, { content }, config);
        dispatch(updatePostSuccess(data));
    } catch (err) {
        console.log("error in updating post");
        dispatch(updatePostFail(err));
    }
};