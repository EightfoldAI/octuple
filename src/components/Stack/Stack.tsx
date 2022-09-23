import React, { FC, Ref } from 'react';
import styles from './stack.module.scss';
import { mergeClasses } from '../../shared/utilities';
import { StackBreakpoint, StackProps } from './Stack.types';
import { useMatchMedia } from '../../octuple';
import { Breakpoints } from '../../hooks/useMatchMedia';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';

export const Stack: FC<StackProps> = React.forwardRef(
    (
        {
            fullWidth: defaultFullWidth,
            direction: defaultDirection = 'horizontal',
            justify: defaultJustify,
            inline: defaultInline,
            align: defaultAlign,
            wrap: defaultWrap,
            gap: defaultGap,
            style = {},
            classNames,
            breakpoints = {},
            children,
            ...rest
        },
        ref: Ref<HTMLDivElement>
    ) => {
        const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);
        const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
        const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
        const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);

        const htmlDir: string = useCanvasDirection();

        const breakPointConfigurationList: Array<[StackBreakpoint, boolean]> = [
            ['large', largeScreenActive],
            ['medium', mediumScreenActive],
            ['small', smallScreenActive],
            ['xsmall', xSmallScreenActive],
        ];

        const activeBreakPointStackPropsIndex =
            breakPointConfigurationList.findIndex((breakPointConfiguration) => {
                return breakPointConfiguration[1];
            });

        const activeBreakPointStackProps =
            activeBreakPointStackPropsIndex > -1
                ? breakpoints[
                      breakPointConfigurationList[
                          activeBreakPointStackPropsIndex
                      ][0]
                  ]
                : {};

        const resolvedStackIntrinsicProps = {
            ...{
                fullWidth: defaultFullWidth,
                direction: defaultDirection,
                justify: defaultJustify,
                inline: defaultInline,
                align: defaultAlign,
                wrap: defaultWrap,
                gap: defaultGap,
            },
            ...(activeBreakPointStackProps || {}),
        };

        const { fullWidth, direction, justify, inline, align, wrap, gap } =
            resolvedStackIntrinsicProps;

        const stackClassName: string = mergeClasses([
            styles.stack,
            classNames,
            { [styles.inline]: inline },
            { [styles.fullWidth]: fullWidth },
            { [styles.vertical]: direction === 'vertical' },
            { [styles.horizontal]: direction === 'horizontal' },
            { [styles.stackRtl]: htmlDir === 'rtl' },
            styles[gap],
        ]);

        return (
            <div
                ref={ref}
                className={stackClassName}
                style={{
                    alignItems: align,
                    justifyContent: justify,
                    flexWrap: wrap,
                    ...style,
                }}
                {...rest}
            >
                {children}
            </div>
        );
    }
);
