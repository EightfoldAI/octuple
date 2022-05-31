import React, { useMemo } from 'react';
import Summary from './Summary';
import SummaryContext from './SummaryContext';
import { FooterProps } from './Footer.types';

import styles from '../table.module.scss';

function Footer<RecordType>({
    children,
    stickyOffsets,
    flattenColumns,
}: FooterProps<RecordType>) {
    const lastColumnIndex = flattenColumns.length - 1;
    const scrollColumn = flattenColumns[lastColumnIndex];

    const summaryContext = useMemo(
        () => ({
            stickyOffsets,
            flattenColumns,
            scrollColumnIndex: scrollColumn?.scrollbar ? lastColumnIndex : null,
        }),
        [scrollColumn, flattenColumns, lastColumnIndex, stickyOffsets]
    );

    return (
        <SummaryContext.Provider value={summaryContext}>
            <tfoot className={styles.tableSummary}>{children}</tfoot>
        </SummaryContext.Provider>
    );
}

export default Footer;

export const FooterComponents = Summary;
