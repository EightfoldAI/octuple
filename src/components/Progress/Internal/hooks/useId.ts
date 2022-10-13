import React from 'react';
import { canUseDom } from '../../../../shared/utilities';

let uuid: number = 0;

/** Is client side and not jsdom */
export const isBrowserClient = process.env.NODE_ENV !== 'test' && canUseDom();

/** Get unique id for accessibility usage */
function getUUID(): number | string {
    let retId: string | number;

    // Test handler
    if (isBrowserClient) {
        retId = uuid;
        uuid += 1;
    } else {
        retId = 'TEST_OR_SSR';
    }

    return retId;
}

export default (id?: string): string => {
    const [innerId, setInnerId] = React.useState<string>();
    React.useEffect(() => {
        setInnerId(`progress_${getUUID()}`);
    }, []);
    return id || innerId;
};
