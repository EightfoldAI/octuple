import React, { createContext, FC, useContext } from 'react';

export type Disabled = true | false | undefined;

const DisabledContext = createContext<Disabled>(false);

export interface DisabledContextProps {
  disabled?: Disabled;
  children?: React.ReactNode;
}

export const DisabledContextProvider: FC<DisabledContextProps> = ({
  children,
  disabled,
}) => {
  const ancestorDisabled = useContext(DisabledContext);
  return (
    <DisabledContext.Provider value={disabled || ancestorDisabled}>
      {children}
    </DisabledContext.Provider>
  );
};

export default DisabledContext;
