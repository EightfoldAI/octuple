import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import DisabledContext, {
  Disabled,
} from '../../../ConfigProvider/DisabledContext';
import {
  ShapeContext,
  Shape,
  SizeContext,
  Size,
} from '../../../ConfigProvider';
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
import LocaleReceiver, {
  useLocaleReceiver,
} from '../../../LocaleProvider/LocaleReceiver';
import enUS from '../Locale/en_US';
import { getPlaceholder, transPlacement2DropdownAlign } from '../util';
import { Icon, IconName, IconSize } from '../../../Icon';
import { dir, useCanvasDirection } from '../../../../hooks/useCanvasDirection';
import { Breakpoints, useMatchMedia } from '../../../../hooks/useMatchMedia';
import { FormItemInputContext } from '../../../Form/Context';
import type { InputStatus } from '../../../../shared/utilities';
import { getMergedStatus, mergeClasses } from '../../../../shared/utilities';

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
        bordered = true,
        classNames,
        clearIconAriaLabelText: defaultClearIconAriaLabelText,
        configContextProps = {
          noDisabledContext: false,
          noShapeContext: false,
          noSizeContext: false,
        },
        disabled = false,
        formItemInput = false,
        getPopupContainer,
        id,
        locale = enUS,
        nowButtonProps,
        nowText: defaultNowText,
        okButtonProps,
        okText: defaultOkText,
        placeholder,
        popupPlacement,
        readonly = false,
        shape = DatePickerShape.Rectangle,
        showNow = true,
        showOk = true,
        showToday = true,
        size = DatePickerSize.Medium,
        status,
        todayButtonProps,
        todayActive = true,
        todayText: defaultTodayText,
        ...rest
      } = props;
      const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
      const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
      const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
      const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);
      const htmlDir: string = useCanvasDirection();
      const innerRef: React.MutableRefObject<OcPicker<DateType>> =
        React.useRef<OcPicker<DateType>>(null);
      const { format, showTime } = props as any;

      useImperativeHandle(ref, () => ({
        focus: () => innerRef.current?.focus(),
        blur: () => innerRef.current?.blur(),
      }));

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
      const mergedFormItemInput: boolean = isFormItemInput || formItemInput;

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

      // ============================ Strings ===========================
      const [pickerLocale] = useLocaleReceiver('DatePicker');
      let mergedLocale: PickerLocale;

      if (props.locale) {
        mergedLocale = props.locale;
      } else {
        mergedLocale = pickerLocale || props.locale;
      }

      const [clearIconAriaLabelText, setClearIconAriaLabelText] =
        useState<string>(defaultClearIconAriaLabelText);
      const [nowText, setNowText] = useState<string>(defaultNowText);
      const [okText, setOkText] = useState<string>(defaultOkText);
      const [todayText, setTodayText] = useState<string>(defaultTodayText);

      // Locs: if the prop isn't provided use the loc defaults.
      // If the mergedLocale is changed, update.
      useEffect(() => {
        setClearIconAriaLabelText(
          props.clearIconAriaLabelText
            ? props.clearIconAriaLabelText
            : mergedLocale.lang!.clear
        );
        setNowText(props.nowText ? props.nowText : mergedLocale.lang!.now);
        setOkText(props.okText ? props.okText : mergedLocale.lang!.ok);
        setTodayText(
          props.todayText ? props.todayText : mergedLocale.lang!.today
        );
      }, [mergedLocale]);

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
        [DatePickerSize.Flex, getIconSize()],
        [DatePickerSize.Large, IconSize.Large],
        [DatePickerSize.Medium, IconSize.Medium],
        [DatePickerSize.Small, IconSize.Small],
      ]);

      const iconColor = (): string => {
        let color: string = 'var(--grey-tertiary-color)';
        if (mergedStatus === 'error') {
          color = 'var(--error-color)';
        } else if (mergedStatus === 'warning') {
          color = 'var(--warning-color)';
        }
        return color;
      };

      return (
        <LocaleReceiver componentName={'DatePicker'} defaultLocale={enUS}>
          {(contextLocale: PickerLocale) => {
            const locale = { ...contextLocale, ...mergedLocale };

            return (
              <OcPicker<DateType>
                ref={innerRef}
                bordered={bordered}
                clearIconAriaLabelText={clearIconAriaLabelText}
                id={id}
                placeholder={getPlaceholder(mergedPicker, locale, placeholder)}
                suffixIcon={
                  mergedPicker === 'time' ? (
                    <Icon
                      color={iconColor()}
                      path={
                        readonly ? IconName.mdiLock : IconName.mdiClockOutline
                      }
                      size={pickerSizeToIconSizeMap.get(mergedSize)}
                    />
                  ) : (
                    <Icon
                      color={iconColor()}
                      path={
                        readonly
                          ? IconName.mdiLock
                          : IconName.mdiCalendarBlankOutline
                      }
                      size={pickerSizeToIconSizeMap.get(mergedSize)}
                    />
                  )
                }
                dropdownAlign={transPlacement2DropdownAlign(
                  htmlDir as dir,
                  popupPlacement
                )}
                popupPlacement={popupPlacement}
                clearIcon={
                  <Icon
                    path={IconName.mdiClose}
                    size={pickerSizeToIconSizeMap.get(mergedSize)}
                  />
                }
                nowButtonProps={nowButtonProps}
                nowText={nowText}
                okButtonProps={okButtonProps}
                okText={okText}
                showNow={showNow}
                showOk={showOk}
                showToday={showToday}
                todayButtonProps={todayButtonProps}
                todayActive={todayActive}
                todayText={todayText}
                prevIcon={IconName.mdiChevronLeft}
                nextIcon={IconName.mdiChevronRight}
                superPrevIcon={IconName.mdiChevronDoubleLeft}
                superNextIcon={IconName.mdiChevronDoubleRight}
                allowClear
                {...rest}
                {...additionalOverrideProps}
                locale={locale!.lang}
                classNames={mergeClasses([
                  {
                    [styles.pickerSmall]:
                      mergedSize === DatePickerSize.Flex && largeScreenActive,
                  },
                  {
                    [styles.pickerMedium]:
                      mergedSize === DatePickerSize.Flex && mediumScreenActive,
                  },
                  {
                    [styles.pickerMedium]:
                      mergedSize === DatePickerSize.Flex && smallScreenActive,
                  },
                  {
                    [styles.pickerLarge]:
                      mergedSize === DatePickerSize.Flex && xSmallScreenActive,
                  },
                  {
                    [styles.pickerLarge]: mergedSize === DatePickerSize.Large,
                  },
                  {
                    [styles.pickerMedium]: mergedSize === DatePickerSize.Medium,
                  },
                  {
                    [styles.pickerSmall]: mergedSize === DatePickerSize.Small,
                  },
                  { [styles.pickerBorderless]: !bordered },
                  {
                    [styles.pickerUnderline]:
                      mergedShape === DatePickerShape.Underline,
                  },
                  {
                    [styles.pickerPill]: mergedShape === DatePickerShape.Pill,
                  },
                  {
                    [styles.pickerStatusWarning]: mergedStatus === 'warning',
                  },
                  {
                    [styles.pickerStatusError]: mergedStatus === 'error',
                  },
                  {
                    [styles.pickerStatusSuccess]: mergedStatus === 'success',
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
                readonly={readonly}
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
