/** Icons are to be cherry-picked from mdi.js to save on bytes.
 * https://github.com/Templarian/MaterialDesign-JS/blob/master/mdi.js
*/
export const mdiHeart: string = "M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z";

export enum IconSize {
    Large = '1.5rem',
    Medium = '1.25rem',
    Small = '1rem',
    XSmall = '0.875rem',
}

export interface IconProps {
    /**
     * The icon string.
     */
    icon: string;
    /**
     * The icon is aria-hidden.
     */
    ariaHidden?: boolean;
    /**
     * The icon class names.
     */
    classes?: string;
    /**
     * The icon color.
     */
    color?: string;
    /**
     * The icon description.
     */
    description?: string;
    /**
     * The icon is horizontal.
     */
    horizontal?: boolean;
    /**
     * The icon aria role.
     */
    role?: string;
    /**
     * The icon is rotated.
     */
    rotate?: number;
    /**
     * The icon size.
     */
    size?: IconSize;
    /**
     * The icon spin animation timer in milliseconds, seconds.
     */
    spin?: number;
    /**
     * The icon title.
     */
    title?: string;
    /**
     * The icon is vertical.
     */
    vertical?: boolean;
}
