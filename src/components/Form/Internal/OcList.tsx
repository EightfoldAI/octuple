import React, { FC, useContext, useMemo, useRef } from 'react';
import type {
    InternalOcNamePath,
    OcListField,
    OcListOperations,
    OcListProps,
    OcStoreValue,
} from './OcForm.types';
import OcFieldContext from './OcFieldContext';
import OcField from './OcField';
import { move, getNamePath } from './Utils/valueUtil';
import type { OcListContextProps } from './OcListContext';
import OcListContext from './OcListContext';

export const OcList: FC<OcListProps> = ({
    name,
    initialValue,
    children,
    rules,
    validateTrigger,
}) => {
    const context = useContext(OcFieldContext);
    const keyRef = useRef({
        keys: [],
        id: 0,
    });
    const keyManager = keyRef.current;

    const prefixName: InternalOcNamePath = useMemo(() => {
        const parentPrefixName = getNamePath(context.prefixName) || [];
        return [...parentPrefixName, ...getNamePath(name)];
    }, [context.prefixName, name]);

    const fieldContext = useMemo(
        () => ({ ...context, prefixName }),
        [context, prefixName]
    );

    // List context
    const listContext = useMemo<OcListContextProps>(
        () => ({
            getKey: (namePath: InternalOcNamePath) => {
                const len = prefixName.length;
                const pathName = namePath[len];
                return [
                    (keyManager.keys as any)[pathName],
                    namePath.slice(len + 1),
                ];
            },
        }),
        [prefixName]
    );

    const shouldUpdate = (
        prevValue: OcStoreValue,
        nextValue: OcStoreValue,
        props: { source: string }
    ) => {
        if (props.source === 'internal') {
            return false;
        }
        return prevValue !== nextValue;
    };

    return (
        <OcListContext.Provider value={listContext}>
            <OcFieldContext.Provider value={fieldContext}>
                <OcField
                    name={[]}
                    shouldUpdate={shouldUpdate}
                    rules={rules}
                    validateTrigger={validateTrigger}
                    initialValue={initialValue}
                    isList
                >
                    {({ value = [], onChange }, meta) => {
                        const { getFieldValue } = context;
                        const getNewValue = () => {
                            const values = getFieldValue(
                                prefixName || []
                            ) as OcStoreValue[];
                            return values || [];
                        };
                        /**
                         * Always get latest value in case user update fields by `form` api.
                         */
                        const operations: OcListOperations = {
                            add: (defaultValue, index?: number) => {
                                // Mapping keys
                                const newValue = getNewValue();

                                if (index >= 0 && index <= newValue.length) {
                                    keyManager.keys = [
                                        ...keyManager.keys.slice(0, index),
                                        keyManager.id,
                                        ...keyManager.keys.slice(index),
                                    ];
                                    onChange([
                                        ...newValue.slice(0, index),
                                        defaultValue,
                                        ...newValue.slice(index),
                                    ]);
                                } else {
                                    keyManager.keys = [
                                        ...keyManager.keys,
                                        keyManager.id,
                                    ];
                                    onChange([...newValue, defaultValue]);
                                }
                                keyManager.id += 1;
                            },
                            remove: (index: number | number[]) => {
                                const newValue = getNewValue();
                                const indexSet = new Set(
                                    Array.isArray(index) ? index : [index]
                                );

                                if (indexSet.size <= 0) {
                                    return;
                                }
                                keyManager.keys = keyManager.keys.filter(
                                    (_, keysIndex) => !indexSet.has(keysIndex)
                                );

                                // Trigger store change
                                onChange(
                                    newValue.filter(
                                        (_, valueIndex) =>
                                            !indexSet.has(valueIndex)
                                    )
                                );
                            },
                            move(from: number, to: number) {
                                if (from === to) {
                                    return;
                                }
                                const newValue = getNewValue();

                                // Do not handle out of range
                                if (
                                    from < 0 ||
                                    from >= newValue.length ||
                                    to < 0 ||
                                    to >= newValue.length
                                ) {
                                    return;
                                }

                                keyManager.keys = move(
                                    keyManager.keys,
                                    from,
                                    to
                                );

                                // Trigger store change
                                onChange(move(newValue, from, to));
                            },
                        };

                        let listValue = value || [];
                        if (!Array.isArray(listValue)) {
                            listValue = [];
                        }

                        return children(
                            (listValue as OcStoreValue[]).map(
                                (__, index): OcListField => {
                                    let key = keyManager.keys[index];
                                    if (key === undefined) {
                                        keyManager.keys[index] = keyManager.id;
                                        key = keyManager.keys[index];
                                        keyManager.id += 1;
                                    }

                                    return {
                                        name: index,
                                        key,
                                        isListField: true,
                                    };
                                }
                            ),
                            operations,
                            meta
                        );
                    }}
                </OcField>
            </OcFieldContext.Provider>
        </OcListContext.Provider>
    );
};
