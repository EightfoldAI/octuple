import React, { FC } from 'react';
import { PopupProps, PopupRef, PopupSize, PopupTheme } from './Popup.types';
import { Tooltip, TooltipSize, TooltipType } from '../Tooltip';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { mergeClasses, uniqueId } from '../../shared/utilities';

import styles from './popup.module.scss';

export const Popup: FC<PopupProps> = React.forwardRef<PopupRef, PopupProps>(
  (
    {
      classNames,
      closeOnPopupClick = false,
      id,
      showPopup,
      size = PopupSize.Medium,
      tabIndex = 0,
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

    return (
      <Tooltip
        {...rest}
        classNames={popupClassNames}
        closeOnTooltipClick={closeOnPopupClick}
        id={popupId}
        ref={ref}
        showTooltip={showPopup}
        size={popupSizeToTooltipSizeMap.get(size)}
        tabIndex={tabIndex}
        tooltipStyle={popupStyle}
        trigger={trigger}
        type={TooltipType.Popup}
      />
    );
  }
);
