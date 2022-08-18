import React, { forwardRef, useContext, useImperativeHandle } from 'react';
import DisabledContext, {
    DisabledType,
} from '../../../ConfigProvider/DisabledContext';
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
            size = 'Small',
            disabled = false,
            bordered = true,
            placeholder,
            status,
            ...rest
        } = props;

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

        const pickerSizeToIconSizeMap = new Map<typeof size, IconSize>([
            ['Large', IconSize.Large],
            ['Medium', IconSize.Small],
            ['Small', IconSize.XSmall],
        ]);

        const iconColor = (): string => {
            let color: string = '#69717f';
            if (status === 'error') {
                color = '#993838';
            } else if (status === 'warning') {
                color = '#9d6309';
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
                            color="#69717f"
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
                    { [styles.pickerLarge]: size === 'Large' },
                    { [styles.pickerMedium]: size === 'Medium' },
                    { [styles.pickerSmall]: size === 'Small' },
                    { [styles.pickerBorderless]: !bordered },
                    { [styles.pickerStatusWarning]: status === 'warning' },
                    { [styles.pickerStatusError]: status === 'error' },
                    classNames,
                ])}
                locale={locale!.lang}
                getPopupContainer={getPopupContainer}
                generateConfig={generateConfig}
                components={Components}
                direction={htmlDir}
                size={size}
            />
        );
    });

    return RangePicker as unknown as PickerComponentClass<
        RangePickerProps<DateType>
    >;
}
