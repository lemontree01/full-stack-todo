export interface ThemeState {
    theme: Theme
}

export enum Theme {
    dark,
    light
}

export enum ThemeActionsTypes {
    TOGGLE_THEME = 'TOGGLE_THEME',
    SET_THEME = 'SET_THEME'
}

interface toggleTheme {
    type: ThemeActionsTypes.TOGGLE_THEME
}

interface setTheme {
    type: ThemeActionsTypes.SET_THEME,
    payload: Theme
}

export type ThemeActions = toggleTheme | setTheme