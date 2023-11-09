import { AUTH } from "../constants";

const initialState = {
    registrationError: null,
    loginError: null,
    token: null,
    email: null
};
  
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH.REGISTER.SUCCESS:
            return {
                ...state,
                registrationError: null,
                token: action.payload.token,
                email: action.payload.email,
            };
        case AUTH.REGISTER.FAILURE:
            return {
                ...state,
                registrationError: action.payload,
            };
        case AUTH.LOGIN.SUCCESS:
            return {
                ...state,
                loginError: null,
                token: action.payload.token,
                email: action.payload.email
            };
        case AUTH.LOGIN.FAILURE:
            return {
                ...state,
                loginError: action.payload,
            };
        case AUTH.LOGOUT:
            return {
                ...state,
                user: null,
            };

        case AUTH.CLEAR_ERROR: 
            return {
                ...state,
                loginError: null,
                registrationError: null
            }
        default: return state;
    }
};

export default authReducer;
  