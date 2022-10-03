import React, { FC, Ref, useContext } from 'react';
import { CardProps, CardSize, CardType } from './Card.types';
import { mergeClasses } from '../../shared/utilities';
import { ButtonShape, TwoStateButton } from '../Button';
import { SizeContext, Size } from '../ConfigProvider';
import { Icon, IconSize } from '../Icon';
import { Stack } from '../Stack';
import styles from './card.module.scss';
import { Pill } from '../Pills';
import { List } from '../List';

export const Card: FC<CardProps> = React.forwardRef(
    (
        {
            avatar,
            body,
            bodyClassNames,
            bodyListOneProps,
            bodyListTwoProps,
            configContextProps = {
                noDisabledContext: false,
                noSizeContext: false,
            },
            disabled = false,
            footerClassNames,
            footerProps,
            header,
            headerButtonProps,
            headerClassNames,
            headerIcon,
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
        const contextuallySized: Size = useContext(SizeContext);
        const mergedSize = configContextProps.noSizeContext
            ? size
            : contextuallySized || size;
        const cardClasses: string = mergeClasses([
            styles.card,
            { [styles.list]: type === CardType.list },
            { [styles.carousel]: type === CardType.carousel },
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
            <div {...rest} className={cardClasses} ref={ref} style={style}>
                <div className={headerClasses}>
                    <div className={styles.mainHeader}>
                        <Icon
                            path={icon}
                            classNames={styles.icon}
                            size={IconSize.Large}
                        />
                        <div className={styles.title}>
                            {header}
                            <div className={styles.subHeader}>
                                {subHeaderProps &&
                                    subHeaderProps.map((item, idx) => {
                                        return (
                                            <div>
                                                {idx ===
                                                    subHeaderProps.length -
                                                        1 && <>&nbsp;&nbsp;</>}
                                                {item}
                                                {idx <
                                                    subHeaderProps.length -
                                                        1 && (
                                                    <>&nbsp;&nbsp;&bull;</>
                                                )}
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttonIcon}>
                        {headerButtonProps && (
                            <TwoStateButton
                                classNames={styles.mainHeaderButton}
                                shape={ButtonShape.Round}
                                iconOneProps={{
                                    path: headerIcon,
                                    ariaHidden: true,
                                    classNames: 'my-two-state-btn-icon-one',
                                    id: 'myTwoStateButtonIconOne',
                                    rotate: 0,
                                    spin: false,
                                    vertical: false,
                                    'data-test-id':
                                        'myTwoStateButtonIconOneTestId',
                                }}
                                {...headerButtonProps}
                            />
                        )}
                    </div>
                </div>
                <div className={bodyClasses}>
                    {bodyListOneProps && (
                        <List
                            layout="horizontal"
                            classNames={styles.list}
                            itemStyle={{ margin: '5px' }}
                            items={bodyListOneProps.contents}
                            renderItem={(item) => {
                                return bodyListOneProps.type === 'list' ? (
                                    <span>{item}</span>
                                ) : (
                                    <Pill label={item as string} theme="grey" />
                                );
                            }}
                        />
                    )}
                    {bodyListTwoProps && (
                        <Stack direction="horizontal" gap="xs" wrap="wrap">
                            {bodyListTwoProps.contents.map((item) => {
                                if (bodyListTwoProps.type === 'list')
                                    return <span>{item},</span>;
                                return <Pill label={item} theme="grey" />;
                            })}
                        </Stack>
                    )}
                    {body}
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
                </div>
            </div>
        );
    }
);
