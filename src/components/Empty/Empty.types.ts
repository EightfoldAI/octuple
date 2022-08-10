import { OcBaseProps } from '../OcBase';

export enum EmptyMode {
    data = 'data',
    messages = 'messages',
    tasks = 'tasks',
    search = 'search',
    error = 'error',
}

export interface EmptyProps extends OcBaseProps<HTMLDivElement> {
    /**
     * The empty component children.
     */
    children?: React.ReactNode;
    /**
     * The empty component description
     */
    description?: string;
    /**
     * The empty component mode
     */
    mode?: EmptyMode;
    /**
     * The empty component image.
     */
    image?: React.ReactNode;
    /**
     * The empty component image style.
     */
    imageStyle?: React.CSSProperties;
    /**
     * The empty component style.
     */
    style?: React.CSSProperties;
    /**
     * The empty component title
     */
    title?: string;
}
