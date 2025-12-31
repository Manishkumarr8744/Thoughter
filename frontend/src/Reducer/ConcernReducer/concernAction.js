import axios from "axios";
import {createConcernRequest,createConcernSuccess,createConcernFail,clearError } from "./concernReducer";


//create new concern
export const createNewConcern=(email,concern)=>async(dispatch)=>{
    try{
        dispatch(createConcernRequest());
        const config = {headers: { "Content-Type": "application/json" },withCredentials: true,  };
        const {data}=await axios.post("/api/v1/concern",{email,concern,config});
        dispatch(createConcernSuccess(data.message));
    }catch(err){
        dispatch(createConcernFail(err.response.data.message));
        console.log("error in creating concern");
    }
}

//clear error
export const clearConcernError=()=>async(dispatch)=>{
    dispatch(clearError());
}