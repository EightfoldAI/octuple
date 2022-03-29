declare namespace TooltipModuleScssModule {
    export interface ITooltipModuleScss {
        arrow: string;
        bottom: string;
        dark: string;
        disabled: string;
        left: string;
        mappings: string;
        names: string;
        referenceWrapper: string;
        right: string;
        scaleTooltip: string;
        sourceRoot: string;
        sources: string;
        sourcesContent: string;
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
