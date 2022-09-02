import type { GenerateConfig } from '../Generate';
import type {
    DatePickerShape,
    DatePickerSize,
    PartialMode,
} from '../OcPicker.types';
import { IconName } from '../../../Icon';
import { Shape, Size } from '../../../ConfigProvider';

export type HeaderProps = {
    prevIcon?: IconName;
    nextIcon?: IconName;
    superPrevIcon?: IconName;
    superNextIcon?: IconName;
    onPrev?: () => void;
    onNext?: () => void;
    onSuperPrev?: () => void;
    onSuperNext?: () => void;
    children?: React.ReactNode;
    shape?: DatePickerShape | Shape;
    size?: DatePickerSize | Size;
};

export type PartialBodyProps<DateType> = {
    disabledDate?: (date: DateType) => boolean;
    onSelect: (value: DateType) => void;
    picker?: PartialMode;
    headerCells?: React.ReactNode;
    rowNum: number;
    colNum: number;
    baseDate: DateType;
    getCellClassNames: (date: DateType) => Record<string, boolean | undefined>;
    getCellDate: (date: DateType, offset: number) => DateType;
    getCellText: (date: DateType) => React.ReactNode;
    getCellNode?: (date: DateType) => React.ReactNode;
    titleCell?: (date: DateType) => string;
    generateConfig: GenerateConfig<DateType>;
    rowClassNames?: (date: DateType) => string;
    shape?: DatePickerShape | Shape;
    size?: DatePickerSize | Size;
};
