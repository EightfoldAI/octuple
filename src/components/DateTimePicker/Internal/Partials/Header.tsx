import React from 'react';
import { HeaderProps } from './Partial.types';
import PartialContext from '../PartialContext';
import { ButtonShape, ButtonSize, SystemUIButton } from '../../../Button';
import { IconName } from '../../../Icon';
import { Size } from '../../../ConfigProvider';
import { DatePickerSize } from '../OcPicker.types';
import { useCanvasDirection } from '../../../../hooks/useCanvasDirection';

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
          classNames={'picker-header-super-prev-btn'}
          iconProps={{
            path: superPrevIcon,
            rotate: htmlDir === 'rtl' ? 180 : 0,
          }}
          onClick={onSuperPrev}
          shape={ButtonShape.Round}
          size={datePickerSizeToButtonSizeMap.get(size)}
          style={hidePrevBtn ? HIDDEN_STYLE : {}}
        />
      )}
      {onPrev && (
        <SystemUIButton
          classNames={'picker-header-prev-btn'}
          iconProps={{
            path: prevIcon,
            rotate: htmlDir === 'rtl' ? 180 : 0,
          }}
          onClick={onPrev}
          shape={ButtonShape.Round}
          size={datePickerSizeToButtonSizeMap.get(size)}
          style={hidePrevBtn ? HIDDEN_STYLE : {}}
        />
      )}
      <div className={styles.pickerHeaderView}>{children}</div>
      {onNext && (
        <SystemUIButton
          classNames={'picker-header-next-btn'}
          iconProps={{
            path: nextIcon,
            rotate: htmlDir === 'rtl' ? 180 : 0,
          }}
          onClick={onNext}
          shape={ButtonShape.Round}
          size={datePickerSizeToButtonSizeMap.get(size)}
          style={hideNextBtn ? HIDDEN_STYLE : {}}
        />
      )}
      {onSuperNext && (
        <SystemUIButton
          classNames={'picker-header-super-next-btn'}
          iconProps={{
            path: superNextIcon,
            rotate: htmlDir === 'rtl' ? 180 : 0,
          }}
          onClick={onSuperNext}
          shape={ButtonShape.Round}
          size={datePickerSizeToButtonSizeMap.get(size)}
          style={hideNextBtn ? HIDDEN_STYLE : {}}
        />
      )}
    </div>
  );
};
