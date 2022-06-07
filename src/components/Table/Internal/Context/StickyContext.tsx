import { createContext } from 'react';

// Tell cell that browser support sticky
const StickyContext = createContext<boolean>(false);

export default StickyContext;
