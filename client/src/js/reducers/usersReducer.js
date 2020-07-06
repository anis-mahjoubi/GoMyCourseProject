import {GET_USERS,ADD_USER,DELETE_USER,UPDATE_USER,LOADING_USERS} from '../actions/types'

const initialState = {
    users : [],
    loading : false
}

export default function (state = initialState,action){
    switch (action.type){
        case GET_USERS : 
            return {
                ...state,
                users : action.payload,
                loading : false
            };


        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map(user => user._id === action.payload.user._id ? action.payload.user : user),
                loading: false
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload.userID),
                loading: false
            }

        case LOADING_USERS:
            return {
                ...state,
                loading : true
            }
        default :
            return state; 

    }
}