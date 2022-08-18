import React, { FC, useMemo } from 'react';
import { OcList } from './Internal';
import type { OcStoreValue, OcValidatorRule } from './Internal/OcForm.types';
import { warning } from '../../shared/utilities';
import { FormItemStatusContext } from './Context';

export interface FormListFieldData {
    name: number;
    key: number;
}

export interface FormListOperation {
    add: (defaultValue?: OcStoreValue, insertIndex?: number) => void;
    remove: (index: number | number[]) => void;
    move: (from: number, to: number) => void;
}

export interface FormListProps {
    name: string | number | (string | number)[];
    rules?: OcValidatorRule[];
    initialValue?: any[];
    children: (
        fields: FormListFieldData[],
        operation: FormListOperation,
        meta: { errors: React.ReactNode[]; warnings: React.ReactNode[] }
    ) => React.ReactNode;
}

const FormList: FC<FormListProps> = ({ children, ...props }) => {
    warning(!!props.name, 'Form.List Missing `name` prop.');
    const contextValue = useMemo(
        () => ({
            status: 'error' as const,
        }),
        []
    );

    return (
        <OcList {...props}>
            {(fields, operation, meta) => (
                <FormItemStatusContext.Provider value={contextValue}>
                    {children(
                        fields.map((field) => ({
                            ...field,
                            fieldKey: field.key,
                        })),
                        operation,
                        {
                            errors: meta.errors,
                            warnings: meta.warnings,
                        }
                    )}
                </FormItemStatusContext.Provider>
            )}
        </OcList>
    );
};

export default FormList;
