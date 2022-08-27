/* eslint-disable react/no-multi-comp */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import MockDate from 'mockdate';
import dayjs from 'dayjs';
import LocaleProvider from '../LocaleReceiver';
import { DatePicker, RangePicker } from '../../DateTimePicker/DatePicker';
import { TimePicker } from '../../DateTimePicker/TimePicker/TimePicker';
import { Modal } from '../../Modal';
import { Pagination } from '../../Pagination';
import { Select } from '../../Select';
import { Table } from '../../Table';
import csCZ from '../cs_CZ';
import daDK from '../da_DK';
import deDE from '../de_DE';
import elGR from '../el_GR';
import enGB from '../en_GB';
import enUS from '../en_US';
import esES from '../es_ES';
import esDO from '../es_DO';
import esMX from '../es_MX';
import fiFI from '../fi_FI';
import frBE from '../fr_BE';
import frCA from '../fr_CA';
import frFR from '../fr_FR';
import heIL from '../he_IL';
import hrHR from '../hr_HR';
import htHT from '../ht_HT';
import huHU from '../hu_HU';
import itIT from '../it_IT';
import jaJP from '../ja_JP';
import koKR from '../ko_KR';
import msMY from '../ms_MY';
import nbNO from '../nb_NO';
import nlBE from '../nl_BE';
import nlNL from '../nl_NL';
import plPL from '../pl_PL';
import ptBR from '../pt_BR';
import ptPT from '../pt_PT';
import ruRU from '../ru_RU';
import svSE from '../sv_SE';
import thTH from '../th_TH';
import trTR from '../tr_TR';
import ukUA from '../uk_UA';
import zhCN from '../zh_CN';
import zhTW from '../zh_TW';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia;

const locales = [
    csCZ,
    daDK,
    deDE,
    elGR,
    enGB,
    enUS,
    esES,
    esDO,
    esMX,
    fiFI,
    frBE,
    frCA,
    frFR,
    heIL,
    hrHR,
    htHT,
    huHU,
    itIT,
    jaJP,
    koKR,
    msMY,
    nbNO,
    nlBE,
    nlNL,
    plPL,
    ptBR,
    ptPT,
    ruRU,
    svSE,
    thTH,
    trTR,
    ukUA,
    zhCN,
    zhTW,
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        filters: [
            {
                text: 'filter1',
                value: 'filter1',
            },
        ],
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
];

const App = () => (
    <div>
        <Pagination defaultCurrent={1} total={50} />
        <Select
            options={[
                {
                    text: 'Mia',
                    value: 'mia',
                },
                {
                    text: 'Lola',
                    value: 'lola',
                },
            ]}
            style={{ width: 200 }}
        />
        <DatePicker />
        <TimePicker defaultOpenValue={dayjs()} />
        <RangePicker style={{ width: 200 }} />
        <Table dataSource={[]} columns={columns} />
        <Modal title={'Locale Modal'} visible body={<p>Locale Modal</p>} />
    </div>
);

describe('Locale Provider', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
        MockDate.set(dayjs('2017-09-18T03:30:07.795').valueOf());
    });

    afterEach(() => {
        matchMedia.clear();
    });

    afterAll(() => {
        MockDate.reset();
    });

    locales.forEach((locale) => {
        test(`should display the text as ${locale.locale}`, () => {
            const Test = () => (_, __) => {
                <LocaleProvider locale={locale}>
                    <App />
                </LocaleProvider>;
            };
            const wrapper = mount(<Test />);
            expect(wrapper.render()).toMatchSnapshot();
        });
    });

    test('set dayjs locale when locale changes', () => {
        const Test =
            ({ locale }) =>
            (_, __) => {
                <LocaleProvider locale={locale}>
                    <div>
                        <DatePicker defaultValue={dayjs()} />
                    </div>
                </LocaleProvider>;
            };

        const wrapper = mount(<Test />);
        wrapper.setProps({ locale: zhCN });
        expect(wrapper.render()).toMatchSnapshot();
        wrapper.setProps({ locale: frFR });
        expect(wrapper.render()).toMatchSnapshot();
        wrapper.setProps({ locale: null });
        expect(wrapper.render()).toMatchSnapshot();
    });
});
