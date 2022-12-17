import React, { FC } from 'react';
import { TextInput } from '../../../Inputs';
import { IconName } from '../../../Icon';
import type { FilterSearchType } from '../../Table.types';

import styles from '../../Styles/table.module.scss';

interface FilterSearchProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filterSearch: FilterSearchType;
  filterSearchPlaceholderText: string;
}

const FilterSearch: FC<FilterSearchProps> = ({
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
        classNames={styles.tableFilterDropdownSearchInput}
      />
    </div>
  );
};

export default FilterSearch;
