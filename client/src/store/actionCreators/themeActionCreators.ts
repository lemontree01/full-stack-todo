import {Theme, ThemeActions, ThemeActionsTypes} from "../types/theme.types";
import {Dispatch} from "redux";

export const setTheme = (theme: Theme) => (dispatch: Dispatch<ThemeActions>) => {
    dispatch({
        type: ThemeActionsTypes.SET_THEME,
        payload: theme
    })

}

export const toggleTheme = () => (dispatch: Dispatch<ThemeActions>) => {
    dispatch({
        type: ThemeActionsTypes.TOGGLE_THEME
    })
}