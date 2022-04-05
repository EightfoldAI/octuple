declare namespace IconModuleScssModule {
    export interface IIconModuleScss {
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
        'icon-material-l': string;
        'icon-material-m': string;
        'icon-material-s': string;
        'icon-material-xs': string;
        'icon-wrapper': string;
        iconMaterialL: string;
        iconMaterialM: string;
        iconMaterialS: string;
        iconMaterialXs: string;
        iconWrapper: string;
        mappings: string;
        names: string;
        'open-sans': string;
        openSans: string;
        'pre-display': string;
        preDisplay: string;
        semibold: string;
        sourceRoot: string;
        sources: string;
        sourcesContent: string;
        subtitle1: string;
        subtitle2: string;
        version: string;
    }
}

declare const IconModuleScssModule: IconModuleScssModule.IIconModuleScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: IconModuleScssModule.IIconModuleScss;
};

export = IconModuleScssModule;
