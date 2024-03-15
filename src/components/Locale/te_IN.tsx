/* eslint-disable no-template-curly-in-string */
import type { Locale } from '../LocaleProvider';
import Breadcrumb from '../Breadcrumb/Locale/te_IN';
import DatePicker from '../DateTimePicker/DatePicker/Locale/te_IN';
import Dialog from '../Dialog/BaseDialog/Locale/te_IN';
import Drawer from '../Drawer/Locale/te_IN';
import InfoBar from '../InfoBar/Locale/te_IN';
import Pagination from '../Pagination/Locale/te_IN';
import Panel from '../Panel/Locale/te_IN';
import PersistentBar from '../PersistentBar/Locale/te_IN';
import Stepper from '../Stepper/Locale/te_IN';
import Table from '../Table/Locale/te_IN';
import TimePicker from '../DateTimePicker/TimePicker/Locale/te_IN';
import Upload from '../Upload/Locale/te_IN';

const typeTemplate = '${label} సరైన ${type} కాదు';

const localeValues: Locale = {
  locale: 'te',
  global: {
    placeholder: 'ఎంచుకోండి',
  },
  Breadcrumb,
  DatePicker,
  Dialog,
  Drawer,
  Form: {
    optional: '(ఐచ్ఛికం)',
    defaultValidateMessages: {
      default: '${label} కోసం ఫీల్డ్ ధృవీకరణ లోపం',
      required: '${label} అవసరం',
      enum: '${label} [${enum}] లో ఒకటి ఉండాలి',
      whitespace: '${label} ఖాళీ అక్షరం ఉండకూడదు',
      date: {
        format: '${label} తేదీ ఫార్మాట్ చెల్లదు',
        parse: '${label} తేదీగా మార్చలేము',
        invalid: '${label} చెల్లని తేదీ',
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
        len: '${label} క్యారెక్టర్లు ${len} ఉండాలి',
        min: '${label} కనీసం ${min} క్యారెక్టర్లు ఉండాలి',
        max: '${label} గరిష్ఠం ${max} క్యారెక్టర్లు ఉండాలి',
        range: '${label} ${min}-${max} క్యారెక్టర్ల మధ్య ఉండాలి',
      },
      number: {
        len: '${label} ${len} కి సమానం ఉండాలి',
        min: '${label} కనీసం ${min} ఉండాలి',
        max: '${label} గరిష్ఠం ${max} ఉండాలి',
        range: '${label} ${min}-${max} మధ్య ఉండాలి',
      },
      array: {
        len: '${len} ${label} ఉండాలి',
        min: '${min} ${label} కనీసం ఉండాలి',
        max: '${max} ${label} గరిష్ఠం ఉండాలి',
        range: '${label} యొక్క సంఖ్య ${min}-${max} మధ్య ఉండాలి',
      },
      pattern: {
        mismatch: '${label} మోడల్ ${pattern} తో సరిపోలడం లేదు',
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
