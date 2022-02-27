export interface ThemeState {
    theme: Theme,
    colors: Colors
}

export interface Colors {
    primary: string,
    secondary: string,
    primaryText: string,
    secondaryText: string,
    background: string,
    label: string,
    border: string,
    shadow: string
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