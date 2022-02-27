import {Dispatch} from "redux";
import axiosInstance from "../../api";
import {Todo, TodoActions, TodoActionsTypes} from "../types/todo.types";

export const fetchTodos = () => async (dispatch: Dispatch<TodoActions>) => {
    try {
        dispatch({
            type: TodoActionsTypes.TOGGLE_IS_LOADING,
            payload: true
        })
        const response = await axiosInstance.get('/todo', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        const todos = response.data.todos.map((todo: any):Todo => ({
            name: todo.name,
            isDone: todo.isDone,
            _id: todo._id
        }))
        dispatch({
            type: TodoActionsTypes.FETCH_TODOS,
            payload: todos
        })
    } catch (e) {
        console.log(e)
    } finally {
        dispatch({
            type: TodoActionsTypes.TOGGLE_IS_LOADING,
            payload: false
        })
    }
}

export const saveTodo = (_id: string, name: string) => async (dispatch: Dispatch<TodoActions>) => {
    try {
        dispatch({
            type: TodoActionsTypes.SET_IS_LOADING,
            payload: _id
        })
        const response = await axiosInstance.post('/todo/modify', {
            _id,
            name,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        dispatch({
            type: TodoActionsTypes.CHANGE_TODO_TEXT,
            payload: {
                _id,
                text: response.data.name
            }
        })
    } catch (e) {
        console.log(e)
    } finally {
        dispatch({
            type: TodoActionsTypes.REMOVE_IS_LOADING,
            payload: _id
        })
    }
}

export const addTodo = (name: string) => async (dispatch: Dispatch<TodoActions>) => {
    try {
        dispatch({
            type: TodoActionsTypes.SET_IS_ADD_BUTTON_LOADING,
            payload: true
        })
        const response = await axiosInstance.post('/todo/create', {
            name
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        dispatch({
            type: TodoActionsTypes.ADD_TODO,
            payload: {
                isDone: false,
                name: response.data.name,
                _id: response.data._id
            }
        })
    } catch (e) {
        console.log(e)
    } finally {
        dispatch({
            type: TodoActionsTypes.SET_IS_ADD_BUTTON_LOADING,
            payload: false
        })
    }
}

export const deleteTodo = (_id: string) => async (dispatch: Dispatch<TodoActions>) => {
    try {
        dispatch({
            type: TodoActionsTypes.SET_IS_LOADING,
            payload: _id
        })
        const response = await axiosInstance.delete('/todo', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            params: {
                _id
            }
        })
        dispatch({
            type: TodoActionsTypes.DELETE_TODO,
            payload: _id
        })
    } catch (e) {
        console.log(e)
    } finally {
        dispatch({
            type: TodoActionsTypes.REMOVE_IS_LOADING,
            payload: _id
        })
    }
}

export const setIsDone = (isDone: boolean, _id: string) => async (dispatch: Dispatch<TodoActions>) => {
    try {
        dispatch({
            type: TodoActionsTypes.SET_IS_LOADING,
            payload: _id
        })
        const response = await axiosInstance.post('/todo/setisdone', {
            isDone, _id
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        dispatch({
            type: TodoActionsTypes.CHANGE_TODO_IS_DONE,
            payload: {
                _id, isDone
            }
        })
    } catch (e) {
        console.log(e)
    } finally {
        dispatch({
            type: TodoActionsTypes.REMOVE_IS_LOADING,
            payload: _id
        })
    }
}

