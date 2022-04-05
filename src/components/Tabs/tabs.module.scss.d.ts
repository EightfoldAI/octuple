declare namespace TabsModuleScssModule {
    export interface ITabsModuleScss {
        active: string;
        body1: string;
        body2: string;
        body3: string;
        button1: string;
        button2: string;
        button3: string;
        caption: string;
        display1: string;
        display2: string;
        display3: string;
        display4: string;
        header1: string;
        header2: string;
        header3: string;
        header4: string;
        header5: string;
        header6: string;
        icon: string;
        'icon-material-l': string;
        'icon-material-m': string;
        'icon-material-s': string;
        'icon-material-xs': string;
        iconMaterialL: string;
        iconMaterialM: string;
        iconMaterialS: string;
        iconMaterialXs: string;
        label: string;
        mappings: string;
        names: string;
        'open-sans': string;
        openSans: string;
        pill: string;
        'pre-display': string;
        preDisplay: string;
        scrollable: string;
        semibold: string;
        small: string;
        sourceRoot: string;
        sources: string;
        sourcesContent: string;
        subtitle1: string;
        subtitle2: string;
        tab: string;
        tabIndicator: string;
        tabWrap: string;
        version: string;
    }
}

declare const TabsModuleScssModule: TabsModuleScssModule.ITabsModuleScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: TabsModuleScssModule.ITabsModuleScss;
};

export = TabsModuleScssModule;
