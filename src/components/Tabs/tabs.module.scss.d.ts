declare namespace TabsModuleScssModule {
    export interface ITabsModuleScss {
        active: string;
        'button-spacer-1': string;
        'button-spacer-2': string;
        'button-spacer-3': string;
        buttonSpacer1: string;
        buttonSpacer2: string;
        buttonSpacer3: string;
        'chevron-icon': string;
        'chevron-spacer': string;
        chevronIcon: string;
        chevronSpacer: string;
        'custom-padding-vertical': string;
        customPaddingVertical: string;
        'divider-line': string;
        dividerLine: string;
        'flex-structure-horizontal': string;
        'flex-structure-vertical': string;
        flexStructureHorizontal: string;
        flexStructureVertical: string;
        'full-height': string;
        fullHeight: string;
        icon: string;
        'icon-1-material': string;
        'icon-2-material': string;
        'icon-3-material': string;
        'icon-4-material': string;
        icon1Material: string;
        icon2Material: string;
        icon3Material: string;
        icon4Material: string;
        l: string;
        label: string;
        'logo-text': string;
        logoText: string;
        m: string;
        mappings: string;
        names: string;
        'octuple-menu': string;
        octupleMenu: string;
        pill: string;
        s: string;
        scrollable: string;
        small: string;
        sourceRoot: string;
        sources: string;
        sourcesContent: string;
        'space-m': string;
        spaceM: string;
        spacer: string;
        tab: string;
        tabIndicator: string;
        tabWrap: string;
        version: string;
        xl: string;
        xxl: string;
        xxxl: string;
    }
}

declare const TabsModuleScssModule: TabsModuleScssModule.ITabsModuleScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: TabsModuleScssModule.ITabsModuleScss;
};

export = TabsModuleScssModule;
