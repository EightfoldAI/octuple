import type { Locale } from './components/LocaleProvider';
import { useLocaleReceiver } from './components/LocaleProvider/LocaleReceiver';

// Supported locales
import arSA from './components/Locale/ar_SA'; // العربية
import bgBG from './components/Locale/bg_BG'; // Български
import csCZ from './components/Locale/cs_CZ'; // čeština
import daDK from './components/Locale/da_DK'; // Dansk
import deDE from './components/Locale/de_DE'; // Deutsch
import elGR from './components/Locale/el_GR'; // Ελληνικά
import enGB from './components/Locale/en_GB'; // English (United Kingdom)
import enUS from './components/Locale/en_US'; // English (United States)
import esES from './components/Locale/es_ES'; // Español
import esDO from './components/Locale/es_DO'; // Español (Dominican Republic)
import esMX from './components/Locale/es_MX'; // Español (Mexico)
import fiFI from './components/Locale/fi_FI'; // Suomi
import frBE from './components/Locale/fr_BE'; // Français (Belgium) TODO: dayjs has no fr_BE locale, use fr
import frCA from './components/Locale/fr_CA'; // Français (Canada)
import frFR from './components/Locale/fr_FR'; // Français
import heIL from './components/Locale/he_IL'; // עברית
import hiIN from './components/Locale/hi_IN'; // हिंदी
import hrHR from './components/Locale/hr_HR'; // Hrvatski
import htHT from './components/Locale/ht_HT'; // Haitian
import huHU from './components/Locale/hu_HU'; // Magyar
import itIT from './components/Locale/it_IT'; // Italiano
import jaJP from './components/Locale/ja_JP'; // 日本語
import koKR from './components/Locale/ko_KR'; // 한국어
import msMY from './components/Locale/ms_MY'; // Bahasa melayu
import nbNO from './components/Locale/nb_NO'; // Norsk
import nlBE from './components/Locale/nl_BE'; // Nederlands (Belgium)
import nlNL from './components/Locale/nl_NL'; // Nederlands
import plPL from './components/Locale/pl_PL'; // Polski
import ptBR from './components/Locale/pt_BR'; // Português (Brazil)
import ptPT from './components/Locale/pt_PT'; // Português
import roRO from './components/Locale/ro_RO'; // Română
import ruRU from './components/Locale/ru_RU'; // Pусский
import skSK from './components/Locale/sk_SK'; // Slovenčina
import srRS from './components/Locale/sr_RS'; // Srpski
import svSE from './components/Locale/sv_SE'; // Svenska
import teIN from './components/Locale/te_IN'; // తెలుగు
import thTH from './components/Locale/th_TH'; // ภาษาไทย
import trTR from './components/Locale/tr_TR'; // Türkçe
import ukUA from './components/Locale/uk_UA'; // Yкраїнська
import viVN from './components/Locale/vi_VN'; // Tiếng Việt
import zhCN from './components/Locale/zh_CN'; // 中文 (简体)
import zhTW from './components/Locale/zh_TW'; // 中文 (繁體)

export {
  Locale,
  arSA,
  bgBG,
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
  hiIN,
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
  roRO,
  ruRU,
  skSK,
  srRS,
  svSE,
  teIN,
  thTH,
  trTR,
  ukUA,
  useLocaleReceiver,
  viVN,
  zhCN,
  zhTW,
};
