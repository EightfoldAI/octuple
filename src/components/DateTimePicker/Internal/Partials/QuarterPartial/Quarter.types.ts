import type { GenerateConfig } from '../../Generate';
import type { Locale } from '../../OcPicker.types';
import type {
    DatePickerShape,
    DatePickerSize,
    PartialSharedProps,
} from '../../OcPicker.types';
import { Shape, Size } from '../../../../ConfigProvider';

export const QUARTER_COL_COUNT: number = 4;

export type QuarterPartialProps<DateType> = {} & PartialSharedProps<DateType>;

export type QuarterHeaderProps<DateType> = {
    viewDate: DateType;
    locale: Locale;
    generateConfig: GenerateConfig<DateType>;
    onPrevYear: () => void;
    onNextYear: () => void;
    onYearClick: () => void;
    shape?: DatePickerShape | Shape;
    size?: DatePickerSize | Size;
};

export type QuarterBodyProps<DateType> = {
    locale: Locale;
    generateConfig: GenerateConfig<DateType>;
    value?: DateType | null;
    viewDate: DateType;
    disabledDate?: (date: DateType) => boolean;
    onSelect: (value: DateType) => void;
    shape?: DatePickerShape | Shape;
    size?: DatePickerSize | Size;
};
