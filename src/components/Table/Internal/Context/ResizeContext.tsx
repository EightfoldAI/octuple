import { createContext, Key } from 'react';

interface ResizeContextProps {
    onColumnResize: (columnKey: Key, width: number) => void;
}

const ResizeContext = createContext<ResizeContextProps>(null);

export default ResizeContext;
