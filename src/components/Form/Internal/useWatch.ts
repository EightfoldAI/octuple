import { useState, useContext, useEffect, useRef, useMemo } from 'react';
import type { OcFormInstance } from '.';
import { OcFieldContext } from '.';
import { HOOK_MARK } from './OcFieldContext';
import type {
    InternalOcFormInstance,
    OcNamePath,
    OcStore,
} from './OcForm.types';
import { getNamePath, getValue } from './Utils/valueUtil';

type ReturnPromise<T> = T extends Promise<infer ValueType> ? ValueType : never;
type GetGeneric<TForm extends OcFormInstance> = ReturnPromise<
    ReturnType<TForm['validateFields']>
>;

export function stringify(value: any) {
    try {
        return JSON.stringify(value);
    } catch (err) {
        return Math.random();
    }
}

function useWatch<
    TDependencies1 extends keyof GetGeneric<TForm>,
    TForm extends OcFormInstance,
    TDependencies2 extends keyof GetGeneric<TForm>[TDependencies1],
    TDependencies3 extends keyof GetGeneric<TForm>[TDependencies1][TDependencies2],
    TDependencies4 extends keyof GetGeneric<TForm>[TDependencies1][TDependencies2][TDependencies3]
>(
    dependencies: [
        TDependencies1,
        TDependencies2,
        TDependencies3,
        TDependencies4
    ],
    form?: TForm
): GetGeneric<TForm>[TDependencies1][TDependencies2][TDependencies3][TDependencies4];

function useWatch<
    TDependencies1 extends keyof GetGeneric<TForm>,
    TForm extends OcFormInstance,
    TDependencies2 extends keyof GetGeneric<TForm>[TDependencies1],
    TDependencies3 extends keyof GetGeneric<TForm>[TDependencies1][TDependencies2]
>(
    dependencies: [TDependencies1, TDependencies2, TDependencies3],
    form?: TForm
): GetGeneric<TForm>[TDependencies1][TDependencies2][TDependencies3];

function useWatch<
    TDependencies1 extends keyof GetGeneric<TForm>,
    TForm extends OcFormInstance,
    TDependencies2 extends keyof GetGeneric<TForm>[TDependencies1]
>(
    dependencies: [TDependencies1, TDependencies2],
    form?: TForm
): GetGeneric<TForm>[TDependencies1][TDependencies2];

function useWatch<
    TDependencies extends keyof GetGeneric<TForm>,
    TForm extends OcFormInstance
>(
    dependencies: TDependencies | [TDependencies],
    form?: TForm
): GetGeneric<TForm>[TDependencies];

function useWatch<TForm extends OcFormInstance>(
    dependencies: [],
    form?: TForm
): GetGeneric<TForm>;

function useWatch<TForm extends OcFormInstance>(
    dependencies: OcNamePath,
    form?: TForm
): any;

function useWatch<ValueType = OcStore>(
    dependencies: OcNamePath,
    form?: OcFormInstance
): ValueType;

function useWatch(dependencies: OcNamePath = [], form?: OcFormInstance) {
    const [value, setValue] = useState<any>();

    const valueStr = useMemo(() => stringify(value), [value]);
    const valueStrRef = useRef(valueStr);
    valueStrRef.current = valueStr;

    const fieldContext = useContext(OcFieldContext);
    const formInstance = (form as InternalOcFormInstance) || fieldContext;
    const isValidForm = formInstance && formInstance._init;

    const namePath = getNamePath(dependencies);
    const namePathRef = useRef(namePath);
    namePathRef.current = namePath;

    useEffect(
        () => {
            if (!isValidForm) {
                return null;
            }

            const { getFieldListValues, getInternalHooks } = formInstance;
            const { registerWatch } = getInternalHooks(HOOK_MARK);

            const cancelRegister = registerWatch((store) => {
                const newValue = getValue(store, namePathRef.current);
                const nextValueStr = stringify(newValue);

                // Compare stringify in case it's nest object
                if (valueStrRef.current !== nextValueStr) {
                    valueStrRef.current = nextValueStr;
                    setValue(newValue);
                }
            });

            const initialValue = getValue(
                getFieldListValues(),
                namePathRef.current
            );
            setValue(initialValue);

            return cancelRegister;
        },

        // We do not need re-register since namePath content is the same
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    return value;
}

export default useWatch;
