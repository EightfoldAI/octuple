import type { GenerateConfig } from '../Generate';
import type { PartialMode } from '../Picker.types';
import { IconName } from '../../../Icon';

export type HeaderProps = {
    // Icons
    prevIcon?: IconName;
    nextIcon?: IconName;
    superPrevIcon?: IconName;
    superNextIcon?: IconName;

    /** Last one step */
    onPrev?: () => void;
    /** Next one step */
    onNext?: () => void;
    /** Last multiple steps */
    onSuperPrev?: () => void;
    /** Next multiple steps */
    onSuperNext?: () => void;

    children?: React.ReactNode;
};

export type PartialBodyProps<DateType> = {
    disabledDate?: (date: DateType) => boolean;
    onSelect: (value: DateType) => void;
    picker?: PartialMode;

    // By partial
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

    // Used for week partial
    prefixColumn?: (date: DateType) => React.ReactNode;
    rowClassNames?: (date: DateType) => string;
};
