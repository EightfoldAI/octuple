import { OcBaseTheme, OcTheme, OcThemeNames } from './Theming.types';

export const themeDefaults: OcBaseTheme = {
    textColor: '#1A212E',
    textColorSecondary: '#4F5666',
    textColorInverse: '#fff',
    backgroundColor: '#fff',
    successColor: '#2B715F',
    warningColor: '#9D6309',
    infoColor: '#4F5666',
    errorColor: '#993838',
};

export const red: OcTheme = Object.freeze({
    primaryColor: '#993838',
    ...themeDefaults,
    palette: [
        '#0A0202',
        '#3B1010',
        '#6C2222', //AAA ✅ (11.11:1) with $grey0 text
        '#993838', //AAA ✅ (7.05:1) with $grey0 text
        '#C15151', //AA ✔️️ (4.59:1) with $grey0 text
        '#E46F6F',
        '#F48686', //AA ✔️ (6.61:1) with $grey90 text
        '#FFA3A3', //AAA ✅ (8.47:1) with $grey90 text
        '#FFC6C6',
        '#FFEFEF',
    ],
});

export const orange: OcTheme = {
    primaryColor: '#9D6309',
    ...themeDefaults,
    palette: [
        '#0A0700',
        '#3B2600',
        '#6C4500', //AAA ✅ (8.43:1) with $grey0 text
        '#9D6309', //AA ✔️️ (4.97:1) with $grey0 text
        '#C97E19', //AA ✔️ (4.98:1) with $grey90 text
        '#F29D31', //AAA ✅ (7.41:1) with $grey90 text
        '#FFB650', //AAA ✅ (9.26:1) with $grey90 text
        '#FFCD78', //AAA ✅ (10.95:1) with $grey90 text
        '#FFE3B0',
        '#FFF8EB',
    ],
};

export const yellow: OcTheme = {
    primaryColor: '#857600',
    ...themeDefaults,
    palette: [
        '#0A0A00',
        '#333100',
        '#5C5500', //AAA ✅ (7.62:1) with $grey0 text
        '#857600', //AA ✔️️ (4.57:1) with $grey0 text
        '#A88F00', //AA ✔️️ (5.07:1) with $grey90 text
        '#D6AD00', //AAA ✅️ (7.56:1) with $grey90 text
        '#F1C40F', // AAA ✅ (9.71:1) with $grey90 text
        '#FFE44E', // AAA ✅ (12.65:1) with $grey90 text
        '#FFF89C',
        '#FFFFEB',
    ],
};

export const green: OcTheme = {
    primaryColor: '#2B715F',
    ...themeDefaults,
    palette: [
        '#030A08',
        '#0E2E26',
        '#1B5143', //AAA ✅ (9.11:1) with $grey0 text
        '#2B715F', //AA ✔️️ (5.78:1) with $grey0 text
        '#3D8F79',
        '#51AB93', //AA ✔️ (5.83:1) with $grey90 text
        '#67C5AC', //AAA ✅ (7.8:1) with $grey90 text
        '#8CE1CA', //AAA ✅ (10.56:1) with $grey90 text
        '#B9F4E4',
        '#F0FEFA',
    ],
};

export const bluegreen: OcTheme = {
    primaryColor: '#0B7B8B',
    ...themeDefaults,
    palette: [
        '#00090A',
        '#00333B',
        '#025966', //AAA ✅ (8:1) with $grey0 text
        '#0B7B8B', //AA ✔️️ (4.97:1) with $grey0 text
        '#1999AC', //AA ✔️ (4.76:1) with $grey90 text
        '#2DB3C7', //AAA ✅ (6.44:1) with $grey90 text
        '#50CEE1', //AAA ✅ (8.65:1) with $grey90 text
        '#7BE4F4', //AAA ✅ (10.95:1) with $grey90 text
        '#B0F3FE',
        '#EBFDFF',
    ],
};

export const blue: OcTheme = {
    primaryColor: '#146DA6',
    ...themeDefaults,
    palette: [
        '#00060A',
        '#002A47',
        '#054D7B', //AAA ✅ (8.92:1) with $grey0 text
        '#146DA6', //AA ✔️️ (5.57:1) with $grey0 text
        '#2C8CC9',
        '#47A4DF', //AA ✔️ (5.87:1) with $grey90 text
        '#68BAEF', //AAA ✅ (7.57:1) with $grey90 text
        '#8ED0FA', //AAA ✅ (9.64:1) with $grey90 text
        '#BCE4FF',
        '#EBF7FF',
    ],
};

export const violet: OcTheme = {
    primaryColor: '#7E3A77',
    ...themeDefaults,
    palette: [
        '#060106',
        '#350E31',
        '#5D2156', //AAA ✅ (11.55:1) with $grey0 text
        '#7E3A77', //AAA ✅ (7.61:1) with $grey0 text
        '#975590', //AA ✔️️ (5.22:1) with $grey0 text
        '#AE72A8',
        '#C491BF', //AA ✔️ (6.26:1) with $grey90 text
        '#D8B1D4', //AAA ✅ (8.57:1) with $grey90 text
        '#EAD3E8',
        '#FBF6FB',
    ],
};

export const grey: OcTheme = {
    primaryColor: '#4F5666',
    ...themeDefaults,
    palette: [
        '#05070A',
        '#1A212E',
        '#343C4C', //AAA ✅ (11.07:1) with $grey0 text
        '#4F5666', //AAA ✅ (7.35:1) with $grey0 text
        '#69717F', //AA ✔️️ (4.91:1) with $grey0 text
        '#858B98', //AA ✔️ (4.72:1) with $grey90 text
        '#A1A6B1', //AAA ✅ (6.61:1) with $grey90 text
        '#BDC1C9', //AAA ✅ (8.94:1) with $grey90 text
        '#D9DCE1',
        '#F6F7F8',
    ],
};

const themes: Record<OcThemeNames, OcTheme> = {
    red,
    orange,
    yellow,
    green,
    bluegreen,
    blue,
    violet,
    grey,
};

export default themes;
