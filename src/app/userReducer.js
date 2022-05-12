import * as ACTIONS from '../services/actions'
import { initialState } from '../services/userHelper'

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTIONS.getUsers:
            return {
                ...state,
                users: action.payload.users,
                loading: false
            }
        case ACTIONS.getUser:
            return {
                ...state,
                user: action.payload.user,
                loading: false
            }
        case ACTIONS.usersError:
            return {
                ...state,
                error: action.payload
            }
        case ACTIONS.usersMessage:
            return {
                ...state,
                message: action.payload
            }
        case ACTIONS.deleteUser:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload)
            }
        case ACTIONS.deleteAllUsers:
            return {
                ...state,
                users: action.payload
            }
        case ACTIONS.addUser:
            return {
                ...state,
                users: [
                    ...state.users,
                    action.payload
                ]
            }
        case ACTIONS.userLogIn:
            return {
                ...state,
                user: action.payload
            }
        case ACTIONS.updateUser:
            return {
                ...state,
                users: [
                    ...state.users.filter(user => user._id !== action.payload.id),
                    action.payload.user
                ]
            }
        default:
            return state
    }
}

export default userReducer