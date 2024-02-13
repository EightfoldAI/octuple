import React, { createContext, FC, useContext } from 'react';

export type Gradient = true | false | undefined;

const GradientContext = createContext<Gradient>(false);

export interface GradientContextProps {
  gradient?: Gradient;
  children?: React.ReactNode;
}

export const GradientContextProvider: FC<GradientContextProps> = ({
  children,
  gradient,
}) => {
  const originGradient = useContext(GradientContext);
  return (
    <GradientContext.Provider value={gradient || originGradient}>
      {children}
    </GradientContext.Provider>
  );
};

export default GradientContext;
