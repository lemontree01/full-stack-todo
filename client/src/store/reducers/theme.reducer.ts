import {Theme, ThemeActions, ThemeActionsTypes, ThemeState} from "../types/theme.types";

const initialState: ThemeState = {
    theme: Theme.dark
}

export default (state = initialState, action: ThemeActions):  ThemeState => {
    switch (action.type) {
        case ThemeActionsTypes.SET_THEME:
            return {
                ...state,
                theme: action.payload
            }
        case ThemeActionsTypes.TOGGLE_THEME:
            return {
                ...state,
                theme: state.theme === Theme.dark ? Theme.light : Theme.dark
            }
        default: return state
    }
}