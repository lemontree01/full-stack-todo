import {Theme, ThemeActions, ThemeActionsTypes, ThemeState} from "../types/theme.types";
import DarkThemeColors from "../../utils/darkThemeColors";
import LightThemeColors from "../../utils/lightThemeColors"

const initialState: ThemeState = {
    theme: Theme.dark,
    colors: DarkThemeColors
}

export default (state = initialState, action: ThemeActions):  ThemeState => {
    switch (action.type) {
        case ThemeActionsTypes.SET_THEME:
            return {
                ...state,
                theme: action.payload,
                colors: action.payload === Theme.light ? LightThemeColors : DarkThemeColors
            }
        case ThemeActionsTypes.TOGGLE_THEME:
            return {
                ...state,
                theme: state.theme === Theme.dark ? Theme.light : Theme.dark,
                colors: state.theme === Theme.dark ? LightThemeColors : DarkThemeColors
            }
        default: return state
    }
}