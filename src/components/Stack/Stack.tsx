
import React, { FC, Ref } from 'react';
import styles from './stack.module.scss';
import { mergeClasses } from '../../shared/utilities';
import { StackProps } from './Stack.types';

export const Stack: FC<StackProps> = React.forwardRef(
    (
        {
            fullWidth,
            direction,
            justify,
            inline,
            align,
            wrap,
            gap,
            classNames,
            children,
            ...rest
        },
        ref: Ref<HTMLDivElement>
    ) => {

        const styles = {
            ...(fullWidth ? { width: "100%" } : {}),
            display: inline ? "inline-flex" : "flex",
            justifyContent: justify,
            alignItems: align,
            flexWrap: wrap,
            flexDirection: direction === "vertical" ? "column" : "row",
            "> * + *":
                direction === "vertical"
                    ? {
                        marginTop: `{{space.${gap}}}`,
                        marginInlineStart: 0,
                    }
                    : {
                        marginLeft: `{{space.${gap}}}`,
                    },
        };

        return (
            <div
                ref={ref}
                // @ts-ignore
                style={styles}
                {...rest}
            >
                {children}
            </div>
        );
    }
);