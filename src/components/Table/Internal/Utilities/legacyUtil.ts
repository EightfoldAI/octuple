import type { ExpandableConfig, LegacyExpandableProps } from '../OcTable.types';

export const INTERNAL_COL_DEFINE = 'OC_TABLE_INTERNAL_COL_DEFINE';

export function getExpandableProps<RecordType>(
    props: LegacyExpandableProps<RecordType> & {
        expandable?: ExpandableConfig<RecordType>;
    }
): ExpandableConfig<RecordType> {
    const { expandable, ...legacyExpandableConfig } = props;
    let config: ExpandableConfig<RecordType>;

    if ('expandable' in props) {
        config = {
            ...legacyExpandableConfig,
            ...expandable,
        };
    } else {
        if (
            process.env.NODE_ENV !== 'production' &&
            [
                'indentSize',
                'expandedRowKeys',
                'defaultExpandedRowKeys',
                'defaultExpandAllRows',
                'expandedRowRender',
                'expandRowByClick',
                'expandIcon',
                'onExpand',
                'onExpandedRowsChange',
                'expandedRowClassName',
                'expandIconColumnIndex',
                'showExpandColumn',
            ].some((prop) => prop in props)
        ) {
            console.log(
                'expanded related props have been moved into `expandable`.'
            );
        }

        config = legacyExpandableConfig;
    }

    if (config.showExpandColumn === false) {
        config.expandIconColumnIndex = -1;
    }

    return config;
}
