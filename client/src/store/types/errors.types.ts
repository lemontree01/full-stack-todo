export interface ErrorsState {
    authError: string | null,
    todoError: string | null
}


export enum ErrorActionTypes {
    SET_AUTH_ERROR = 'SET_AUTH_ERROR',
    SET_TODO_ERROR = 'SET_TODO_ERROR',
    REMOVE_AUTH_ERROR = 'REMOVE_AUTH_ERROR',
    REMOVE_TODO_ERROR = 'REMOVE_TODO_ERROR'
}

interface setAuthError {
    type: ErrorActionTypes.SET_AUTH_ERROR,
    payload: string
}

interface setTodoError {
    type: ErrorActionTypes.SET_TODO_ERROR,
    payload: string
}

interface removeAuthError {
    type: ErrorActionTypes.REMOVE_AUTH_ERROR
}

interface removeTodoError {
    type: ErrorActionTypes.REMOVE_TODO_ERROR
}

export type ErrorActions = setAuthError | setTodoError | removeAuthError |
    removeTodoError
