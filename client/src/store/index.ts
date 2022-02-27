import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/user.reducer";
import todoReducer from "./reducers/todo.reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import themeReducer from "./reducers/theme.reducer";
import errorsReducer from "./reducers/errors.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    todo: todoReducer,
    theme: themeReducer,
    errors: errorsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))