import {UserActions, UserActionsTypes, UserState} from "../types/user.types";



const initialState: UserState = {
    login: null,
    isLogin: null,
    isLoading: false
}

export const setUser = (login: string): UserActions => ({
    type: UserActionsTypes.SET_USER,
    payload: login
})

export const removeUser = (): UserActions => ({
    type: UserActionsTypes.REMOVE_USER
})

export default (state = initialState, action: UserActions): UserState => {
    switch (action.type) {
        case UserActionsTypes.SET_USER:
            return {
                ...state,
                login: action.payload,
                isLogin: true
            }
        case UserActionsTypes.REMOVE_USER:
            return {
                ...state,
                isLogin: false,
                login: null
            }
        case UserActionsTypes.SET_IS_USER_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case UserActionsTypes.SET_INITIAL_IS_LOGIN:
            return {
                ...state,
                isLogin: false
            }
        default:
            return state
    }
}