import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:{},
    loading:false,
    isAuthenticated:false,
    error:null,
    success:false,
    isUpdated:false
}

const userReducer= createSlice({
    name:"user",
    initialState,
    reducers:{
        registerRequest(state){
            state.loading=true;
        },
        registerSuccess(state,action){
            state.loading=false;
            state.success=action.payload;
        },
        registerFail(state,action){
            state.loading=false;
            state.error=action.payload;
        },
        clearRegister(state){
            state.success=false;
            state.error=null
        },
        loginRequest(state){
            state.loading=true;
        },
        loginSuccess(state,action){
            state.loading=false;
            state.isAuthenticated=true;
            state.user=action.payload;
        },
        loginFail(state,action){
            state.loading=false;
            state.isAuthenticated=false;
            state.error=action.payload;
        },
        logoutRequest(state){
            state.loading=true;
        },
        logoutSuccess(state){
            state.isAuthenticated=false;
            state.loading=false;
            state.user={};
        },
        logoutFail(state,action){
            state.loading=false;
            state.error=action.payload;
        }, 
        loadUserRequest(state) {
            state.loading = true;
        },
        loadUserSuccess(state, action) {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        },
        loadUserFail(state, action) {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = {};
        state.error = action.payload;
        },
        updateUserRequest(state){
            state.loading=true;
        },
        updateUserSuccess(state,action){
            state.loading=false;
            state.isUpdated=action.payload;
        },
        updateUserFail(state,action){
            state.loading=false;
            state.error=action.payload;
        },
        clearError(state){
            state.error=null;
        },
        changePasswordRequest(state){
            state.loading=true;
        },
        changePasswordSuccess(state){
            state.loading=false;
            state.isUpdated=true;
        },
        changePasswordFail(state,action){
            state.loading=false;
            state.isUpdated=false;
            state.error=action.payload;
        },
        changePasswordReset(state){
            state.isUpdated=false;
            state.error=null;
        }

    }

})
export const {changePasswordReset,clearRegister,changePasswordFail,changePasswordSuccess,changePasswordRequest,clearError,updateUserFail,updateUserRequest,updateUserSuccess,loadUserFail,loadUserRequest,loadUserSuccess,registerRequest,registerSuccess,registerFail,loginFail,loginRequest,loginSuccess,logoutRequest,logoutSuccess,logoutFail} =userReducer.actions;

export default userReducer.reducer;