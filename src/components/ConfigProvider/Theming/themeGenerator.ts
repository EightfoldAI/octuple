import { TabsTheme } from '../../Tabs';
import { Variables } from './Theming.types';
import { convertToKebabCase } from '../../../shared/utilities';

export type ComponentTheme = TabsTheme;

export const themeGenerator = (
    theme: ComponentTheme,
    prefix: string
): Variables => {
    return Object.keys(theme).reduce((acc: Variables, variable: string) => {
        const value: string = theme[variable as keyof ComponentTheme];
        return {
            ...acc,
            [`${prefix}-${convertToKebabCase(variable)}`]: value.includes('--')
                ? `var(${value})`
                : value,
        };
    }, {} as Variables);
};
