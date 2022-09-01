import React, { FC, useMemo } from 'react';
import { OcList } from './Internal';
import { FormItemStatusContext } from './Context';
import { FormListProps } from './Form.types';
import { warning } from '../../shared/utilities';

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
