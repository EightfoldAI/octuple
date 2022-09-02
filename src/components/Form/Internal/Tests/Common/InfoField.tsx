import React, { cloneElement, FC } from 'react';
import { OcField } from '../../';
import type { OcFieldProps } from '../../OcForm.types';

interface InfoFieldProps extends OcFieldProps {
    children?: React.ReactElement;
}

export const Input = ({ value = '', ...props }) => (
    <input {...props} value={value} />
);

/**
 * Return a wrapped Field with meta info
 */
const InfoField: FC<InfoFieldProps> = ({ children, ...props }) => (
    <OcField {...props}>
        {(control, info) => {
            const { errors, warnings, validating } = info;

            return (
                <div>
                    {children ? (
                        cloneElement(children, control)
                    ) : (
                        <Input {...control} />
                    )}
                    <ul className="errors">
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                    <ul className="warnings">
                        {warnings.map((warning, index) => (
                            <li key={index}>{warning}</li>
                        ))}
                    </ul>
                    {validating && <span className="validating" />}
                </div>
            );
        }}
    </OcField>
);

export default InfoField;
