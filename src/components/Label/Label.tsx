import React, { FC, useContext } from 'react';
import { ButtonSize, ButtonShape, DefaultButton } from '../Button';
import { SizeContext, Size } from '../ConfigProvider';
import { IconName } from '../Icon/index';
import { LabelIconButtonProps, LabelProps, LabelSize } from './index';
import { Tooltip } from '../Tooltip';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { Breakpoints, useMatchMedia } from '../../hooks/useMatchMedia';
import { mergeClasses } from '../../shared/utilities';

import styles from './label.module.scss';

export const Label: FC<LabelProps> = ({
    classNames,
    colon = false,
    htmlFor,
    inline = false,
    labelIconButtonProps,
    size = LabelSize.Medium,
    text,
    ...rest
}) => {
    const htmlDir: string = useCanvasDirection();
    const largeScreenActive: boolean = useMatchMedia(Breakpoints.Large);
    const mediumScreenActive: boolean = useMatchMedia(Breakpoints.Medium);
    const smallScreenActive: boolean = useMatchMedia(Breakpoints.Small);
    const xSmallScreenActive: boolean = useMatchMedia(Breakpoints.XSmall);

    const contextuallySized: Size = useContext(SizeContext);
    const mergedSize = contextuallySized || size;

    const sizeClassNames: string = mergeClasses([
        {
            [styles.small]: mergedSize === LabelSize.Flex && largeScreenActive,
        },
        {
            [styles.medium]:
                mergedSize === LabelSize.Flex && mediumScreenActive,
        },
        {
            [styles.medium]: mergedSize === LabelSize.Flex && smallScreenActive,
        },
        {
            [styles.large]: mergedSize === LabelSize.Flex && xSmallScreenActive,
        },
        { [styles.large]: mergedSize === LabelSize.Large },
        { [styles.medium]: mergedSize === LabelSize.Medium },
        { [styles.small]: mergedSize === LabelSize.Small },
    ]);
    const labelClassNames: string = mergeClasses([
        styles.fieldLabel,
        {
            [styles.inline]: inline,
        },
        { [styles.fieldLabelRtl]: htmlDir === 'rtl' },
        sizeClassNames,
        classNames,
    ]);
    const labelTextClassNames: string = mergeClasses([
        styles.textStyle,
        sizeClassNames,
    ]);
    const iconButtonClassNames: string = mergeClasses([
        styles.fieldLabelIconButton,
        sizeClassNames,
    ]);
    const defaultIconButtonStyles = (
        labelIconButtonProps: LabelIconButtonProps
    ): React.CSSProperties => {
        let styles: React.CSSProperties = null;
        // If any of the defaults are overriden don't style the button height or padding.
        if (
            !labelIconButtonProps.size &&
            !labelIconButtonProps.shape &&
            !labelIconButtonProps.text
        ) {
            styles = {
                height: 16,
                padding: 0,
            };
        }
        return styles;
    };
    return (
        <div {...rest} className={labelClassNames}>
            {text && (
                <label className={labelTextClassNames} htmlFor={htmlFor}>
                    {colon && htmlDir === 'rtl' && ':'}
                    {text}
                    {colon && htmlDir === 'ltr' && ':'}
                </label>
            )}
            {labelIconButtonProps?.show && (
                <span className={iconButtonClassNames}>
                    <Tooltip
                        content={labelIconButtonProps?.toolTipContent}
                        placement={
                            labelIconButtonProps?.toolTipPlacement || 'top'
                        }
                        positionStrategy={
                            labelIconButtonProps?.toolTipPositionStrategy
                        }
                        theme={labelIconButtonProps?.toolTipTheme}
                    >
                        <DefaultButton
                            classNames={styles.labelIconButton}
                            htmlType={'button'}
                            shape={ButtonShape.Round}
                            size={ButtonSize.Small}
                            style={defaultIconButtonStyles(
                                labelIconButtonProps
                            )}
                            {...labelIconButtonProps}
                            iconProps={{
                                path:
                                    labelIconButtonProps?.iconProps?.path ||
                                    IconName.mdiInformation,
                                ...labelIconButtonProps.iconProps,
                            }}
                        />
                    </Tooltip>
                </span>
            )}
        </div>
    );
};
