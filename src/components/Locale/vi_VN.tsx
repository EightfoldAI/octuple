/* eslint-disable no-template-curly-in-string */
import type { Locale } from '../LocaleProvider';
import Breadcrumb from '../Breadcrumb/Locale/vi_VN';
import DatePicker from '../DateTimePicker/DatePicker/Locale/vi_VN';
import Dialog from '../Dialog/BaseDialog/Locale/vi_VN';
import Drawer from '../Drawer/Locale/vi_VN';
import InfoBar from '../InfoBar/Locale/vi_VN';
import Pagination from '../Pagination/Locale/vi_VN';
import Panel from '../Panel/Locale/vi_VN';
import PersistentBar from '../PersistentBar/Locale/vi_VN';
import Stepper from '../Stepper/Locale/vi_VN';
import Table from '../Table/Locale/vi_VN';
import TimePicker from '../DateTimePicker/TimePicker/Locale/vi_VN';
import Upload from '../Upload/Locale/vi_VN';

const typeTemplate = '${label} không phải là một ${type} hợp lệ';

const localeValues: Locale = {
  locale: 'vi',
  global: {
    placeholder: 'Chọn',
  },
  Breadcrumb,
  DatePicker,
  Dialog,
  Drawer,
  Form: {
    optional: '(tùy chọn)',
    defaultValidateMessages: {
      default: 'Lỗi xác thực trường cho ${label}',
      required: '${label} là bắt buộc',
      enum: '${label} phải là một trong số [${enum}]',
      whitespace: '${label} không thể là một ký tự trắng',
      date: {
        format: 'Định dạng ngày ${label} không hợp lệ',
        parse: '${label} không thể chuyển đổi thành ngày',
        invalid: '${label} là một ngày không hợp lệ',
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
        len: '${label} phải có ${len} ký tự',
        min: '${label} phải có ít nhất ${min} ký tự',
        max: '${label} phải có tối đa ${max} ký tự',
        range: '${label} phải nằm trong khoảng từ ${min} đến ${max} ký tự',
      },
      number: {
        len: '${label} phải bằng ${len}',
        min: '${label} phải tối thiểu là ${min}',
        max: '${label} phải tối đa là ${max}',
        range: '${label} phải nằm trong khoảng từ ${min} đến ${max}',
      },
      array: {
        len: 'Phải có ${len} ${label}',
        min: 'Ít nhất ${min} ${label}',
        max: 'Tối đa ${max} ${label}',
        range: 'Số lượng ${label} phải nằm trong khoảng từ ${min} đến ${max}',
      },
      pattern: {
        mismatch: '${label} không khớp với mẫu ${pattern}',
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
