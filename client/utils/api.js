import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api'
})

export const USER_CHANGE_EVENT = 'USER_CHANGE_EVENT'

/* Set & retrieve user state using these methods */

export const saveUserState = (user) => {
  const event = new CustomEvent(USER_CHANGE_EVENT, { detail: user })
  localStorage.setItem('user', JSON.stringify(user))
  dispatchEvent(event)
  return user
}

export const retrieveUserState = () => {
  return JSON.parse(localStorage.getItem('user'))
}

export const logout = () => {
  const event = new CustomEvent(USER_CHANGE_EVENT, { detail: null })
  localStorage.removeItem('user')
  dispatchEvent(event)
}

const extractData = (response) => response.data

/* Server related API */

export const login = ({ username, password }) => {
  const user = { username: username, password: password }
  return instance
    .post('/login', user)
    .then(extractData)
    .then(saveUserState)
}

export const register = ({ username, password, confirmPassword }) => {
  const user = { username: username, password: password }
  return instance
    .post('/register', user)
    .then(extractData)
    .then(saveUserState)
}

export const uploadVideo = (params, onUploadProgress) => {
  const data = new FormData()
  for (const key in params) {
    data.append(key, params[key])
  }
  const config = { 
    onUploadProgress: onUploadProgress 
  }
  return instance
    .post('/videos', data, config)
    .then(extractData)
}

export const getVideo = (id) => {
  return instance
    .get(`/videos/${id}`)
    .then(extractData)
}

export const getVideos = (q) => {
  return instance
    .get('/videos', { params: { q } })
    .then(extractData)
}

export const watchVideoUrl = (video) => {
  return `http://localhost:3000/api/videos/${video._id}/watch`
}