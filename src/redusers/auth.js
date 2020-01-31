import {
    ADD_USERS,
    GET_USERS,
    PUT_CURRENT_TO_LS
} from '../constants/auth';

const initialState = {
    users: [],
    currentUser: [],
    userAvatar: []
}

export default function (state = initialState, {type,payload}) {
    switch(type) {
        case ADD_USERS: return state;
        case GET_USERS: {
            if(payload.user !== undefined){
                return { 
                    currentUser: payload.user, 
                    isAuthenticated: payload.isAuthenticated, 
                    userAvatar: `https://ui-avatars.com/api/?name=${payload.user.firstName}+${payload.user.lastName}` 
                }
            } else {
                return { isAuthenticated: false }
            }
        }
        case PUT_CURRENT_TO_LS: {
            const currentUserData = {
                userName: payload.firstName,
                userAvatar: `https://ui-avatars.com/api/?name=${payload.firstName}+${payload.lastName}`
            }
            localStorage.setItem('current-user', JSON.stringify(currentUserData));
            return state;
        };
        default: return state;
    }
}