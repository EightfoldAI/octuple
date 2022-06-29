import type {
    DisabledTimes,
    Locale,
    OnSelect,
    PartialSharedProps,
} from '../../Picker.types';
import type { GenerateConfig } from '../../Generate';

export type Unit = {
    label: React.ReactText;
    value: number;
    disabled: boolean;
};

export type TimeUnitColumnProps = {
    units?: Unit[];
    value?: number;
    active?: boolean;
    hideDisabledOptions?: boolean;
    onSelect?: (value: number) => void;
};

export type SharedTimeProps<DateType> = {
    format?: string;
    showNow?: boolean;
    showHour?: boolean;
    showMinute?: boolean;
    showSecond?: boolean;
    use12Hours?: boolean;
    hourStep?: number;
    minuteStep?: number;
    secondStep?: number;
    hideDisabledOptions?: boolean;
    defaultValue?: DateType;
    disabledTime?: (date: DateType) => DisabledTimes;
};

export type TimePartialProps<DateType> = {
    format?: string;
    active?: boolean;
} & PartialSharedProps<DateType> &
    SharedTimeProps<DateType>;

export type TimeHeaderProps<DateType> = {
    value?: DateType | null;
    locale: Locale;
    generateConfig: GenerateConfig<DateType>;
    format: string;
};

export type BodyOperationRef = {
    onUpDown: (diff: number) => void;
};

export type TimeBodyProps<DateType> = {
    locale: Locale;
    generateConfig: GenerateConfig<DateType>;
    value?: DateType | null;
    onSelect: OnSelect<DateType>;
    activeColumnIndex: number;
    operationRef: React.MutableRefObject<BodyOperationRef | undefined>;
} & SharedTimeProps<DateType>;
