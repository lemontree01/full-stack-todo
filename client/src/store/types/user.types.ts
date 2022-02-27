export enum UserActionsTypes {
    SET_USER = 'SET_USER',
    REMOVE_USER = 'REMOVE_USER',
    SET_IS_USER_LOADING = 'SET_IS_USER_LOADING',
    SET_INITIAL_IS_LOGIN = 'SET_INITIAL_IS_LOGIN'
}

export type User = {
    name: string
}

export type UserState = {
    login: string | null,
    isLogin: boolean | null,
    isLoading: boolean
}

interface SetUser {
    type: UserActionsTypes.SET_USER,
    payload: string
}

interface RemoveUser {
    type: UserActionsTypes.REMOVE_USER
}

interface SetInitialIsLogin {
    type: UserActionsTypes.SET_INITIAL_IS_LOGIN
}

interface SetIsLoading {
    type: UserActionsTypes.SET_IS_USER_LOADING,
    payload: boolean
}

export type UserActions = SetUser | RemoveUser | SetIsLoading | SetInitialIsLogin