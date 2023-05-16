import React, { FC, useState, useRef, useCallback } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import {
  ButtonSize,
  DefaultButton,
  PrimaryButton,
  SecondaryButton,
  TwoStateButton,
} from '../Button';
import { Tab, Tabs, TabVariant } from '../Tabs';
import { Icon, IconName } from '../Icon';
import { CompactPicker } from 'react-color';
import {
  ConfigProvider,
  FontOptions,
  OcThemeName,
  ThemeOptions,
  useConfig,
} from './';
import { MatchScore } from '../MatchScore';
import { Spinner } from '../Spinner';
import { Stack } from '../Stack';
import { RadioGroup } from '../RadioButton';
import { CheckBox, CheckBoxGroup } from '../CheckBox';
import { Link } from '../Link';
import { Navbar, NavbarContent } from '../Navbar';
import { Dropdown } from '../Dropdown';
import { Menu, MenuVariant } from '../Menu';
import { TextArea } from '../Inputs';
import DatePicker, {
  DatePickerProps,
  DatePickerShape,
  DatePickerSize,
  RangePickerProps,
} from '../DateTimePicker/DatePicker';
import { Dialog } from '../Dialog';
import { Pagination, PaginationLayoutOptions } from '../Pagination';
import { SelectOption, SelectSize } from '../Select/Select.types';
import { Select } from '../Select';
import { snack, SnackbarContainer } from '../Snackbar';
import Upload, { UploadProps } from '../Upload';
import dayjs, { Dayjs } from 'dayjs';

// locales
import csCZ from '../Locale/cs_CZ'; // čeština
import daDK from '../Locale/da_DK'; // Dansk
import deDE from '../Locale/de_DE'; // Deutsch
import elGR from '../Locale/el_GR'; // Ελληνικά
import enGB from '../Locale/en_GB'; // English (United Kingdom)
import enUS from '../Locale/en_US'; // English (United States)
import esES from '../Locale/es_ES'; // Español
import esDO from '../Locale/es_DO'; // Español (Dominican Republic)
import esMX from '../Locale/es_MX'; // Español (Mexico)
import fiFI from '../Locale/fi_FI'; // Suomi
import frBE from '../Locale/fr_BE'; // Français (Belgium) TODO: dayjs has no fr_BE locale, use fr
import frCA from '../Locale/fr_CA'; // Français (Canada)
import frFR from '../Locale/fr_FR'; // Français
import heIL from '../Locale/he_IL'; // עברית
import hiIN from '../Locale/hi_IN'; // हिंदी
import hrHR from '../Locale/hr_HR'; // Hrvatski
import htHT from '../Locale/ht_HT'; // Haitian
import huHU from '../Locale/hu_HU'; // Magyar
import itIT from '../Locale/it_IT'; // Italiano
import jaJP from '../Locale/ja_JP'; // 日本語
import koKR from '../Locale/ko_KR'; // 한국어
import msMY from '../Locale/ms_MY'; // Bahasa melayu
import nbNO from '../Locale/nb_NO'; // Norsk
import nlBE from '../Locale/nl_BE'; // Nederlands (Belgium)
import nlNL from '../Locale/nl_NL'; // Nederlands
import plPL from '../Locale/pl_PL'; // Polski
import ptBR from '../Locale/pt_BR'; // Português (Brazil)
import ptPT from '../Locale/pt_PT'; // Português
import ruRU from '../Locale/ru_RU'; // Pусский
import svSE from '../Locale/sv_SE'; // Svenska
import thTH from '../Locale/th_TH'; // ภาษาไทย
import trTR from '../Locale/tr_TR'; // Türkçe
import ukUA from '../Locale/uk_UA'; // Yкраїнська
import zhCN from '../Locale/zh_CN'; // 中文 (简体)
import zhTW from '../Locale/zh_TW'; // 中文 (繁體)

// Dayjs locales
import 'dayjs/locale/cs';
import 'dayjs/locale/da';
import 'dayjs/locale/de';
import 'dayjs/locale/el';
import 'dayjs/locale/en';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/es';
import 'dayjs/locale/es-do';
import 'dayjs/locale/es-mx';
import 'dayjs/locale/fi';
import 'dayjs/locale/fr'; // Use fr for fr-BE too
import 'dayjs/locale/fr-ca';
import 'dayjs/locale/he';
import 'dayjs/locale/hi';
import 'dayjs/locale/hr';
import 'dayjs/locale/ht';
import 'dayjs/locale/hu';
import 'dayjs/locale/it';
import 'dayjs/locale/ja';
import 'dayjs/locale/ko';
import 'dayjs/locale/ms-my';
import 'dayjs/locale/nb';
import 'dayjs/locale/nl-be';
import 'dayjs/locale/nl';
import 'dayjs/locale/pl';
import 'dayjs/locale/pt';
import 'dayjs/locale/pt-br';
import 'dayjs/locale/ru';
import 'dayjs/locale/sv';
import 'dayjs/locale/th';
import 'dayjs/locale/tr';
import 'dayjs/locale/uk';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh-tw';

const { Dropzone } = Upload;
const { RangePicker } = DatePicker;

export default {
  title: 'Config Provider',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Config Provider</h1>
              <p>
                Config provider is a utility that applies contextual theming to
                its child components. Themes can be applied to your entire app,
                to specific subtrees, or to individual components. By default,
                components use a blue theme. It also provides mouse vs. keyboard
                detection to improve accessibility.
              </p>
            </section>
            <section>
              <Stories includePrimary title="" />
            </section>
          </article>
        </main>
      ),
    },
  },
} as ComponentMeta<typeof ConfigProvider>;

const ThemedComponents: FC = () => {
  const [showVarThemeModal, setShowVarThemeModal] = useState(false);
  const varThemeRef = useRef();
  const [customPrimaryColor, setCustomPrimaryColor] = useState<string>('');
  const [customFont, setCustomFont] = useState<string>('Source Sans Pro');
  const [customAccentColor, setCustomAccentColor] = useState<string>('');
  const { fontOptions, setFontOptions } = useConfig();
  const { themeOptions, setThemeOptions } = useConfig();
  const themes: OcThemeName[] = [
    'red',
    'redOrange',
    'orange',
    'yellow',
    'yellowGreen',
    'green',
    'blueGreen',
    'blue',
    'blueViolet',
    'violet',
    'violetRed',
    'grey',
  ];
  const tabs = [1, 2, 3, 4].map((i) => ({
    value: `tab${i}`,
    label: `Tab ${i}`,
    ariaLabel: `Tab ${i}`,
    ...(i === 4 ? { disabled: true } : {}),
  }));
  const iconTabs = [1, 2, 3, 4].map((i) => ({
    value: `tab${i}`,
    icon: IconName.mdiCardsHeart,
    ariaLabel: `Tab ${i}`,
    ...(i === 4 ? { disabled: true } : {}),
  }));

  return (
    <Stack direction="vertical" flexGap="xxl">
      <h1 style={{ marginBottom: 0 }}>
        Selected Theme:
        <span
          style={{
            textTransform: 'capitalize',
            marginLeft: '4px',
            color: 'var(--primary-color)',
          }}
        >
          Primary |
        </span>
        <span
          style={{
            textTransform: 'capitalize',
            marginLeft: '4px',
            color: 'var(--accent-color-30)',
          }}
        >
          | Accent
        </span>
      </h1>
      <Stack direction="horizontal" flexGap="m" style={{ marginTop: 0 }}>
        <div>
          <p>Predefined</p>
          <select
            value={themeOptions.name}
            onChange={(e) => {
              setThemeOptions({
                name: e.target.value as OcThemeName,
              });
            }}
            style={{ fontSize: '1rem' }}
          >
            {themes.map((theme) => (
              <option value={theme} key={theme}>
                {theme}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Custom Primary</p>
          <CompactPicker
            color={customPrimaryColor}
            onChange={async (color) => {
              setThemeOptions({
                name: 'custom',
                customTheme: {
                  primaryColor: color.hex,
                  accentColor: customAccentColor,
                },
              });
              setCustomPrimaryColor(color.hex);
            }}
          />
        </div>
        <div>
          <p>Custom Accent</p>
          <CompactPicker
            color={customAccentColor}
            onChange={async (color) => {
              setThemeOptions({
                name: 'custom',
                customTheme: {
                  primaryColor: customPrimaryColor,
                  accentColor: color.hex,
                },
              });
              setCustomAccentColor(color.hex);
            }}
          />
        </div>
        <div>
          <p>Custom Font</p>
          <RadioGroup
            value={customFont}
            items={[
              {
                ariaLabel: 'Source Sans Pro',
                id: 'font-1',
                label: 'Source Sans Pro',
                name: 'font',
                value: 'Source Sans Pro',
                style: {
                  fontFamily: 'Source Sans Pro',
                },
              },
              {
                ariaLabel: 'Roboto',
                id: 'font-2',
                label: 'Roboto',
                name: 'font',
                value: 'Roboto',
                style: {
                  fontFamily: 'Roboto',
                },
              },
            ]}
            onChange={async (e) => {
              setFontOptions({
                customFont: {
                  fontFamily: e.target.value,
                },
              });
              setCustomFont(e.target.value);
            }}
          />
        </div>
      </Stack>

      <div>
        <PrimaryButton
          text="Edit varTheme"
          onClick={() => setShowVarThemeModal(true)}
        />
        {showVarThemeModal && (
          <Dialog
            visible={showVarThemeModal}
            closable={true}
            onClose={() => setShowVarThemeModal(false)}
            header="Edit varTheme"
            okButtonProps={{
              text: 'Save',
            }}
            cancelButtonProps={{
              text: 'Cancel',
            }}
            onOk={() => {
              try {
                // default to empty array to allow an null/undefined values.
                const jsonStrVal =
                  (varThemeRef?.current || { value: null }).value || `{}`;

                const newVarTheme = JSON.parse(jsonStrVal);
                setThemeOptions({
                  ...themeOptions,
                  customTheme: {
                    ...themeOptions.customTheme,
                    varTheme: newVarTheme,
                  },
                });
                setShowVarThemeModal(false);
              } catch {
                alert('JSON parsing error');
              }
            }}
            onCancel={() => setShowVarThemeModal(false)}
            body={
              <>
                <p>
                  Refer to{' '}
                  <a
                    target="_blank"
                    href="https://github.com/EightfoldAI/octuple/blob/main/src/styles/themes/_definitions.scss"
                  >
                    _default-theme.scss
                  </a>{' '}
                  for css variables that can be overwritten using this
                  mechanism. This can also be leveraged to overwrite css
                  variables that don't belong to Octuple.
                </p>
                <TextArea
                  ref={varThemeRef}
                  enableExpand
                  labelProps={{ text: 'Var Theme' }}
                  name="varTheme"
                  placeholder={'{"navbar-background":"pink"}'}
                  value={JSON.stringify(themeOptions.customTheme?.varTheme)}
                ></TextArea>
              </>
            }
          />
        )}
      </div>

      <Stack direction="horizontal" flexGap="m">
        <PrimaryButton
          ariaLabel="Primary Button"
          size={ButtonSize.Small}
          text="Primary Button"
        />
        <PrimaryButton
          ariaLabel="Primary Button"
          size={ButtonSize.Small}
          iconProps={{ path: IconName.mdiCardsHeart }}
        />
        <PrimaryButton
          ariaLabel="Primary Button"
          size={ButtonSize.Small}
          iconProps={{ path: IconName.mdiCardsHeart }}
          text="Primary Button"
        />
      </Stack>
      <Stack direction="horizontal" flexGap="m">
        <SecondaryButton
          ariaLabel="Secondary Button"
          size={ButtonSize.Small}
          text="Secondary Button"
        />
        <SecondaryButton
          ariaLabel="Secondary Button"
          iconProps={{ path: IconName.mdiCardsHeart }}
          size={ButtonSize.Small}
        />
        <SecondaryButton
          ariaLabel="Secondary Button"
          size={ButtonSize.Small}
          text="Secondary Button"
          iconProps={{ path: IconName.mdiCardsHeart }}
        />
      </Stack>
      <Stack direction="horizontal" flexGap="m">
        <DefaultButton
          ariaLabel="Default Button"
          size={ButtonSize.Small}
          text="Default Button"
        />
        <DefaultButton
          ariaLabel="Default Button"
          iconProps={{ path: IconName.mdiCardsHeart }}
          size={ButtonSize.Small}
        />
        <DefaultButton
          ariaLabel="Default Button"
          iconProps={{ path: IconName.mdiCardsHeart }}
          size={ButtonSize.Small}
          text="Default Button"
        />
      </Stack>
      <Stack direction="horizontal" flexGap="m">
        <TwoStateButton
          ariaLabel="Two state button"
          size={ButtonSize.Small}
          iconOneProps={{
            path: IconName.mdiCardsHeart,
            ariaHidden: true,
            classNames: 'my-two-state-btn-icon-one',
            id: 'myTwoStateButtonIconOne',
            role: 'presentation',
            rotate: 0,
            spin: false,
            vertical: false,
            'data-test-id': 'myTwoStateButtonIconOneTestId',
          }}
          iconTwoProps={{
            path: IconName.mdiChevronDown,
            ariaHidden: true,
            classNames: 'my-two-state-btn-icon-two',
            id: 'myTwoStateButtonIconTwo',
            role: 'presentation',
            rotate: 0,
            spin: false,
            vertical: false,
            'data-test-id': 'myTwoStateButtonIconTwoTestId',
          }}
          text="Two state button"
        />
        <TwoStateButton
          ariaLabel="Two state button"
          size={ButtonSize.Small}
          text="Two state button checked"
          iconOneProps={{
            path: IconName.mdiCardsHeart,
            ariaHidden: true,
            classNames: 'my-two-state-btn-icon-one',
            id: 'myTwoStateButtonIconOne',
            role: 'presentation',
            rotate: 0,
            spin: false,
            vertical: false,
            'data-test-id': 'myTwoStateButtonIconOneTestId',
          }}
          iconTwoProps={{
            path: IconName.mdiChevronDown,
            ariaHidden: true,
            classNames: 'my-two-state-btn-icon-two',
            id: 'myTwoStateButtonIconTwo',
            role: 'presentation',
            rotate: 0,
            spin: false,
            vertical: false,
            'data-test-id': 'myTwoStateButtonIconTwoTestId',
          }}
          checked
        />
      </Stack>
      <Tabs value={'tab1'}>
        {tabs.map((tab) => (
          <Tab key={tab.value} {...tab} />
        ))}
      </Tabs>
      <Tabs value={'tab1'}>
        {iconTabs.map((tab) => (
          <Tab key={tab.value} {...tab} />
        ))}
      </Tabs>
      <Tabs value={'tab1'} variant={TabVariant.small}>
        {tabs.map((tab) => (
          <Tab key={tab.value} {...tab} />
        ))}
      </Tabs>
      <Tabs value={'tab1'} variant={TabVariant.pill}>
        {tabs.map((tab) => (
          <Tab key={tab.value} {...tab} />
        ))}
      </Tabs>
      <Navbar style={{ position: 'relative' }}>
        <NavbarContent>
          <Link
            href="/"
            target="_self"
            variant="default"
            style={{ padding: '8px', color: 'inherit' }}
          >
            Home
          </Link>
        </NavbarContent>
        <NavbarContent>
          <Link
            href="https://www.twitter.com"
            target="_self"
            variant="default"
            style={{ padding: '8px', color: 'inherit' }}
          >
            <Icon path={IconName.mdiTwitter} />
          </Link>
          <Link
            href="https://www.facebook.com"
            target="_self"
            variant="default"
            style={{ padding: '8px', color: 'inherit' }}
          >
            <Icon path={IconName.mdiFacebook} />
          </Link>
          <Link
            href="https://www.instagram.com"
            target="_self"
            variant="default"
            style={{ padding: '8px', color: 'inherit' }}
          >
            <Icon path={IconName.mdiInstagram} />
          </Link>
        </NavbarContent>
      </Navbar>
      <MatchScore score={3} />
      <Spinner />
      <CheckBoxGroup
        {...{
          value: ['First'],
          defaultChecked: ['First'],
          items: [
            {
              name: 'group',
              value: 'First',
              label: 'First',
              id: 'test-1',
            },
            {
              name: 'group',
              value: 'Second',
              label: 'Second',
              id: 'test-2',
            },
            {
              name: 'group',
              value: 'Third',
              label: 'Third',
              id: 'test-3',
            },
          ],
        }}
      />
      <CheckBox label={'Toggle'} toggle />
      <RadioGroup
        {...{
          ariaLabel: 'Radio Group',
          value: 'Radio1',
          items: [1, 2, 3].map((i) => ({
            value: `Radio${i}`,
            label: `Radio${i}`,
            name: 'group',
            id: `oea2exk-${i}`,
          })),
        }}
      />
      <Dropdown overlay={Overlay()} placement="top">
        <DefaultButton text={'Menu dropdown'} />
      </Dropdown>
    </Stack>
  );
};

const Overlay = () => (
  <Menu
    {...{
      variant: MenuVariant.neutral,
      classNames: 'my-menu-class',
      style: {},
      itemClassNames: 'my-menu-item-class',
      itemStyle: {},
      listType: 'ul',
    }}
    items={[
      {
        iconProps: { path: IconName.mdiCalendar },
        text: 'Date',
        value: 'date 1',
        counter: '8',
      },
      {
        iconProps: { path: IconName.mdiThumbUpOutline },
        text: 'Thumbs up',
        value: 'date 1',
        disabled: true,
      },
      {
        iconProps: { path: IconName.mdiSchool },
        text: 'School',
        value: 'date 1',
      },
      {
        iconProps: { path: IconName.mdiCalendar },
        text: 'Date',
        value: 'date 1',
      },
    ]}
    onChange={(item) => {
      console.log(item);
    }}
  />
);

const DEFAULT_FOCUS_VISIBLE: boolean = true;
const DEFAULT_FOCUS_VISIBLE_ELEMENT: HTMLElement = document.documentElement;

const Theming_Story: ComponentStory<typeof ConfigProvider> = (args) => {
  return <ConfigProvider {...args} />;
};

export const Theming = Theming_Story.bind({});

const localeValues: string[] = [
  'cs_CZ',
  'da_DK',
  'de_DE',
  'el_GR',
  'en_GB',
  'en_US',
  'es_ES',
  'es_DO',
  'es_MX',
  'fi_FI',
  'fr_BE',
  'fr_CA',
  'fr_FR',
  'he_IL',
  'hi_IN',
  'hr_HR',
  'ht_HT',
  'hu_HU',
  'it_IT',
  'ja_JP',
  'ko_KR',
  'ms_MY',
  'nb_NO',
  'nl_BE',
  'nl_NL',
  'pl_PL',
  'pt_BR',
  'pt_PT',
  'ru_RU',
  'sv_SE',
  'th_TH',
  'tr_TR',
  'uk_UA',
  'zh_CN',
  'zh_TW',
];

const localeOptions: SelectOption[] = localeValues.map((locString) => ({
  text: locString,
  value: locString,
}));

const pickerArgs: Object = {
  classNames: 'my-picker-class',
  id: 'myPickerInputId',
  popupPlacement: 'bottomLeft',
  shape: DatePickerShape.Rectangle,
  size: DatePickerSize.Small,
};

const snackArgs: Object = {
  position: 'top-center',
  closable: false,
  icon: IconName.mdiInformation,
  closeIcon: IconName.mdiClose,
  id: 'mySnackId',
};

const Locale_Story: ComponentStory<typeof ConfigProvider> = (args) => {
  const [_, updateArgs] = useArgs();
  const [locale, setLocale] = useState(enUS);
  const [localeValue, setLocaleValue] = useState<string>('en_US');

  const locales: Record<string, any> = {
    cs_CZ: csCZ,
    da_DK: daDK,
    de_DE: deDE,
    el_GR: elGR,
    en_GB: enGB,
    en_US: enUS,
    es_ES: esES,
    es_DO: esDO,
    es_MX: esMX,
    fi_FI: fiFI,
    fr_BE: frBE,
    fr_CA: frCA,
    fr_FR: frFR,
    he_IL: heIL,
    hi_IN: hiIN,
    hr_HR: hrHR,
    ht_HT: htHT,
    hu_HU: huHU,
    it_IT: itIT,
    ja_JP: jaJP,
    ko_KR: koKR,
    ms_MY: msMY,
    nb_NO: nbNO,
    nl_BE: nlBE,
    nl_NL: nlNL,
    pl_PL: plPL,
    pt_BR: ptBR,
    pt_PT: ptPT,
    ru_RU: ruRU,
    sv_SE: svSE,
    th_TH: thTH,
    tr_TR: trTR,
    uk_UA: ukUA,
    zh_CN: zhCN,
    zh_TW: zhTW,
  };

  const localeToDayJsLocale = (locale: string): string => {
    const localeMap: { [key: string]: string } = {
      cs_CZ: 'cs',
      da_DK: 'da',
      de_DE: 'de',
      el_GR: 'el',
      en_GB: 'el-gb',
      en_US: 'en',
      es_ES: 'es',
      es_DO: 'es-do',
      es_MX: 'es-mx',
      fi_FI: 'fi',
      fr_BE: 'fr', // use fr for fr-be
      fr_CA: 'fr-ca',
      fr_FR: 'fr',
      he_IL: 'he',
      hi_IN: 'hi',
      hr_HR: 'hr',
      ht_HT: 'ht',
      hu_HU: 'hu',
      it_IT: 'it',
      ja_JP: 'ja',
      ko_KR: 'ko',
      ms_MY: 'ms-my',
      nb_NO: 'nb',
      nl_BE: 'nl-be',
      nl_NL: 'nl',
      pl_PL: 'pl',
      pt_BR: 'pt-br',
      pt_PT: 'pt',
      ru_RU: 'ru',
      sv_SE: 'sv',
      th_TH: 'th',
      tr_TR: 'tr',
      uk_UA: 'uk',
      zh_CN: 'zh-cn',
      zh_TW: 'zh-tw',
    };

    return localeMap[locale] || '';
  };

  const onLocaleChange = useCallback(
    (options: SelectOption[]) => {
      options.forEach((option: SelectOption) => {
        console.log(option);
        const optionString: string = option.toString();
        console.log(locales[optionString]);
        if (localeValues.includes(optionString)) {
          setLocale(locales[optionString]);
          updateArgs({
            ...args,
            locale: locales[optionString],
          });
          setLocaleValue(optionString);
          dayjs.locale(localeToDayJsLocale(optionString));
        }
      });
    },
    [args, dayjs, locale, localeValues, locales, updateArgs]
  );

  const onDateChange: DatePickerProps['onChange'] = (
    date: Dayjs,
    dateString: string
  ) => {
    console.log(date, dateString);
  };

  const onDateRangeChange: RangePickerProps['onChange'] = (
    dates: [Dayjs, Dayjs],
    dateStrings: [string, string]
  ) => {
    if (dates) {
      console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    } else {
      console.log('Clear');
    }
  };

  const uploadProps: UploadProps = {
    name: 'file',
    maxCount: 1,
    action: 'http://run.mocky.io/v3/35a4936d-4e32-4088-b9d1-47cd1002fefd',
    listType: 'picture',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        snack.servePositive({
          ...snackArgs,
          content: `${info.file.name} file uploaded successfully. Translate this string in the host app.`,
        });
      } else if (status === 'error') {
        snack.serveDisruptive({
          ...snackArgs,
          closable: true,
          content: `${info.file.name} file upload failed. Translate this string in the host app.`,
        });
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <ConfigProvider {...args} locale={locale}>
      <Stack direction="vertical" flexGap="m">
        <p>Locale</p>
        <Select
          defaultValue={localeValue}
          filterable={true}
          options={localeOptions}
          onOptionsChange={onLocaleChange}
          size={SelectSize.Small}
        />
        <Pagination
          layout={[
            PaginationLayoutOptions.Total,
            PaginationLayoutOptions.Sizes,
            PaginationLayoutOptions.Previous,
            PaginationLayoutOptions.Pager,
            PaginationLayoutOptions.Next,
            PaginationLayoutOptions.Jumper,
          ]}
          pageSize={100}
          pageSizes={[100, 200, 300, 400]}
          total={400}
        />
        <Dropzone {...uploadProps} locale={locale!.Upload} />
        <DatePicker
          {...pickerArgs}
          locale={locale!.DatePicker}
          onChange={onDateChange}
        />
        <RangePicker
          {...pickerArgs}
          locale={locale!.DatePicker}
          onChange={onDateRangeChange}
        />
      </Stack>
      <SnackbarContainer />
    </ConfigProvider>
  );
};

export const Locale = Locale_Story.bind({});

const providerArgs = {
  focusVisibleOptions: {
    focusVisible: DEFAULT_FOCUS_VISIBLE,
    focusVisibleElement: DEFAULT_FOCUS_VISIBLE_ELEMENT,
  },
  fontOptions: {
    fontFamily: '--font-family',
    fontStack: '--font-stack',
    fontSize: '--font-size',
  } as FontOptions,
  // TODO: should get this from the ConfigProvider in order to restore any
  // customizations the storybook user has applied so far.
  themeOptions: {
    name: 'blue',
  } as ThemeOptions,
  icomoonIconSet: {},
  disabled: false,
};

Theming.args = {
  ...providerArgs,
  children: <ThemedComponents />,
};

Locale.args = {
  ...providerArgs,
};
