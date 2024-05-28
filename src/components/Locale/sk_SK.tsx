/* eslint-disable no-template-curly-in-string */
import type { Locale } from '../LocaleProvider';
import Accordion from '../Accordion/Locale/sk_SK';
import Breadcrumb from '../Breadcrumb/Locale/sk_SK';
import DatePicker from '../DateTimePicker/DatePicker/Locale/sk_SK';
import Dialog from '../Dialog/BaseDialog/Locale/sk_SK';
import Drawer from '../Drawer/Locale/sk_SK';
import InfoBar from '../InfoBar/Locale/sk_SK';
import Pagination from '../Pagination/Locale/sk_SK';
import Panel from '../Panel/Locale/sk_SK';
import PersistentBar from '../PersistentBar/Locale/sk_SK';
import Stepper from '../Stepper/Locale/sk_SK';
import Table from '../Table/Locale/sk_SK';
import TimePicker from '../DateTimePicker/TimePicker/Locale/sk_SK';
import Upload from '../Upload/Locale/sk_SK';

const typeTemplate = '${label} nie je platný ${type}';

const localeValues: Locale = {
  locale: 'sk',
  global: {
    placeholder: 'Vyberte',
  },
  Accordion,
  Breadcrumb,
  DatePicker,
  Dialog,
  Drawer,
  Form: {
    optional: '(voliteľné)',
    defaultValidateMessages: {
      default: 'Chyba overenia polia pre ${label}',
      required: '${label} je povinné',
      enum: '${label} musí byť jedno z [${enum}]',
      whitespace: '${label} nemôže byť prázdny znak',
      date: {
        format: 'Formát dátumu ${label} je neplatný',
        parse: '${label} nie je možné previesť na dátum',
        invalid: '${label} je neplatný dátum',
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
        len: '${label} musí mať ${len} znakov',
        min: '${label} musí mať aspoň ${min} znakov',
        max: '${label} musí mať najviac ${max} znakov',
        range: '${label} musí byť medzi ${min}-${max} znakmi',
      },
      number: {
        len: '${label} musí byť rovné ${len}',
        min: '${label} musí byť minimálne ${min}',
        max: '${label} musí byť maximálne ${max}',
        range: '${label} musí byť medzi ${min}-${max}',
      },
      array: {
        len: 'Musí byť ${len} ${label}',
        min: 'Aspoň ${min} ${label}',
        max: 'Najviac ${max} ${label}',
        range: 'Počet ${label} musí byť medzi ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} sa nezhoduje s vzorom ${pattern}',
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
