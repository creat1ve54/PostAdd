import { usersAPI } from "../api/axios"


const SET_USER_DATA = 'SET_USER_DATA'
const LOGOUT = 'LOGOUT'

const initialState = {
    user: null,
    token: null,
    // isLoading: false,
    status: null,
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                user: action.user,
                status: action.status,
                token: action.token,
            }
        case LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                // isLoading: false,
                status: null,
                checkToken: false,
            }
        default:
            return state
    }
}

export const setAuthUserData = (user, token, status) => {
    return {
        type: SET_USER_DATA,
        user,
        token,
        status,
    }
}

export const logout = () => {
    return {
        type: LOGOUT,
    }
}

export const checkIsAuth = (localStorage) => Boolean(localStorage)


export const registerUser = (username, password) => async (dispatch) => {
    try {
        let { data } = await usersAPI.register(username, password)
        let status = data.message;
        if (data.token) {
            window.localStorage.setItem('token', data.token)
        }
        dispatch(setAuthUserData(data?.user, data?.token, status))

    } catch (error) {
        console.log(error)
    }
}

export const loginUser = (username, password) => async (dispatch) => {
    try {
        let { data } = await usersAPI.login(username, password)
        let status = data.message;
        if (data.token) {
            window.localStorage.setItem('token', data.token)
        }
        dispatch(setAuthUserData(data?.user, data?.token, status))

    } catch (error) {
        console.log(error)
    }
}

export const getMe = () => async (dispatch) => {
    try {
        let { data } = await usersAPI.getMe()
        dispatch(setAuthUserData(data?.user, data?.token, null))
    } catch (error) {
        console.log(error)
    }
}



export default authReducer;