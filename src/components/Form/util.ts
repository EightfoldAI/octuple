import type { InternalOcNamePath } from './Internal/OcForm.types';

// Form item name black list. In form, you can use form.id get the form item element.
// use object hasOwnProperty will get better performance if black list is longer.
const formItemNameBlackList = ['parentNode'];

// default form item id prefix.
const defaultItemNamePrefix: string = 'form_item';

export function toArray<T>(candidate?: T | T[] | false): T[] {
    if (candidate === undefined || candidate === false) return [];

    return Array.isArray(candidate) ? candidate : [candidate];
}

export function getFieldId(
    namePath: InternalOcNamePath,
    formName?: string
): string | undefined {
    if (!namePath.length) return undefined;

    const mergedId = namePath.join('_');

    if (formName) {
        return `${formName}_${mergedId}`;
    }

    const isIllegalName = formItemNameBlackList.indexOf(mergedId) >= 0;

    return isIllegalName ? `${defaultItemNamePrefix}_${mergedId}` : mergedId;
}
