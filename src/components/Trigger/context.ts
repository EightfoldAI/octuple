import React, { createContext } from 'react';

interface TriggerContextProps {
    onPopupMouseDown: React.MouseEventHandler<HTMLElement>;
}

const TriggerContext = createContext<TriggerContextProps>(null);

export default TriggerContext;
