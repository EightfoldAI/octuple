/* eslint-disable no-template-curly-in-string */
import type { Locale } from '../LocaleProvider';
import Breadcrumb from '../Breadcrumb/Locale/bg_BG';
import DatePicker from '../DateTimePicker/DatePicker/Locale/bg_BG';
import Dialog from '../Dialog/BaseDialog/Locale/bg_BG';
import Drawer from '../Drawer/Locale/bg_BG';
import InfoBar from '../InfoBar/Locale/bg_BG';
import Pagination from '../Pagination/Locale/bg_BG';
import Panel from '../Panel/Locale/bg_BG';
import PersistentBar from '../PersistentBar/Locale/bg_BG';
import Stepper from '../Stepper/Locale/bg_BG';
import Table from '../Table/Locale/bg_BG';
import TimePicker from '../DateTimePicker/TimePicker/Locale/bg_BG';
import Upload from '../Upload/Locale/bg_BG';

const typeTemplate = '${label} не е валиден ${type}';

const localeValues: Locale = {
  locale: 'bg',
  global: {
    placeholder: 'Изберете',
  },
  Breadcrumb,
  DatePicker,
  Dialog,
  Drawer,
  Form: {
    optional: '(по избор)',
    defaultValidateMessages: {
      default: 'Грешка при валидация на полето за ${label}',
      required: '${label} е задължително',
      enum: '${label} трябва да бъде едно от [${enum}]',
      whitespace: '${label} не може да бъде празен символ',
      date: {
        format: 'Форматът на датата ${label} е невалиден',
        parse: '${label} не може да бъде преобразувано в дата',
        invalid: '${label} е невалидна дата',
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
        len: '${label} трябва да бъде ${len} символа',
        min: '${label} трябва да бъде поне ${min} символа',
        max: '${label} трябва да бъде до ${max} символа',
        range: '${label} трябва да бъде между ${min}-${max} символа',
      },
      number: {
        len: '${label} трябва да бъде равно на ${len}',
        min: '${label} трябва да бъде минимум ${min}',
        max: '${label} трябва да бъде максимум ${max}',
        range: '${label} трябва да бъде между ${min}-${max}',
      },
      array: {
        len: 'Трябва да бъде ${len} ${label}',
        min: 'Поне ${min} ${label}',
        max: 'Най-много ${max} ${label}',
        range: 'Броят на ${label} трябва да бъде между ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} не съответства на модела ${pattern}',
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
