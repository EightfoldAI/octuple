import { dataKeyAttribute } from '../Carousel.types';

export const getItemElementById = (id: string | number) =>
    document.querySelector(`[${dataKeyAttribute}='${id}']`);
