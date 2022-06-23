import { createContext } from 'react';

export interface PerfRecord {
    /**
     * Ensure Cells always rerender if set to true,
     * Use cautiously as this will effect performance
     * rerender is triggered by certain events:
     * onMouseEnter, onMouseLeave, onScroll
     * @default false
     */
    renderWithProps: boolean;
}

const PerfContext = createContext<PerfRecord>({
    renderWithProps: false,
});

export default PerfContext;
