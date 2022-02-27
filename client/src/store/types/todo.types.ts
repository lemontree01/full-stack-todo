export interface Todo {
    name: string,
    isDone: boolean,
    _id: string
}

export interface TodoState {
    todos: Todo[],
    loadingTodos: string[],
    isLoading: boolean,
    isAddButtonLoading: boolean
}

export enum TodoActionsTypes {
    FETCH_TODOS = "FETCH_TODOS",
    SET_IS_LOADING = "SET_IS_LOADING",
    REMOVE_IS_LOADING = "REMOVE_IS_LOADING",
    ADD_TODO = 'ADD_TODO',
    CHANGE_TODO_TEXT = 'CHANGE_TODO_TEXT',
    DELETE_TODO = 'DELETE_TODO',
    CHANGE_TODO_IS_DONE = 'CHANGE_TODO_IS_DONE',
    TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING',
    SET_IS_ADD_BUTTON_LOADING = 'SET_IS_BUTTON_LOADING'
}

interface SetIsLoading {
    type: TodoActionsTypes.SET_IS_LOADING,
    payload: string
}

interface RemoveIsLoading {
    type: TodoActionsTypes.REMOVE_IS_LOADING,
    payload: string
}

interface AddTodo {
    type: TodoActionsTypes.ADD_TODO,
    payload: Todo
}

interface ChangeTodoText {
    type: TodoActionsTypes.CHANGE_TODO_TEXT,
    payload: {
        _id: string,
        text: string
    }
}

interface ChangeTodoIsDone {
    type: TodoActionsTypes.CHANGE_TODO_IS_DONE,
    payload: {
        _id: string,
        isDone: boolean
    }
}

interface DeleteTodo {
    type: TodoActionsTypes.DELETE_TODO,
    payload: string
}

interface FetchTodo {
    type: TodoActionsTypes.FETCH_TODOS,
    payload: Todo[]
}

interface ToggleIsLoading {
    type: TodoActionsTypes.TOGGLE_IS_LOADING,
    payload: boolean
}

interface SetIsAddButtonLoading {
    type: TodoActionsTypes.SET_IS_ADD_BUTTON_LOADING,
    payload: boolean
}


export type TodoActions = SetIsLoading | AddTodo |
    ChangeTodoText | ChangeTodoIsDone | DeleteTodo |
    FetchTodo | RemoveIsLoading | ToggleIsLoading |
    SetIsAddButtonLoading
