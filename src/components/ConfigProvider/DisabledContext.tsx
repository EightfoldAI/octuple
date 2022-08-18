import React, { createContext, FC, useContext } from 'react';

export type DisabledType = true | false | undefined;

const DisabledContext = createContext<DisabledType>(false);

export interface DisabledContextProps {
    disabled?: DisabledType;
    children?: React.ReactNode;
}

export const DisabledContextProvider: FC<DisabledContextProps> = ({
    children,
    disabled,
}) => {
    const originDisabled = useContext(DisabledContext);
    return (
        <DisabledContext.Provider value={disabled || originDisabled}>
            {children}
        </DisabledContext.Provider>
    );
};

export default DisabledContext;
