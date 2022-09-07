export interface FocusVisibleOptions {
    /**
     * Enables keyboard modality styles
     * @default true
     */
    focusVisible?: boolean;
    /**
     * Determines the target element to add the `focus-visible` className
     * @default document.documentElement
     */
    focusVisibleElement?: HTMLElement;
}
