import React, { FC, useContext } from 'react';
import { mergeClasses } from '../../shared/utilities';
import { IcomoonProps, IcomoonSize } from './';
import IcomoonReact from 'icomoon-react';

import styles from './icon.module.scss';

const IconSetContext = React.createContext<object | null>(null);

export const IcomoonProvider = IconSetContext.Provider;

export const Icomoon: FC<IcomoonProps> = ({
    ariaHidden = false,
    classNames,
    color,
    iconName,
    id,
    role = 'presentation',
    size = IcomoonSize.Medium,
    'data-test-id': dataTestId,
}) => {
    const iconClassNames: string = mergeClasses([
        classNames,
        styles.iconWrapper,
    ]);

    return (
        <span
            data-test-id={dataTestId}
            aria-hidden={ariaHidden}
            className={iconClassNames}
            id={id}
            role={role}
        >
            <IconSetContext.Consumer>
                {(iconSet) => (
                    <IcomoonReact
                        iconSet={iconSet}
                        icon={iconName}
                        size={size}
                        color={color}
                    />
                )}
            </IconSetContext.Consumer>
        </span>
    );
};
