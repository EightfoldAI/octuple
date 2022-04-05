declare namespace TooltipModuleScssModule {
    export interface ITooltipModuleScss {
        arrow: string;
        body1: string;
        body2: string;
        body3: string;
        bottom: string;
        button1: string;
        button2: string;
        button3: string;
        caption: string;
        dark: string;
        disabled: string;
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
        iconMaterialL: string;
        iconMaterialM: string;
        iconMaterialS: string;
        iconMaterialXs: string;
        left: string;
        mappings: string;
        names: string;
        'open-sans': string;
        openSans: string;
        'pre-display': string;
        preDisplay: string;
        referenceWrapper: string;
        right: string;
        scaleTooltip: string;
        semibold: string;
        sourceRoot: string;
        sources: string;
        sourcesContent: string;
        subtitle1: string;
        subtitle2: string;
        tooltip: string;
        top: string;
        version: string;
        visible: string;
    }
}

declare const TooltipModuleScssModule: TooltipModuleScssModule.ITooltipModuleScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: TooltipModuleScssModule.ITooltipModuleScss;
};

export = TooltipModuleScssModule;
