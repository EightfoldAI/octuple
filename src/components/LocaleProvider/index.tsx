import React from 'react';
import memoizeOne from 'memoize-one';
import type { PickerLocale as DatePickerLocale } from '../DateTimePicker/DatePicker/Generate/Generate.types';
import type { TableLocale } from '../Table/Table.types';
import type { ValidateMessages } from '../Form/Internal/OcForm.types';
import LocaleContext from './Context';

export interface Locale {
    locale: string;
    global?: Record<string, any>;
    DatePicker?: DatePickerLocale;
    Form?: {
        optional?: string;
        defaultValidateMessages: ValidateMessages;
    };
    Table?: TableLocale;
    TimePicker?: Record<string, any>;
}

export interface LocaleProviderProps {
    locale: Locale;
    children?: React.ReactNode;
}

export default class LocaleProvider extends React.Component<
    LocaleProviderProps,
    any
> {
    static defaultProps = {
        locale: {},
    };

    constructor(props: LocaleProviderProps) {
        super(props);
    }

    getMemoizedContextValue = memoizeOne(
        (localeValue: Locale): Locale & { exist?: boolean } => ({
            ...localeValue,
            exist: true,
        })
    );

    render() {
        const { locale, children } = this.props;
        const contextValue = this.getMemoizedContextValue(locale);
        return (
            <LocaleContext.Provider value={contextValue}>
                {children}
            </LocaleContext.Provider>
        );
    }
}
