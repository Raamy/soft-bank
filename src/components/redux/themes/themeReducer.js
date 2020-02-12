import { SET_DARK, SET_LIGHT } from "./themeTypes";

const defaultValue = {
    theme: localStorage.getItem('theme')
};

const themeReducer = (state = defaultValue, action) => {
    switch (action.type) {
        case SET_DARK:
            return {
                theme: 'dark'
            };
        case SET_LIGHT:
            return {
                theme: 'light'
            };
        default:
            return state;

    }
};

export default themeReducer;