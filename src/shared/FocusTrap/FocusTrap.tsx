import React, { FC } from 'react';
import { useFocusTrap } from './hooks/useFocusTrap';
import { OcBaseProps } from '../../components/OcBase';

interface FocusTrapProps extends OcBaseProps<HTMLDivElement> {
    trap: boolean;
}

export const FocusTrap: FC<FocusTrapProps> = ({
    trap = true,
    children,
    classNames,
    'data-test-id': dataTestId,
    ...rest
}) => {
    const focusRef = useFocusTrap(trap);
    return (
        <div
            ref={focusRef}
            className={classNames}
            data-test-id={dataTestId}
            {...rest}
        >
            {children}
        </div>
    );
};
