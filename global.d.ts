declare module '*.scss' {
    const styles: { [className: string]: string };
    export default styles;
}

declare module '@ngard/tiny-isequal';

/**
 * userLanguage type for IE i18n
 */
interface Navigator {
    userLanguage: string;
}
