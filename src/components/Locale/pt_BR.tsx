/* eslint-disable no-template-curly-in-string */
import type { Locale } from '../LocaleProvider';
import Accordion from '../Accordion/Locale/pt_BR';
import Breadcrumb from '../Breadcrumb/Locale/pt_BR';
import DatePicker from '../DateTimePicker/DatePicker/Locale/pt_BR';
import Dialog from '../Dialog/BaseDialog/Locale/pt_BR';
import Drawer from '../Drawer/Locale/pt_BR';
import InfoBar from '../InfoBar/Locale/pt_BR';
import Pagination from '../Pagination/Locale/pt_BR';
import Panel from '../Panel/Locale/pt_BR';
import PersistentBar from '../PersistentBar/Locale/pt_BR';
import Stepper from '../Stepper/Locale/pt_BR';
import Table from '../Table/Locale/pt_BR';
import TimePicker from '../DateTimePicker/TimePicker/Locale/pt_BR';
import Upload from '../Upload/Locale/pt_BR';

const typeTemplate = '${label} não é um ${type} válido';

const localeValues: Locale = {
  locale: 'pt-br',
  global: {
    placeholder: 'Por favor escolha',
  },
  Accordion,
  Breadcrumb,
  DatePicker,
  Dialog,
  Drawer,
  Form: {
    optional: '(opcional)',
    defaultValidateMessages: {
      default: 'Erro ${label} na validação de campo',
      required: 'Por favor, insira ${label}',
      enum: '${label} deve ser um dos seguinte: [${enum}]',
      whitespace: '${label} não pode ser um carácter vazio',
      date: {
        format: ' O formato de data ${label} é inválido',
        parse: '${label} não pode ser convertido para uma data',
        invalid: '${label} é uma data inválida',
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
        len: '${label} deve possuir ${len} caracteres',
        min: '${label} deve possuir ao menos ${min} caracteres',
        max: '${label} deve possuir no máximo ${max} caracteres',
        range: '${label} deve possuir entre ${min} e ${max} caracteres',
      },
      number: {
        len: '${label} deve ser igual à ${len}',
        min: 'O valor mínimo de ${label} é ${min}',
        max: 'O valor máximo de ${label} é ${max}',
        range: '${label} deve estar entre ${min} e ${max}',
      },
      array: {
        len: 'Deve ser ${len} ${label}',
        min: 'No mínimo ${min} ${label}',
        max: 'No máximo ${max} ${label}',
        range: 'A quantidade de ${label} deve estar entre ${min} e ${max}',
      },
      pattern: {
        mismatch: '${label} não se encaixa no padrão ${pattern}',
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
