import {ErrorActionTypes, ErrorActions, ErrorsState} from "../types/errors.types";


const initialState: ErrorsState = {
    authError: null,
    todoError: null
}

export default (state = initialState, action: ErrorActions):  ErrorsState => {
    switch (action.type) {
        case ErrorActionTypes.SET_AUTH_ERROR:
            return {
                ...state,
                authError: action.payload
            }
        case ErrorActionTypes.SET_TODO_ERROR:
            return {
                ...state,
                todoError: action.payload
            }
        case ErrorActionTypes.REMOVE_TODO_ERROR:
            return {
                ...state,
                todoError: null
            }
        case ErrorActionTypes.REMOVE_AUTH_ERROR:
            return {
                ...state,
                authError: null
            }
        default: return state
    }
}