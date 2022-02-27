import {TodoActions, TodoActionsTypes, TodoState} from "../types/todo.types";

const initialState: TodoState = {
    todos: [],
    loadingTodos: [],
    isLoading: true,
    isAddButtonLoading: false
}

export default (state = initialState, action: TodoActions): TodoState => {
    switch (action.type) {
        case TodoActionsTypes.FETCH_TODOS:
            return {
                ...state,
                todos: action.payload
            }
        case TodoActionsTypes.ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, {...action.payload}]
            }
        case TodoActionsTypes.CHANGE_TODO_TEXT:
            return {
                ...state,
                todos: state.todos.map(todo=> todo._id === action.payload._id ? {
                        ...todo,
                        name: action.payload.text
                    } : todo)
            }
        case TodoActionsTypes.CHANGE_TODO_IS_DONE:
            return {
                ...state,
                todos: state.todos.map(todo=> todo._id === action.payload._id ? {
                    ...todo,
                    isDone: action.payload.isDone
                } : todo)
            }
        case TodoActionsTypes.DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== action.payload)
            }

        case TodoActionsTypes.SET_IS_LOADING:
            return {
                ...state,
                loadingTodos: [...state.loadingTodos, action.payload]
            }

        case TodoActionsTypes.REMOVE_IS_LOADING:
            return {
                ...state,
                loadingTodos: state.loadingTodos.filter(todoId => todoId !== action.payload)
            }

        case TodoActionsTypes.TOGGLE_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case TodoActionsTypes.SET_IS_ADD_BUTTON_LOADING:
            return {
                ...state,
                isAddButtonLoading: action.payload
            }
        default: return state
    }
}