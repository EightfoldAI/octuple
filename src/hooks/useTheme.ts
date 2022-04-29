import { useReducer } from 'react';
import { hasWindow } from '../shared/utilities';

import { useLocalStorage } from './useLocalStorage';

export interface UseThemeProps {
    storageKey?: string;
    initialTheme?: string;
    themeName?: string;
}

/**
 * Updates the classList property in the <html> node
 */
const applyClassNameToDocument = (storedTheme: string): void => {
    const htmlElement: HTMLElement = document.documentElement;
    if (!htmlElement.classList.contains(storedTheme)) {
        const classes = htmlElement.className
            .split(' ')
            .filter((c) => !c.startsWith('theme-'));
        htmlElement.className = classes.join(' ').trim();
        htmlElement.classList.add(storedTheme);
    }
};

/**
 * Retrieve the className from the <html> node
 */
const getDocumentClassName = (themeName: string): string =>
    document.documentElement.classList.contains(themeName) && themeName;

/**
 *
 * @param {UseThemeProps} options
 */
export const useTheme = ({
    storageKey = 't_n',
    initialTheme = 'theme-blue',
    themeName = 'theme-blue',
}: UseThemeProps = {}): [string, React.Dispatch<string>] => {
    /**
     * Create a state connected to the localStorage.
     * This is necessary to consistently store
     * the key/value pair with the theme
     */
    const [storedTheme, storeTheme] = useLocalStorage(storageKey, initialTheme);

    /**
     * The init function for the useReducer hook.
     * This function runs on the first render when used and takes care of:
     * - Check if the hook runs in the client, otherwise return the default value
     * - If a theme is already stored in the localStorage, set it as className
     * - Return the stored value as the state value.
     */
    function init(initialValue: string): string {
        if (!hasWindow()) return initialValue;
        if (storedTheme) applyClassNameToDocument(storedTheme);
        return storedTheme || getDocumentClassName(themeName);
    }

    /**
     * The reducer function, that we'll use in our components
     * to update the theme with user interactions.
     * It sets the new property for the classList and save it as the state.
     */
    function reducer(_state: string, newName: string): string {
        const newTheme = `theme-${newName}`;
        applyClassNameToDocument(newTheme);
        storeTheme(newTheme);
        return newName;
    }

    /**
     * Here is where the hook directly returns
     * the useReducer return value, in the form of
     * [theme, setTheme]
     */
    return useReducer(reducer, initialTheme, init);
};
