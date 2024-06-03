import { ReactChild, ReactFragment, ReactNode, ReactPortal } from 'react';
import { id as itemId } from '../Carousel.types';

export const getItemId = (
  item: ReactChild | ReactFragment | ReactNode | ReactPortal
) =>
  String(
    (item as JSX.Element)?.props?.[itemId] ||
      String((item as JSX.Element)?.key || '').replace(/^\.\$/, '')
  );
