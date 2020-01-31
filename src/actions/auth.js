import {
    ADD_USERS,
    GET_USERS,
    PUT_CURRENT_TO_LS
} from '../constants/auth';
import {
    ROUTING
} from '../constants/routing';
import db from '../db';

export function addUsers(data) {
    return (dispatch) => {
        db.table("users")
            .add(data)
            .then(() => {
                dispatch({
                    type: ADD_USERS
                });
                alert("user created");
            })
            .catch(() => {
                alert("Wrong data");
            });
    } 
}

export function getUsers(data) {
    return (dispatch) => {
        db.table("users")
            .where({ email: data.email, password: data.password })
            .first()
            .then((user) => {
                dispatch({
                    type: GET_USERS,
                    payload: {
                        user: user,
                        isAuthenticated: true
                    }
                })

                dispatch({
                    type: PUT_CURRENT_TO_LS,
                    payload: user
                })

                dispatch({
                    type: ROUTING,
                    payload: {
                      method: 'replace',
                      nextUrl: '/board'
                    }
                });
            })
            .catch(() => {
                alert("Wrong Data");
            })
    }
    
}

