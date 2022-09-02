import React from 'react';
import type { OcFormInstance } from '../Internal';
import { useForm as useOcForm } from '../Internal';
import scrollIntoView from 'scroll-into-view-if-needed';
import type {
    InternalOcNamePath,
    OcNamePath,
    ScrollOptions,
} from '../Form.types';
import { getFieldId, toArray } from '../util';

export interface FormInstance<Values = any> extends OcFormInstance<Values> {
    scrollToField: (name: OcNamePath, options?: ScrollOptions) => void;
    /**
     * Gets field instance
     */
    getFieldInstance: (name: OcNamePath) => any;
    /**
     * @private This is for internal usage only.
     * Do not use in prod
     */
    __INTERNAL__: {
        name?: string;
        itemRef: (
            name: InternalOcNamePath
        ) => (node: React.ReactElement) => void;
    };
}

function toNamePathStr(name: OcNamePath) {
    const namePath = toArray(name);
    return namePath.join('_');
}

export default function useForm<Values = any>(
    form?: FormInstance<Values>
): [FormInstance<Values>] {
    const [ocForm] = useOcForm();
    const itemsRef = React.useRef<Record<string, React.ReactElement>>({});

    const wrapForm: FormInstance<Values> = React.useMemo(
        () =>
            form ?? {
                ...ocForm,
                __INTERNAL__: {
                    itemRef:
                        (name: InternalOcNamePath) =>
                        (node: React.ReactElement) => {
                            const namePathStr = toNamePathStr(name);
                            if (node) {
                                itemsRef.current[namePathStr] = node;
                            } else {
                                delete itemsRef.current[namePathStr];
                            }
                        },
                },
                scrollToField: (
                    name: OcNamePath,
                    options: ScrollOptions = {}
                ) => {
                    const namePath = toArray(name);
                    const fieldId = getFieldId(
                        namePath,
                        wrapForm.__INTERNAL__.name
                    );
                    const node: any | null = fieldId
                        ? document.getElementById(fieldId)
                        : null;

                    if (node) {
                        scrollIntoView(node, {
                            scrollMode: 'if-needed',
                            block: 'nearest',
                            ...options,
                        });
                    }
                },
                getFieldInstance: (name: OcNamePath) => {
                    const namePathStr = toNamePathStr(name);
                    return itemsRef.current[namePathStr];
                },
            },
        [form, ocForm]
    );

    return [wrapForm];
}
