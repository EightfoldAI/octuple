import React, { FC, memo } from 'react';
import { ItemProps } from '../Carousel.types';
import { dataKeyAttribute, dataIndexAttribute } from '../Carousel.types';

export const Item: FC<ItemProps> = memo((props: ItemProps) => {
    const { children, classNames, id, index, refs, style } = props;
    const ref: React.MutableRefObject<any> = React.useRef(null);
    refs[String(index)] = ref;

    return (
        <li
            className={classNames}
            {...{ [dataKeyAttribute]: id, [dataIndexAttribute]: index }}
            ref={ref}
            style={style}
        >
            {children}
        </li>
    );
});
