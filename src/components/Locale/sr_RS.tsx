/* eslint-disable no-template-curly-in-string */
import type { Locale } from '../LocaleProvider';
import Breadcrumb from '../Breadcrumb/Locale/sr_RS';
import DatePicker from '../DateTimePicker/DatePicker/Locale/sr_RS';
import Dialog from '../Dialog/BaseDialog/Locale/sr_RS';
import Drawer from '../Drawer/Locale/sr_RS';
import InfoBar from '../InfoBar/Locale/sr_RS';
import Pagination from '../Pagination/Locale/sr_RS';
import Panel from '../Panel/Locale/sr_RS';
import PersistentBar from '../PersistentBar/Locale/sr_RS';
import Stepper from '../Stepper/Locale/sr_RS';
import Table from '../Table/Locale/sr_RS';
import TimePicker from '../DateTimePicker/TimePicker/Locale/sr_RS';
import Upload from '../Upload/Locale/sr_RS';

const typeTemplate = '${label} nije validan ${type}';

const localeValues: Locale = {
  locale: 'sr',
  global: {
    placeholder: 'Izaberi',
  },
  Breadcrumb,
  DatePicker,
  Dialog,
  Drawer,
  Form: {
    optional: '(opciono)',
    defaultValidateMessages: {
      default: 'Greška pri validaciji polja za ${label}',
      required: '${label} je obavezno',
      enum: '${label} mora biti jedan od [${enum}]',
      whitespace: '${label} ne može biti prazan karakter',
      date: {
        format: 'Format datuma ${label} je nevažeći',
        parse: '${label} ne može biti konvertovan u datum',
        invalid: '${label} je nevažeći datum',
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate,
      },
      string: {
        len: '${label} mora biti ${len} karaktera',
        min: '${label} mora biti najmanje ${min} karaktera',
        max: '${label} mora biti do ${max} karaktera',
        range: '${label} mora biti između ${min}-${max} karaktera',
      },
      number: {
        len: '${label} mora biti jednako ${len}',
        min: '${label} mora biti minimalno ${min}',
        max: '${label} mora biti maksimalno ${max}',
        range: '${label} mora biti između ${min}-${max}',
      },
      array: {
        len: 'Mora biti ${len} ${label}',
        min: 'Najmanje ${min} ${label}',
        max: 'Najviše ${max} ${label}',
        range: 'Količina ${label} mora biti između ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} se ne podudara sa šablonom ${pattern}',
      },
    },
  },
  InfoBar,
  Pagination,
  Panel,
  PersistentBar,
  Stepper,
  Table,
  TimePicker,
  Upload,
};

export default localeValues;
