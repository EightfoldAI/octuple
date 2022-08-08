import React, { createContext, FC, useContext, useRef } from 'react';
import type {
    OcFormContextProps,
    OcFormProviderProps,
    OcForms,
} from './OcForm.types';

const OcFormContext = createContext<OcFormContextProps>({
    triggerFormChange: () => {},
    triggerFormFinish: () => {},
    registerForm: () => {},
    unregisterForm: () => {},
});

const OcFormProvider: FC<OcFormProviderProps> = ({
    validateMessages,
    onFormChange,
    onFormFinish,
    children,
}) => {
    const formContext = useContext(OcFormContext);

    const formsRef = useRef<OcForms>({});

    return (
        <OcFormContext.Provider
            value={{
                ...formContext,
                validateMessages: {
                    ...formContext.validateMessages,
                    ...validateMessages,
                },
                triggerFormChange: (name, changedFields) => {
                    if (onFormChange) {
                        onFormChange(name, {
                            changedFields,
                            forms: formsRef.current,
                        });
                    }

                    formContext.triggerFormChange(name, changedFields);
                },
                triggerFormFinish: (name, values) => {
                    if (onFormFinish) {
                        onFormFinish(name, {
                            values,
                            forms: formsRef.current,
                        });
                    }

                    formContext.triggerFormFinish(name, values);
                },
                registerForm: (name, form) => {
                    if (name) {
                        formsRef.current = {
                            ...formsRef.current,
                            [name]: form,
                        };
                    }

                    formContext.registerForm(name, form);
                },
                unregisterForm: (name) => {
                    const newForms = { ...formsRef.current };
                    delete newForms[name];
                    formsRef.current = newForms;

                    formContext.unregisterForm(name);
                },
            }}
        >
            {children}
        </OcFormContext.Provider>
    );
};

export { OcFormProvider };

export default OcFormContext;
