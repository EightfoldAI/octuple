/* eslint-disable no-template-curly-in-string */
import type { Locale } from '../LocaleProvider';
import Breadcrumb from '../Breadcrumb/Locale/zh_TW';
import DatePicker from '../DateTimePicker/DatePicker/Locale/zh_TW';
import Dialog from '../Dialog/BaseDialog/Locale/zh_TW';
import Drawer from '../Drawer/Locale/zh_TW';
import InfoBar from '../InfoBar/Locale/zh_TW';
import Pagination from '../Pagination/Locale/zh_TW';
import Panel from '../Panel/Locale/zh_TW';
import PersistentBar from '../PersistentBar/Locale/zh_TW';
import Stepper from '../Stepper/Locale/zh_TW';
import Table from '../Table/Locale/zh_TW';
import TimePicker from '../DateTimePicker/TimePicker/Locale/zh_TW';
import Upload from '../Upload/Locale/zh_TW';

const typeTemplate = '${label}不是一個有效的${type}';

const localeValues: Locale = {
  locale: 'zh-tw',
  global: {
    placeholder: '請選擇',
  },
  Breadcrumb,
  DatePicker,
  Dialog,
  Drawer,
  Form: {
    optional: '（可選）',
    defaultValidateMessages: {
      default: '字段驗證錯誤${label}',
      required: '請輸入${label}',
      enum: '${label}必須是其中一個[${enum}]',
      whitespace: '${label}不能為空字符',
      date: {
        format: '${label}日期格式無效',
        parse: '${label}不能轉換為日期',
        invalid: '${label}是一個無效日期',
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
        len: '${label}須為${len}個字符',
        min: '${label}最少${min}個字符',
        max: '${label}最多${max}個字符',
        range: '${label}須在${min}-${max}字符之間',
      },
      number: {
        len: '${label}必須等於${len}',
        min: '${label}最小值為${min}',
        max: '${label}最大值為${max}',
        range: '${label}須在${min}-${max}之間',
      },
      array: {
        len: '須為${len}個${label}',
        min: '最少${min}個${label}',
        max: '最多${max}個${label}',
        range: '${label}數量須在${min}-${max}之間',
      },
      pattern: {
        mismatch: '${label}與模式不匹配${pattern}',
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
