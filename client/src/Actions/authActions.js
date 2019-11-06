import { START_LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from "../Constants/authTypes";
import axios from 'axios';
import setAuthToken from "./setAuthToken";
import jwt_decode from 'jwt-decode';




export const register = (userData, history) => dispatch => {
    axios.post('http://localhost:4000/user/register', {
        fullname: userData.fullname,
        username: userData.username,
        password: userData.password,
    })
        .then(res => history.push("/"))
        .catch(err => dispatch({
            type: LOGIN_ERROR,
            payload: err.response.data.message
        }))
}

export const login = userData => dispatch => {
    axios.post('http://localhost:4000/user/login',
        {
            username: userData.username,
            password: userData.password
        }).then(res => {

            const { token } = res.data;

            console.log(res.data);
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(loginSuccess(decoded));
            console.log(localStorage)

        })
        .catch(err =>
            dispatch({
                type: LOGIN_ERROR,
                payload: err.response.data.message
            })
        )
}

export const loginSuccess = decoded => {
    return {
        type: LOGIN_SUCCESS,
        payload: decoded
    };
};

export const startLogin = () => {
    return {
        type: START_LOGIN
    };
};
export const logOut = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(loginSuccess({}))


}