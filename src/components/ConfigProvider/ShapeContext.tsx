'use client';

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
    {(ancestorShape) => (
      <ShapeContext.Provider value={shape || ancestorShape}>
        {children}
      </ShapeContext.Provider>
    )}
  </ShapeContext.Consumer>
);

export default ShapeContext;
