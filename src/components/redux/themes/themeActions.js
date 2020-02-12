import { SET_LIGHT, SET_DARK } from "./themeTypes";

export const setDark = (theme = 'light') => {
    localStorage.setItem('theme', 'dark');
    return {
        type: SET_DARK,
        payload: theme
    }
};

export const setLight = () => {
    localStorage.setItem('theme', 'light');
    return {
        type: SET_LIGHT
    }
};