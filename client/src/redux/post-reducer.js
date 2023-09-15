import { postAPI } from "../api/axios"

const CREATE_POST = 'CREATE_POST'
const GET_POST = 'GET_POST'
const REMOVE_POST = 'REMOVE_POST'
const SAVE_POST = 'SAVE_POST'

const initialState = {
    posts: [],
    popularPosts: [],
    // loading: false,
}


const postReducer = (state = initialState, action) => {
    switch (action.type) {

        case CREATE_POST:
            return {
                ...state,
                posts: action.posts,
            }
        case GET_POST:
            return {
                ...state,
                posts: action.posts,
                popularPosts: action.popularPosts,
            }
        case REMOVE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post.id !== action.posts.id),
            }
        case SAVE_POST:
            return {
                ...state,
                posts: action.posts
            }
        default:
            return state
    }
}


export const setCreatePost = (params) => {
    return {
        type: CREATE_POST,
        posts: {
            title: params.title,
            text: params.text,
            image: params.image,
        }
    }
}
export const setSavePost = (data) => {
    return {
        type: SAVE_POST,
        posts: data,
    }
}
export const setGetPosts = (data) => {
    return {
        type: GET_POST,
        posts: data.posts,
        popularPosts: data.popularPosts,
    }
}

export const setRemovePost = (data) => {
    return {
        type: REMOVE_POST,
        posts: data.posts,
    }
}


export const createPost = (params) => async (dispatch) => {
    try {
        let { data } = await postAPI.create(params)
        dispatch(setCreatePost(data))
    } catch (error) {
        console.log(error)
    }
}

export const getAllPosts = () => async (dispatch) => {
    try {
        let { data } = await postAPI.getAll()
        dispatch(setGetPosts(data))
    } catch (error) {
        console.log(error)
    }
}
export const removePost = (id) => async (dispatch) => {
    try {
        let { data } = await postAPI.remove(id)
        dispatch(setGetPosts(data))
    } catch (error) {
        console.log(error)
    }
}
export const updatePost = (updatedPost, id) => async (dispatch) => {
    try {
        let { data } = await postAPI.put(updatedPost, id)
        dispatch(setSavePost(data))
    } catch (error) {
        console.log(error)
    }
}


export default postReducer;