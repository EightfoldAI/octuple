import { createContext } from 'react';

export interface PerfRecord {
    renderWithProps: boolean;
}

const PerfContext = createContext<PerfRecord>({
    renderWithProps: false,
});

export default PerfContext;
