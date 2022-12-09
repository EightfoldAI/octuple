import { dataIndexAttribute } from '../Carousel.types';

export const getItemElementByIndex = (id: string | number) =>
    document.querySelector(`[${dataIndexAttribute}='${id}']`);
