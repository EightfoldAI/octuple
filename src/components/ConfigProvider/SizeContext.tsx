import React, { createContext, FC } from 'react';

export type SizeType = 'flex' | 'large' | 'medium' | 'small' | undefined;

const SizeContext = createContext<SizeType>(undefined);

export interface SizeContextProps {
    size?: SizeType;
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
