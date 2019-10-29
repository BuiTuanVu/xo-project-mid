import axios from 'axios'

export const register = newUser => {
    return axios
        .post('/user/register', {
            username: newUser.username,
            password: newUser.password,
        })
        .then(res => {
            console.log('Register!')
        })
}
export const login = user => {
    return axios
        .post('/user/login', {
            username: user.username,
            password: user.password
        })
        .then(res => {
            localStorage.setItem('token', res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}