import React, { createContext, FC, useContext, useMemo } from 'react';

export type ParentComponentsContextType = string[];

/**
 * Context for tracking parent elements in the React component tree.
 */
const ParentComponentsContext = createContext<ParentComponentsContextType>([]);

export interface ParentComponentsProviderProps {
  /**
   * The name of the current component to register to the tracked component tree.
   */
  componentName: string;
  children: React.ReactNode;
}

/**
 * Provider to wrap around components you would like to check for in the component tree by a child component.
 */
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

/**
 * Hook to retrieve an ordered list of the tracked ancestors of the current component.
 * Ordered from furthest -> closest ancestor.
 * @returns The list of parent component names.
 */
export const useParentComponents = () => useContext(ParentComponentsContext);

export default ParentComponentsContext;
