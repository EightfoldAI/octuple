declare namespace IconModuleScssModule {
    export interface IIconModuleScss {
        iconWrapper: string;
        mappings: string;
        names: string;
        sourceRoot: string;
        sources: string;
        sourcesContent: string;
        version: string;
    }
}

declare const IconModuleScssModule: IconModuleScssModule.IIconModuleScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: IconModuleScssModule.IIconModuleScss;
};

export = IconModuleScssModule;
