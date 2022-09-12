import React, { FC, Ref } from 'react';
import {
    SkeletonAnimation,
    SkeletonProps,
    SkeletonVariant,
} from './Skeleton.types';
import { ConditionalWrapper, mergeClasses } from '../../shared/utilities';

import styles from './skeleton.module.scss';

const IGNORE_CUSTOM_HEIGHT_VARIANTS = [
    SkeletonVariant.ButtonSmall,
    SkeletonVariant.ButtonMedium,
    SkeletonVariant.ButtonLarge,
];

export const Skeleton: FC<SkeletonProps> = React.forwardRef(
    (
        {
            classNames,
            style,
            width,
            height,
            fullWidth,
            variant = SkeletonVariant.Rectangular,
            animation = SkeletonAnimation.Wave,
            animating = true,
            children,
            'data-test-id': dataTestId,
        },
        ref: Ref<HTMLDivElement>
    ) => {
        const skeletonClasses: string = mergeClasses([
            classNames,
            styles.skeleton,
            {
                [styles.pulse]:
                    animation === SkeletonAnimation.Pulse && animating,
                [styles.wave]:
                    animation === SkeletonAnimation.Wave && animating,
                [styles.circular]: variant === SkeletonVariant.Circular,
                [styles.pill]: variant === SkeletonVariant.Pill,
                [styles.rounded]: variant === SkeletonVariant.Rounded,
                [styles.fullWidth]: fullWidth,
                [styles.buttonSmall]: variant === SkeletonVariant.ButtonSmall,
                [styles.buttonMedium]: variant === SkeletonVariant.ButtonMedium,
                [styles.buttonLarge]: variant === SkeletonVariant.ButtonLarge,
                [styles.children]: children,
            },
        ]);

        const customStyle: React.CSSProperties = {
            ...(!fullWidth ? { width } : {}),
            ...(!IGNORE_CUSTOM_HEIGHT_VARIANTS.includes(variant)
                ? { height }
                : {}),
        };

        const getSkeleton = (): JSX.Element => (
            <div
                ref={ref}
                className={skeletonClasses}
                tabIndex={-1}
                data-test-id={dataTestId}
                style={{ ...style, ...customStyle }}
            />
        );

        return (
            <ConditionalWrapper
                condition={!!children}
                wrapper={(skeleton) => (
                    <div className={styles.skeletonContainer}>
                        {children}
                        {animating && skeleton}
                    </div>
                )}
            >
                {getSkeleton()}
            </ConditionalWrapper>
        );
    }
);
