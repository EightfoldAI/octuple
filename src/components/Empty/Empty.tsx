import React from 'react';
import { mergeClasses } from '../../shared/utilities';
import { EmptyProps } from './Empty.types';
import { DefaultEmptyImg } from './SVG/DefaultEmptyImg';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';

import styles from './empty.module.scss';

const defaultEmptyImg = <DefaultEmptyImg />;

interface EmptyType extends React.FC<EmptyProps> {
    PRESENTED_IMAGE: React.ReactNode;
}

export const Empty: EmptyType = ({
    classNames,
    image = defaultEmptyImg,
    description,
    children,
    imageStyle,
    ...restProps
}) => {
    const htmlDir: string = useCanvasDirection();

    let imageNode: React.ReactNode = null;

    if (typeof image === 'string') {
        imageNode = <img alt={description} src={image} />;
    } else {
        imageNode = image;
    }

    return (
        <div
            className={mergeClasses([
                styles.empty,
                { [styles.emptyDefault]: image === defaultEmptyImg },
                { [styles.emptyRtl]: htmlDir === 'rtl' },
                classNames,
            ])}
            {...restProps}
        >
            <div className={styles.emptyImage} style={imageStyle}>
                {imageNode}
            </div>
            {description && (
                <div className={styles.emptyDescription}>{description}</div>
            )}
            {children && <div className={styles.emptyFooter}>{children}</div>}
        </div>
    );
};

Empty.PRESENTED_IMAGE = defaultEmptyImg;
