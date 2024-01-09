import { dataKeyAttribute } from '../Carousel.types';
import { canUseDocElement } from '../../../shared/utilities';

export const getItemElementById = (id: string | number) =>
  canUseDocElement()
    ? document.querySelector(`[${dataKeyAttribute}='${id}']`)
    : null;
