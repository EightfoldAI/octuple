import React, { FC, ReactNode, Ref } from 'react';
import { Icon, IconName } from '../Icon';
import { PersistentBarsProps, PersistentBarType } from './PersistentBar.types';
import { mergeClasses } from '../../shared/utilities';
import {
    PrimaryButton,
    DefaultButton,
    SecondaryButton,
    ButtonType,
    InternalButtonProps,
} from '../Button';
import { Pagination, PaginationLayoutOptions } from '../Pagination';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';

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
        const htmlDir: string = useCanvasDirection();

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
            { [styles.persistentBarRtl]: htmlDir === 'rtl' },
        ]);

        const getIconName = (): IconName => {
            if (icon) {
                return icon;
            }
            switch (type) {
                case PersistentBarType.topBarWithText:
                    return htmlDir === 'rtl'
                        ? IconName.mdiArrowRight
                        : IconName.mdiArrowLeft;
                default:
                    return null;
            }
        };

        const getTexts = (): ReactNode => {
            switch (type) {
                case PersistentBarType.bottomBarWithText:
                case PersistentBarType.topBarWithText:
                    return (
                        <div>
                            <h4>{title}</h4>
                            <span className={styles.content}>{content}</span>
                        </div>
                    );
                default:
                    return null;
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
                                        classNames={styles.DefaultButton}
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
                            <div>{getTexts()}</div>
                            <Pagination
                                total={paginationTotal}
                                layout={[
                                    PaginationLayoutOptions.Previous,
                                    PaginationLayoutOptions.Pager,
                                    PaginationLayoutOptions.Next,
                                    PaginationLayoutOptions.Simplified,
                                ]}
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
                    return null;
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
                    buttonMenuProps.map((button: InternalButtonProps) => {
                        if (button.type === ButtonType.Secondary) {
                            return (
                                <SecondaryButton
                                    iconProps={button.iconProps}
                                    {...button}
                                />
                            );
                        } else return null;
                    })}
                {getBarLayout()}
            </div>
        );
    }
);
