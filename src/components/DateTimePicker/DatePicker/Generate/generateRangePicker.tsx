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
import OcRangePicker from '../../Internal/OcRangePicker';
import type { GenerateConfig } from '../../Internal/Generate';
import { Components } from './Generate.types';
import type {
    CommonPickerMethods,
    PickerComponentClass,
    PickerLocale,
    RangePickerProps,
} from './Generate.types';
import { getTimeProps } from './Generate';
import enUS from '../Locale/en_US';
import { getRangePlaceholder, transPlacement2DropdownAlign } from '../util';
import { Icon, IconName, IconSize } from '../../../Icon';
import { dir, useCanvasDirection } from '../../../../hooks/useCanvasDirection';
import { Breakpoints, useMatchMedia } from '../../../../hooks/useMatchMedia';

import styles from '../datepicker.module.scss';

export default function generateRangePicker<DateType>(
    generateConfig: GenerateConfig<DateType>
): PickerComponentClass<RangePickerProps<DateType>> {
    type InternalRangePickerProps = RangePickerProps<DateType> & {};

    const RangePicker = forwardRef<
        InternalRangePickerProps | CommonPickerMethods,
        RangePickerProps<DateType>
    >((props, ref) => {
        const {
            getPopupContainer,
            classNames,
            id,
            popupPlacement,
            shape = 'rectangle' as ShapeType,
            size = 'medium' as SizeType,
            disabled = false,
            bordered = true,
            placeholder,
            status,
            ...rest
        } = props;
        const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
        const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
        const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
        const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);
        const innerRef = React.useRef<OcRangePicker<DateType>>(null);
        const htmlDir: string = useCanvasDirection();
        const { format, showTime, picker } = props as any;

        let additionalOverrideProps: any = {};
        additionalOverrideProps = {
            ...additionalOverrideProps,
            ...(showTime ? getTimeProps({ format, picker, ...showTime }) : {}),
            ...(picker === 'time'
                ? getTimeProps({ format, ...props, picker })
                : {}),
        };

        const contextuallyDisabled: DisabledType = useContext(DisabledContext);
        const mergedDisabled: DisabledType | [boolean, boolean] =
            contextuallyDisabled || disabled;

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

        const pickerSizeToIconSizeMap = new Map<typeof mergedSize, IconSize>([
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
                {picker === 'time' ? (
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

        useImperativeHandle(ref, () => ({
            focus: () => innerRef.current?.focus(),
            blur: () => innerRef.current?.blur(),
        }));

        return (
            <OcRangePicker<DateType>
                id={id}
                separator={
                    <span aria-label="to" className={styles.pickerSeparator}>
                        <Icon
                            color="var(--grey-color-60)"
                            path={IconName.mdiArrowRightThin}
                            size={IconSize.Medium}
                        />
                    </span>
                }
                disabled={mergedDisabled}
                ref={innerRef}
                dropdownAlign={transPlacement2DropdownAlign(
                    htmlDir as dir,
                    popupPlacement
                )}
                placeholder={getRangePlaceholder(picker, locale, placeholder)}
                suffixIcon={suffixNode}
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
                {...rest}
                {...additionalOverrideProps}
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
                    { [styles.pickerUnderline]: mergedShape === 'underline' },
                    { [styles.pickerPill]: mergedShape === 'pill' },
                    { [styles.pickerStatusWarning]: status === 'warning' },
                    { [styles.pickerStatusError]: status === 'error' },
                    classNames,
                ])}
                locale={locale!.lang}
                getPopupContainer={getPopupContainer}
                generateConfig={generateConfig}
                components={Components}
                direction={htmlDir}
                shape={mergedShape}
                size={mergedSize}
            />
        );
    });

    return RangePicker as unknown as PickerComponentClass<
        RangePickerProps<DateType>
    >;
}
