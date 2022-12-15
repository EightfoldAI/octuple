import React from 'react';

export interface FilterDropdownMenuWrapperProps {
  children?: React.ReactNode;
  classNames?: string;
}

const FilterDropdownMenuWrapper = (props: FilterDropdownMenuWrapperProps) => (
  <div className={props.classNames} onClick={(e) => e.stopPropagation()}>
    {props.children}
  </div>
);

export default FilterDropdownMenuWrapper;
