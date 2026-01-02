/* eslint-disable no-template-curly-in-string */
import type { Locale } from '../LocaleProvider';
import Accordion from '../Accordion/Locale/de_DE';
import Breadcrumb from '../Breadcrumb/Locale/de_DE';
import DatePicker from '../DateTimePicker/DatePicker/Locale/de_DE';
import Dialog from '../Dialog/BaseDialog/Locale/de_DE';
import Drawer from '../Drawer/Locale/de_DE';
import InfoBar from '../InfoBar/Locale/de_DE';
import Pagination from '../Pagination/Locale/de_DE';
import Panel from '../Panel/Locale/de_DE';
import PersistentBar from '../PersistentBar/Locale/de_DE';
import Stepper from '../Stepper/Locale/de_DE';
import Table from '../Table/Locale/de_DE';
import TimePicker from '../DateTimePicker/TimePicker/Locale/de_DE';
import Upload from '../Upload/Locale/de_DE';

const typeTemplate = '${label} ist nicht gültig. ${type} erwartet';

const localeValues: Locale = {
  locale: 'de',
  global: {
    placeholder: 'Bitte auswählen',
  },
  Accordion,
  Breadcrumb,
  DatePicker,
  Dialog,
  Drawer,
  Form: {
    defaultValidateMessages: {
      default: 'Feld-Validierungsfehler: ${label}',
      required: 'Bitte geben Sie ${label} an',
      enum: '${label} muss eines der folgenden sein [${enum}]',
      whitespace: '${label} darf kein Leerzeichen sein',
      date: {
        format: '${label} ist ein ungültiges Datumsformat',
        parse: '${label} kann nicht in ein Datum umgewandelt werden',
        invalid: '${label} ist ein ungültiges Datum',
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
        len: '${label} muss genau ${len} Zeichen lang sein',
        min: '${label} muss mindestens ${min} Zeichen lang sein',
        max: '${label} darf höchstens ${max} Zeichen lang sein',
        range: '${label} muss zwischen ${min} und ${max} Zeichen lang sein',
      },
      number: {
        len: '${label} muss gleich ${len} sein',
        min: '${label} muss mindestens ${min} sein',
        max: '${label} darf maximal ${max} sein',
        range: '${label} muss zwischen ${min} und ${max} liegen',
      },
      array: {
        len: 'Es müssen ${len} ${label} sein',
        min: 'Es müssen mindestens ${min} ${label} sein',
        max: 'Es dürfen maximal ${max} ${label} sein',
        range: 'Die Anzahl an ${label} muss zwischen ${min} und ${max} liegen',
      },
      pattern: {
        mismatch: '${label} enspricht nicht dem ${pattern} Muster',
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
