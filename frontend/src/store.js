import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./Reducer/UserReducer/userReducer"
import postReducer from "./Reducer/PostReducer/postReducer"
import newPostReducer from "./Reducer/PostReducer/newPostReducer"
import concernReducer from "./Reducer/ConcernReducer/concernReducer"

export const store = configureStore({
  reducer: {
    user:userReducer,
    post:postReducer,
    newPost:newPostReducer,
    concern:concernReducer
  },
})

export default store;