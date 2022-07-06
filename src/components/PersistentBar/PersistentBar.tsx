import React, { FC, ReactNode, Ref } from 'react';
import { Icon, IconName } from '../Icon';
import { PersistentBarsProps, PersistentBarType } from './PersistentBar.types';
import { mergeClasses } from '../../shared/utilities';
import {
    PrimaryButton,
    DefaultButton,
    SecondaryButton,
    ButtonType,
} from '../Button';
import { Pagination } from '../Pagination';

import styles from './persistentBar.module.scss';

export const PersistentBar: FC<PersistentBarsProps> = React.forwardRef(
    (
        {
            buttonMenuProps,
            content,
            icon,
            type = PersistentBarType.bottomBarWithText,
            closable,
            onClose,
            style,
            classNames,
            closeIcon = IconName.mdiClose,
            closeButtonProps,
            actionButtonOneProps,
            actionButtonTwoProps,
            actionButtonThreeProps,
            role = 'presentation',
            title,
            paginationArgs,
            paginationTotal,
            ...rest
        },
        ref: Ref<HTMLDivElement>
    ) => {
        const persistentBarClasses: string = mergeClasses([
            styles.persistentBar,
            classNames,
            {
                [styles.bottomWithText]:
                    type === PersistentBarType.bottomBarWithText,
            },
            {
                [styles.bottomSecondaryButtons]:
                    type === PersistentBarType.bottomBarSecondaryButtons,
            },
            {
                [styles.bottomLeftAlign]:
                    type === PersistentBarType.bottomBarButtonsOnLeft,
            },
            {
                [styles.topButtonMenu]:
                    type === PersistentBarType.topBarButtons,
            },
            { [styles.topWithText]: type === PersistentBarType.topBarWithText },
            {
                [styles.topPagination]:
                    type === PersistentBarType.topBarPagination,
            },
        ]);

        const getIconName = (): IconName => {
            if (icon) {
                return icon;
            }
            switch (type) {
                case PersistentBarType.topBarWithText:
                    return IconName.mdiArrowLeft;
            }
        };

        const getTexts = (): ReactNode => {
            switch (type) {
                case PersistentBarType.bottomBarWithText:
                case PersistentBarType.topBarWithText:
                    return (
                        <div>
                            <h4 style={{ margin: '0' }}>{title}</h4>
                            <span
                                style={{
                                    fontFamily: 'Source Sans Pro',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    lineHeight: '24px',
                                    opacity: '50%',
                                }}
                            >
                                {content}
                            </span>
                        </div>
                    );
            }
        };

        const getBarLayout = (): ReactNode => {
            switch (type) {
                case PersistentBarType.bottomBarWithText:
                    return (
                        <>
                            {getTexts()}
                            <div>
                                {actionButtonTwoProps && (
                                    <DefaultButton
                                        {...actionButtonTwoProps}
                                        style={{ marginRight: '16px' }}
                                    />
                                )}
                                {actionButtonOneProps && (
                                    <PrimaryButton {...actionButtonOneProps} />
                                )}
                            </div>
                        </>
                    );
                case PersistentBarType.bottomBarSecondaryButtons:
                    return (
                        <>
                            {actionButtonOneProps && (
                                <SecondaryButton {...actionButtonOneProps} />
                            )}
                            {actionButtonTwoProps && (
                                <SecondaryButton {...actionButtonTwoProps} />
                            )}
                            {actionButtonThreeProps && (
                                <SecondaryButton {...actionButtonThreeProps} />
                            )}
                        </>
                    );
                case PersistentBarType.bottomBarButtonsOnLeft:
                    return (
                        <>
                            {actionButtonOneProps && (
                                <DefaultButton {...actionButtonOneProps} />
                            )}
                            {actionButtonTwoProps && (
                                <DefaultButton {...actionButtonTwoProps} />
                            )}
                            {actionButtonThreeProps && (
                                <PrimaryButton {...actionButtonThreeProps} />
                            )}
                        </>
                    );
                case PersistentBarType.topBarWithText:
                    return (
                        <>
                            <Icon
                                path={getIconName()}
                                classNames={styles.icon}
                            />
                            {getTexts()}
                            <Pagination
                                total={paginationTotal}
                                {...paginationArgs}
                            />
                        </>
                    );
                case PersistentBarType.topBarPagination:
                    return (
                        <>
                            <Pagination
                                total={paginationTotal}
                                {...paginationArgs}
                            />
                        </>
                    );
                default:
                    break;
            }
        };

        return (
            <div
                {...rest}
                className={persistentBarClasses}
                ref={ref}
                style={style}
                role={role}
            >
                {buttonMenuProps &&
                    buttonMenuProps.map((button: Object) => {
                        if (button.type === ButtonType.Secondary)
                            return (
                                <SecondaryButton
                                    iconProps={button.iconProps}
                                    {...button}
                                />
                            );
                    })}
                {getBarLayout()}
            </div>
        );
    }
);
