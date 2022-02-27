import {Dispatch} from "redux";
import axiosInstance from "../../api";
import {UserActions, UserActionsTypes} from "../types/user.types";
import {removeUser, setUser} from "../reducers/user.reducer";
import {ErrorActions, ErrorActionTypes} from "../types/errors.types";


interface UserPost {token: string, login: string}

export const setLoadState = () => (dispatch: Dispatch<UserActions>) => {
    dispatch({
        type: UserActionsTypes.SET_INITIAL_IS_LOGIN
    })
}

export const login = (login: string, password: string) => async (dispatch: Dispatch<UserActions|ErrorActions>) => {
    try {
        dispatch({type: UserActionsTypes.SET_IS_USER_LOADING, payload: true})
        dispatch({type: ErrorActionTypes.REMOVE_AUTH_ERROR})
        if(!login.length || !password.length){
            dispatch({type: ErrorActionTypes.SET_AUTH_ERROR,
                payload: 'Fill all the fields'
            })
            return
        }
        const { data } = await axiosInstance.post<UserPost>('/user/login', {
            login, password
        })
        dispatch(setUser(data.login))
        localStorage.setItem('token', data.token)
        dispatch({type: ErrorActionTypes.REMOVE_AUTH_ERROR})
    } catch (e: any) {
        console.log('axios error', e.response?.data.message)
        dispatch({type: ErrorActionTypes.SET_AUTH_ERROR,
            payload: e.response?.data.message
        })
    } finally {
        dispatch({type: UserActionsTypes.SET_IS_USER_LOADING, payload: false})
    }
}

export const register = ( login: string, password: string ) => async (dispatch: Dispatch<UserActions|ErrorActions>) => {
    try {
        dispatch({type: ErrorActionTypes.REMOVE_AUTH_ERROR})
        dispatch({type: UserActionsTypes.SET_IS_USER_LOADING, payload: true})
        if(!login.length || !password.length){
            dispatch({type: ErrorActionTypes.SET_AUTH_ERROR,
                payload: 'Fill all the fields'
            })
            return
        }
        if(login.length < 5) {
            dispatch({type: ErrorActionTypes.SET_AUTH_ERROR,
                payload: 'Login cannot be shorter than 5 symbols'
            })
            return
        }
        if(password.length < 5) {
            dispatch({type: ErrorActionTypes.SET_AUTH_ERROR,
                payload: 'Password cannot be shorter than 5 symbols'
            })
            return
        }
        const { data } = await axiosInstance.post<UserPost>('/user/registration', {
            login, password
        })
        dispatch(setUser(data.login))
        localStorage.setItem('token', data.token)
        dispatch({type: ErrorActionTypes.REMOVE_AUTH_ERROR})
    } catch (e: any) {
        dispatch({type: ErrorActionTypes.SET_AUTH_ERROR,
            payload: e.response.data.message
        })
        console.log(e)
    } finally {
        dispatch({type: UserActionsTypes.SET_IS_USER_LOADING, payload: false})
    }
}

export const logout = () => (dispatch: Dispatch<UserActions>) => {
    try {
        localStorage.removeItem('token')
        dispatch(removeUser())
    } catch (e) {
        console.log(e)
    }
}

export const auth = () => async (dispatch: Dispatch<UserActions>) => {
    try {
        const token = localStorage.getItem('token')
        if (token) {
            const {data} = await axiosInstance.get('/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(setUser(data.login))
            localStorage.setItem('token', data.token)
            console.log(`Successful login ${data.login}`)
        }
    } catch (e) {
        console.log('Token has expired')
    }
}
