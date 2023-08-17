/* eslint-disable no-template-curly-in-string */
import type { Locale } from '../LocaleProvider';
import Breadcrumb from '../Breadcrumb/Locale/hi_IN';
import DatePicker from '../DateTimePicker/DatePicker/Locale/hi_IN';
import Dialog from '../Dialog/BaseDialog/Locale/hi_IN';
import InfoBar from '../InfoBar/Locale/hi_IN';
import Pagination from '../Pagination/Locale/hi_IN';
import Panel from '../Panel/Locale/hi_IN';
import PersistentBar from '../PersistentBar/Locale/hi_IN';
import Stepper from '../Stepper/Locale/hi_IN';
import Table from '../Table/Locale/hi_IN';
import TimePicker from '../DateTimePicker/TimePicker/Locale/hi_IN';
import Upload from '../Upload/Locale/hi_IN';

const typeTemplate = '${label} कोई मान्य ${type} नहीं है';

const localeValues: Locale = {
  locale: 'hi',
  global: {
    placeholder: 'चुनना',
  },
  Breadcrumb,
  DatePicker,
  Dialog,
  Form: {
    optional: '(वैकल्पिक)',
    defaultValidateMessages: {
      default: '${label} के लिए फ़ील्ड सत्यापन त्रुटि',
      required: '${label} आवश्यक है',
      enum: '${label} [${enum}] में से एक होना चाहिए',
      whitespace: '${label} एक रिक्त वर्ण नहीं हो सकता',
      date: {
        format: '${label} दिनांक स्वरूप अमान्य है',
        parse: '${label} को दिनांक में कनवर्ट नहीं किया जा सकता',
        invalid: '${label} एक अमान्य दिनांक है',
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
        len: '${label} ${len} वर्णों का होना चाहिए',
        min: '${label} कम से कम ${min} वर्णों का होना चाहिए',
        max: '${label} ${max} वर्णों तक होना चाहिए',
        range: '${label} ${min}-${max} वर्णों के बीच होना चाहिए',
      },
      number: {
        len: '${label} ${len} के बराबर होना चाहिए',
        min: '${label} न्यूनतम ${min} होना चाहिए',
        max: '${label} अधिकतम ${max} होना चाहिए',
        range: '${label} ${min}-${max} के बीच होना चाहिए',
      },
      array: {
        len: '${len} ${label} होना चाहिए',
        min: 'कम से कम ${min} ${label}',
        max: 'अधिकतम ${max} ${label}',
        range: '${label} की मात्रा ${min}-${max} के बीच होनी चाहिए',
      },
      pattern: {
        mismatch: '${label} पैटर्न ${pattern} से मेल नहीं खाता है',
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
