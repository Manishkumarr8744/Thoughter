import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    loading: false,
    error: null,
    isDeleted: false,
    likePostSuccess: false,
    isCommented:false ,
    isUpdated:false,
    hasMore:true
}

const postReducer = createSlice({
    name: "post",
    initialState,
    reducers: {
        allPostRequest(state) {
            state.loading = true;
        },
        allPostSuccess(state, action) {
            state.loading = false;
            state.posts = [...state.posts, ...action.payload.posts];
            state.hasMore = action.payload.hasMore;
        },  
        allPostFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        userPostRequest(state) {
            state.loading = true;
        },
        userPostSuccess(state, action) {
            state.loading = false;
            state.posts = action.payload;
        },
        userPostFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        postDeleteRequest(state) {
            state.loading = true;
        },
        postDeleteSuccess(state, action) {
            state.loading = false;
            state.isDeleted = action.payload;
        },
        postDeleteFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        clearDeletePost(state) {
            state.isDeleted = false;
        },
        likePostSuccess(state, action) {
            const { postId, userId } = action.payload;
            state.posts = state.posts.map(post => {
                if (post._id !== postId) return post;

                const hasLiked = post.likes.includes(userId);

                return {
                ...post,
                likes: hasLiked
                    ? post.likes.filter(id => id !== userId) 
                    : [...post.likes, userId]               
                };
            });
        },
        
        likePostFail(state, action) {
            state.error = action.payload;
            state.likePostSuccess = false;
        },
        clearLikePost(state) {
            state.likePostSuccess = false;
        },
        commentPostRequest(state){
            state.loading=true;
        },
        commentPostSuccess(state,action){
            state.loading=false;
            state.isCommented=action.payload.success;
        },
        commentPostFail(state,action){
            state.loading=false;
            state.error=action.payload;
        },
        clearCommented(state){
            state.isCommented=false;
        },
        updatePostRequest(state){
            state.loading=true;
        },
        updatePostSuccess(state,action){
            state.loading=false;
            state.isUpdated=action.payload.success;
        },
        updatePostFail(state,action){
            state.loading=false;
            state.error=action.payload;
        },
        clearUpdated(state){
            state.isUpdated=false;
        }
    }
});

// Export all actions
export const {
    updatePostFail,
    updatePostSuccess,
    updatePostRequest,
    clearUpdated,
    clearCommented,
    commentPostFail,
    commentPostSuccess,
    commentPostRequest,
    clearDeletePost,
    postDeleteFail,
    postDeleteSuccess,
    postDeleteRequest,
    userPostFail,
    userPostRequest,
    userPostSuccess,
    allPostSuccess,
    allPostFail,
    allPostRequest,
    likePostSuccess,
    likePostFail,
    clearLikePost
} = postReducer.actions;

export default postReducer.reducer;
