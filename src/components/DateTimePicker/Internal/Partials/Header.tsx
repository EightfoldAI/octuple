import React, { useContext } from 'react';
import { HeaderProps } from './Partial.types';
import PartialContext from '../PartialContext';
import { ButtonSize, NeutralButton } from '../../../Button';
import { IconName } from '../../../Icon';
import { Size } from '../../../ConfigProvider';
import { DatePickerSize } from '../OcPicker.types';

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
                <NeutralButton
                    classNames={'picker-header-super-prev-btn'}
                    iconProps={{
                        path: superPrevIcon,
                    }}
                    onClick={onSuperPrev}
                    size={datePickerSizeToButtonSizeMap.get(size)}
                    style={hidePrevBtn ? HIDDEN_STYLE : {}}
                />
            )}
            {onPrev && (
                <NeutralButton
                    classNames={'picker-header-prev-btn'}
                    iconProps={{
                        path: prevIcon,
                    }}
                    onClick={onPrev}
                    size={datePickerSizeToButtonSizeMap.get(size)}
                    style={hidePrevBtn ? HIDDEN_STYLE : {}}
                />
            )}
            <div className={styles.pickerHeaderView}>{children}</div>
            {onNext && (
                <NeutralButton
                    classNames={'picker-header-next-btn'}
                    iconProps={{
                        path: nextIcon,
                    }}
                    onClick={onNext}
                    size={datePickerSizeToButtonSizeMap.get(size)}
                    style={hideNextBtn ? HIDDEN_STYLE : {}}
                />
            )}
            {onSuperNext && (
                <NeutralButton
                    classNames={'picker-header-super-next-btn'}
                    iconProps={{
                        path: superNextIcon,
                    }}
                    onClick={onSuperNext}
                    size={datePickerSizeToButtonSizeMap.get(size)}
                    style={hideNextBtn ? HIDDEN_STYLE : {}}
                />
            )}
        </div>
    );
};
