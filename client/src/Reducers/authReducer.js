import { START_LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from "../Constants/authTypes";


const initState = {
    isAuth: false,
    user: {},
    loading: false,
    errors: "",
};
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: true,
                user: action.payload
            };
        case START_LOGIN: {
            return {
                ...state,
                loading: true
            };
        }

        case LOGIN_ERROR:
            return {
                ...state,

                errors: action.payload,
            };
        default:
            return state
    }

}

export default authReducer;