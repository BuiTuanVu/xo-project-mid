import axios from 'axios'

export const register = newUser => {
    return axios
        .post('http://localhost:4000/user/register', {
            username: newUser.username,
            password: newUser.password,
        })
        .then(res => {
            console.log(res, 'Register!')
        })
}
export const login = user => {
    return axios
        .post('http://localhost:4000/user/login', {
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

