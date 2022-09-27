import React, { forwardRef, useContext, useImperativeHandle } from 'react';
import DisabledContext, {
    Disabled,
} from '../../../ConfigProvider/DisabledContext';
import {
    ShapeContext,
    Shape,
    SizeContext,
    Size,
} from '../../../ConfigProvider';
import { mergeClasses } from '../../../../shared/utilities';
import type { InputStatus } from '../../../../shared/utilities';
import OcPicker from '../../Internal/OcPicker';
import type { GenerateConfig } from '../../Internal/Generate';
import {
    DatePickerShape,
    DatePickerSize,
    OcPickerMode,
} from '../../Internal/OcPicker.types';
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
import LocaleReceiver from '../../../LocaleProvider/LocaleReceiver';
import enUS from '../Locale/en_US';
import { getPlaceholder, transPlacement2DropdownAlign } from '../util';
import { Icon, IconName, IconSize } from '../../../Icon';
import { dir, useCanvasDirection } from '../../../../hooks/useCanvasDirection';
import { Breakpoints, useMatchMedia } from '../../../../hooks/useMatchMedia';
import { FormItemInputContext } from '../../../Form/Context';
import { getMergedStatus } from '../../../../shared/utilities';

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
                configContextProps = {
                    noDisabledContext: false,
                    noShapeContext: false,
                    noSizeContext: false,
                },
                formItemInput = false,
                id,
                shape = DatePickerShape.Rectangle,
                size = DatePickerSize.Medium,
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

            const { status: contextStatus, isFormItemInput } =
                useContext(FormItemInputContext);
            const mergedStatus = getMergedStatus(contextStatus, status);
            const mergedFormItemInput: boolean =
                isFormItemInput || formItemInput;

            const contextuallyDisabled: Disabled = useContext(DisabledContext);
            const mergedDisabled: boolean = configContextProps.noDisabledContext
                ? disabled
                : contextuallyDisabled || disabled;

            const contextuallyShaped: Shape = useContext(ShapeContext);
            const mergedShape = configContextProps.noShapeContext
                ? shape
                : contextuallyShaped || shape;

            const contextuallySized: Size = useContext(SizeContext);
            const mergedSize = configContextProps.noSizeContext
                ? size
                : contextuallySized || size;

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
                [DatePickerSize.Flex, getIconSize()],
                [DatePickerSize.Large, IconSize.Large],
                [DatePickerSize.Medium, IconSize.Medium],
                [DatePickerSize.Small, IconSize.Small],
            ]);

            const iconColor = (): string => {
                let color: string = 'var(--grey-color-60)';
                if (mergedStatus === 'error') {
                    color = 'var(--error-color)';
                } else if (mergedStatus === 'warning') {
                    color = 'var(--warning-color)';
                }
                return color;
            };

            return (
                <LocaleReceiver
                    componentName={'DatePicker'}
                    defaultLocale={enUS}
                >
                    {(contextLocale: PickerLocale) => {
                        const locale = { ...contextLocale, ...props.locale };

                        return (
                            <OcPicker<DateType>
                                ref={innerRef}
                                bordered={bordered}
                                id={id}
                                placeholder={getPlaceholder(
                                    mergedPicker,
                                    locale,
                                    placeholder
                                )}
                                suffixIcon={
                                    mergedPicker === 'time' ? (
                                        <Icon
                                            color={iconColor()}
                                            path={IconName.mdiClockOutline}
                                            size={pickerSizeToIconSizeMap.get(
                                                mergedSize
                                            )}
                                        />
                                    ) : (
                                        <Icon
                                            color={iconColor()}
                                            path={
                                                IconName.mdiCalendarBlankOutline
                                            }
                                            size={pickerSizeToIconSizeMap.get(
                                                mergedSize
                                            )}
                                        />
                                    )
                                }
                                dropdownAlign={transPlacement2DropdownAlign(
                                    htmlDir as dir,
                                    popupPlacement
                                )}
                                clearIcon={
                                    <Icon
                                        path={IconName.mdiCloseCircle}
                                        size={pickerSizeToIconSizeMap.get(
                                            mergedSize
                                        )}
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
                                            mergedSize ===
                                                DatePickerSize.Flex &&
                                            largeScreenActive,
                                    },
                                    {
                                        [styles.pickerMedium]:
                                            mergedSize ===
                                                DatePickerSize.Flex &&
                                            mediumScreenActive,
                                    },
                                    {
                                        [styles.pickerMedium]:
                                            mergedSize ===
                                                DatePickerSize.Flex &&
                                            smallScreenActive,
                                    },
                                    {
                                        [styles.pickerLarge]:
                                            mergedSize ===
                                                DatePickerSize.Flex &&
                                            xSmallScreenActive,
                                    },
                                    {
                                        [styles.pickerLarge]:
                                            mergedSize === DatePickerSize.Large,
                                    },
                                    {
                                        [styles.pickerMedium]:
                                            mergedSize ===
                                            DatePickerSize.Medium,
                                    },
                                    {
                                        [styles.pickerSmall]:
                                            mergedSize === DatePickerSize.Small,
                                    },
                                    { [styles.pickerBorderless]: !bordered },
                                    {
                                        [styles.pickerUnderline]:
                                            mergedShape ===
                                            DatePickerShape.Underline,
                                    },
                                    {
                                        [styles.pickerPill]:
                                            mergedShape ===
                                            DatePickerShape.Pill,
                                    },
                                    {
                                        [styles.pickerStatusWarning]:
                                            mergedStatus === 'warning',
                                    },
                                    {
                                        [styles.pickerStatusError]:
                                            mergedStatus === 'error',
                                    },
                                    {
                                        [styles.pickerStatusSuccess]:
                                            mergedStatus === 'success',
                                    },
                                    { [styles.pickerRtl]: htmlDir === 'rtl' },
                                    { ['in-form-item']: mergedFormItemInput },
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
                    }}
                </LocaleReceiver>
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
