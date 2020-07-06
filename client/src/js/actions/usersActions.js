import {GET_USERS,ADD_USER,DELETE_USER,UPDATE_USER,UPDATE_USER_FAIL,LOADING_USERS, DELETE_USER_FAIL} from './types'
import Axios from 'axios'
import { tokenConfig } from "./authActions";
import { returnErrors, clearErrors } from "./errorActions";

export const getUsers = () => dispatch => {
    dispatch(setUsersLoading())
    Axios
        .get('/api/users')
        .then(res => 
            dispatch({
                type:GET_USERS,
                payload : res.data
            })
            )
}

export const updateUser = (user) => (dispatch, getState) => {
    dispatch(setUsersLoading());
    console.log("user updating : " + JSON.stringify(user));
    Axios
        .put("/api/users/" + user._id, user, tokenConfig(getState))
        .then((res) => {
            console.log(res);
            dispatch(clearErrors());
            dispatch({
                type: UPDATE_USER,
                payload: { user: user },
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch(
                returnErrors(
                    err.response.data.msg,
                    err.response.status,
                    UPDATE_USER_FAIL
                )
            );
        });
}

export const deleteUser = userID => (dispatch, getState) => {
    dispatch(setUsersLoading());
    Axios.delete(`/api/users/${userID}`, tokenConfig(getState))
        .then(res => {
            dispatch(clearErrors())
            console.log("sending payload : " + userID)
            dispatch({
                type: DELETE_USER,
                payload: { userID: userID },
            });
        })
        .catch(err => {
            dispatch(
                returnErrors(
                    err.response.data.msg,
                    err.response.status,
                    DELETE_USER_FAIL
                )
            )
        })
}

export const setUsersLoading = ()=>{
    return {
        type : LOADING_USERS
    }
}