import axios from 'axios'

export const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
})

instance.interceptors.request.use(config => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})

export const usersAPI = {
    register(username, password) {
        return instance.post('/auth/registration', { username, password })
    },
    login(username, password) {
        return instance.post('/auth/login', { username, password })
    },
    getMe() {
        return instance.get('/auth/me')
    }
}

export const postAPI = {
    create(params) {
        return instance.post('/posts', params)
    },
    getAll() {
        return instance.get('/posts')
    },
    remove(id) {
        return instance.delete(`/posts/${id}`, id)
    },
    put(updatedPost, id) {
        return instance.put(`/posts/${id}`, updatedPost)
    }
}

export const commentsAPI = {
    create({ postId, comment, userId }) {
        return instance.post(`/comments/${postId}`, { postId, comment, userId })
    },
    get({ postId }) {
        return instance.get(`/posts/comments/${postId}`)
    },
}