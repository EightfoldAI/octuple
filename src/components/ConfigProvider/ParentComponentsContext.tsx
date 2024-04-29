import React, { createContext, FC, useContext, useMemo } from 'react';

export type ParentComponentsContextType = string[];

const ParentComponentsContext = createContext<ParentComponentsContextType>([]);

interface ParentComponentsProviderProps {
  componentName: string;
  children: React.ReactNode;
}

export const ParentComponentsContextProvider: FC<
  ParentComponentsProviderProps
> = ({ componentName, children }) => {
  const parentContext = useContext(ParentComponentsContext);

  const currentContext = useMemo(
    () => [...(parentContext ?? []), componentName],
    [parentContext, componentName]
  );

  return (
    <ParentComponentsContext.Provider value={currentContext}>
      {children}
    </ParentComponentsContext.Provider>
  );
};

export const useParentComponents = () => useContext(ParentComponentsContext);

export default ParentComponentsContext;
