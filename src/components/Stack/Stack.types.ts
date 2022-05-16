import { OcBaseProps } from '../OcBase';

export type StackDirection = "vertical" | "horizontal"

export interface StackProps extends OcBaseProps<HTMLDivElement> {
    /**
     * Direction type - horizontal or vertical
     */
    direction?: StackDirection;

    /**
     * Space between the child elements
     */
    gap?: number;

    wrap?: "wrap" | "nowrap" | "wrap-reverse";

    inline?: boolean;

    justify?: string;

    fullWidth?: boolean;

    align?: string;
}

