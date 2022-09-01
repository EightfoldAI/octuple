import type { GenerateConfig } from '../../Generate';
import type {
    DatePickerShape,
    DatePickerSize,
    PartialSharedProps,
} from '../../OcPicker.types';
import type { KeyboardConfig } from '../../Utils/uiUtil';
import type { Locale } from '../../OcPicker.types';
import { Shape, Size } from '../../../../ConfigProvider';

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
    shape?: DatePickerShape | Shape;
    size?: DatePickerSize | Size;
};

export type DateBodyPassProps<DateType> = {
    dateRender?: DateRender<DateType>;
    disabledDate?: (date: DateType) => boolean;
    rowClassNames?: (date: DateType) => string;
};

export type DateBodyProps<DateType> = {
    generateConfig: GenerateConfig<DateType>;
    value?: DateType | null;
    viewDate: DateType;
    locale: Locale;
    rowCount: number;
    onSelect: (value: DateType) => void;
    shape?: DatePickerShape | Shape;
    size?: DatePickerSize | Size;
} & DateBodyPassProps<DateType>;
