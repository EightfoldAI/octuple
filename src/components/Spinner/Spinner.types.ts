export enum SpinnerSize {
    Large = '64px',
    Default = '48px',
    Small = '30px',
}

export interface SpinnerProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Custom classnames of the component
     */
    classNames?: string;
    /**
     * Unique id used to target element for testing
     */
    'data-test-id'?: string;
    /**
     * Size of the spinner
     * @default SpinnerSize.Default
     */
    size?: SpinnerSize | string;
}
