import { createSlice } from "@reduxjs/toolkit";

const initialState={
    newpost:{},
    loading:false,
    error:null,
    isCreated:false
}

const newPostReducer=createSlice({
    name:"newPost",
    initialState,
    reducers:{
        newPostRequest(state){
            state.loading=true;
            state.isCreated=false;
        },
        newPostSuccess(state,action){
            state.loading=false;
            state.isCreated=action.payload;
        },
        newPostFail(state,action){
            state.loading=false;
            state.error=action.payload;
        },
        clearCreated(state){
            state.isCreated=false;
            state.loading=false;
        }
    }
})

export const {clearCreated,newPostRequest,newPostSuccess,newPostFail}=newPostReducer.actions;

export default newPostReducer.reducer;