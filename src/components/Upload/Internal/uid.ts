import { uniqueId } from '../../../shared/utilities';

const now = +new Date();

export const uid = (): string => {
  return uniqueId(`upload-${now}`);
};
