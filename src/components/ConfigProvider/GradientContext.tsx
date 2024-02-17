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
  const ancestorGradient = useContext(GradientContext);
  return (
    <GradientContext.Provider value={gradient || ancestorGradient}>
      {children}
    </GradientContext.Provider>
  );
};

export default GradientContext;
