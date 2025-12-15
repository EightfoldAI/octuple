/* eslint-disable no-template-curly-in-string */
import type { Locale } from '../LocaleProvider';
import Accordion from '../Accordion/Locale/es_ES';
import Breadcrumb from '../Breadcrumb/Locale/es_ES';
import DatePicker from '../DateTimePicker/DatePicker/Locale/es_ES';
import Dialog from '../Dialog/BaseDialog/Locale/es_ES';
import Drawer from '../Drawer/Locale/es_ES';
import InfoBar from '../InfoBar/Locale/es_ES';
import Pagination from '../Pagination/Locale/es_ES';
import Panel from '../Panel/Locale/es_ES';
import PersistentBar from '../PersistentBar/Locale/es_ES';
import Stepper from '../Stepper/Locale/es_ES';
import Table from '../Table/Locale/es_ES';
import TimePicker from '../DateTimePicker/TimePicker/Locale/es_ES';
import Upload from '../Upload/Locale/es_ES';

const typeTemplate = '${label} no es un ${type} válido';

const localeValues: Locale = {
  locale: 'es',
  global: {
    placeholder: 'Seleccione',
  },
  Accordion,
  Breadcrumb,
  DatePicker,
  Dialog,
  Drawer,
  Form: {
    optional: '(opcional)',
    defaultValidateMessages: {
      default: 'Error de validación del campo ${label}',
      required: 'Por favor ingresar ${label}',
      enum: '${label} debe ser uno de [${enum}]',
      whitespace: '${label} no puede ser un carácter en blanco',
      date: {
        format: 'El formato de fecha de ${label} es inválido',
        parse: '${label} no se puede convertir a una fecha',
        invalid: '${label} es una fecha inválida',
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
        len: '${label} debe tener ${len} caracteres',
        min: '${label} debe tener al menos ${min} caracteres',
        max: '${label} debe tener hasta ${max} caracteres',
        range: '${label} debe tener entre ${min}-${max} caracteres',
      },
      number: {
        len: '${label} debe ser igual a ${len}',
        min: '${label} valor mínimo es ${min}',
        max: '${label} valor máximo es ${max}',
        range: '${label} debe estar entre ${min}-${max}',
      },
      array: {
        len: 'Debe ser ${len} ${label}',
        min: 'Al menos ${min} ${label}',
        max: 'A lo mucho ${max} ${label}',
        range: 'El monto de ${label} debe estar entre ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} no coincide con el patrón ${pattern}',
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
