import {Dispatch} from 'redux'
import {ErrorActionTypes, ErrorActions} from "../types/errors.types";

export const setAuthError = (error: string) => (dispatch: Dispatch<ErrorActions>) => {
    dispatch({
        type: ErrorActionTypes.SET_AUTH_ERROR,
        payload: error
    })
}

export const setTodoError = (error: string) => (dispatch: Dispatch<ErrorActions>) => {
    dispatch({
        type: ErrorActionTypes.SET_TODO_ERROR,
        payload: error
    })
}

export const removeAuthError = () => (dispatch: Dispatch<ErrorActions>) => {
    dispatch({
        type: ErrorActionTypes.REMOVE_AUTH_ERROR
    })
}

export const removeTodoError = () => (dispatch: Dispatch<ErrorActions>) => {
    dispatch({
        type: ErrorActionTypes.REMOVE_TODO_ERROR
    })
}