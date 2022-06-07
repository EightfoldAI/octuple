import React, { ReactElement } from 'react';
import { ColGroupProps } from './OcTable.types';
import { INTERNAL_COL_DEFINE } from './Utilities/legacyUtil';

function ColGroup<RecordType>({
    colWidths,
    columns,
    columCount,
}: ColGroupProps<RecordType>) {
    const cols: ReactElement[] = [];
    const len = columCount || columns.length;

    // Only insert col with width & additional props
    // Skip if rest col do not have any useful info
    let mustInsert = false;
    for (let i = len - 1; i >= 0; i -= 1) {
        const width = colWidths[i];
        const column = columns && columns[i];
        const additionalProps = column && (column as any)[INTERNAL_COL_DEFINE];

        if (width || additionalProps || mustInsert) {
            const { columnType, ...restAdditionalProps } =
                additionalProps || {};
            cols.unshift(
                <col key={i} style={{ width }} {...restAdditionalProps} />
            );
            mustInsert = true;
        }
    }

    return <colgroup>{cols}</colgroup>;
}

export default ColGroup;
