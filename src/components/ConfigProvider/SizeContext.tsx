import React, { createContext, FC } from 'react';

export enum Size {
    Flex = 'flex',
    Large = 'large',
    Medium = 'medium',
    Small = 'small',
}

const SizeContext = createContext<Size>(undefined);

export interface SizeContextProps {
    size?: Size;
    children?: React.ReactNode;
}

export const SizeContextProvider: FC<SizeContextProps> = ({
    children,
    size,
}) => (
    <SizeContext.Consumer>
        {(originSize) => (
            <SizeContext.Provider value={size || originSize}>
                {children}
            </SizeContext.Provider>
        )}
    </SizeContext.Consumer>
);

export default SizeContext;
