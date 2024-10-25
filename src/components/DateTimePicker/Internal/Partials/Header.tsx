import React from 'react';
import { HeaderProps } from './Partial.types';
import PartialContext from '../PartialContext';
import { ButtonShape, ButtonSize, SystemUIButton } from '../../../Button';
import { IconName } from '../../../Icon';
import { Size } from '../../../ConfigProvider';
import { DatePickerSize } from '../OcPicker.types';
import { useCanvasDirection } from '../../../../hooks/useCanvasDirection';
import { handlePickerKeyDown } from '../Utils/uiUtil';

import styles from '../ocpicker.module.scss';

const HIDDEN_STYLE: React.CSSProperties = {
  visibility: 'hidden',
};

export const Header = ({
  children,
  nextIcon = IconName.mdiChevronRight,
  onNext,
  onPrev,
  onSuperNext,
  onSuperPrev,
  prevIcon = IconName.mdiChevronLeft,
  size = DatePickerSize.Medium,
  superNextIcon = IconName.mdiChevronDoubleRight,
  superPrevIcon = IconName.mdiChevronDoubleLeft,
}: HeaderProps): JSX.Element => {
  const htmlDir: string = useCanvasDirection();

  const { hideNextBtn, hidePrevBtn } = React.useContext(PartialContext);

  const datePickerSizeToButtonSizeMap = new Map<
    DatePickerSize | Size,
    ButtonSize | Size
  >([
    [DatePickerSize.Flex, ButtonSize.Flex],
    [DatePickerSize.Large, ButtonSize.Large],
    [DatePickerSize.Medium, ButtonSize.Medium],
    [DatePickerSize.Small, ButtonSize.Small],
  ]);

  return (
    <div className={styles.pickerHeader}>
      {onSuperPrev && (
        <SystemUIButton
          data-testid="picker-header-super-prev-btn"
          ariaLabel="Previous year"
          classNames={'picker-header-super-prev-btn'}
          iconProps={{
            path: superPrevIcon,
            rotate: htmlDir === 'rtl' ? 180 : 0,
          }}
          onClick={onSuperPrev}
          onKeyDown={handlePickerKeyDown(onSuperPrev)}
          shape={ButtonShape.Round}
          size={datePickerSizeToButtonSizeMap.get(size)}
          style={hidePrevBtn ? HIDDEN_STYLE : {}}
        />
      )}
      {onPrev && (
        <SystemUIButton
          data-testid={'picker-header-prev-btn'}
          ariaLabel="Previous month"
          classNames={'picker-header-prev-btn'}
          iconProps={{
            path: prevIcon,
            rotate: htmlDir === 'rtl' ? 180 : 0,
          }}
          onClick={onPrev}
          onKeyDown={handlePickerKeyDown(onPrev)}
          shape={ButtonShape.Round}
          size={datePickerSizeToButtonSizeMap.get(size)}
          style={hidePrevBtn ? HIDDEN_STYLE : {}}
        />
      )}
      <div className={styles.pickerHeaderView}>{children}</div>
      {onNext && (
        <SystemUIButton
          data-testid={'picker-header-next-btn'}
          ariaLabel="Next month"
          classNames={'picker-header-next-btn'}
          iconProps={{
            path: nextIcon,
            rotate: htmlDir === 'rtl' ? 180 : 0,
          }}
          onClick={onNext}
          onKeyDown={handlePickerKeyDown(onNext)}
          shape={ButtonShape.Round}
          size={datePickerSizeToButtonSizeMap.get(size)}
          style={hideNextBtn ? HIDDEN_STYLE : {}}
        />
      )}
      {onSuperNext && (
        <SystemUIButton
          data-testid="picker-header-super-next-btn"
          ariaLabel="Next year"
          classNames={'picker-header-super-next-btn'}
          iconProps={{
            path: superNextIcon,
            rotate: htmlDir === 'rtl' ? 180 : 0,
          }}
          onClick={onSuperNext}
          onKeyDown={handlePickerKeyDown(onSuperNext)}
          shape={ButtonShape.Round}
          size={datePickerSizeToButtonSizeMap.get(size)}
          style={hideNextBtn ? HIDDEN_STYLE : {}}
        />
      )}
    </div>
  );
};
