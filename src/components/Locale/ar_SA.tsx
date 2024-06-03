/* eslint-disable no-template-curly-in-string */
import type { Locale } from '../LocaleProvider';
import Accordion from '../Accordion/Locale/ar_SA';
import Breadcrumb from '../Breadcrumb/Locale/ar_SA';
import DatePicker from '../DateTimePicker/DatePicker/Locale/ar_SA';
import Dialog from '../Dialog/BaseDialog/Locale/ar_SA';
import Drawer from '../Drawer/Locale/ar_SA';
import InfoBar from '../InfoBar/Locale/ar_SA';
import Pagination from '../Pagination/Locale/ar_SA';
import Panel from '../Panel/Locale/ar_SA';
import PersistentBar from '../PersistentBar/Locale/ar_SA';
import Stepper from '../Stepper/Locale/ar_SA';
import Table from '../Table/Locale/ar_SA';
import TimePicker from '../DateTimePicker/TimePicker/Locale/ar_SA';
import Upload from '../Upload/Locale/ar_SA';

const typeTemplate = '${label} ليس ${type} صالحًا';

const localeValues: Locale = {
  locale: 'ar',
  global: {
    placeholder: 'اختر',
  },
  Accordion,
  Breadcrumb,
  DatePicker,
  Dialog,
  Drawer,
  Form: {
    optional: '(اختياري)',
    defaultValidateMessages: {
      default: 'خطأ في التحقق من صحة الحقل ${label}',
      required: '${label} مطلوب',
      enum: '${label} يجب أن يكون واحدًا من [${enum}]',
      whitespace: '${label} لا يمكن أن يكون حرفًا فارغًا',
      date: {
        format: 'تنسيق التاريخ ${label} غير صالح',
        parse: 'لا يمكن تحويل ${label} إلى تاريخ',
        invalid: '${label} هو تاريخ غير صالح',
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
        len: 'يجب أن يكون ${label} ${len} حروف',
        min: 'يجب أن يكون ${label} على الأقل ${min} حروف',
        max: 'يجب أن يكون ${label} حتى ${max} حروف',
        range: 'يجب أن يكون ${label} بين ${min}-${max} حروف',
      },
      number: {
        len: 'يجب أن يكون ${label} مساويا لـ ${len}',
        min: 'يجب أن يكون ${label} الحد الأدنى ${min}',
        max: 'يجب أن يكون ${label} الحد الأقصى ${max}',
        range: 'يجب أن يكون ${label} بين ${min}-${max}',
      },
      array: {
        len: 'يجب أن يكون ${len} ${label}',
        min: 'على الأقل ${min} ${label}',
        max: 'على الأكثر ${max} ${label}',
        range: 'يجب أن يكون مقدار ${label} بين ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} لا يتطابق مع النمط ${pattern}',
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
