import React, { FC, Ref, useContext } from 'react';
import { CardProps, CardSize, CardType } from './Card.types';
import { mergeClasses } from '../../shared/utilities';
import { ButtonShape, TwoStateButton } from '../Button';
import { SizeContext, Size } from '../ConfigProvider';
import { Icon, IconName, IconSize } from '../Icon';
import { Stack } from '../Stack';
import styles from './card.module.scss';
import { Pill } from '../Pills';
import { List } from '../List';
import { Breakpoints, useMatchMedia } from '../../hooks/useMatchMedia';

export const Card: FC<CardProps> = React.forwardRef(
    (
        {
            avatar,
            body,
            bodyClassNames,
            bodyListOneProps,
            bodyListTwoProps,
            children,
            configContextProps = {
                noDisabledContext: false,
                noSizeContext: false,
            },
            disabled = false,
            footer,
            footerClassNames,
            footerProps,
            header,
            headerButtonProps,
            headerClassNames,
            headerIcon,
            headerTitle,
            height,
            icon,
            name,
            size = CardSize.Medium,
            style,
            subHeaderProps,
            type = CardType.list,
            width,
            ...rest
        },
        ref: Ref<HTMLDivElement>
    ) => {
        const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
        const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
        const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
        const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);

        const contextuallySized: Size = useContext(SizeContext);
        const mergedSize = configContextProps.noSizeContext
            ? size
            : contextuallySized || size;
        const cardClasses: string = mergeClasses([
            styles.card,
            {
                [styles.cardSmall]:
                    mergedSize === CardSize.Flex && largeScreenActive,
            },
            {
                [styles.cardMedium]:
                    mergedSize === CardSize.Flex && mediumScreenActive,
            },
            {
                [styles.cardMedium]:
                    mergedSize === CardSize.Flex && smallScreenActive,
            },
            {
                [styles.cardLarge]:
                    mergedSize === CardSize.Flex && xSmallScreenActive,
            },
            { [styles.list]: type === CardType.list },
            { [styles.cardLarge]: mergedSize === CardSize.Large },
            { [styles.cardMedium]: mergedSize === CardSize.Medium },
            { [styles.cardSmall]: mergedSize === CardSize.Small },
        ]);

        const headerClasses: string = mergeClasses([
            styles.header,
            headerClassNames,
        ]);

        const bodyClasses: string = mergeClasses([styles.body, bodyClassNames]);

        const footerClasses: string = mergeClasses([
            styles.footer,
            footerClassNames,
        ]);

        return (
            <div
                {...rest}
                className={cardClasses}
                ref={ref}
                style={{ ...style, ...{ height, width } }}
            >
                {children ? (
                    children
                ) : (
                    <>
                        <div className={headerClasses}>
                            {header && header}
                            {(icon || headerTitle) && (
                                <div className={styles.mainHeader}>
                                    {icon && (
                                        <Icon
                                            path={icon}
                                            classNames={styles.icon}
                                            size={IconSize.Large}
                                        />
                                    )}
                                    {headerTitle && (
                                        <div className={styles.title}>
                                            {headerTitle}
                                            <div className={styles.subHeader}>
                                                {subHeaderProps &&
                                                    subHeaderProps.map(
                                                        (item, idx) => {
                                                            return (
                                                                <>
                                                                    <div>
                                                                        {item}
                                                                    </div>
                                                                    {idx <
                                                                        subHeaderProps.length -
                                                                            1 && (
                                                                        <Icon
                                                                            path={
                                                                                IconName.mdiCircle
                                                                            }
                                                                            classNames={
                                                                                styles.separator
                                                                            }
                                                                        />
                                                                    )}
                                                                </>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {headerButtonProps && (
                                <div className={styles.buttonIcon}>
                                    <TwoStateButton
                                        classNames={styles.mainHeaderButton}
                                        shape={ButtonShape.Round}
                                        iconOneProps={
                                            headerButtonProps.iconProps
                                        }
                                        {...headerButtonProps}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={bodyClasses}>
                            {bodyListOneProps && (
                                <List
                                    layout="horizontal"
                                    classNames={styles.list}
                                    itemStyle={{ margin: '5px' }}
                                    items={bodyListOneProps.contents}
                                    renderItem={(item) => {
                                        return bodyListOneProps.type ===
                                            'list' ? (
                                            <span>{item}</span>
                                        ) : (
                                            <Pill label={item as string} />
                                        );
                                    }}
                                />
                            )}
                            {bodyListTwoProps && (
                                <Stack
                                    direction="horizontal"
                                    gap="xs"
                                    wrap="wrap"
                                >
                                    {bodyListTwoProps.contents.map((item) => {
                                        if (bodyListTwoProps.type === 'list')
                                            return <span>{item},</span>;
                                        return (
                                            <Pill label={item} theme="grey" />
                                        );
                                    })}
                                </Stack>
                            )}
                            {body && body}
                        </div>
                        <div className={footerClasses}>
                            {footerProps && (
                                <div className={styles.container}>
                                    {footerProps.map((items: any) => {
                                        return (
                                            <div className={styles.content}>
                                                <Icon
                                                    path={items.icon}
                                                    classNames={styles.icon}
                                                    size={IconSize.Medium}
                                                />
                                                <div>{items.text}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                            {footer && footer}
                        </div>
                    </>
                )}
            </div>
        );
    }
);
