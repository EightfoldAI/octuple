/* eslint-disable no-template-curly-in-string */
import type { Locale } from '../LocaleProvider';
import Breadcrumb from '../Breadcrumb/Locale/pl_PL';
import DatePicker from '../DateTimePicker/DatePicker/Locale/pl_PL';
import Dialog from '../Dialog/BaseDialog/Locale/pl_PL';
import Drawer from '../Drawer/Locale/pl_PL';
import InfoBar from '../InfoBar/Locale/pl_PL';
import Pagination from '../Pagination/Locale/pl_PL';
import Panel from '../Panel/Locale/pl_PL';
import PersistentBar from '../PersistentBar/Locale/pl_PL';
import Stepper from '../Stepper/Locale/pl_PL';
import Table from '../Table/Locale/pl_PL';
import TimePicker from '../DateTimePicker/TimePicker/Locale/pl_PL';
import Upload from '../Upload/Locale/pl_PL';

const typeTemplate = '${label} nie posiada poprawnej wartości dla typu ${type}';

const localeValues: Locale = {
  locale: 'pl',
  global: {
    placeholder: 'Wybierz',
  },
  Breadcrumb,
  DatePicker,
  Dialog,
  Drawer,
  Form: {
    optional: '(opcjonalne)',
    defaultValidateMessages: {
      default: 'Błąd walidacji dla pola ${label}',
      required: 'Pole ${label} jest wymagane',
      enum: 'Pole ${label} musi posiadać wartość z listy: [${enum}]',
      whitespace: 'Pole ${label} nie może być puste',
      date: {
        format: '${label} posiada zły format daty',
        parse: '${label} nie może zostać zinterpretowane jako data',
        invalid: '${label} jest niepoprawną datą',
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
        len: '${label} musi posiadać ${len} znaków',
        min: '${label} musi posiadać co namniej ${min} znaków',
        max: '${label} musi posiadać maksymalnie ${max} znaków',
        range: '${label} musi posiadać między ${min} a ${max} znaków',
      },
      number: {
        len: '${label} musi mieć wartość o długości ${len}',
        min: '${label} musi mieć wartość większą lub równą ${min}',
        max: '${label} musi mieć wartość mniejszą lub równą ${max}',
        range: '${label} musi mieć wartość pomiędzy ${min} a ${max}',
      },
      array: {
        len: '${label} musi posiadać ${len} elementów',
        min: '${label} musi posiadać co najmniej ${min} elementów',
        max: '${label} musi posiadać maksymalnie ${max} elementów',
        range: '${label} musi posiadać między ${min} a ${max} elementów',
      },
      pattern: {
        mismatch: '${label} nie posiada wartości zgodnej ze wzorem ${pattern}',
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
