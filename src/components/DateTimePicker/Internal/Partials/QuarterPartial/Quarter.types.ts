import type { GenerateConfig } from '../../Generate';
import type { Locale } from '../../OcPicker.types';
import type { DatePickerSize, PartialSharedProps } from '../../OcPicker.types';

export const QUARTER_COL_COUNT: number = 4;

export type QuarterPartialProps<DateType> = {} & PartialSharedProps<DateType>;

export type QuarterHeaderProps<DateType> = {
    viewDate: DateType;
    locale: Locale;
    generateConfig: GenerateConfig<DateType>;
    onPrevYear: () => void;
    onNextYear: () => void;
    onYearClick: () => void;
    size?: DatePickerSize;
};

export type QuarterBodyProps<DateType> = {
    locale: Locale;
    generateConfig: GenerateConfig<DateType>;
    value?: DateType | null;
    viewDate: DateType;
    disabledDate?: (date: DateType) => boolean;
    onSelect: (value: DateType) => void;
    size?: DatePickerSize;
};
