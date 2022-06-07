import React from 'react';
import { TextInput } from '../../../Inputs';
import { IconName } from '../../../Icon';
import type { FilterSearchType } from '../../Table.types';

import styles from '../../Styles/table.module.scss';

interface FilterSearchProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    filterSearch: FilterSearchType;
    filterSearchPlaceholderText: string;
}

const FilterSearch: React.FC<FilterSearchProps> = ({
    value,
    onChange,
    filterSearch,
    filterSearchPlaceholderText,
}) => {
    if (!filterSearch) {
        return null;
    }
    return (
        <div className={styles.tableFilterDropdownSearch}>
            <TextInput
                iconProps={{
                    path: IconName.mdiMagnify,
                }}
                placeholder={filterSearchPlaceholderText}
                onChange={onChange}
                value={value}
                className={styles.tableFilterDropdownSearchInput}
            />
        </div>
    );
};

export default FilterSearch;
