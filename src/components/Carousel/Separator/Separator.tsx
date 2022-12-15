import React, { FC, memo } from 'react';
import { SeparatorProps } from '../Carousel.types';
import { dataKeyAttribute, dataIndexAttribute } from '../Carousel.types';

export const Separator: FC<SeparatorProps> = memo((props: SeparatorProps) => {
  const { classNames, id, index, refs, style } = props;
  const ref: React.MutableRefObject<any> = React.useRef(null);
  refs[index] = ref;

  return (
    <div
      className={classNames}
      {...{ [dataKeyAttribute]: id, [dataIndexAttribute]: index }}
      ref={ref}
      style={style}
    />
  );
});
