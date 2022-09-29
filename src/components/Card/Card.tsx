import React, { FC, Ref, useContext } from 'react';
import { CardProps, CardSize, CardType } from './Card.types';
import { mergeClasses } from '../../shared/utilities';
import { ButtonShape, TwoStateButton } from '../Button';
import { SizeContext, Size } from '../ConfigProvider';
import { Icon, IconSize } from '../Icon';

import styles from './card.module.scss';
import { Stack } from '../Stack';
import { Pill } from '../Pills';

export const Card: FC<CardProps> = React.forwardRef(
    (
        {
            name,
            icon,
            type = CardType.list,
            style,
            actionButtonProps,
            role = 'presentation',
            avatar,
            size = CardSize.Medium,
            configContextProps = {
                noDisabledContext: false,
                noSizeContext: false,
            },
            header,
            headerButtonProps,
            headerClassNames,
            headerIcon,
            body,
            bodyClassNames,
            footerClassNames,
            bodyListOneProps,
            bodyListTwoProps,
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

        const messageClasses: string = mergeClasses([styles.message, 'body2']);

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
                style={style}
                role={role}
            >
                <div className={headerClasses}>
                    <div className={styles.mainHeader}>
                        <Icon
                            path={icon}
                            classNames={styles.icon}
                            size={IconSize.Medium}
                        />
                        {header}
                        {headerButtonProps && (
                            <TwoStateButton
                                classNames={styles.mainHeaderButton}
                                shape={ButtonShape.Round}
                                iconOneProps={{
                                    path: headerIcon,
                                    ariaHidden: true,
                                    classNames: 'my-two-state-btn-icon-one',
                                    id: 'myTwoStateButtonIconOne',
                                    role: 'presentation',
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
                    <div className={styles.subHeader}></div>
                </div>
                <div className={bodyClasses}>
                    {bodyListOneProps && (
                        <Stack
                            direction="horizontal"
                            gap="xs"
                            wrap="wrap"
                            classNames={styles.list}
                        >
                            {bodyListOneProps.contents.map((item) => {
                                if (bodyListOneProps.type === 'list')
                                    return <div>{item},</div>;
                                return <Pill label={item} theme="grey" />;
                            })}
                        </Stack>
                    )}
                    {bodyListTwoProps && (
                        <Stack direction="horizontal" gap="xs" wrap="wrap">
                            {bodyListTwoProps.contents.map((item) => {
                                if (bodyListTwoProps.type === 'list')
                                    return <div>{item},</div>;
                                return <Pill label={item} theme="grey" />;
                            })}
                        </Stack>
                    )}
                    {body}
                </div>
                <div className={footerClasses}>
                    <div>Match potential</div>
                    <div>Status</div>
                </div>
            </div>
        );
    }
);
