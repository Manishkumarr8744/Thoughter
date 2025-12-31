import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    message: null,
}

const concernReducer = createSlice({
    name: "concern",
    initialState,
    reducers:{
        createConcernRequest(state){
            state.loading=true;
        },
        createConcernSuccess(state,action){
            state.loading=false;
            state.message=action.payload;
        },
        createConcernFail(state,action){
            state.loading=false;
            state.error=action.payload;
        },
        clearError(state){
            state.error=null;
        }
    }

});

export const {createConcernRequest,createConcernSuccess,createConcernFail,clearError}=concernReducer.actions;

export default concernReducer.reducer;
