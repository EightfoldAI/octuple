import { dataIndexAttribute } from '../Carousel.types';
import { canUseDocElement } from '../../../shared/utilities';

export const getItemElementByIndex = (id: string | number) =>
  canUseDocElement()
    ? document.querySelector(`[${dataIndexAttribute}='${id}']`)
    : null;
