import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./auth-reducer";
import commentReducer from "./comment-reducer";
import postReducer from "./post-reducer";

let reducers = combineReducers({
    authPage: authReducer,
    postPage: postReducer,
    commentPage: commentReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store;