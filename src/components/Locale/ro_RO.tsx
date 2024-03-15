/* eslint-disable no-template-curly-in-string */
import type { Locale } from '../LocaleProvider';
import Breadcrumb from '../Breadcrumb/Locale/ro_RO';
import DatePicker from '../DateTimePicker/DatePicker/Locale/ro_RO';
import Dialog from '../Dialog/BaseDialog/Locale/ro_RO';
import Drawer from '../Drawer/Locale/ro_RO';
import InfoBar from '../InfoBar/Locale/ro_RO';
import Pagination from '../Pagination/Locale/ro_RO';
import Panel from '../Panel/Locale/ro_RO';
import PersistentBar from '../PersistentBar/Locale/ro_RO';
import Stepper from '../Stepper/Locale/ro_RO';
import Table from '../Table/Locale/ro_RO';
import TimePicker from '../DateTimePicker/TimePicker/Locale/ro_RO';
import Upload from '../Upload/Locale/ro_RO';

const typeTemplate = '${label} nu este un ${type} valid';

const localeValues: Locale = {
  locale: 'ro',
  global: {
    placeholder: 'Selectați',
  },
  Breadcrumb,
  DatePicker,
  Dialog,
  Drawer,
  Form: {
    optional: '(opțional)',
    defaultValidateMessages: {
      default: 'Eroare de validare a câmpului pentru ${label}',
      required: '${label} este necesar',
      enum: '${label} trebuie să fie unul dintre [${enum}]',
      whitespace: '${label} nu poate fi un caracter gol',
      date: {
        format: 'Formatul datei ${label} este invalid',
        parse: '${label} nu poate fi convertit într-o dată',
        invalid: '${label} este o dată invalidă',
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
        len: '${label} trebuie să aibă ${len} caractere',
        min: '${label} trebuie să aibă cel puțin ${min} caractere',
        max: '${label} trebuie să aibă până la ${max} caractere',
        range: '${label} trebuie să aibă între ${min}-${max} caractere',
      },
      number: {
        len: '${label} trebuie să fie egal cu ${len}',
        min: '${label} trebuie să fie minim ${min}',
        max: '${label} trebuie să fie maxim ${max}',
        range: '${label} trebuie să fie între ${min}-${max}',
      },
      array: {
        len: 'Trebuie să fie ${len} ${label}',
        min: 'Cel puțin ${min} ${label}',
        max: 'Cel mult ${max} ${label}',
        range: 'Cantitatea de ${label} trebuie să fie între ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} nu se potrivește cu modelul ${pattern}',
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
