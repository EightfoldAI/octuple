import React from 'react';
import { HeaderProps } from './Partial.types';
import PartialContext from '../PartialContext';
import { ButtonSize, NeutralButton } from '../../../Button';
import { IconName } from '../../../Icon';

import styles from '../picker.module.scss';

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
}: HeaderProps): JSX.Element => {
    const { hideNextBtn, hidePrevBtn } = React.useContext(PartialContext);

    return (
        <div className={styles.pickerHeader}>
            {onSuperPrev && (
                <NeutralButton
                    classNames={'picker-header-super-prev-btn'}
                    iconProps={{
                        path: superPrevIcon,
                    }}
                    onClick={onSuperPrev}
                    size={ButtonSize.Small}
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
                    size={ButtonSize.Small}
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
                    size={ButtonSize.Small}
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
                    size={ButtonSize.Small}
                    style={hideNextBtn ? HIDDEN_STYLE : {}}
                />
            )}
        </div>
    );
};
