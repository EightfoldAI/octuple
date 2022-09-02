import type { Locale } from '../../OcPicker.types';
import type { GenerateConfig } from '../../Generate';
import type {
    DatePickerShape,
    DatePickerSize,
    PartialSharedProps,
} from '../../OcPicker.types';
import { Shape, Size } from '../../../../ConfigProvider';

export const MONTH_COL_COUNT: number = 3;

export type MonthCellRender<DateType> = (
    currentDate: DateType,
    locale: Locale
) => React.ReactNode;

export type MonthPartialProps<DateType> = {
    monthCellContentRender?: MonthCellRender<DateType>;
} & PartialSharedProps<DateType>;

export type MonthHeaderProps<DateType> = {
    viewDate: DateType;
    locale: Locale;
    generateConfig: GenerateConfig<DateType>;
    onPrevYear: () => void;
    onNextYear: () => void;
    onYearClick: () => void;
    shape?: DatePickerShape | Shape;
    size?: DatePickerSize | Size;
};

export type MonthBodyProps<DateType> = {
    locale: Locale;
    generateConfig: GenerateConfig<DateType>;
    value?: DateType | null;
    viewDate: DateType;
    disabledDate?: (date: DateType) => boolean;
    monthCellRender?: MonthCellRender<DateType>;
    onSelect: (value: DateType) => void;
    shape?: DatePickerShape | Shape;
    size?: DatePickerSize | Size;
};
