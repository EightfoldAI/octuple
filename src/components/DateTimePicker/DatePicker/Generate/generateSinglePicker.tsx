import React, { forwardRef, useContext, useImperativeHandle } from 'react';
import DisabledContext, {
    DisabledType,
} from '../../../ConfigProvider/DisabledContext';
import {
    ShapeContext,
    ShapeType,
    SizeContext,
    SizeType,
} from '../../../ConfigProvider';
import { mergeClasses } from '../../../../shared/utilities';
import type { InputStatus } from '../../../../shared/utilities';
import OcPicker from '../../Internal/OcPicker';
import type { GenerateConfig } from '../../Internal/Generate';
import type { OcPickerMode } from '../../Internal/OcPicker.types';
import { getTimeProps } from './Generate';
import type {
    CommonPickerMethods,
    DatePickRef,
    PickerComponentClass,
    PickerDateProps,
    PickerLocale,
    PickerProps,
    PickerTimeProps,
} from './Generate.types';
import { Components } from './Generate.types';
import enUS from '../Locale/en_US';
import { getPlaceholder, transPlacement2DropdownAlign } from '../util';
import { Icon, IconName, IconSize } from '../../../Icon';
import { dir, useCanvasDirection } from '../../../../hooks/useCanvasDirection';
import { Breakpoints, useMatchMedia } from '../../../../hooks/useMatchMedia';

import styles from '../datepicker.module.scss';

export default function generatePicker<DateType>(
    generateConfig: GenerateConfig<DateType>
) {
    type DatePickerProps = PickerProps<DateType> & {
        status?: InputStatus;
        showTime?: any;
    };

    function getPicker<InnerPickerProps extends DatePickerProps>(
        picker?: OcPickerMode,
        displayName?: string
    ) {
        const Picker = forwardRef<
            DatePickRef<DateType> | CommonPickerMethods,
            InnerPickerProps
        >((props, ref) => {
            const {
                getPopupContainer,
                classNames,
                id,
                shape = 'rectangle' as ShapeType,
                size = 'medium' as SizeType,
                bordered = true,
                popupPlacement,
                placeholder,
                disabled = false,
                status,
                ...rest
            } = props;
            const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
            const mediumScreenActive: boolean = useMatchMedia(
                Breakpoints.Medium
            );
            const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
            const xSmallScreenActive: boolean = useMatchMedia(
                Breakpoints.XSmall
            );
            const htmlDir: string = useCanvasDirection();
            const innerRef = React.useRef<OcPicker<DateType>>(null);
            const { format, showTime } = props as any;

            useImperativeHandle(ref, () => ({
                focus: () => innerRef.current?.focus(),
                blur: () => innerRef.current?.blur(),
            }));

            const additionalProps = {
                showToday: true,
            };

            let additionalOverrideProps: any = {};
            if (picker) {
                additionalOverrideProps.picker = picker;
            }
            const mergedPicker: OcPickerMode = picker || props.picker;

            additionalOverrideProps = {
                ...additionalOverrideProps,
                ...(showTime
                    ? getTimeProps({
                          format,
                          picker: mergedPicker,
                          ...showTime,
                      })
                    : {}),
                ...(mergedPicker === 'time'
                    ? getTimeProps({
                          format,
                          ...(props as any),
                          picker: mergedPicker,
                      })
                    : {}),
            };

            const contextuallyDisabled: DisabledType =
                useContext(DisabledContext);
            const mergedDisabled: boolean = contextuallyDisabled || disabled;

            const contextuallySized: SizeType = useContext(SizeContext);
            const mergedSize = contextuallySized || size;

            const contextuallyShaped: ShapeType = useContext(ShapeContext);
            const mergedShape = contextuallyShaped || shape;

            const getIconSize = (): IconSize => {
                let iconSize: IconSize;
                if (largeScreenActive) {
                    iconSize = IconSize.Small;
                } else if (mediumScreenActive) {
                    iconSize = IconSize.Medium;
                } else if (smallScreenActive) {
                    iconSize = IconSize.Medium;
                } else if (xSmallScreenActive) {
                    iconSize = IconSize.Large;
                }
                return iconSize;
            };

            const pickerSizeToIconSizeMap = new Map<
                typeof mergedSize,
                IconSize
            >([
                ['flex', getIconSize()],
                ['large', IconSize.Large],
                ['medium', IconSize.Medium],
                ['small', IconSize.Small],
            ]);

            const iconColor = (): string => {
                let color: string = 'var(--grey-color-60)';
                if (status === 'error') {
                    color = 'var(--error-color)';
                } else if (status === 'warning') {
                    color = 'var(--warning-color)';
                }
                return color;
            };

            const suffixNode = (
                <>
                    {mergedPicker === 'time' ? (
                        <Icon
                            color={iconColor()}
                            path={IconName.mdiClockOutline}
                            size={pickerSizeToIconSizeMap.get(size)}
                        />
                    ) : (
                        <Icon
                            color={iconColor()}
                            path={IconName.mdiCalendarBlankOutline}
                            size={pickerSizeToIconSizeMap.get(size)}
                        />
                    )}
                </>
            );

            let locale: PickerLocale;

            if (props.locale) {
                locale = props.locale;
            } else {
                locale = enUS;
            }

            return (
                <OcPicker<DateType>
                    ref={innerRef}
                    id={id}
                    placeholder={getPlaceholder(
                        mergedPicker,
                        locale,
                        placeholder
                    )}
                    suffixIcon={suffixNode}
                    dropdownAlign={transPlacement2DropdownAlign(
                        htmlDir as dir,
                        popupPlacement
                    )}
                    clearIcon={
                        <Icon
                            path={IconName.mdiCloseCircle}
                            size={pickerSizeToIconSizeMap.get(size)}
                        />
                    }
                    prevIcon={IconName.mdiChevronLeft}
                    nextIcon={IconName.mdiChevronRight}
                    superPrevIcon={IconName.mdiChevronDoubleLeft}
                    superNextIcon={IconName.mdiChevronDoubleRight}
                    allowClear
                    transitionName={'picker-slide-up'}
                    {...additionalProps}
                    {...rest}
                    {...additionalOverrideProps}
                    locale={locale!.lang}
                    classNames={mergeClasses([
                        {
                            [styles.pickerSmall]:
                                mergedSize === 'flex' && largeScreenActive,
                        },
                        {
                            [styles.pickerMedium]:
                                mergedSize === 'flex' && mediumScreenActive,
                        },
                        {
                            [styles.pickerMedium]:
                                mergedSize === 'flex' && smallScreenActive,
                        },
                        {
                            [styles.pickerLarge]:
                                mergedSize === 'flex' && xSmallScreenActive,
                        },
                        { [styles.pickerLarge]: mergedSize === 'large' },
                        { [styles.pickerMedium]: mergedSize === 'medium' },
                        { [styles.pickerSmall]: mergedSize === 'small' },
                        { [styles.pickerBorderless]: !bordered },
                        {
                            [styles.pickerUnderline]:
                                mergedShape === 'underline',
                        },
                        { [styles.pickerPill]: mergedShape === 'pill' },
                        { [styles.pickerStatusWarning]: status === 'warning' },
                        { [styles.pickerStatusError]: status === 'error' },
                        classNames,
                    ])}
                    getPopupContainer={getPopupContainer}
                    generateConfig={generateConfig}
                    components={Components}
                    direction={htmlDir}
                    disabled={mergedDisabled}
                    shape={mergedShape}
                    size={mergedSize}
                />
            );
        });

        if (displayName) {
            Picker.displayName = displayName;
        }

        return Picker as unknown as PickerComponentClass<InnerPickerProps>;
    }

    const DatePicker = getPicker<DatePickerProps>();
    const WeekPicker = getPicker<Omit<PickerDateProps<DateType>, 'picker'>>(
        'week',
        'WeekPicker'
    );
    const MonthPicker = getPicker<Omit<PickerDateProps<DateType>, 'picker'>>(
        'month',
        'MonthPicker'
    );
    const YearPicker = getPicker<Omit<PickerDateProps<DateType>, 'picker'>>(
        'year',
        'YearPicker'
    );
    const TimePicker = getPicker<Omit<PickerTimeProps<DateType>, 'picker'>>(
        'time',
        'TimePicker'
    );
    const QuarterPicker = getPicker<Omit<PickerTimeProps<DateType>, 'picker'>>(
        'quarter',
        'QuarterPicker'
    );

    return {
        DatePicker,
        WeekPicker,
        MonthPicker,
        YearPicker,
        TimePicker,
        QuarterPicker,
    };
}
