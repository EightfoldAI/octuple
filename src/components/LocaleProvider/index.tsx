'use client';

import React from 'react';
import type { AccordionLocale } from '../Accordion/Accordion.types';
import type { BreadcrumbLocale } from '../Breadcrumb/Breadcrumb.types';
import type { DialogLocale } from '../Dialog/BaseDialog/BaseDialog.types';
import type { DrawerLocale } from '../Drawer/Drawer.types';
import type { PaginationLocale } from '../Pagination';
import type { PanelLocale } from '../Panel';
import type { PersistentBarLocale } from '../PersistentBar/PersistentBar.types';
import type { InfoBarLocale } from '../InfoBar';
import type { PickerLocale as DatePickerLocale } from '../DateTimePicker/DatePicker/Generate/Generate.types';
import type { StepperLocale } from '../Stepper';
import type { TableLocale } from '../Table/Table.types';
import type { UploadLocale } from '../Upload/Upload.types';
import type { ValidateMessages } from '../Form/Internal/OcForm.types';
import type { SnackbarLocale } from '../Snackbar/Snackbar.types';
import LocaleContext from './Context';

export interface Locale {
  locale: string;
  global?: Record<string, any>;
  Accordion?: AccordionLocale;
  Breadcrumb?: BreadcrumbLocale;
  DatePicker?: DatePickerLocale;
  Dialog?: DialogLocale;
  Drawer?: DrawerLocale;
  Form?: {
    optional?: string;
    defaultValidateMessages: ValidateMessages;
  };
  InfoBar?: InfoBarLocale;
  Pagination?: PaginationLocale;
  Panel?: PanelLocale;
  PersistentBar?: PersistentBarLocale;
  Stepper?: StepperLocale;
  Table?: TableLocale;
  TimePicker?: Record<string, any>;
  Upload?: UploadLocale;
  Snackbar?: SnackbarLocale;
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

  lastLocale: Locale | null = null;
  lastContextValue: (Locale & { exist?: boolean }) | null = null;

  constructor(props: LocaleProviderProps) {
    super(props);
  }

  getMemoizedContextValue = (
    localeValue: Locale
  ): Locale & { exist?: boolean } => {
    // If the input hasn't changed, return the memoized result
    if (this.lastLocale && this.lastLocale === localeValue) {
      return this.lastContextValue!;
    }

    // Otherwise, compute the result and store it for future use
    const contextValue = {
      ...localeValue,
      exist: true,
    };
    this.lastLocale = localeValue;
    this.lastContextValue = contextValue;
    return contextValue;
  };

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
