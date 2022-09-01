import React, { createContext, FC } from 'react';

export enum Shape {
    Rectangle = 'rectangle',
    Pill = 'pill',
    Underline = 'underline',
}

const ShapeContext = createContext<Shape>(undefined);

export interface ShapeContextProps {
    shape?: Shape;
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
