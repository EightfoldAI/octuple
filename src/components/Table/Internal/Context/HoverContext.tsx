import { createContext } from 'react';

export interface HoverContextProps {
    startRow: number;
    endRow: number;
    onHover: (start: number, end: number) => void;
}

const HoverContext = createContext<HoverContextProps>({} as any);

export default HoverContext;
