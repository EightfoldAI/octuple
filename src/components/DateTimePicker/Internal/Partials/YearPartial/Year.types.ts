import type {
    DatePickerShape,
    DatePickerSize,
    Locale,
    NullableDateType,
    PartialSharedProps,
    PartialMode,
} from '../../OcPicker.types';
import type { GenerateConfig } from '../../Generate';
import { Shape, Size } from '../../../../ConfigProvider';

export const YEAR_DECADE_COUNT: number = 10;
export const YEAR_COL_COUNT: number = 3;

export type YearPartialProps<DateType> = {
    sourceMode: PartialMode;
} & PartialSharedProps<DateType>;

export type YearHeaderProps<DateType> = {
    viewDate: DateType;
    value?: DateType | null;
    generateConfig: GenerateConfig<DateType>;
    onPrevDecade: () => void;
    onNextDecade: () => void;
    onDecadeClick: () => void;
    shape?: DatePickerShape | Shape;
    size?: DatePickerSize | Size;
};

export type YearBodyProps<DateType> = {
    locale: Locale;
    generateConfig: GenerateConfig<DateType>;
    value?: NullableDateType<DateType>;
    viewDate: DateType;
    disabledDate?: (date: DateType) => boolean;
    onSelect: (value: DateType) => void;
    shape?: DatePickerShape | Shape;
    size?: DatePickerSize | Size;
};
