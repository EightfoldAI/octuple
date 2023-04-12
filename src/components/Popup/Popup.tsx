import React, { FC } from 'react';
import { PopupProps, PopupRef, PopupSize, PopupTheme } from './Popup.types';
import { Tooltip, TooltipSize, TooltipTheme, TooltipType } from '../Tooltip';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { mergeClasses, uniqueId } from '../../shared/utilities';

import styles from './popup.module.scss';

export const Popup: FC<PopupProps> = React.forwardRef<PopupRef, PopupProps>(
  (
    {
      animate = true,
      bordered = false,
      classNames,
      closeOnPopupClick = false,
      closeOnReferenceClick = true,
      dropShadow = true,
      id,
      popupOnKeydown,
      referenceOnClick,
      referenceOnKeydown,
      showPopup,
      size = PopupSize.Medium,
      tabIndex = 0,
      theme = PopupTheme.light,
      trigger = 'click',
      popupStyle,
      ...rest
    },
    ref: React.ForwardedRef<PopupRef>
  ) => {
    const htmlDir: string = useCanvasDirection();
    const popupId: string = !!id ? id : uniqueId('popup-');
    const popupClassNames: string = mergeClasses([
      styles.popup,
      { [styles.small]: size === PopupSize.Small },
      { [styles.medium]: size === PopupSize.Medium },
      { [styles.large]: size === PopupSize.Large },
      { [styles.popupRtl]: htmlDir === 'rtl' },
      classNames,
    ]);

    const popupSizeToTooltipSizeMap = new Map<PopupSize, TooltipSize>([
      [PopupSize.Large, TooltipSize.Large],
      [PopupSize.Medium, TooltipSize.Medium],
      [PopupSize.Small, TooltipSize.Small],
    ]);

    const popupThemeToTooltipThemeMap = new Map<PopupTheme, TooltipTheme>([
      [PopupTheme.dark, TooltipTheme.dark],
      [PopupTheme.light, TooltipTheme.light],
    ]);

    return (
      <Tooltip
        {...rest}
        animate={animate}
        bordered={bordered}
        classNames={popupClassNames}
        closeOnTooltipClick={closeOnPopupClick}
        closeOnReferenceClick={closeOnReferenceClick}
        dropShadow={dropShadow}
        id={popupId}
        ref={ref}
        referenceOnClick={referenceOnClick}
        referenceOnKeydown={referenceOnKeydown}
        showTooltip={showPopup}
        size={popupSizeToTooltipSizeMap.get(size)}
        tabIndex={tabIndex}
        theme={popupThemeToTooltipThemeMap.get(theme)}
        tooltipOnKeydown={popupOnKeydown}
        tooltipStyle={popupStyle}
        trigger={trigger}
        type={TooltipType.Popup}
      />
    );
  }
);
