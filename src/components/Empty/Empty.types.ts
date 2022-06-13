import { OcBaseProps } from '../OcBase';

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
     * The empty component image.
     * @default { DefaultEmptyImg }
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
