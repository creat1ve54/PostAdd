import { commentsAPI } from "../api/axios"

const CREATE_COMMENTS = 'CREATE_COMMENTS'
const GET_COMMENTS = 'GET_COMMENTS'

const initialState = {
    comments: [],
    userIncrement: []
    // loading: false,
}


const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_COMMENTS:
            return {
                ...state,
                comments: [...state.comments, action.comment],
                userIncrement: action.userIncrement
            }
        case GET_COMMENTS:
            return {
                ...state,
                comments: action.comment,
            }

        default:
            return state
    }
}


export const setComments = (data) => {
    return {
        type: CREATE_COMMENTS,
        comment: data.newComment,
        userIncrement: data.incrementResult,
    }
}

export const setGetComments = (data) => {
    return {
        type: GET_COMMENTS,
        comment: data,
    }
}

export const createComments = ({ postId, comment, userId }) => async (dispatch) => {
    try {
        let { data } = await commentsAPI.create({ postId, comment, userId })
        console.log(data)
        dispatch(setComments(data))
    } catch (error) {
        console.log(error)
    }
}

export const getComments = (postId) => async (dispatch) => {
    try {
        let { data } = await commentsAPI.get({ postId })
        dispatch(setGetComments(data))
    } catch (error) {
        console.log(error)
    }
}



export default commentReducer;