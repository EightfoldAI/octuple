import React, { createContext, FC } from 'react';

export type ShapeType = 'pill' | 'rectangle' | 'underline' | undefined;

const ShapeContext = createContext<ShapeType>(undefined);

export interface ShapeContextProps {
    shape?: ShapeType;
    children?: React.ReactNode;
}

export const ShapeContextProvider: FC<ShapeContextProps> = ({
    children,
    shape,
}) => (
    <ShapeContext.Consumer>
        {(originShape) => (
            <ShapeContext.Provider value={shape || originShape}>
                {children}
            </ShapeContext.Provider>
        )}
    </ShapeContext.Consumer>
);

export default ShapeContext;
