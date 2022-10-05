import React from 'react';
import { HeaderProps } from './Partial.types';
import PartialContext from '../PartialContext';
import { ButtonSize, SystemUIButton } from '../../../Button';
import { IconName } from '../../../Icon';
import { Size } from '../../../ConfigProvider';
import { DatePickerSize } from '../OcPicker.types';
import { useCanvasDirection } from '../../../../hooks/useCanvasDirection';

import styles from '../ocpicker.module.scss';

const HIDDEN_STYLE: React.CSSProperties = {
    visibility: 'hidden',
};

export const Header = ({
    prevIcon = IconName.mdiChevronLeft,
    nextIcon = IconName.mdiChevronRight,
    superPrevIcon = IconName.mdiChevronDoubleLeft,
    superNextIcon = IconName.mdiChevronDoubleRight,
    onSuperPrev,
    onSuperNext,
    onPrev,
    onNext,
    children,
    size = DatePickerSize.Medium,
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
                    size={datePickerSizeToButtonSizeMap.get(size)}
                    style={hideNextBtn ? HIDDEN_STYLE : {}}
                />
            )}
        </div>
    );
};
