import React, { useContext } from 'react';
import { TimeHeaderProps } from './Time.types';
import { Header } from '../Header';
import PartialContext from '../../PartialContext';
import { formatValue } from '../../Utils/dateUtil';
import { DatePickerSize } from '../../OcPicker.types';

function TimeHeader<DateType>(props: TimeHeaderProps<DateType>) {
  const { hideHeader } = useContext(PartialContext);

  if (hideHeader) {
    return null;
  }

  const {
    format,
    generateConfig,
    locale,
    size = DatePickerSize.Medium,
    value,
  } = props;

  return (
    <Header size={size}>
      {value
        ? formatValue(value, {
            locale,
            format,
            generateConfig,
          })
        : '\u00A0'}
    </Header>
  );
}

export default TimeHeader;
