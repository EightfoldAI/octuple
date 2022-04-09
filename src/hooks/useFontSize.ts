import { useReducer } from 'react';
import { hasWindow } from '../shared/utilities';

import { useLocalStorage } from './useLocalStorage';

export interface UseFontSizeProps {
    storageKey?: string;
    initialSize?: string;
    variableName?: string;
}

/**
 * Set the CSS variable in the <html> node
 */
const applyPropToDocument = (variableName: string, storedFontSize: string) =>
    document.documentElement.style.setProperty(variableName, storedFontSize);

/**
 * Retrieve the CSS variable value from the <html> node
 */
const getDocumentProp = (variableName: string) =>
    document.documentElement.style.getPropertyValue(variableName);

/**
 *
 * @param {UseFontSizeProps} options
 */
export const useFontSize = ({
    storageKey = 'f_s',
    initialSize = '20px',
    variableName = '--font-size',
}: UseFontSizeProps = {}) => {
    /**
     * Create a state connected to the localStorage.
     * This is necessary to consistently store
     * the key/value pair with the font size
     */
    const [storedFontSize, storeFontSize] = useLocalStorage(
        storageKey,
        initialSize
    );

    /**
     * The init function for the useReducer hook.
     * This function runs on the first render when used and takes care of:
     * - Check if the hook runs in the client, otherwise return the default value
     * - If a font size is already stored in the localStorage, set it as CSS variable
     * - Return the stored value as the state value.
     */
    function init(initialValue: string) {
        if (!hasWindow()) return initialValue;
        if (storedFontSize) applyPropToDocument(variableName, storedFontSize);
        return storedFontSize || getDocumentProp(variableName);
    }

    /**
     * The reducer function, that we'll use in out components
     * to update the font size with user interactions.
     * It set the new value for the CSS variable and save it as the state.
     */
    function reducer(_state: string, newFont: string | number) {
        const newSize = `${newFont}px`;
        applyPropToDocument(variableName, newSize);
        storeFontSize(newSize);
        return newFont;
    }

    /**
     * Here is where the hook directly returns
     * the useReducer return value, in the form of
     * [fontSize, setFontSize]
     */
    return useReducer(reducer, initialSize, init);
};
