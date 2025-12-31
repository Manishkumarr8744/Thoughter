import {changePasswordFail, changePasswordRequest, changePasswordSuccess, clearError, loadUserFail, loadUserRequest, loadUserSuccess, loginFail, loginRequest, loginSuccess, logoutFail, logoutSuccess, registerFail, registerRequest, registerSuccess, updateUserFail, updateUserRequest, updateUserSuccess } from "./userReducer";
import axios from "axios"

//register User
export const registerUser=(userData)=>  async(dispatch)=>{
    try{
        dispatch(registerRequest());
        const config = {headers: { "Content-Type": "application/json" },withCredentials: true,  };  
        const {data}=await axios.post("/api/v1/register",userData,config);
        console.log(data);
        
        dispatch(registerSuccess(data.success));
        console.log("sucessfully user register");
        
    }catch(err){
        console.log("error in register user",err)
        dispatch(registerFail(err))
    }
}

//login
export const loginUser=(email,password)=>async(dispatch)=>{
    try{
        dispatch(loginRequest());
        const {data}=await axios.post("/api/v1/login",{email,password});
        dispatch(loginSuccess(data.user));
    }catch(err){
        console.log("error in login", err);
        dispatch(loginFail(err.response.data.message));
        
    }
}

//logout
export const logout=()=>async(dispatch)=>{
    try{
        dispatch(loginRequest());
        await axios.get(`/api/v1/logout`)
        dispatch(logoutSuccess())
    }catch(err){
        console.log("error in logout",err);
        dispatch(logoutFail(err))
    }
}

//load user
export const loadUser=()=>async (dispatch)=>{
    try{
        dispatch(loadUserRequest());
        const {data}= await axios.get(`/api/v1/me`);
        dispatch(loadUserSuccess(data.user));
    }catch(err){
        console.log("error in load user action",err);
        dispatch(loadUserFail());
    }
}

//update user
export const updateUser=(email,name)=>async(dispatch)=>{
    console.log(email,name);
    
    try{
        dispatch(updateUserRequest());
        const {data}= await axios.put("/api/v1/me/update",{email,name});
        dispatch(updateUserSuccess(data.success))

    }catch(err){
        console.log(err);
        
        dispatch(updateUserFail(err));
    }
}

//clear error
export const clearErrors = () => (dispatch) => {
  dispatch(clearError());
};

//export change Password
export const changePassword=({oldPassword,newPassword})=>async(dispatch)=>{
    try{
        dispatch(changePasswordRequest());
        const {data}=await axios.put("/api/v1/password/update",{oldPassword,newPassword});
        console.log(data);
        
        dispatch(changePasswordSuccess());
    }catch(err){
        console.log(err);
        
        dispatch(changePasswordFail(err.response.data.message));
    }
}