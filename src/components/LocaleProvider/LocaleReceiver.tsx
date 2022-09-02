import React from 'react';
import type { Locale } from '.';
import type { LocaleContextProps } from './Context';
import LocaleContext from './Context';
import defaultLocaleData from './Default';

export type LocaleComponentName = Exclude<keyof Locale, 'locale'>;

export interface LocaleReceiverProps<
    C extends LocaleComponentName = LocaleComponentName
> {
    componentName: C;
    defaultLocale?: Locale[C] | (() => Locale[C]);
    children: (
        locale: Locale[C],
        localeCode?: string,
        fullLocale?: object
    ) => React.ReactNode;
}

export default class LocaleReceiver<
    C extends LocaleComponentName = LocaleComponentName
> extends React.Component<LocaleReceiverProps<C>> {
    static defaultProps = {
        componentName: 'global',
    };

    static contextType = LocaleContext;

    context: LocaleContextProps;

    getLocale(): Locale[C] {
        const { componentName, defaultLocale } = this.props;
        const locale =
            defaultLocale || defaultLocaleData[componentName ?? 'global'];
        const localeContext = this.context;
        const localeFromContext =
            componentName && localeContext ? localeContext[componentName] : {};
        return {
            ...(typeof locale === 'function' ? (locale as Function)() : locale),
            ...(localeFromContext || {}),
        };
    }

    getLocaleCode() {
        const localeContext = this.context;
        const localeCode = localeContext && localeContext.locale;

        if (localeContext && localeContext.exist && !localeCode) {
            return defaultLocaleData.locale;
        }

        return localeCode;
    }

    render() {
        return this.props.children(
            this.getLocale(),
            this.getLocaleCode(),
            this.context
        );
    }
}

export function useLocaleReceiver<T extends LocaleComponentName>(
    componentName: T,
    defaultLocale?: Locale[T] | Function
): [Locale[T]] {
    const localeContext = React.useContext(LocaleContext);

    const componentLocale = React.useMemo(() => {
        const locale =
            defaultLocale || defaultLocaleData[componentName || 'global'];
        const localeFromContext =
            componentName && localeContext ? localeContext[componentName] : {};

        return {
            ...(typeof locale === 'function' ? (locale as Function)() : locale),
            ...(localeFromContext || {}),
        };
    }, [componentName, defaultLocale, localeContext]);

    return [componentLocale];
}
