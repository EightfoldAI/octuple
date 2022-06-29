import type { GenerateConfig } from '../../Generate';
import type { PartialSharedProps } from '../../Picker.types';
import type { KeyboardConfig } from '../../Utils/uiUtil';
import type { Locale } from '../../Picker.types';

export type DateRender<DateType> = (
    currentDate: DateType,
    today: DateType
) => React.ReactNode;

export type DatePartialProps<DateType> = {
    active?: boolean;
    dateRender?: DateRender<DateType>;

    // Used for week partial
    partialName?: string;
    keyboardConfig?: KeyboardConfig;
} & PartialSharedProps<DateType> &
    DateBodyPassProps<DateType>;

export type DateHeaderProps<DateType> = {
    viewDate: DateType;
    value?: DateType | null;
    locale: Locale;
    generateConfig: GenerateConfig<DateType>;

    onPrevYear: () => void;
    onNextYear: () => void;
    onPrevMonth: () => void;
    onNextMonth: () => void;
    onYearClick: () => void;
    onMonthClick: () => void;
};

export type DateBodyPassProps<DateType> = {
    dateRender?: DateRender<DateType>;
    disabledDate?: (date: DateType) => boolean;

    // Used for week partial
    prefixColumn?: (date: DateType) => React.ReactNode;
    rowClassNames?: (date: DateType) => string;
};

export type DateBodyProps<DateType> = {
    generateConfig: GenerateConfig<DateType>;
    value?: DateType | null;
    viewDate: DateType;
    locale: Locale;
    rowCount: number;
    onSelect: (value: DateType) => void;
} & DateBodyPassProps<DateType>;
