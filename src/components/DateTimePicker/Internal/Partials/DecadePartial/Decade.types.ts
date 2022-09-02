import type {
    DatePickerShape,
    DatePickerSize,
    PartialSharedProps,
} from '../../OcPicker.types';
import type { GenerateConfig } from '../../Generate';
import { Shape, Size } from '../../../../ConfigProvider';

export const DECADE_UNIT_DIFF: number = 10;
export const DECADE_DISTANCE_COUNT: number = DECADE_UNIT_DIFF * 10;
export const DECADE_COL_COUNT: number = 3;

export type DecadePartialProps<DateType> = PartialSharedProps<DateType>;

export type YearHeaderProps<DateType> = {
    viewDate: DateType;
    generateConfig: GenerateConfig<DateType>;
    onPrevDecades: () => void;
    onNextDecades: () => void;
    shape?: DatePickerShape | Shape;
    size?: DatePickerSize | Size;
};

export type YearBodyProps<DateType> = {
    generateConfig: GenerateConfig<DateType>;
    viewDate: DateType;
    disabledDate?: (date: DateType) => boolean;
    onSelect: (value: DateType) => void;
    shape?: DatePickerShape | Shape;
    size?: DatePickerSize | Size;
};
