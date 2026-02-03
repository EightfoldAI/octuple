# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.56.3](https://github.com/EightfoldAI/octuple/compare/v2.56.2...v2.56.3) (2026-01-27)

### Bug Fixes

- **DatePicker:** Added position relative to picker so that the visually hidden label ([#1094](https://github.com/EightfoldAI/octuple/issues/1094)) ([ad9f66c](https://github.com/EightfoldAI/octuple/commits/ad9f66cf10bc3e27dcf0c32d65987feb054a404f))

### [2.56.2](https://github.com/EightfoldAI/octuple/compare/v2.56.1...v2.56.2) (2026-01-09)

### Bug Fixes

- **datepicker:** retaining focus on startDate when invalid date is entered without clearing input ([#1088](https://github.com/EightfoldAI/octuple/issues/1088)) ([4ace02a](https://github.com/EightfoldAI/octuple/commits/4ace02a8b7e04a35ef53fa9183c60aa764473671))

### [2.56.1](https://github.com/EightfoldAI/octuple/compare/v2.56.0...v2.56.1) (2026-01-05)

### Bug Fixes

- **datepicker:** accessibility fix for announcing error message on invalid date enter ([#1085](https://github.com/EightfoldAI/octuple/issues/1085)) ([55a8bf6](https://github.com/EightfoldAI/octuple/commits/55a8bf68ab574f6f33e80b0d8fbcb74fa3e0aa02))
- **dropddown:** accessibility fix for dropdown options via Tab and arrow keys ([#1084](https://github.com/EightfoldAI/octuple/issues/1084)) ([8becfac](https://github.com/EightfoldAI/octuple/commits/8becfac099dbecfce1d9ede04e4251f1f58818db))
- **uploads:** update delete buttons’ aria-labels to provide more cont… ([#1083](https://github.com/EightfoldAI/octuple/issues/1083)) ([458e5dd](https://github.com/EightfoldAI/octuple/commits/458e5dd956cc9700eb625073079f6dc4b0474f68))

## [2.56.0](https://github.com/EightfoldAI/octuple/compare/v2.55.0...v2.56.0) (2025-12-30)

### Features

- **DateTimePicker:** Add WCAG 2.1 AA accessibility improvements for DatePicker and TimePicker components ([#1078](https://github.com/EightfoldAI/octuple/issues/1078)) ([4ac663a](https://github.com/EightfoldAI/octuple/commits/4ac663abf8f281a5a882bebe6fd7b81323777de4))
- **Stepper:** add fullwidth mode for evenly distributed steps in horizontal layout ([#1081](https://github.com/EightfoldAI/octuple/issues/1081)) ([450fe5b](https://github.com/EightfoldAI/octuple/commits/450fe5b0828c8c9989dcc0ce38efee3e72df0834))

### Bug Fixes

- ensure Menu passes itemProps down to MenuItems ([#1079](https://github.com/EightfoldAI/octuple/issues/1079)) ([44d5885](https://github.com/EightfoldAI/octuple/commits/44d5885a60f391572664dd69d032ba2a79b9a288))
- update Dropdown props to allow consumer to correctly implement a11y patterns ([#1080](https://github.com/EightfoldAI/octuple/issues/1080)) ([73816e8](https://github.com/EightfoldAI/octuple/commits/73816e8f025e2cdf704c199adc662c7373c0fa4a))

## [2.55.0](https://github.com/EightfoldAI/octuple/compare/v2.54.8...v2.55.0) (2025-12-22)

### Features

- **fixes:** a11y fixes for some octuple components ([#1076](https://github.com/EightfoldAI/octuple/issues/1076)) ([7c65ee1](https://github.com/EightfoldAI/octuple/commits/7c65ee17be62b5eb68cfe2725d3ef56dd0b3225d))
- **Table:** Add aria-attributes for NVDA if table is horizontally scrollable ([#1042](https://github.com/EightfoldAI/octuple/issues/1042)) ([8214fbb](https://github.com/EightfoldAI/octuple/commits/8214fbbad7fa4a4d6a9912fbc9305242b2f091f0))

### Bug Fixes

- **a11y:** Add ARIA listbox support to TimePicker ([#1077](https://github.com/EightfoldAI/octuple/issues/1077)) ([2baf48e](https://github.com/EightfoldAI/octuple/commits/2baf48e6445a2dec7e14dab347c32c92fc6d132c))
- correct type for overlayProps prop on Dropdown ([#1075](https://github.com/EightfoldAI/octuple/issues/1075)) ([e0fe076](https://github.com/EightfoldAI/octuple/commits/e0fe0765b92aef8eef18eb93b74589281e0d106d))
- **Datepicker:** prevent input from clearing on escape key press ([#1070](https://github.com/EightfoldAI/octuple/issues/1070)) ([9057eed](https://github.com/EightfoldAI/octuple/commits/9057eed44ace126abb55c42c1ef2f991015ed182))
- remove inappropriate h2 element from Empty component ([#1067](https://github.com/EightfoldAI/octuple/issues/1067)) ([ea2edc6](https://github.com/EightfoldAI/octuple/commits/ea2edc6966555c1db401ddae533d524e753b0428))

### [2.54.8](https://github.com/EightfoldAI/octuple/compare/v2.54.7...v2.54.8) (2025-12-18)

### Features

- **Date:** added sr-only labels for date time picker ([#1071](https://github.com/EightfoldAI/octuple/issues/1071)) ([f8df410](https://github.com/EightfoldAI/octuple/commits/f8df410067fe14a5c50807eaf8781ebeb5782330))
- **Stat, Tab:** exposes interactive prop to handle ally issues ([#1069](https://github.com/EightfoldAI/octuple/issues/1069)) ([57eadbf](https://github.com/EightfoldAI/octuple/commits/57eadbf31ba78b33f9f30f3e37e5de4bbc9730f3))

### Bug Fixes

- move role and aria-modal attrs to panel element, add aria-label ([#1074](https://github.com/EightfoldAI/octuple/issues/1074)) ([b974b03](https://github.com/EightfoldAI/octuple/commits/b974b03c9c9605d65633ea68f4947354cc67aa5e))
- non-interactive icon button should be disabled and hidden from AT ([#1073](https://github.com/EightfoldAI/octuple/issues/1073)) ([4300183](https://github.com/EightfoldAI/octuple/commits/4300183f9f0f8c31d6c9b311f70f4a740be6e36c))

### [2.54.7](https://github.com/EightfoldAI/octuple/compare/v2.54.6...v2.54.7) (2025-12-15)

### Features

- **Menu:** add role attributes for menu items and enhance accessibility options ([#1068](https://github.com/EightfoldAI/octuple/issues/1068)) ([3eccc7f](https://github.com/EightfoldAI/octuple/commits/3eccc7f3db4c1951772e1f8935d6994161241da8))

### Bug Fixes

- change default tab index of overlay container to -1; add test and update snapshots ([#1066](https://github.com/EightfoldAI/octuple/issues/1066)) ([c0388ef](https://github.com/EightfoldAI/octuple/commits/c0388ef90f94a6804e873e9288fdf765bcf25929))
- disable readonly attr in CheckBox in case of toggle (switch) for a11y ([#1062](https://github.com/EightfoldAI/octuple/issues/1062)) ([5cf7db3](https://github.com/EightfoldAI/octuple/commits/5cf7db355edc5ad2f379f14bb90064ad56db6a62))
- remove reference to invalid props in Select component ([#1064](https://github.com/EightfoldAI/octuple/issues/1064)) ([3db33f1](https://github.com/EightfoldAI/octuple/commits/3db33f126c79a2eeb4c43f0d3328fbae20a37d96))
- use 'page' instead of 'location' for aria-current value; update snapshot; add test ([#1065](https://github.com/EightfoldAI/octuple/issues/1065)) ([0c1b742](https://github.com/EightfoldAI/octuple/commits/0c1b742c65e8d53286b722f332cdc9ae65d38c3f))

### [2.54.6](https://github.com/EightfoldAI/octuple/compare/v2.54.5...v2.54.6) (2025-12-11)

### Features

- **Dropdown, Select:** Add Tab key handling and menu role configuration for improved accessibility ([#1060](https://github.com/EightfoldAI/octuple/issues/1060)) ([7841989](https://github.com/EightfoldAI/octuple/commits/784198974e7f2e4217caeb690b67a9464628402a))

### Bug Fixes

- **Select:** accessibility fix included aria-label for the selected option ([#1058](https://github.com/EightfoldAI/octuple/issues/1058)) ([c3138f4](https://github.com/EightfoldAI/octuple/commits/c3138f46413995988a9c30aebb5106fd2102d413))

### [2.54.5](https://github.com/EightfoldAI/octuple/compare/v2.54.4...v2.54.5) (2025-12-04)

### [2.54.4](https://github.com/EightfoldAI/octuple/compare/v2.54.3...v2.54.4) (2025-12-01)

### [2.54.3](https://github.com/EightfoldAI/octuple/compare/v2.54.2...v2.54.3) (2025-12-01)

### Features

- **RadioGroup:** add 'radiogroup' role ([#1050](https://github.com/EightfoldAI/octuple/issues/1050)) ([f172dcd](https://github.com/EightfoldAI/octuple/commits/f172dcdb1065572d6a4afa5dc6f4329b5c6b991f))
- **tabs:** update Tabs components and fix snapshot ([#1047](https://github.com/EightfoldAI/octuple/issues/1047)) ([5bdda68](https://github.com/EightfoldAI/octuple/commits/5bdda68d1c8c3bd44031ad2eb1144cbe72dcc106))

### Bug Fixes

- accessibility fix for adding appropriate role for image ([#1051](https://github.com/EightfoldAI/octuple/issues/1051)) ([5565553](https://github.com/EightfoldAI/octuple/commits/5565553a0b8b8eaa11722de860c29f7218233e46))
- **ENG-167534:** add aria-hidden to SVG elements for WCAG compliance ([#1048](https://github.com/EightfoldAI/octuple/issues/1048)) ([45b758b](https://github.com/EightfoldAI/octuple/commits/45b758b498c0ecfc4361d986aaa16d52e49537c9))

### [2.54.2](https://github.com/EightfoldAI/octuple/compare/v2.54.1...v2.54.2) (2025-11-07)

### Bug Fixes

- **snackbar:** always tab to snackbar if active ([#1044](https://github.com/EightfoldAI/octuple/issues/1044)) ([14a0c22](https://github.com/EightfoldAI/octuple/commits/14a0c223203d21735fd07b29d29b0364c5038806))

### [2.54.1](https://github.com/EightfoldAI/octuple/compare/v2.54.0...v2.54.1) (2025-11-06)

### Features

- **snackbar:** make snackbars more accessible ([#1043](https://github.com/EightfoldAI/octuple/issues/1043)) ([d2c97af](https://github.com/EightfoldAI/octuple/commits/d2c97af9f9ad8b185d8469862575d07f694d01cf))

## [2.54.0](https://github.com/EightfoldAI/octuple/compare/v2.53.21...v2.54.0) (2025-10-16)

### Features

- add low/high contrast themes ([#1041](https://github.com/EightfoldAI/octuple/issues/1041)) ([61556d4](https://github.com/EightfoldAI/octuple/commits/61556d469fd07bb1d08a5b011af8b8fbaace0d25))

### [2.53.21](https://github.com/EightfoldAI/octuple/compare/v2.53.20...v2.53.21) (2025-10-01)

### Features

- allow passing titleClassNames to Empty component ([#1038](https://github.com/EightfoldAI/octuple/issues/1038)) ([cd3241c](https://github.com/EightfoldAI/octuple/commits/cd3241cd9bdc0c52f28acf671d798fae8b2f1b96))

### Bug Fixes

- **Avatar:** respect tabIndex prop and remove Avatar from default tab order ([#1037](https://github.com/EightfoldAI/octuple/issues/1037)) ([43253ab](https://github.com/EightfoldAI/octuple/commits/43253ab9978597d0bf19415cb75a27637b46f0be))
- **DatePicker:** announcement for navigation of DatePicker on NVDA ([#1040](https://github.com/EightfoldAI/octuple/issues/1040)) ([1c89aa3](https://github.com/EightfoldAI/octuple/commits/1c89aa37a733ce9ba4a93fb951235c6758d1017a))

### [2.53.20](https://github.com/EightfoldAI/octuple/compare/v2.53.19...v2.53.20) (2025-09-19)

### Features

- **DatePicker:** add accessibility announcement for arrow key navigation ([#1033](https://github.com/EightfoldAI/octuple/issues/1033)) ([4b42384](https://github.com/EightfoldAI/octuple/commits/4b42384416287ef6004d2eb7a9d165d58aa531f9))

### Bug Fixes

- **tooltip:** allow props to be passed to wrapper ([#1036](https://github.com/EightfoldAI/octuple/issues/1036)) ([09b2e4d](https://github.com/EightfoldAI/octuple/commits/09b2e4dc5ea063b0b45914fcf0b34fd5013ed9cf))

### [2.53.19](https://github.com/EightfoldAI/octuple/compare/v2.53.18...v2.53.19) (2025-08-29)

### [2.53.18](https://github.com/EightfoldAI/octuple/compare/v2.53.17...v2.53.18) (2025-08-14)

### Bug Fixes

- add icon path for mdiAccountOffOutline ([#1029](https://github.com/EightfoldAI/octuple/issues/1029)) ([d0fbb1f](https://github.com/EightfoldAI/octuple/commits/d0fbb1fd86826b014bdb2eedf8e17254949550f9))
- added prop to enable standard arrow key navigation for tabs component ([#1028](https://github.com/EightfoldAI/octuple/issues/1028)) ([a4f58fd](https://github.com/EightfoldAI/octuple/commits/a4f58fd7ce39e00b37e98d6afcbd9f6ea25f076d))
- icon: Add iconProps prop support to MdiIcon component ([#1005](https://github.com/EightfoldAI/octuple/issues/1005)) ([cb17f8a](https://github.com/EightfoldAI/octuple/commits/cb17f8ac350b1a23cd30fc83d8d409b3c18940c6))
- removed ariaDescribedby on conditionally joined ariadescribedBy ([#1012](https://github.com/EightfoldAI/octuple/issues/1012)) ([13a6999](https://github.com/EightfoldAI/octuple/commits/13a6999d6bc420b8ea2b819b2fac0fd09588a71d))
- removed clickable area div and moved a11y to parent and render a… ([#1024](https://github.com/EightfoldAI/octuple/issues/1024)) ([24b56ef](https://github.com/EightfoldAI/octuple/commits/24b56efd32965a3ef4f2854df279f120048e1f6a))
- update pagination button aria-label ([#1017](https://github.com/EightfoldAI/octuple/issues/1017)) ([7abf1b4](https://github.com/EightfoldAI/octuple/commits/7abf1b4e6b17c75f815f55ef1438352545d5e92d))
- update role to get applied conditionally and aria-describedBy ([#1015](https://github.com/EightfoldAI/octuple/issues/1015)) ([ceba97f](https://github.com/EightfoldAI/octuple/commits/ceba97f366aa986c44558fa3721ab2322ac76b66))

### [2.53.17](https://github.com/EightfoldAI/octuple/compare/v2.53.16...v2.53.17) (2025-08-04)

### Bug Fixes

- normalize startdate and enddate timestamps in rangepicker ([#1025](https://github.com/EightfoldAI/octuple/issues/1025)) ([899af1e](https://github.com/EightfoldAI/octuple/commits/899af1ead20647d2e2ae2d8df5836a960c8b2724))

### [2.53.16](https://github.com/EightfoldAI/octuple/compare/v2.53.15...v2.53.16) (2025-07-23)

### Bug Fixes

- tab issue causing frontend error ([#1023](https://github.com/EightfoldAI/octuple/issues/1023)) ([4189315](https://github.com/EightfoldAI/octuple/commits/418931595f93ae2a69e7e7e7325afba8911cdc02))

### [2.53.15](https://github.com/EightfoldAI/octuple/compare/v2.53.14...v2.53.15) (2025-07-22)

### Bug Fixes

- tab: added a prop to enable standard key navigation for tabs component ([#953](https://github.com/EightfoldAI/octuple/issues/953)) ([7934881](https://github.com/EightfoldAI/octuple/commits/79348811e884f7a10cabbc15d31f6c65e464a3a1))

### [2.53.14](https://github.com/EightfoldAI/octuple/compare/v2.53.13...v2.53.14) (2025-07-21)

### [2.53.13](https://github.com/EightfoldAI/octuple/compare/v2.53.12...v2.53.13) (2025-07-21)

### Bug Fixes

- panel: panel role not assigned ([#1018](https://github.com/EightfoldAI/octuple/issues/1018)) ([5cca827](https://github.com/EightfoldAI/octuple/commits/5cca8275ccea2721b4975e1940b829f96c40cc5c))
- pre-commit hook update ([#1016](https://github.com/EightfoldAI/octuple/issues/1016)) ([25f141f](https://github.com/EightfoldAI/octuple/commits/25f141fe44f0a874b748a9457a92c0f3bc1c9b7a))
- select input will have ariaLabel ([#1019](https://github.com/EightfoldAI/octuple/issues/1019)) ([2c724cd](https://github.com/EightfoldAI/octuple/commits/2c724cdc7ef2d638fce58738954760a0130df8e3))

### [2.53.12](https://github.com/EightfoldAI/octuple/compare/v2.53.11...v2.53.12) (2025-06-25)

### Bug Fixes

- snackbar: fixed focus for snackbar ([#1011](https://github.com/EightfoldAI/octuple/issues/1011)) ([d2261d1](https://github.com/EightfoldAI/octuple/commits/d2261d16e5673c0f0796dc08d8a321ee5fe5e3ac))

### [2.53.11](https://github.com/EightfoldAI/octuple/compare/v2.53.10...v2.53.11) (2025-06-18)

### [2.53.11](https://github.com/EightfoldAI/octuple/compare/v2.53.10...v2.53.11) (2025-06-18)

### [2.53.10](https://github.com/EightfoldAI/octuple/compare/v2.53.9...v2.53.10) (2025-06-11)

### [2.53.9](https://github.com/EightfoldAI/octuple/compare/v2.53.8...v2.53.9) (2025-06-11)

### Features

- test update ([#1006](https://github.com/EightfoldAI/octuple/issues/1006)) ([3f155da](https://github.com/EightfoldAI/octuple/commits/3f155daa1979eedd75bce10ca766634e5837e1cf))

### Bug Fixes

- carousel: added carouselOuterContainerProps prop to the carousel container element ([#990](https://github.com/EightfoldAI/octuple/issues/990)) ([860d40a](https://github.com/EightfoldAI/octuple/commits/860d40acc7d694373dd362942e4655caaacc99fa))
- disabled button and replaced aria-describedby with aria-labelledby ([#960](https://github.com/EightfoldAI/octuple/issues/960)) ([a1170bc](https://github.com/EightfoldAI/octuple/commits/a1170bc7e911cc82120d63affe43ed57a94684f2))
- icon: Add role prop support to MdiIcon component ([#1001](https://github.com/EightfoldAI/octuple/issues/1001)) ([09f95bc](https://github.com/EightfoldAI/octuple/commits/09f95bc8ef832a30de4163727f8df8f96d75b831))
- snackbar: fixed announcement for snackbar ([#992](https://github.com/EightfoldAI/octuple/issues/992)) ([6313fde](https://github.com/EightfoldAI/octuple/commits/6313fde9fd77009a1d815782f168d1f6674ed4c1))

### [2.53.8](https://github.com/EightfoldAI/octuple/compare/v2.53.7...v2.53.8) (2025-05-22)

### [2.53.7](https://github.com/EightfoldAI/octuple/compare/v2.53.6...v2.53.7) (2025-05-20)

### Bug Fixes

- a11y invalid attribute issue ([#998](https://github.com/EightfoldAI/octuple/issues/998)) ([ab83b46](https://github.com/EightfoldAI/octuple/commits/ab83b46212367091ece990db525f6530812abe63))
- table: improving accessibility aspect ([#994](https://github.com/EightfoldAI/octuple/issues/994)) ([fdd0878](https://github.com/EightfoldAI/octuple/commits/fdd0878a27fc7b4ca4ac32e0131fa3c57935fb93))

### [2.53.6](https://github.com/EightfoldAI/octuple/compare/v2.53.5...v2.53.6) (2025-05-18)

### Bug Fixes

- plus n button focus will be on by default ([#997](https://github.com/EightfoldAI/octuple/issues/997)) ([03c17da](https://github.com/EightfoldAI/octuple/commits/03c17da5c6aaa0d8b07d6cda699288098ad7341e))
- regression issue fix ([#993](https://github.com/EightfoldAI/octuple/issues/993)) ([e5b3381](https://github.com/EightfoldAI/octuple/commits/e5b3381708655be1803af083ec4bf9ca71964770))

### [2.53.5](https://github.com/EightfoldAI/octuple/compare/v2.53.4...v2.53.5) (2025-04-30)

### Bug Fixes

- getAriaLabel check before use ([#989](https://github.com/EightfoldAI/octuple/issues/989)) ([c3f751d](https://github.com/EightfoldAI/octuple/commits/c3f751d48860105849e8bbe6202e1b1ceffc1e92))

### [2.53.4](https://github.com/EightfoldAI/octuple/compare/v2.53.3...v2.53.4) (2025-04-29)

### Bug Fixes

- a11y issues ([#988](https://github.com/EightfoldAI/octuple/issues/988)) ([07f9937](https://github.com/EightfoldAI/octuple/commits/07f993799511f97c4ecc2916ab2798fc3361d6d6))
- dropdown :added condition to close the dialog on shift tab ([#978](https://github.com/EightfoldAI/octuple/issues/978)) ([b4bed98](https://github.com/EightfoldAI/octuple/commits/b4bed9808e1b091bb4831427f6a603a5a53dd5db))
- more button a11y fixes ([#986](https://github.com/EightfoldAI/octuple/issues/986)) ([1e7ca6e](https://github.com/EightfoldAI/octuple/commits/1e7ca6e7b2f939ffe10d1555eb58890b11129466))
- multi-select label voice over a11y ([#987](https://github.com/EightfoldAI/octuple/issues/987)) ([066b3df](https://github.com/EightfoldAI/octuple/commits/066b3df9ef3130825b5f0daf96c941b98fc1b6d2))
- overflow issue ([#985](https://github.com/EightfoldAI/octuple/issues/985)) ([a25ba6b](https://github.com/EightfoldAI/octuple/commits/a25ba6bb8d71e5297724f6240f753f5748667992))
- remove non existent tooltip aria-describedby reference ([#975](https://github.com/EightfoldAI/octuple/issues/975)) ([f5429c9](https://github.com/EightfoldAI/octuple/commits/f5429c953e1538952b386fdf9447a184e39bcfb7))
- stepper: added aria-current ([#974](https://github.com/EightfoldAI/octuple/issues/974)) ([b4e1bc3](https://github.com/EightfoldAI/octuple/commits/b4e1bc377e33c2c80bdf3bc1a1c65aeba209022e))

### [2.53.3](https://github.com/EightfoldAI/octuple/compare/v2.53.2...v2.53.3) (2025-04-25)

### [2.53.2](https://github.com/EightfoldAI/octuple/compare/v2.53.1...v2.53.2) (2025-04-23)

### Bug Fixes

- snackbar: fixed focus for info bar close button ([#979](https://github.com/EightfoldAI/octuple/issues/979)) ([2553631](https://github.com/EightfoldAI/octuple/commits/2553631cfab985a48ac1fa7633ea5b71db43695b))

### [2.53.1](https://github.com/EightfoldAI/octuple/compare/v2.53.0...v2.53.1) (2025-04-16)

### Bug Fixes

- add correct aria label ([#944](https://github.com/EightfoldAI/octuple/issues/944)) ([31e8710](https://github.com/EightfoldAI/octuple/commits/31e8710af0f4560cbc7f35be505008c9a4783120))
- added data-testid to the accordion button ([#976](https://github.com/EightfoldAI/octuple/issues/976)) ([4c4de34](https://github.com/EightfoldAI/octuple/commits/4c4de34f055d7645394a87b7dbc8cb3677fb51b4))
- description update ([#972](https://github.com/EightfoldAI/octuple/issues/972)) ([3cf7dd3](https://github.com/EightfoldAI/octuple/commits/3cf7dd37afee9ae0da38c51e3037e52f4db0f4ed))

## [2.53.0](https://github.com/EightfoldAI/octuple/compare/v2.52.25...v2.53.0) (2025-04-01)

### Features

- Ypatadia/eng 137079/ai agent theme addition ([#971](https://github.com/EightfoldAI/octuple/issues/971)) ([b1587bb](https://github.com/EightfoldAI/octuple/commits/b1587bbf7468e4f5e1004a9e97ea318b423fad8a))

### [2.52.25](https://github.com/EightfoldAI/octuple/compare/v2.52.24...v2.52.25) (2025-03-20)

### Bug Fixes

- added synthetic mouse event as a second optional param ([#967](https://github.com/EightfoldAI/octuple/issues/967)) ([9e36251](https://github.com/EightfoldAI/octuple/commits/9e362513dfdd42ad296a6387ff5eebeae193e30a))

### [2.52.24](https://github.com/EightfoldAI/octuple/compare/v2.52.23...v2.52.24) (2025-03-18)

### Features

- dropdown: added overlay props ([#956](https://github.com/EightfoldAI/octuple/issues/956)) ([0933ddf](https://github.com/EightfoldAI/octuple/commits/0933ddf8fe602427995e485cc644004d2d10782f))

### Bug Fixes

- added role presentation to hr tag ([#937](https://github.com/EightfoldAI/octuple/issues/937)) ([1003539](https://github.com/EightfoldAI/octuple/commits/100353920e40618d97eefe8c041e32726f261841))
- avatar: tooltip accessibility fix ([#949](https://github.com/EightfoldAI/octuple/issues/949)) ([134dacd](https://github.com/EightfoldAI/octuple/commits/134dacdf341da572547f396a8f48c29309fe85a5))
- build warning ([#950](https://github.com/EightfoldAI/octuple/issues/950)) ([c0ec69e](https://github.com/EightfoldAI/octuple/commits/c0ec69e8bf131ce0453503e794c0fdaf385d2620))
- Close dropdown on Shift + Tab and enable cyclic navigation for menu items. ([#940](https://github.com/EightfoldAI/octuple/issues/940)) ([b0ce737](https://github.com/EightfoldAI/octuple/commits/b0ce73701903ab3a24972ebb470ca3b4e702c027))
- **dropdown:** recalculate start position when overlaycontent gets updated ([#962](https://github.com/EightfoldAI/octuple/issues/962)) ([632a6c5](https://github.com/EightfoldAI/octuple/commits/632a6c5fa8ca866172e4c6731aebda837b82e452))
- Heading heirarchy fix ([#938](https://github.com/EightfoldAI/octuple/issues/938)) ([7a283e1](https://github.com/EightfoldAI/octuple/commits/7a283e1e20ce85c3ea5605e2b9cd6e49ac4fb1de))
- radio group prop name fixed ([#946](https://github.com/EightfoldAI/octuple/issues/946)) ([920ad63](https://github.com/EightfoldAI/octuple/commits/920ad6388f9130305aca39e61f19c94f678710cc))
- snackbar: added focus to close button in snackbar ([#955](https://github.com/EightfoldAI/octuple/issues/955)) ([ec71eab](https://github.com/EightfoldAI/octuple/commits/ec71eaba2b1814c65f3cdd9831b49467ef624607))
- **table:** update aria labels ([#952](https://github.com/EightfoldAI/octuple/issues/952)) ([0da22c6](https://github.com/EightfoldAI/octuple/commits/0da22c6de597e895d88675a8904b1607f52bbccc))
- **ui:** remove aria properties from arrow button , added role presentation ([#951](https://github.com/EightfoldAI/octuple/issues/951)) ([cb18460](https://github.com/EightfoldAI/octuple/commits/cb184600ef96f3aac654bda1cae03d88dfd728a5))

### [2.52.23](https://github.com/EightfoldAI/octuple/compare/v2.52.22...v2.52.23) (2025-02-10)

### Bug Fixes

- a11y: Fix role inheritance for select options ([#943](https://github.com/EightfoldAI/octuple/issues/943)) ([c6a3e06](https://github.com/EightfoldAI/octuple/commits/c6a3e06d4978becaa2fa21c213f854f6a9aa7001))
- Upload container max width 100% ([#939](https://github.com/EightfoldAI/octuple/issues/939)) ([437cbb8](https://github.com/EightfoldAI/octuple/commits/437cbb8d705a9be81e6547e7f5b9ed956ec349c5))

### [2.52.22](https://github.com/EightfoldAI/octuple/compare/v2.52.21...v2.52.22) (2025-01-15)

### [2.52.21](https://github.com/EightfoldAI/octuple/compare/v2.52.21-0...v2.52.21) (2025-01-15)

### [2.52.21-0](https://github.com/EightfoldAI/octuple/compare/v2.52.20...v2.52.21-0) (2025-01-15)

### Bug Fixes

- dropdown: removed outer container tabindex ([#930](https://github.com/EightfoldAI/octuple/issues/930)) ([5d05021](https://github.com/EightfoldAI/octuple/commits/5d050217ddf34ebbd5d48870f7e1bd2f2cd2aa37))
- eng-120721 : added role to date picker span tag ([#924](https://github.com/EightfoldAI/octuple/issues/924)) ([3a05bbb](https://github.com/EightfoldAI/octuple/commits/3a05bbb9c2708ce220c5d33b12ea9b41b1b15b43))
- remove unused event parameter from Table sorter onClick handler ([#935](https://github.com/EightfoldAI/octuple/issues/935)) ([c44c384](https://github.com/EightfoldAI/octuple/commits/c44c384df66500c66a904c74a663c15a771a7648))
- table cells access using shortcut key ([#934](https://github.com/EightfoldAI/octuple/issues/934)) ([0d0b03f](https://github.com/EightfoldAI/octuple/commits/0d0b03f95e0d85f6affe7010db44c39346b5831b))

### [2.52.20](https://github.com/EightfoldAI/octuple/compare/v2.52.19...v2.52.20) (2025-01-09)

### [2.52.19](https://github.com/EightfoldAI/octuple/compare/v2.52.18...v2.52.19) (2025-01-09)

### Bug Fixes

- added aria-label to the date range picker ([#927](https://github.com/EightfoldAI/octuple/issues/927)) ([64519fb](https://github.com/EightfoldAI/octuple/commits/64519fb8c65ea1035c6003822c88f3b44492ed2c))
- added keyboard accesibility to the easy cropper component ([#932](https://github.com/EightfoldAI/octuple/issues/932)) ([0a8b1ff](https://github.com/EightfoldAI/octuple/commits/0a8b1ffc761e28dbfac8f143a70ecc409269f845))
- dropdown: fixed dropdown container focus issue ([#914](https://github.com/EightfoldAI/octuple/issues/914)) ([92a9407](https://github.com/EightfoldAI/octuple/commits/92a940763e9293a6e9b13059f5e7eed7e4638f25))
- panelHeader: Added prop to the close button ([#917](https://github.com/EightfoldAI/octuple/issues/917)) ([906ee0a](https://github.com/EightfoldAI/octuple/commits/906ee0a5dd2491f760d495bc477767a73b70f9a7))
- scroller is interrupting with the mouse events even when it is not visible ([#920](https://github.com/EightfoldAI/octuple/issues/920)) ([35efd65](https://github.com/EightfoldAI/octuple/commits/35efd656095e824014acbbde61e15cb127d4288f))
- tabs: added inset box shadow on focus visible ([#916](https://github.com/EightfoldAI/octuple/issues/916)) ([41039f5](https://github.com/EightfoldAI/octuple/commits/41039f5fefcff744d467bc648fe350661bad8eec))
- two state button loader background color ([#921](https://github.com/EightfoldAI/octuple/issues/921)) ([f0b09c2](https://github.com/EightfoldAI/octuple/commits/f0b09c2c6f0ec694923767775d13a99e2c226dea))

### [2.52.18](https://github.com/EightfoldAI/octuple/compare/v2.52.17...v2.52.18) (2024-11-13)

### Bug Fixes

- dropdown items are not moving to the next tab index due to stopProgation ([#911](https://github.com/EightfoldAI/octuple/issues/911)) ([d571817](https://github.com/EightfoldAI/octuple/commits/d571817c0b10e409ecdc18fd0913150cfc63c663))

### [2.52.17](https://github.com/EightfoldAI/octuple/compare/v2.52.15-1...v2.52.17) (2024-11-12)

### Bug Fixes

- auto close date picker after selection ([#907](https://github.com/EightfoldAI/octuple/issues/907)) ([5c8c0ce](https://github.com/EightfoldAI/octuple/commits/5c8c0cefe989e9cc6c78ff8f8cf5a59ae7092843))
- dropdown auto click the element when TAB operation is invoked ([#909](https://github.com/EightfoldAI/octuple/issues/909)) ([a86ce4d](https://github.com/EightfoldAI/octuple/commits/a86ce4dd8c8341af7588ff862294c2ec3f741261))

### [2.52.16](https://github.com/EightfoldAI/octuple/compare/v2.52.15-1...v2.52.16) (2024-11-11)

### Bug Fixes

- auto close date picker after selection ([#907](https://github.com/EightfoldAI/octuple/issues/907)) ([5c8c0ce](https://github.com/EightfoldAI/octuple/commits/5c8c0cefe989e9cc6c78ff8f8cf5a59ae7092843))

### [2.52.15](https://github.com/EightfoldAI/octuple/compare/v2.52.15-1...v2.52.15) (2024-11-11)

### [2.52.15-1](https://github.com/EightfoldAI/octuple/compare/v2.52.14...v2.52.15-1) (2024-11-11)

### Features

- change version in package.json ([#905](https://github.com/EightfoldAI/octuple/issues/905)) ([0e1730e](https://github.com/EightfoldAI/octuple/commits/0e1730eaf9b6fe076110644ee8a158a04ba20867))
- remove focus visible ([#906](https://github.com/EightfoldAI/octuple/issues/906)) ([dd6eb34](https://github.com/EightfoldAI/octuple/commits/dd6eb3493afc703d555787ff193cc74a883ff598))

### [2.52.15-0](https://github.com/EightfoldAI/octuple/compare/v2.52.14...v2.52.15-0) (2024-11-11)

### Features

- change version in package.json ([#905](https://github.com/EightfoldAI/octuple/issues/905)) ([0e1730e](https://github.com/EightfoldAI/octuple/commits/0e1730eaf9b6fe076110644ee8a158a04ba20867))
- remove focus visible ([#906](https://github.com/EightfoldAI/octuple/issues/906)) ([dd6eb34](https://github.com/EightfoldAI/octuple/commits/dd6eb3493afc703d555787ff193cc74a883ff598))

## [2.52.0-rollup-rc.0](https://github.com/EightfoldAI/octuple/compare/v2.51.3...v2.52.0-rollup-rc.0) (2024-06-24)

### Features

- support tree shaking ([#829](https://github.com/EightfoldAI/octuple/issues/829)) ([bf33d45](https://github.com/EightfoldAI/octuple/commits/bf33d453038f50b2b192b7d63a6c021b713fe1e5))

### Bug Fixes

- selectors: add aria attributes ([#848](https://github.com/EightfoldAI/octuple/issues/848)) ([b476471](https://github.com/EightfoldAI/octuple/commits/b47647162ec0a6d465220733352ca535e2073c6c))
- svg: updates empty profile lock illustration colors to match design specification ([#845](https://github.com/EightfoldAI/octuple/issues/845)) ([cbeef9c](https://github.com/EightfoldAI/octuple/commits/cbeef9cf7bdf4be96d24a8578268832c3ea2f87c))

### [2.51.3](https://github.com/EightfoldAI/octuple/compare/v2.51.2...v2.51.3) (2024-05-30)

### Bug Fixes

- inlinesvg: adds cross fetch dep to avoid fetch api reference errors ([#842](https://github.com/EightfoldAI/octuple/issues/842)) ([4f01bea](https://github.com/EightfoldAI/octuple/commits/4f01bea951ca6aeb0075607c5eb2a3c6f9cf9198))

### [2.51.2](https://github.com/EightfoldAI/octuple/compare/v2.51.1...v2.51.2) (2024-05-22)

### Features

- accordion: deep accessibility updates ([#823](https://github.com/EightfoldAI/octuple/issues/823)) ([bc92489](https://github.com/EightfoldAI/octuple/commits/bc92489f92f51c4cebc6047f2e679f39086f9cb2))
- menu: adds semantic css variables ([#836](https://github.com/EightfoldAI/octuple/issues/836)) ([de5174c](https://github.com/EightfoldAI/octuple/commits/de5174c6c0842a8094e2f1d7765d128313525801))

### Bug Fixes

- accordion: reverts fit content change in sass ([#831](https://github.com/EightfoldAI/octuple/issues/831)) ([72abf1f](https://github.com/EightfoldAI/octuple/commits/72abf1fd017150bc3ef3a0e3948304cd8841c503))
- isequal: remove dep and replace with utility function derivation ([#833](https://github.com/EightfoldAI/octuple/issues/833)) ([8f6222a](https://github.com/EightfoldAI/octuple/commits/8f6222a0ce178c9d704d17a59207b385194ce0e8))
- table: ensure boolean types in react render when expandable row ([#834](https://github.com/EightfoldAI/octuple/issues/834)) ([11c96e0](https://github.com/EightfoldAI/octuple/commits/11c96e0550dc96f39d3d62eba62cfaaa7787913f))

### [2.51.1](https://github.com/EightfoldAI/octuple/compare/v2.51.0...v2.51.1) (2024-04-30)

### Bug Fixes

- carousel and tooltip: preventTouchMoveDefault false for tooltips inside carousels ([#825](https://github.com/EightfoldAI/octuple/issues/825)) ([f0c025d](https://github.com/EightfoldAI/octuple/commits/f0c025d6e385dc43e05bb34222d9ccd07521353c))
- tab: fixes stat tabs word wrap and spacing when border is false ([#826](https://github.com/EightfoldAI/octuple/issues/826)) ([4554ba4](https://github.com/EightfoldAI/octuple/commits/4554ba4e76ce3a082b3da4e45095e44501db6d4f))

## [2.51.0](https://github.com/EightfoldAI/octuple/compare/v2.50.1...v2.51.0) (2024-04-25)

### Features

- accordion: adds rendercontentalways prop managed by expanded ([#816](https://github.com/EightfoldAI/octuple/issues/816)) ([891d37e](https://github.com/EightfoldAI/octuple/commits/891d37e12f32dc108a853399a6c6a17ca37ec411))
- accordion: enable custom summary layout using full width ([#799](https://github.com/EightfoldAI/octuple/issues/799)) ([e66947d](https://github.com/EightfoldAI/octuple/commits/e66947d4c58db3846b885e4dba5c5dda00e61cc3))
- drawer: add drawer component ([#795](https://github.com/EightfoldAI/octuple/issues/795)) ([fbcbc50](https://github.com/EightfoldAI/octuple/commits/fbcbc50687e380a667ae27917ebbab6082290039))
- infobar: reflow to support small screens according to latest design spec ([#798](https://github.com/EightfoldAI/octuple/issues/798)) ([3cf3525](https://github.com/EightfoldAI/octuple/commits/3cf352596306217ac897b8a8cc84a775984c09b8))
- select: performance optimizations and features ([#815](https://github.com/EightfoldAI/octuple/issues/815)) ([7330c30](https://github.com/EightfoldAI/octuple/commits/7330c306247447a65e6400df5d0e1b9b4076d2d4))
- truncate: adds truncate hook and component with overflow utils ([#820](https://github.com/EightfoldAI/octuple/issues/820)) ([95ea6e5](https://github.com/EightfoldAI/octuple/commits/95ea6e513b435259a8aed2f7504cff0848e7ee4e))

### [2.50.1](https://github.com/EightfoldAI/octuple/compare/v2.50.0...v2.50.1) (2024-04-12)

### Bug Fixes

- menu: adds onclick handler back to main button when secondarybuttonprops fixing menu onchange ([#813](https://github.com/EightfoldAI/octuple/issues/813)) ([e426ba3](https://github.com/EightfoldAI/octuple/commits/e426ba32a0e1c7c173334452246bb23c9a301fc7))

## [2.50.0](https://github.com/EightfoldAI/octuple/compare/v2.49.4...v2.50.0) (2024-04-09)

### Features

- ssr: improve ssr support via globalobject this and use client strings ([#810](https://github.com/EightfoldAI/octuple/issues/810)) ([e3a71f2](https://github.com/EightfoldAI/octuple/commits/e3a71f2de07927bf1c017e25e7728294b7cc23c0))

### Bug Fixes

- ssr: remove memoizeone dep and replace it with local function in locale ([#811](https://github.com/EightfoldAI/octuple/issues/811)) ([233f812](https://github.com/EightfoldAI/octuple/commits/233f812539779b37e07f05284b6e8681c9efcc32))

### [2.49.4](https://github.com/EightfoldAI/octuple/compare/v2.49.3...v2.49.4) (2024-04-08)

### Bug Fixes

- grid: omit some attributes to avoid upstream linter errors when node lts ([#801](https://github.com/EightfoldAI/octuple/issues/801)) ([41a4399](https://github.com/EightfoldAI/octuple/commits/41a4399a0faa1f92c5a6a52e8e75cdceb3611ffd))

### [2.49.3](https://github.com/EightfoldAI/octuple/compare/v2.49.2...v2.49.3) (2024-04-05)

### Bug Fixes

- accordion: ensure expand button props are passed down to the button ([#808](https://github.com/EightfoldAI/octuple/issues/808)) ([c423c40](https://github.com/EightfoldAI/octuple/commits/c423c4012e26289ef7369716dd407e2cc7ad75aa))

### [2.49.2](https://github.com/EightfoldAI/octuple/compare/v2.49.1...v2.49.2) (2024-04-05)

### Bug Fixes

- a11y: card focus visible styles and aria label placeholders with additional code cleanup ([#806](https://github.com/EightfoldAI/octuple/issues/806)) ([d27adbe](https://github.com/EightfoldAI/octuple/commits/d27adbed1e683b2111768142323b116b1df9bfdd))
- card: types file cleanup and enable string dimension types via string union ([#800](https://github.com/EightfoldAI/octuple/issues/800)) ([af9f076](https://github.com/EightfoldAI/octuple/commits/af9f07602357868854461c04330f824e8b038aea))
- select: address selector scoping bugs when portal and right icon and export type ([#802](https://github.com/EightfoldAI/octuple/issues/802)) ([ca88b52](https://github.com/EightfoldAI/octuple/commits/ca88b526a515bac96fe045d3bf258a582c0f70d3))

### [2.49.1](https://github.com/EightfoldAI/octuple/compare/v2.49.0...v2.49.1) (2024-03-09)

### Bug Fixes

- list: move external item into its own function component to address hook bug ([#792](https://github.com/EightfoldAI/octuple/issues/792)) ([5ff2f69](https://github.com/EightfoldAI/octuple/commits/5ff2f69abbd26a0d24d833d8a7e1f6b31a1e7f65))

## [2.49.0](https://github.com/EightfoldAI/octuple/compare/v2.48.0...v2.49.0) (2024-02-26)

### Features

- carousel: adds size overlaycontrols and button props ([#774](https://github.com/EightfoldAI/octuple/issues/774)) ([74bcec2](https://github.com/EightfoldAI/octuple/commits/74bcec219bc578e5143c2180362000df548b8a90))
- configprovider: add support for gradient and individual component theme containers ([#783](https://github.com/EightfoldAI/octuple/issues/783)) ([c9d0e83](https://github.com/EightfoldAI/octuple/commits/c9d0e837d36b39602ce52e357d9a01106d9d4a60))
- navbar: adds navbar height semantic variable and update the height to 80 pixels ([#745](https://github.com/EightfoldAI/octuple/issues/745)) ([a53158e](https://github.com/EightfoldAI/octuple/commits/a53158e40eec63880641f269a2416ac8d91f85bc))
- stat: adds direction lineclamp fullwidth and maxwidth props ([#781](https://github.com/EightfoldAI/octuple/issues/781)) ([f796ff9](https://github.com/EightfoldAI/octuple/commits/f796ff97ee5e40b39a20f670832b63f7c36fe0a8))
- table: expandable config improvements ([#777](https://github.com/EightfoldAI/octuple/issues/777)) ([adfb54d](https://github.com/EightfoldAI/octuple/commits/adfb54db8b06ef59547eb85d583b8779582299bb))
- tabs: alignIcon for default and pill and updates stat to add xsmall and optional button ([#780](https://github.com/EightfoldAI/octuple/issues/780)) ([4d1d324](https://github.com/EightfoldAI/octuple/commits/4d1d3241e4162df408957727dd96855f6d7c41fe))
- upload: adds delete button to single dropzones and other updates ([#775](https://github.com/EightfoldAI/octuple/issues/775)) ([1057618](https://github.com/EightfoldAI/octuple/commits/10576184b94e11bc958f04e880fef34c67259145))

### Bug Fixes

- a11y: numerous screen reader fixes ([#789](https://github.com/EightfoldAI/octuple/issues/789)) ([1e6589a](https://github.com/EightfoldAI/octuple/commits/1e6589a701cc776f50c3a54b57b032c47a6547c4))
- form: ensure form item label custom node content display is inline ([#786](https://github.com/EightfoldAI/octuple/issues/786)) ([e828a69](https://github.com/EightfoldAI/octuple/commits/e828a691460b4faed868beed5e4060e9757788e0))
- linkbutton: adjust anchor specificity to ignore bootstrap styles ([#776](https://github.com/EightfoldAI/octuple/issues/776)) ([a0bd86a](https://github.com/EightfoldAI/octuple/commits/a0bd86a571c03477e910820ba3c4f4abb88bfefd))
- table: adds indeterminate state to check all box if only some rows are selected ([#772](https://github.com/EightfoldAI/octuple/issues/772)) ([300f535](https://github.com/EightfoldAI/octuple/commits/300f5353a5cbfc0255dee4d374d477cbaedc5d68))
- upstream: ensures upstream snaps do not minify function component names ([#779](https://github.com/EightfoldAI/octuple/issues/779)) ([c4c52c1](https://github.com/EightfoldAI/octuple/commits/c4c52c151b6a8a07bad91d5ecb3b53ad20c92299))

## [2.48.0](https://github.com/EightfoldAI/octuple/compare/v2.47.0...v2.48.0) (2024-01-09)

### Features

- a11y: arrow key navigation support for list menu dropdown and select ([#759](https://github.com/EightfoldAI/octuple/issues/759)) ([740e172](https://github.com/EightfoldAI/octuple/commits/740e172ffd36d55dd69d01b53d2726e045cff038))
- add more icons ([#765](https://github.com/EightfoldAI/octuple/issues/765)) ([3d2549c](https://github.com/EightfoldAI/octuple/commits/3d2549c3f35da7069f031ad2e9aeb88f6c273b5a))
- carousel: exports autoscrollapi and updates story to include custom buttons example ([#756](https://github.com/EightfoldAI/octuple/issues/756)) ([87a570e](https://github.com/EightfoldAI/octuple/commits/87a570e0558a2f351e3f79484a3dfda393cc20bf))
- grid: adds xl breakpoint ([#762](https://github.com/EightfoldAI/octuple/issues/762)) ([57f8131](https://github.com/EightfoldAI/octuple/commits/57f8131f575aaa46e8e9460292e1ead2ee715373))
- icon: add domain, circle slices and arrow head icons ([#761](https://github.com/EightfoldAI/octuple/issues/761)) ([e6e1a7d](https://github.com/EightfoldAI/octuple/commits/e6e1a7db5a5f5e4371dd1135196a91c43ad7a326))
- skill: adds svg and suffix support with assessments status and required props ([#758](https://github.com/EightfoldAI/octuple/issues/758)) ([cbdbdd5](https://github.com/EightfoldAI/octuple/commits/cbdbdd5b52d34a9ff96eb2f947aea291b3b98e7c))
- tooltip: adds touch api support with hover a11y fixup ([#749](https://github.com/EightfoldAI/octuple/issues/749)) ([6637f00](https://github.com/EightfoldAI/octuple/commits/6637f0014e7b40bb560d80a78d62402de5faddf2))

### Bug Fixes

- button: fixes round icon only secondary buttons padding to consider its border ([#748](https://github.com/EightfoldAI/octuple/issues/748)) ([f52d5ba](https://github.com/EightfoldAI/octuple/commits/f52d5ba7ce47d768d66905ff1f7f10cc71312acd))
- form: fixes required and optional marks so they display inline with the label text ([#747](https://github.com/EightfoldAI/octuple/issues/747)) ([33f512a](https://github.com/EightfoldAI/octuple/commits/33f512a20d3ee467752c9ed7400b0fb5ce6de5b1))
- input: updates validation status font color to latest specification ([#771](https://github.com/EightfoldAI/octuple/issues/771)) ([8df221c](https://github.com/EightfoldAI/octuple/commits/8df221c61f1559378ec3f2eb154b998b32d5d932))
- sass: moves scroll bars mixin to global scope and adds it to dropdown ([#726](https://github.com/EightfoldAI/octuple/issues/726)) ([501ddce](https://github.com/EightfoldAI/octuple/commits/501ddce79d29589db7887d68f933dc5804a8d1c1))
- slider: ensure touchmove is not prevented to enable default touch on mobile ([#769](https://github.com/EightfoldAI/octuple/issues/769)) ([5772b80](https://github.com/EightfoldAI/octuple/commits/5772b80e83bf4464c432b5faaa9961d84424cb07))
- table: showscroller rtl support ([#764](https://github.com/EightfoldAI/octuple/issues/764)) ([4b6af71](https://github.com/EightfoldAI/octuple/commits/4b6af71ac803db5165fca6c4e326b888ba4abd74))
- tooltip: dedupes tooltip id and updates story for screen readers ([#768](https://github.com/EightfoldAI/octuple/issues/768)) ([268b54f](https://github.com/EightfoldAI/octuple/commits/268b54f7823452889f27189acc6c597e27b4fd69))
- tooltip: defer cursor style to implementation in host app ([#754](https://github.com/EightfoldAI/octuple/issues/754)) ([66594f3](https://github.com/EightfoldAI/octuple/commits/66594f341be501685ff38a3bcd7c432e349d99ab))

## [2.47.0](https://github.com/EightfoldAI/octuple/compare/v2.46.2...v2.47.0) (2023-11-03)

### Features

- extend breadcrumb for custom divider and crumb ([#739](https://github.com/EightfoldAI/octuple/issues/739)) ([23c8968](https://github.com/EightfoldAI/octuple/commits/23c89688ab4b0067bb9252996d2d7d4151ab0557))
- fadein: add fadein component ([#737](https://github.com/EightfoldAI/octuple/issues/737)) ([32064df](https://github.com/EightfoldAI/octuple/commits/32064dfbe41eb7604113558c08efa33fc4405fd4))
- focustrap: export focus trap and add new hook props ([#743](https://github.com/EightfoldAI/octuple/issues/743)) ([43f34ef](https://github.com/EightfoldAI/octuple/commits/43f34efb5d4c272dd050fcf264f542ec292d1dc2))
- pickers: add readonly mode ([#741](https://github.com/EightfoldAI/octuple/issues/741)) ([b0d40c6](https://github.com/EightfoldAI/octuple/commits/b0d40c637e1ca5a7a97da670f1f41a24179934f4))
- skill: add skill component ([#717](https://github.com/EightfoldAI/octuple/issues/717)) ([7691505](https://github.com/EightfoldAI/octuple/commits/7691505884c76808d8fbf4273d74e62252adc9e3))
- table: add rowexpanddisabled prop ([#731](https://github.com/EightfoldAI/octuple/issues/731)) ([b0b7640](https://github.com/EightfoldAI/octuple/commits/b0b7640696e3f7952c5656f14f080d74ac431232))
- upload: add fullwidth prop for small and medium dropzone responsiveness ([#730](https://github.com/EightfoldAI/octuple/issues/730)) ([2688ead](https://github.com/EightfoldAI/octuple/commits/2688ead5d9bace92322e6ce94656f31adfa3428d))

### Bug Fixes

- focustrap: improve reliability of use focus trap hook ([#735](https://github.com/EightfoldAI/octuple/issues/735)) ([078ae83](https://github.com/EightfoldAI/octuple/commits/078ae83e91a5e8a3e5dc32d9e9c71a6e419009a7))
- inlinesvg: memoized fetch and compare with previous url ([#734](https://github.com/EightfoldAI/octuple/issues/734)) ([77a7946](https://github.com/EightfoldAI/octuple/commits/77a7946f7ad2882c419f441941f4c15c908aa22b))
- list: add listclassnames prop and unit tests ([#724](https://github.com/EightfoldAI/octuple/issues/724)) ([91fb3ce](https://github.com/EightfoldAI/octuple/commits/91fb3ce2302b12e5a7968232c7d5c32cbb3c4620))
- tooltip: escape to dismiss default tooltip on hover only ([#736](https://github.com/EightfoldAI/octuple/issues/736)) ([388d24d](https://github.com/EightfoldAI/octuple/commits/388d24d7a692abda86457e3e3bbef53847492540))

### [2.46.2](https://github.com/EightfoldAI/octuple/compare/v2.46.1...v2.46.2) (2023-10-18)

### Bug Fixes

- avatar: update background theme colors from tertiary to secondary ([#732](https://github.com/EightfoldAI/octuple/issues/732)) ([9f68040](https://github.com/EightfoldAI/octuple/commits/9f680404dd114b5e96dd253d19b994b1da5d9af6))
- dropzone: ensures tab key event is not prevented ([#727](https://github.com/EightfoldAI/octuple/issues/727)) ([e4f0359](https://github.com/EightfoldAI/octuple/commits/e4f0359b7afbe6ac7b74052c876d462943cf86e4))
- panel: ensures there is no element when footer is not implemented ([#728](https://github.com/EightfoldAI/octuple/issues/728)) ([0d0ef61](https://github.com/EightfoldAI/octuple/commits/0d0ef6182133934c84707010260094d4b6844240))

### [2.46.1](https://github.com/EightfoldAI/octuple/compare/v2.46.0...v2.46.1) (2023-10-06)

### Bug Fixes

- focustrap: fixes typo in selector string ([#722](https://github.com/EightfoldAI/octuple/issues/722)) ([e3205d5](https://github.com/EightfoldAI/octuple/commits/e3205d537dc20be040371a7c1172949771a8e06d))
- link: align two hover colors with the latest design spec ([#719](https://github.com/EightfoldAI/octuple/issues/719)) ([8bc7e24](https://github.com/EightfoldAI/octuple/commits/8bc7e24473e4eed7c7592ae4d74d95a780d455da))

## [2.46.0](https://github.com/EightfoldAI/octuple/compare/v2.45.0...v2.46.0) (2023-09-29)

### Features

- slider: support discreet segments or dots with improved labels ([#716](https://github.com/EightfoldAI/octuple/issues/716)) ([ced55de](https://github.com/EightfoldAI/octuple/commits/ced55deddeb0455ffb9b6da18f5880442dd3b36d))

### Bug Fixes

- use semantic card border color for cards ([#715](https://github.com/EightfoldAI/octuple/issues/715)) ([48560d0](https://github.com/EightfoldAI/octuple/commits/48560d05d47006d279df3e96b871e6995fe62fbb))

## [2.45.0](https://github.com/EightfoldAI/octuple/compare/v2.44.0...v2.45.0) (2023-09-21)

### Features

- inputs: add readonly support and its styles ([#706](https://github.com/EightfoldAI/octuple/issues/706)) ([d9903be](https://github.com/EightfoldAI/octuple/commits/d9903beee3aead185a9af088529747791bcdf2ba))
- progress: add pill variant ([#709](https://github.com/EightfoldAI/octuple/issues/709)) ([fc5e49d](https://github.com/EightfoldAI/octuple/commits/fc5e49df54808ba6d21515b6cf59c7fefcfdc1d2))

### Bug Fixes

- button: fixes counter position when button only contains an icon ([#713](https://github.com/EightfoldAI/octuple/issues/713)) ([1770722](https://github.com/EightfoldAI/octuple/commits/1770722f96bc757061773c6801620f9cca3f9254))
- carousel: add controls prop to scroll menu ([#705](https://github.com/EightfoldAI/octuple/issues/705)) ([0044f69](https://github.com/EightfoldAI/octuple/commits/0044f69b67ab7396ac24e2d9fa96a55a11abe6a8))
- linkbutton: fixes counter position when button only contains an icon ([#714](https://github.com/EightfoldAI/octuple/issues/714)) ([1c5ecc4](https://github.com/EightfoldAI/octuple/commits/1c5ecc474c653985c43cdbf6c840f996d5cfb6a7))
- tooltip: fixes default clone element class names ([#699](https://github.com/EightfoldAI/octuple/issues/699)) ([3404bb1](https://github.com/EightfoldAI/octuple/commits/3404bb12bfaa8ad8e7386330380e8c2713fdd134))

## [2.44.0](https://github.com/EightfoldAI/octuple/compare/v2.43.0...v2.44.0) (2023-08-25)

### Features

- badge: add badge size and update button and tab custom css ([#672](https://github.com/EightfoldAI/octuple/issues/672)) ([af91b66](https://github.com/EightfoldAI/octuple/commits/af91b6699ed9dfd9b38164c706b9c24963c50192))
- pickers: changeonblur and button props with option to hide buttons ([#696](https://github.com/EightfoldAI/octuple/issues/696)) ([0a08831](https://github.com/EightfoldAI/octuple/commits/0a08831ee67893abf8ccbdefb6a6608f6247fcd8))
- selectors: adds checkbox indeterminate state and selector pill variants ([#694](https://github.com/EightfoldAI/octuple/issues/694)) ([7941608](https://github.com/EightfoldAI/octuple/commits/79416083bba75940ff7edabbe2443001021a5036))

### Bug Fixes

- button: moves button transition to global semantic variables ([#695](https://github.com/EightfoldAI/octuple/issues/695)) ([c239873](https://github.com/EightfoldAI/octuple/commits/c239873e033b45257c84e014b554cd9feb1dd6c2))
- popup: fixes style inheritance of reference element ([#675](https://github.com/EightfoldAI/octuple/issues/675)) ([88827e0](https://github.com/EightfoldAI/octuple/commits/88827e0bb38a96495ca03642c97f0ad4e0326a6e))
- textarea: ensure grip icon doesn't block mouse drag ([#698](https://github.com/EightfoldAI/octuple/issues/698)) ([cbfc558](https://github.com/EightfoldAI/octuple/commits/cbfc558aad14ef55b911acde3457921abaca5169))
- tooltip: fixes tooltip toggle on mobile devices ([#668](https://github.com/EightfoldAI/octuple/issues/668)) ([a5cb7ec](https://github.com/EightfoldAI/octuple/commits/a5cb7ec489c80d317f38cb8128025d493d69464e))

## [2.43.0](https://github.com/EightfoldAI/octuple/compare/v2.42.0...v2.43.0) (2023-08-08)

### Features

- card: update card size prop and remove bunko story ([#682](https://github.com/EightfoldAI/octuple/issues/682)) ([772f328](https://github.com/EightfoldAI/octuple/commits/772f32874938c33662dca4956c0387613df328c9))
- infobar: adds bordered prop ([#676](https://github.com/EightfoldAI/octuple/issues/676)) ([b2b75ef](https://github.com/EightfoldAI/octuple/commits/b2b75efeaa1f8410e1fe4761a905d6e9fd43fa5b))

### Bug Fixes

- accordion: fixes scroll bar animation flicker ([#680](https://github.com/EightfoldAI/octuple/issues/680)) ([2bf20ef](https://github.com/EightfoldAI/octuple/commits/2bf20eff5b05ceb1c2d9a6b5b13ae6116d9b595b))
- table: adds default overflow back to latest scroll bars mixin ([#678](https://github.com/EightfoldAI/octuple/issues/678)) ([560cebf](https://github.com/EightfoldAI/octuple/commits/560cebf8b42c719431316d3513b1d7c3b8d80cad))

## [2.42.0](https://github.com/EightfoldAI/octuple/compare/v2.41.0...v2.42.0) (2023-07-21)

### Features

- persistentbar: support small screens and themes plus custom render ([#667](https://github.com/EightfoldAI/octuple/issues/667)) ([447d2a1](https://github.com/EightfoldAI/octuple/commits/447d2a171bb7ee7c78063e5ac55a8ad8a7b0d57e))
- selectors: add var theme support to check box radio and toggle ([#659](https://github.com/EightfoldAI/octuple/issues/659)) ([8525e42](https://github.com/EightfoldAI/octuple/commits/8525e42344d31abcd4f64be621393f48537a8400))
- slider and progress: add ability to visually hide borders ([#673](https://github.com/EightfoldAI/octuple/issues/673)) ([414bc32](https://github.com/EightfoldAI/octuple/commits/414bc3211afd5127b86d6f51732583ae5e56f9df))

### Bug Fixes

- select: adds fall back and optional chaining to avoid null reference errors at runtime ([#669](https://github.com/EightfoldAI/octuple/issues/669)) ([13c73e7](https://github.com/EightfoldAI/octuple/commits/13c73e70c0c1c9b017a5b81879af2f9fc6a88ef3))

## [2.41.0](https://github.com/EightfoldAI/octuple/compare/v2.40.0...v2.41.0) (2023-06-27)

### Features

- breadcrumb: add breadcrumb component ([#629](https://github.com/EightfoldAI/octuple/issues/629)) ([6748a1e](https://github.com/EightfoldAI/octuple/commits/6748a1e2ba6ae9c9f5e672d9a9f5a172f19ae20f))

### Bug Fixes

- menu: add htmltype prop to menu item button ([#654](https://github.com/EightfoldAI/octuple/issues/654)) ([9a6141a](https://github.com/EightfoldAI/octuple/commits/9a6141aef77fd647f7ad6856d0bbc0c21667f188))
- picker: color contrast ratio fixes ([#647](https://github.com/EightfoldAI/octuple/issues/647)) ([fea047d](https://github.com/EightfoldAI/octuple/commits/fea047dd58738af1f34a7f8cca48f42eee69dc80))
- select: Update selected option based on defaultValue when isLoading changes ([#646](https://github.com/EightfoldAI/octuple/issues/646)) ([844a3a3](https://github.com/EightfoldAI/octuple/commits/844a3a3631425a67e899225a442b699a64db961d))
- slider: ensure tooltip is visually hidden when slider is disabled ([#651](https://github.com/EightfoldAI/octuple/issues/651)) ([b810ba8](https://github.com/EightfoldAI/octuple/commits/b810ba8610640e89fdd486dc2559cde078a968ad))
- slider: fixes hidetrack and hiderail props typos and ommissions ([#656](https://github.com/EightfoldAI/octuple/issues/656)) ([0c00967](https://github.com/EightfoldAI/octuple/commits/0c00967028e25da78fd0a13ce09a926110f29b21))
- table: updates scrollable div by removing deprecated css property ([#655](https://github.com/EightfoldAI/octuple/issues/655)) ([ee4c5d6](https://github.com/EightfoldAI/octuple/commits/ee4c5d6f1491fc724c7b8f61dc2f72377d666351))

## [2.40.0](https://github.com/EightfoldAI/octuple/compare/v2.39.1...v2.40.0) (2023-06-20)

### Bug Fixes

- linkbutton: ensure default width matches min and max width ([#640](https://github.com/EightfoldAI/octuple/issues/640)) ([ffe5abf](https://github.com/EightfoldAI/octuple/commits/ffe5abf86ecefc1626f05a6b40cd2bd6d92b68e5))
- matchscore: color contrast and vertical alignment fix up ([#641](https://github.com/EightfoldAI/octuple/issues/641)) ([5353f90](https://github.com/EightfoldAI/octuple/commits/5353f90646321aea40de68425dc2d47b72b57594))
- table: various accessibility improvements ([#644](https://github.com/EightfoldAI/octuple/issues/644)) ([4cec71c](https://github.com/EightfoldAI/octuple/commits/4cec71cf06a041f28dd4c20279998fadef4f6746))
- tabs: pill variant color contrast fix up ([#642](https://github.com/EightfoldAI/octuple/issues/642)) ([33646f6](https://github.com/EightfoldAI/octuple/commits/33646f6929a70ab34ecdc783ff7e059eb0754e6c))

### [2.39.1](https://github.com/EightfoldAI/octuple/compare/v2.39.0...v2.39.1) (2023-06-14)

### Bug Fixes

- select: revert update selected option based on defaultValue when isLoading ([#643](https://github.com/EightfoldAI/octuple/issues/643)) ([6a481f7](https://github.com/EightfoldAI/octuple/commits/6a481f7361c4dcde666beeea27064198434293b4))

## [2.39.0](https://github.com/EightfoldAI/octuple/compare/v2.38.0...v2.39.0) (2023-06-12)

### Features

- icon: add collapse icon for kanban ([#637](https://github.com/EightfoldAI/octuple/issues/637)) ([0f05959](https://github.com/EightfoldAI/octuple/commits/0f0595977081d62dab8341ec0dabcdf3ae6cdb98))
- icon: add icons to support integration system simplification ([#634](https://github.com/EightfoldAI/octuple/issues/634)) ([693ee85](https://github.com/EightfoldAI/octuple/commits/693ee85436c32099183acc3d7240e8b5c85a9497))
- icon: add icons to support kanban view ([#632](https://github.com/EightfoldAI/octuple/issues/632)) ([f94efac](https://github.com/EightfoldAI/octuple/commits/f94efac518d04d004ff367f400ff34958c246c1f))

### Bug Fixes

- button: ensure loading dots use text color and enable two state loader ([#636](https://github.com/EightfoldAI/octuple/issues/636)) ([94f7759](https://github.com/EightfoldAI/octuple/commits/94f77599b00b2ca72017352306a95a5a356e76c0))
- select: Update selected option based on defaultValue when isLoading changes. ([#631](https://github.com/EightfoldAI/octuple/issues/631)) ([1e0417a](https://github.com/EightfoldAI/octuple/commits/1e0417a6a8d01b68bcb739bdd75c1a7c62c7a240))
- slider: increase vertical hit target and handle segmented gap clicks ([#635](https://github.com/EightfoldAI/octuple/issues/635)) ([b4cad7b](https://github.com/EightfoldAI/octuple/commits/b4cad7b8dde7e01e78cc1aab9eb333e3d7058c5f))

## [2.38.0](https://github.com/EightfoldAI/octuple/compare/v2.37.0...v2.38.0) (2023-06-02)

### Features

- messagebar: add message bar component ([#622](https://github.com/EightfoldAI/octuple/issues/622)) ([421d785](https://github.com/EightfoldAI/octuple/commits/421d7854baea35cb062fa04e5e7b1d9c1e639ae0))
- rename background-color to background ([#628](https://github.com/EightfoldAI/octuple/issues/628)) ([71c490b](https://github.com/EightfoldAI/octuple/commits/71c490b3a6a52beaa44f56932a89f875375d810f))
- table: adds column border and disable row bg hover color props ([#624](https://github.com/EightfoldAI/octuple/issues/624)) ([78a333d](https://github.com/EightfoldAI/octuple/commits/78a333dc5d047674ce2b838859b31fe4321a1527))

### Bug Fixes

- css: global css variable name alignment with design specification ([#625](https://github.com/EightfoldAI/octuple/issues/625)) ([26c16fd](https://github.com/EightfoldAI/octuple/commits/26c16fd7913f8e5efbaa2300e927a841fba8c174))
- pill: ensure pill heights match latest design specification ([#626](https://github.com/EightfoldAI/octuple/issues/626)) ([3576613](https://github.com/EightfoldAI/octuple/commits/357661381851d3d38c66368bb0c6ed170fd320ef))
- select: ensure medium and large pills fit inside inputs of same size ([#630](https://github.com/EightfoldAI/octuple/issues/630)) ([156800d](https://github.com/EightfoldAI/octuple/commits/156800d0bebc49d0e0f6ce2a8fd611d427e9e008))
- table: fix loading compare and updates default spinner size and position ([#627](https://github.com/EightfoldAI/octuple/issues/627)) ([b0b830e](https://github.com/EightfoldAI/octuple/commits/b0b830e25f10ff9cf5cdb2d03fb831b0ce0d7639))

## [2.37.0](https://github.com/EightfoldAI/octuple/compare/v2.36.2...v2.37.0) (2023-05-23)

### Features

- empty: enable themes and adds two additional modes ([#619](https://github.com/EightfoldAI/octuple/issues/619)) ([2ac0cd0](https://github.com/EightfoldAI/octuple/commits/2ac0cd089880997c00d55d46caed2e4a0b68e2bc))

### Bug Fixes

- button: pass disruptive down from props to button from defaultbutton ([#614](https://github.com/EightfoldAI/octuple/issues/614)) ([ab4a4c9](https://github.com/EightfoldAI/octuple/commits/ab4a4c91e3fc1274aea392c045cbbe5d755318bf))
- dropdown: fix visible prop ([#616](https://github.com/EightfoldAI/octuple/issues/616)) ([5e9f147](https://github.com/EightfoldAI/octuple/commits/5e9f147ea0a50508fed2c9b85160feaee7526d54))
- dropdown: tweak css slideupin animation ([#618](https://github.com/EightfoldAI/octuple/issues/618)) ([7a26de0](https://github.com/EightfoldAI/octuple/commits/7a26de00096dbf145eaa558b082247aaebc36338))
- locale: add support for hi locale ([#602](https://github.com/EightfoldAI/octuple/issues/602)) ([4232b01](https://github.com/EightfoldAI/octuple/commits/4232b01915618c5521531e3a57ef1ffd1007e874))

### [2.36.2](https://github.com/EightfoldAI/octuple/compare/v2.36.1...v2.36.2) (2023-05-09)

### Bug Fixes

- stepper: handle scrollIntoView for both layouts on mount ([#613](https://github.com/EightfoldAI/octuple/issues/613)) ([209d5c3](https://github.com/EightfoldAI/octuple/commits/209d5c3cd492991e67cd854632cdf00193b32b6c))

### [2.36.1](https://github.com/EightfoldAI/octuple/compare/v2.36.0...v2.36.1) (2023-05-04)

### Bug Fixes

- select: ensure aria attributes target the intended element ([#612](https://github.com/EightfoldAI/octuple/issues/612)) ([387158d](https://github.com/EightfoldAI/octuple/commits/387158d892270c8317eb7a4dab4dfc5c0473398e))

## [2.36.0](https://github.com/EightfoldAI/octuple/compare/v2.35.3...v2.36.0) (2023-05-03)

### Features

- adding style option for Empty description ([#606](https://github.com/EightfoldAI/octuple/issues/606)) ([0539a61](https://github.com/EightfoldAI/octuple/commits/0539a61868990ba4e636a559b2ad919af72424a1))
- linkbutton: add link button component ([#607](https://github.com/EightfoldAI/octuple/issues/607)) ([8b3d782](https://github.com/EightfoldAI/octuple/commits/8b3d782e20146413b623159ad280aaeb3360aed4))

### Bug Fixes

- dropdown: use id from clone element props if present ([#608](https://github.com/EightfoldAI/octuple/issues/608)) ([6db0dc9](https://github.com/EightfoldAI/octuple/commits/6db0dc90eb628091c45e03cfa7c7d624b06a312c))
- pagination: Issues with VisiblePagerCountSize ([#610](https://github.com/EightfoldAI/octuple/issues/610)) ([919c7c5](https://github.com/EightfoldAI/octuple/commits/919c7c5248a700a8e866ce2eeeac83ae3e9107b1))

### [2.35.3](https://github.com/EightfoldAI/octuple/compare/v2.35.2...v2.35.3) (2023-04-24)

### Bug Fixes

- accordion: custom theme support ([#605](https://github.com/EightfoldAI/octuple/issues/605)) ([2db5e5a](https://github.com/EightfoldAI/octuple/commits/2db5e5a799cc30f69d8b544d6d5ffefaa6d10eb2))

### [2.35.2](https://github.com/EightfoldAI/octuple/compare/v2.35.1...v2.35.2) (2023-04-24)

### Bug Fixes

- **avatar group:** avatar group count, maxProps fixes ([#604](https://github.com/EightfoldAI/octuple/issues/604)) ([9bfa3f0](https://github.com/EightfoldAI/octuple/commits/9bfa3f0a21b25d98fd9a512febd16046074ac0a9))

### [2.35.1](https://github.com/EightfoldAI/octuple/compare/v2.35.0...v2.35.1) (2023-04-17)

### Bug Fixes

- tooltip: remove pointer events property of disabled styling ([#600](https://github.com/EightfoldAI/octuple/issues/600)) ([8b4568a](https://github.com/EightfoldAI/octuple/commits/8b4568aac101dfa6aafbfecbf2dc70bc6a95ba83))

## [2.35.0](https://github.com/EightfoldAI/octuple/compare/v2.34.2...v2.35.0) (2023-04-13)

### Features

- add mdi icon mdiClipboardAlert ([#582](https://github.com/EightfoldAI/octuple/issues/582)) ([8ed7d9f](https://github.com/EightfoldAI/octuple/commits/8ed7d9f7783ab40543dd645d9583b83381d2ffb2))
- pill: add align icon prop ([#595](https://github.com/EightfoldAI/octuple/issues/595)) ([176d484](https://github.com/EightfoldAI/octuple/commits/176d4847debab327a83e94059e9daec4b924e362))
- popup: add more props to style and global css vars ([#592](https://github.com/EightfoldAI/octuple/issues/592)) ([5a1a533](https://github.com/EightfoldAI/octuple/commits/5a1a5339ae33c1424086e9b4e190185f9e61504e))
- stepper: Add scroll to active step support ([#591](https://github.com/EightfoldAI/octuple/issues/591)) ([32682a6](https://github.com/EightfoldAI/octuple/commits/32682a67e7913f1b7ec42561a90dbd93e2267487))

### Bug Fixes

- button: move three more button palettes to global css vars ([#593](https://github.com/EightfoldAI/octuple/issues/593)) ([f4e3ac5](https://github.com/EightfoldAI/octuple/commits/f4e3ac572ab3fb5dc38fd37fbcfd0712a59519b5))
- panel: fixes panel to fit small screens ([#594](https://github.com/EightfoldAI/octuple/issues/594)) ([7deba10](https://github.com/EightfoldAI/octuple/commits/7deba10a4d01633d9b3bc47381af38a5f37c12d7))
- select: clear input value on dismiss when not selected and other fixes ([#584](https://github.com/EightfoldAI/octuple/issues/584)) ([c0f483b](https://github.com/EightfoldAI/octuple/commits/c0f483bec121b3e0febd989236f3cd163aa5f8c3))
- upload: adds button type props to show list item interface ([#596](https://github.com/EightfoldAI/octuple/issues/596)) ([77984f3](https://github.com/EightfoldAI/octuple/commits/77984f3fe6d9a1687fbda1a44ea545a0b0cfb718))

### [2.34.2](https://github.com/EightfoldAI/octuple/compare/v2.34.1...v2.34.2) (2023-04-10)

### Bug Fixes

- popup: fixes pseudo element so it doesn't block cursor ([#590](https://github.com/EightfoldAI/octuple/issues/590)) ([12fee03](https://github.com/EightfoldAI/octuple/commits/12fee0368883924b856940c439b476ec97841b6d))

### [2.34.1](https://github.com/EightfoldAI/octuple/compare/v2.34.0...v2.34.1) (2023-04-07)

### Bug Fixes

- mdi icons not correctly ordered ([#587](https://github.com/EightfoldAI/octuple/issues/587)) ([618e686](https://github.com/EightfoldAI/octuple/commits/618e686b7d5761fe47dba07c315c0086676dc1a3))

## [2.34.0](https://github.com/EightfoldAI/octuple/compare/v2.33.0...v2.34.0) (2023-04-07)

### Features

- adding mdi trend icons ([#585](https://github.com/EightfoldAI/octuple/issues/585)) ([56a04c7](https://github.com/EightfoldAI/octuple/commits/56a04c7dfc4bbf994bc53fb1e53d85caef538f31))
- avatar: add avatar popup and fix group tooltips ([#575](https://github.com/EightfoldAI/octuple/issues/575)) ([c4dc4aa](https://github.com/EightfoldAI/octuple/commits/c4dc4aa34f0c6428ed02cc708945a727364103bf))
- inline svg component ([#583](https://github.com/EightfoldAI/octuple/issues/583)) ([76836a0](https://github.com/EightfoldAI/octuple/commits/76836a0a6f5f6db8db0838cbfcebd9bd9b22110c))

### Bug Fixes

- dropdown: handle event propagation and disabled ([#580](https://github.com/EightfoldAI/octuple/issues/580)) ([8e49fef](https://github.com/EightfoldAI/octuple/commits/8e49fef84411e86cb5973c076bfcc61740842318))
- menu: fixes keyboard focus and screen reader functionality ([#579](https://github.com/EightfoldAI/octuple/issues/579)) ([caeb475](https://github.com/EightfoldAI/octuple/commits/caeb475ce839ced408cb59a247145b031313a723))
- pagination: bug fixes for simplified pagination ([#581](https://github.com/EightfoldAI/octuple/issues/581)) ([c6b83cc](https://github.com/EightfoldAI/octuple/commits/c6b83cc5ee0b89e154ef0cf114c62a17f512c3c6)), closes [#577](https://github.com/EightfoldAI/octuple/issues/577)
- slider: pixel push extremity labels to better match thumb label position ([#577](https://github.com/EightfoldAI/octuple/issues/577)) ([f6b9a4e](https://github.com/EightfoldAI/octuple/commits/f6b9a4e628d59647fd5144ee8ec87b6e02a34c88))
- storybook: fixes null ref error on var theme ([#578](https://github.com/EightfoldAI/octuple/issues/578)) ([da57518](https://github.com/EightfoldAI/octuple/commits/da57518ea933920060cfdc4485040017ca4ac716))

## [2.33.0](https://github.com/EightfoldAI/octuple/compare/v2.32.0...v2.33.0) (2023-03-23)

### Features

- cascadingmenu: add cascading menu component ([#566](https://github.com/EightfoldAI/octuple/issues/566)) ([4f7ca8c](https://github.com/EightfoldAI/octuple/commits/4f7ca8c93722b4bc244bbdc8fe30d119fb5c126c))
- menuitem: adds align icon prop and fixes list item rendering bug ([#563](https://github.com/EightfoldAI/octuple/issues/563)) ([65dde9a](https://github.com/EightfoldAI/octuple/commits/65dde9adfa93fc11375da78c45275a5826688131))

### Bug Fixes

- carousel: only handle wheel event when not using touchpad ([#568](https://github.com/EightfoldAI/octuple/issues/568)) ([045ba0e](https://github.com/EightfoldAI/octuple/commits/045ba0ee413cc9ab9a2099a408d6a19066ce2582))
- no scrolling buttons when body does not have scroll bar ([#571](https://github.com/EightfoldAI/octuple/issues/571)) ([a64a582](https://github.com/EightfoldAI/octuple/commits/a64a582006ef0eb36be9da4d1e10e8c9145c0b88))
- panel: body padding prop on panel does not work ([#569](https://github.com/EightfoldAI/octuple/issues/569)) ([f3ddff5](https://github.com/EightfoldAI/octuple/commits/f3ddff5bb484feff92abaea33a21e6fddc7d5eb7))
- select: options change not reacting properly when value is an object ([#570](https://github.com/EightfoldAI/octuple/issues/570)) ([1cba3fd](https://github.com/EightfoldAI/octuple/commits/1cba3fd140e9c776f6f92d05d57fdafa15516c4b))
- status item styles, add option to place status icon before status text ([#567](https://github.com/EightfoldAI/octuple/issues/567)) ([cdf866c](https://github.com/EightfoldAI/octuple/commits/cdf866c4fb7678e012212f14600bcc57dba5e8fb))
- tooltip: fixes pixel position rounding error ([#572](https://github.com/EightfoldAI/octuple/issues/572)) ([4a5a70f](https://github.com/EightfoldAI/octuple/commits/4a5a70f19713abead765443c7d86f0f5f4c23b3d))

## [2.32.0](https://github.com/EightfoldAI/octuple/compare/v2.31.0...v2.32.0) (2023-03-15)

### Bug Fixes

- adjust navbar colors to match design system ([#561](https://github.com/EightfoldAI/octuple/issues/561)) ([4774be8](https://github.com/EightfoldAI/octuple/commits/4774be8f6e23ee688904736afc99a9d9a3703ef7))
- upload: adds deferred api story and exports type ([#559](https://github.com/EightfoldAI/octuple/issues/559)) ([921bf1c](https://github.com/EightfoldAI/octuple/commits/921bf1c4f1673d1e52fc4f1ab9ebab30918b3a02))

## [2.31.0](https://github.com/EightfoldAI/octuple/compare/v2.29.0...v2.31.0) (2023-03-07)

### Features

- configprovider: update context then add locale story and unit tests ([#555](https://github.com/EightfoldAI/octuple/issues/555)) ([2e42f02](https://github.com/EightfoldAI/octuple/commits/2e42f02666cddbc4db78fab81acf60eda0916e67))
- popup: adds popup component ([#543](https://github.com/EightfoldAI/octuple/issues/543)) ([5912141](https://github.com/EightfoldAI/octuple/commits/5912141e32582cec817837e9b0ff28d8b5dc8b5b))
- Spaced avatar group style ([#550](https://github.com/EightfoldAI/octuple/issues/550)) ([993d98a](https://github.com/EightfoldAI/octuple/commits/993d98a92ffd9a99614722c16efd60dab4959bd0))
- table: show scroller on table rows ([#556](https://github.com/EightfoldAI/octuple/issues/556)) ([e5c685c](https://github.com/EightfoldAI/octuple/commits/e5c685c372e0881fc74825200118e845b62532fa))

### Bug Fixes

- carousel: update wheel handler ([#557](https://github.com/EightfoldAI/octuple/issues/557)) ([f2655aa](https://github.com/EightfoldAI/octuple/commits/f2655aa4cb821d009d1a18fca8d10c6634fc39d8))
- infobar: buttons should have transparent background and inherit color ([#548](https://github.com/EightfoldAI/octuple/issues/548)) ([2e0da40](https://github.com/EightfoldAI/octuple/commits/2e0da401e285af9ff1f9ee0caa08b60628fe1a3d))
- popup: do not toggle when no content or disabled ([#553](https://github.com/EightfoldAI/octuple/issues/553)) ([12a2e88](https://github.com/EightfoldAI/octuple/commits/12a2e88ee68215f396a4418c3673f5a1ea7bb2e0))
- select: improves select by adding props and enabling default value array ([#545](https://github.com/EightfoldAI/octuple/issues/545)) ([1b13981](https://github.com/EightfoldAI/octuple/commits/1b1398132026f03ae9a6f8d838f76c1f2bdcfc2c))
- stepper: Handle decimal scrollLeft value for scroll buttons ([#546](https://github.com/EightfoldAI/octuple/issues/546)) ([49340dd](https://github.com/EightfoldAI/octuple/commits/49340ddaeb8646ae1c011f136dd9dce2e832da25))

## [2.30.0](https://github.com/EightfoldAI/octuple/compare/v2.29.0...v2.30.0) (2023-02-24)

### Features

- popup: adds popup component ([#543](https://github.com/EightfoldAI/octuple/issues/543)) ([5912141](https://github.com/EightfoldAI/octuple/commits/5912141e32582cec817837e9b0ff28d8b5dc8b5b))

### Bug Fixes

- infobar: buttons should have transparent background and inherit color ([#548](https://github.com/EightfoldAI/octuple/issues/548)) ([2e0da40](https://github.com/EightfoldAI/octuple/commits/2e0da401e285af9ff1f9ee0caa08b60628fe1a3d))
- popup: do not toggle when no content or disabled ([#553](https://github.com/EightfoldAI/octuple/issues/553)) ([12a2e88](https://github.com/EightfoldAI/octuple/commits/12a2e88ee68215f396a4418c3673f5a1ea7bb2e0))
- select: improves select by adding props and enabling default value array ([#545](https://github.com/EightfoldAI/octuple/issues/545)) ([1b13981](https://github.com/EightfoldAI/octuple/commits/1b1398132026f03ae9a6f8d838f76c1f2bdcfc2c))
- stepper: Handle decimal scrollLeft value for scroll buttons ([#546](https://github.com/EightfoldAI/octuple/issues/546)) ([49340dd](https://github.com/EightfoldAI/octuple/commits/49340ddaeb8646ae1c011f136dd9dce2e832da25))

## [2.29.0](https://github.com/EightfoldAI/octuple/compare/v2.28.1...v2.29.0) (2023-02-23)

### Features

- Avatar status icons ([#539](https://github.com/EightfoldAI/octuple/issues/539)) ([76304f3](https://github.com/EightfoldAI/octuple/commits/76304f3a36f32d41317db5af00d2add4f0f8dc6d))
- carousel: add single prop and update api to support single item scroll ([#537](https://github.com/EightfoldAI/octuple/issues/537)) ([5ca8835](https://github.com/EightfoldAI/octuple/commits/5ca8835a28c6f18731d3a18b11c0f32d6c7dd47f))

### Bug Fixes

- menulinks: fix font weight ([#551](https://github.com/EightfoldAI/octuple/issues/551)) ([17037dc](https://github.com/EightfoldAI/octuple/commits/17037dc3b90ed289854ced573931f992bfb38b41))
- nudge: removes unnecessary border calculations in css ([#547](https://github.com/EightfoldAI/octuple/issues/547)) ([a0c01c7](https://github.com/EightfoldAI/octuple/commits/a0c01c7bd7a0b9cd187ceee773555603628c2bb4))
- skeleton: ensure wave overflow is hidden in safari browser ([#544](https://github.com/EightfoldAI/octuple/issues/544)) ([25b084e](https://github.com/EightfoldAI/octuple/commits/25b084eb82225f89666346494d2e2ef64890e826))

### [2.28.1](https://github.com/EightfoldAI/octuple/compare/v2.28.0...v2.28.1) (2023-02-14)

### Bug Fixes

- link: isolate css display inline block to variants other than default ([#541](https://github.com/EightfoldAI/octuple/issues/541)) ([0fafb06](https://github.com/EightfoldAI/octuple/commits/0fafb062407c40a5fe419a9b2efdb515a9ed1543))

## [2.28.0](https://github.com/EightfoldAI/octuple/compare/v2.27.0...v2.28.0) (2023-02-14)

### Features

- add secondary button in menu item ([#540](https://github.com/EightfoldAI/octuple/issues/540)) ([e75f047](https://github.com/EightfoldAI/octuple/commits/e75f0476810a6246f302b94396060cc333ab8f58))
- link: adds variants with var theme styles and improves api ([#535](https://github.com/EightfoldAI/octuple/issues/535)) ([9539e78](https://github.com/EightfoldAI/octuple/commits/9539e78d7fd33cd0f24fd82264b26ee5717ccbbc))
- slider: enable basic data comparison slider implementations ([#529](https://github.com/EightfoldAI/octuple/issues/529)) ([7c6bae2](https://github.com/EightfoldAI/octuple/commits/7c6bae277bc7d3e2302122bb4b6c78be218d1dfd))

### Bug Fixes

- do not provide default colors for ConfigProvider ([#538](https://github.com/EightfoldAI/octuple/issues/538)) ([4242cc9](https://github.com/EightfoldAI/octuple/commits/4242cc913ca26d61260e32ceb899c22f1d5885f8))
- input: ensure id passed from props does not append uuid ([#532](https://github.com/EightfoldAI/octuple/issues/532)) ([3921c72](https://github.com/EightfoldAI/octuple/commits/3921c728963c7afa2890588179e86f67f6501358))

## [2.27.0](https://github.com/EightfoldAI/octuple/compare/v2.26.0...v2.27.0) (2023-02-03)

## [2.26.0](https://github.com/EightfoldAI/octuple/compare/v2.25.0...v2.26.0) (2023-02-03)

### Features

- add subtext in link menu item ([#530](https://github.com/EightfoldAI/octuple/issues/530)) ([bc28cdc](https://github.com/EightfoldAI/octuple/commits/bc28cdca59752c062dd8ec29fe5c517c3d51f1ff))
- link: adds variants with var theme styles and improves api ([#531](https://github.com/EightfoldAI/octuple/issues/531)) ([aa22ddb](https://github.com/EightfoldAI/octuple/commits/aa22ddb9cfd53883725695bd19e534dc82d2ff33))
- optionally show empty dropdown ([#517](https://github.com/EightfoldAI/octuple/issues/517)) ([5e121cb](https://github.com/EightfoldAI/octuple/commits/5e121cbd5355597b4d033d0fb5a71028de618b6d))

### Bug Fixes

- preserve case in Select ([#519](https://github.com/EightfoldAI/octuple/issues/519)) ([9427fcd](https://github.com/EightfoldAI/octuple/commits/9427fcda961096c7c78b344cbe653e04d4b6b6d2))

## [2.25.0](https://github.com/EightfoldAI/octuple/compare/v2.24.0...v2.25.0) (2023-02-01)

### Features

- extend css var implementation ([#526](https://github.com/EightfoldAI/octuple/issues/526)) ([b0a3cae](https://github.com/EightfoldAI/octuple/commits/b0a3caeeef4687959650d51f6b75dca5dab8d81a))

### Bug Fixes

- button: update button loader z index to map to updated layout with nudge option ([#525](https://github.com/EightfoldAI/octuple/issues/525)) ([3a29afd](https://github.com/EightfoldAI/octuple/commits/3a29afd50d6d238e9162f682acd8b4f9d8371237))
- css modules: moves keyframes into modules reducing dupes and compiled css size ([#524](https://github.com/EightfoldAI/octuple/issues/524)) ([17b9cee](https://github.com/EightfoldAI/octuple/commits/17b9cee08dbe8a335453d5c184de54c9acf79cfe))
- picker: ensure keyboard navigation selected styles are implemented in year mode ([#523](https://github.com/EightfoldAI/octuple/issues/523)) ([3582bc4](https://github.com/EightfoldAI/octuple/commits/3582bc413c4ade3ffcb10f811df3930f010cd958))

## [2.24.0](https://github.com/EightfoldAI/octuple/compare/v2.23.0...v2.24.0) (2023-01-31)

### Features

- button: adds button nudge animation ([#513](https://github.com/EightfoldAI/octuple/issues/513)) ([69911fd](https://github.com/EightfoldAI/octuple/commits/69911fd382121092c5b88534e5e5be4983093c7d))

### Bug Fixes

- badge: updates color palette to match the latest design and improves accessibililty ([#518](https://github.com/EightfoldAI/octuple/issues/518)) ([9831512](https://github.com/EightfoldAI/octuple/commits/98315124e665481f5b59c7d589b851fce2515824))
- slider: update state when value changes externally ([#520](https://github.com/EightfoldAI/octuple/issues/520)) ([96dd188](https://github.com/EightfoldAI/octuple/commits/96dd188dcc8f10f3c16eda7b4b6b0081e189c17f))

## [2.23.0](https://github.com/EightfoldAI/octuple/compare/v2.22.0...v2.23.0) (2023-01-27)

### Features

- pill text ellipse ([#511](https://github.com/EightfoldAI/octuple/issues/511)) ([0211fc2](https://github.com/EightfoldAI/octuple/commits/0211fc2f818c61fc54e3eb1bce26f3dc465fc5c0))
- pill: enable white theme and custom close icon ([#510](https://github.com/EightfoldAI/octuple/issues/510)) ([f97a7df](https://github.com/EightfoldAI/octuple/commits/f97a7dfe9d490aea9d63a1a60bd3a0b0c1e13ba9))

### Bug Fixes

- dropdown now stays within the viewport ([#512](https://github.com/EightfoldAI/octuple/issues/512)) ([d93f0fd](https://github.com/EightfoldAI/octuple/commits/d93f0fd82ab6f6f33ba62dfa6c5df13d5bad59ab))
- infobar: updates the default role prop value to alert ([#516](https://github.com/EightfoldAI/octuple/issues/516)) ([a8614a6](https://github.com/EightfoldAI/octuple/commits/a8614a63c1f66310dc0553fc88b5a511683d4488))
- pagination: disable next button only when current page is equal to total page count ([#509](https://github.com/EightfoldAI/octuple/issues/509)) ([50588d2](https://github.com/EightfoldAI/octuple/commits/50588d26cc2f8adcae798a7b5dea0b376c5c1127))
- pill: handle jsx when lineclamp is null or zero ([#515](https://github.com/EightfoldAI/octuple/issues/515)) ([7c46458](https://github.com/EightfoldAI/octuple/commits/7c464584ef29c8dc56dfd9ffae7b13a0d15029e1))

## [2.22.0](https://github.com/EightfoldAI/octuple/compare/v2.21.1...v2.22.0) (2023-01-19)

### Features

- scroller for horizontally scrollable table ([#507](https://github.com/EightfoldAI/octuple/issues/507)) ([e96f791](https://github.com/EightfoldAI/octuple/commits/e96f791b0f60ec61be76a2030e1a08a4bfcaf981))
- stepper: adds show active step index prop ([#505](https://github.com/EightfoldAI/octuple/issues/505)) ([6d0176f](https://github.com/EightfoldAI/octuple/commits/6d0176fd633de57d26a674c4cb14e4afa66b3dfc))
- stepper: adds timeline variant ([#504](https://github.com/EightfoldAI/octuple/issues/504)) ([62f433f](https://github.com/EightfoldAI/octuple/commits/62f433f6bef48eb6d489fed413eebdd2c8ea341d))

### [2.21.1](https://github.com/EightfoldAI/octuple/compare/v2.21.0...v2.21.1) (2023-01-11)

### Bug Fixes

- infobar: close icon button should be round ([#500](https://github.com/EightfoldAI/octuple/issues/500)) ([1f7fd60](https://github.com/EightfoldAI/octuple/commits/1f7fd60bf74b37abcafda0bb34b641bc9c657c28))

## [2.21.0](https://github.com/EightfoldAI/octuple/compare/v2.20.9...v2.21.0) (2023-01-11)

### Features

- stepper: adds stepper component ([#471](https://github.com/EightfoldAI/octuple/issues/471)) ([50ddcb3](https://github.com/EightfoldAI/octuple/commits/50ddcb3d7f354dafc4f2f8537057072556929dd4))

### Bug Fixes

- inputs: border color used for inputs is not a11y friendly ([#499](https://github.com/EightfoldAI/octuple/issues/499)) ([cb386bd](https://github.com/EightfoldAI/octuple/commits/cb386bdf6f8a17b14423811204c48386fd04f990))
- selectors: adds null value check to checkbox group onchange ([#497](https://github.com/EightfoldAI/octuple/issues/497)) ([b4a5dc2](https://github.com/EightfoldAI/octuple/commits/b4a5dc2eb864d99f48e1acd6b678343ee763c516))
- table: groups header right border on last element in n+1 rows is 0 when bordered prop is true ([#492](https://github.com/EightfoldAI/octuple/issues/492)) ([96150f8](https://github.com/EightfoldAI/octuple/commits/96150f892d106954266f378c50424c1b31c10aa9))

### [2.20.9](https://github.com/EightfoldAI/octuple/compare/v2.20.8...v2.20.9) (2023-01-09)

### Bug Fixes

- carousel: arrow blinks when its edge meets window edge ([#494](https://github.com/EightfoldAI/octuple/issues/494)) ([4785002](https://github.com/EightfoldAI/octuple/commits/478500296a5a68541ad2ae2dfcd69946a0532666))
- configprovider: export OcThemeNames from a better location, rename to OcThemeName ([#495](https://github.com/EightfoldAI/octuple/issues/495)) ([e85d360](https://github.com/EightfoldAI/octuple/commits/e85d3607fef5dc9f302233d9e528dc5080aa6cf4))
- logical fixes in Pagination component ([#479](https://github.com/EightfoldAI/octuple/issues/479)) ([1be8dcb](https://github.com/EightfoldAI/octuple/commits/1be8dcbeaa3bab6e51d130b62d8690b752d57636))

### [2.20.8](https://github.com/EightfoldAI/octuple/compare/v2.20.7...v2.20.8) (2023-01-04)

### Bug Fixes

- watch extra item width, padding and line to show for useMaxVisibleSections hook ([#491](https://github.com/EightfoldAI/octuple/issues/491)) ([b85260b](https://github.com/EightfoldAI/octuple/commits/b85260bfb092facbcbd818cab97a442f1d2af25e))

### [2.20.7](https://github.com/EightfoldAI/octuple/compare/v2.20.6...v2.20.7) (2023-01-04)

### Bug Fixes

- carousel: limit auto scroll to x axis only ([#490](https://github.com/EightfoldAI/octuple/issues/490)) ([720e4d2](https://github.com/EightfoldAI/octuple/commits/720e4d29f25be15af6d847addccf20c78f70518f))

### [2.20.6](https://github.com/EightfoldAI/octuple/compare/v2.20.5...v2.20.6) (2023-01-04)

### Features

- second icon on button ([#475](https://github.com/EightfoldAI/octuple/issues/475)) ([d06a7aa](https://github.com/EightfoldAI/octuple/commits/d06a7aa9e6a35a0b93ab6f1c0afe605fde1606ca))
- stack: use flex gap instead of margins ([#483](https://github.com/EightfoldAI/octuple/issues/483)) ([476d978](https://github.com/EightfoldAI/octuple/commits/476d978f3c1fb3a334ea9c5d1e01763a18ca974c))
- stat tabs: enable stat themes by validation status ([#486](https://github.com/EightfoldAI/octuple/issues/486)) ([757d5e2](https://github.com/EightfoldAI/octuple/commits/757d5e25a7a1a585720fe827c803ec4a55249542))

### Bug Fixes

- expandable search overlay zindex fix ([#482](https://github.com/EightfoldAI/octuple/issues/482)) ([fd0e29e](https://github.com/EightfoldAI/octuple/commits/fd0e29e77d18e3ace3e2993e48351ea54590bd22))
- label: exposes all tooltip props and fixes hover pixel shift ([#484](https://github.com/EightfoldAI/octuple/issues/484)) ([6945528](https://github.com/EightfoldAI/octuple/commits/6945528acd405831a8752488c90fbaed53df042a))
- pagination: updates border css property to outline, fixing pixel shift regression ([#487](https://github.com/EightfoldAI/octuple/issues/487)) ([8d5f14d](https://github.com/EightfoldAI/octuple/commits/8d5f14dd55cd2c1b4f61f49ef2657903a360235a))
- picker: fixes trigger hide animation curves and updates slide out animations ([#485](https://github.com/EightfoldAI/octuple/issues/485)) ([d635a00](https://github.com/EightfoldAI/octuple/commits/d635a0088d687ab468e361c94205b7d4af6e51c6))
- upload: fixes rendering error caused by hooks in class component uid utility regression ([#488](https://github.com/EightfoldAI/octuple/issues/488)) ([1f0ddfb](https://github.com/EightfoldAI/octuple/commits/1f0ddfb10646c8bbd2ef99174f3ede74832033a2))

### [2.20.5](https://github.com/EightfoldAI/octuple/compare/v2.20.4...v2.20.5) (2023-01-04)

### Features

- second icon on button ([#475](https://github.com/EightfoldAI/octuple/issues/475)) ([d06a7aa](https://github.com/EightfoldAI/octuple/commits/d06a7aa9e6a35a0b93ab6f1c0afe605fde1606ca))
- stack: use flex gap instead of margins ([#483](https://github.com/EightfoldAI/octuple/issues/483)) ([476d978](https://github.com/EightfoldAI/octuple/commits/476d978f3c1fb3a334ea9c5d1e01763a18ca974c))
- stat tabs: enable stat themes by validation status ([#486](https://github.com/EightfoldAI/octuple/issues/486)) ([757d5e2](https://github.com/EightfoldAI/octuple/commits/757d5e25a7a1a585720fe827c803ec4a55249542))

### Bug Fixes

- expandable search overlay zindex fix ([#482](https://github.com/EightfoldAI/octuple/issues/482)) ([fd0e29e](https://github.com/EightfoldAI/octuple/commits/fd0e29e77d18e3ace3e2993e48351ea54590bd22))
- label: exposes all tooltip props and fixes hover pixel shift ([#484](https://github.com/EightfoldAI/octuple/issues/484)) ([6945528](https://github.com/EightfoldAI/octuple/commits/6945528acd405831a8752488c90fbaed53df042a))
- pagination: updates border css property to outline, fixing pixel shift regression ([#487](https://github.com/EightfoldAI/octuple/issues/487)) ([8d5f14d](https://github.com/EightfoldAI/octuple/commits/8d5f14dd55cd2c1b4f61f49ef2657903a360235a))
- picker: fixes trigger hide animation curves and updates slide out animations ([#485](https://github.com/EightfoldAI/octuple/issues/485)) ([d635a00](https://github.com/EightfoldAI/octuple/commits/d635a0088d687ab468e361c94205b7d4af6e51c6))
- upload: fixes rendering error caused by hooks in class component uid utility regression ([#488](https://github.com/EightfoldAI/octuple/issues/488)) ([1f0ddfb](https://github.com/EightfoldAI/octuple/commits/1f0ddfb10646c8bbd2ef99174f3ede74832033a2))

### [2.20.4](https://github.com/EightfoldAI/octuple/compare/v2.20.2...v2.20.4) (2022-12-28)

### Features

- add support for autocomplete attribute to TextInput and SearchBox ([#467](https://github.com/EightfoldAI/octuple/issues/467)) ([298cd97](https://github.com/EightfoldAI/octuple/commits/298cd97fc566ce8d5c6fd9c001c4e81f484b6002))
- extend var theming implementation ([#465](https://github.com/EightfoldAI/octuple/issues/465)) ([fb9954d](https://github.com/EightfoldAI/octuple/commits/fb9954d107db828a2573845cdcb9f086ee365e77))
- make focus highlighting varTheme friendly ([#474](https://github.com/EightfoldAI/octuple/issues/474)) ([b3046fe](https://github.com/EightfoldAI/octuple/commits/b3046fe91a6c6a6073b51d234509d73a6a12e5be))

### Bug Fixes

- added position left on expandable search ([#463](https://github.com/EightfoldAI/octuple/issues/463)) ([ad73e14](https://github.com/EightfoldAI/octuple/commits/ad73e1413bc4ed661045ce0e698cb3a3a33893ad))
- input border color ([#452](https://github.com/EightfoldAI/octuple/issues/452)) ([9e708cb](https://github.com/EightfoldAI/octuple/commits/9e708cb52185fbeb99d3d2bd458d6ee941a7b49b))
- only generate a unique id once ([#472](https://github.com/EightfoldAI/octuple/issues/472)) ([70effc7](https://github.com/EightfoldAI/octuple/commits/70effc7fff448411a501d6fcea12f193f71f533b))
- remove padding from borderless stat-tabs, extend varTheme ([#470](https://github.com/EightfoldAI/octuple/issues/470)) ([c70f2dd](https://github.com/EightfoldAI/octuple/commits/c70f2dd27503c74f00c73f9f3032492da924bb00))
- skeleton: use lighter colors in skeleton ([#478](https://github.com/EightfoldAI/octuple/issues/478)) ([11086bd](https://github.com/EightfoldAI/octuple/commits/11086bd615bef49661857e727eb6449a43f782de))
- switch to two space indent ([#468](https://github.com/EightfoldAI/octuple/issues/468)) ([2b2c571](https://github.com/EightfoldAI/octuple/commits/2b2c5710fe8160604ef78fa3bc1a1f3752e5e255))
- twoStateButton: vertical align counter ([#477](https://github.com/EightfoldAI/octuple/issues/477)) ([03b3c1d](https://github.com/EightfoldAI/octuple/commits/03b3c1d0d3a55ba8241a59e2c23946ac8f4bf7fc))
- update git-blame-ignore-revs to correct commit hash ([#469](https://github.com/EightfoldAI/octuple/issues/469)) ([3554159](https://github.com/EightfoldAI/octuple/commits/355415975812e71f474e464facabf31b51db704a))

### [2.20.3](https://github.com/EightfoldAI/octuple/compare/v2.20.2...v2.20.3) (2022-12-22)

### Features

- add support for autocomplete attribute to TextInput and SearchBox ([#467](https://github.com/EightfoldAI/octuple/issues/467)) ([298cd97](https://github.com/EightfoldAI/octuple/commits/298cd97fc566ce8d5c6fd9c001c4e81f484b6002))
- extend var theming implementation ([#465](https://github.com/EightfoldAI/octuple/issues/465)) ([fb9954d](https://github.com/EightfoldAI/octuple/commits/fb9954d107db828a2573845cdcb9f086ee365e77))
- make focus highlighting varTheme friendly ([#474](https://github.com/EightfoldAI/octuple/issues/474)) ([b3046fe](https://github.com/EightfoldAI/octuple/commits/b3046fe91a6c6a6073b51d234509d73a6a12e5be))

### Bug Fixes

- added position left on expandable search ([#463](https://github.com/EightfoldAI/octuple/issues/463)) ([ad73e14](https://github.com/EightfoldAI/octuple/commits/ad73e1413bc4ed661045ce0e698cb3a3a33893ad))
- input border color ([#452](https://github.com/EightfoldAI/octuple/issues/452)) ([9e708cb](https://github.com/EightfoldAI/octuple/commits/9e708cb52185fbeb99d3d2bd458d6ee941a7b49b))
- only generate a unique id once ([#472](https://github.com/EightfoldAI/octuple/issues/472)) ([70effc7](https://github.com/EightfoldAI/octuple/commits/70effc7fff448411a501d6fcea12f193f71f533b))
- remove padding from borderless stat-tabs, extend varTheme ([#470](https://github.com/EightfoldAI/octuple/issues/470)) ([c70f2dd](https://github.com/EightfoldAI/octuple/commits/c70f2dd27503c74f00c73f9f3032492da924bb00))

### [2.20.2](https://github.com/EightfoldAI/octuple/compare/v2.20.1...v2.20.2) (2022-12-12)

### Bug Fixes

- carousel and tabs: exports carousel slide and tab size ([#460](https://github.com/EightfoldAI/octuple/issues/460)) ([3789543](https://github.com/EightfoldAI/octuple/commits/37895433196e392dffb0b856caac7b92882006b1))

### [2.20.1](https://github.com/EightfoldAI/octuple/compare/v2.20.0...v2.20.1) (2022-12-12)

### Features

- add new material design icons ([#458](https://github.com/EightfoldAI/octuple/issues/458)) ([81c56ea](https://github.com/EightfoldAI/octuple/commits/81c56ead213acb8f34263cb5be86abfe8ca1e4e5))

### Bug Fixes

- export stats tab ([#459](https://github.com/EightfoldAI/octuple/issues/459)) ([6eb35fd](https://github.com/EightfoldAI/octuple/commits/6eb35fd939a7a37758f81a5de59b90d039cfd9cc))

## [2.20.0](https://github.com/EightfoldAI/octuple/compare/v2.19.0...v2.20.0) (2022-12-10)

### Features

- carousel: add carousel component ([#448](https://github.com/EightfoldAI/octuple/issues/448)) ([1ce439f](https://github.com/EightfoldAI/octuple/commits/1ce439f225b0dbd972acd90e74d63025286093ac))
- extend navbar theming ([#456](https://github.com/EightfoldAI/octuple/issues/456)) ([95ac762](https://github.com/EightfoldAI/octuple/commits/95ac762c0848b5245c07ee70549e12ee7e1af013))
- tabs: Add support for large medium and small sizes to pill variant ([#455](https://github.com/EightfoldAI/octuple/issues/455)) ([c2af012](https://github.com/EightfoldAI/octuple/commits/c2af012d873057212b78810f70e7746568868843))
- varTheme based theming ([#446](https://github.com/EightfoldAI/octuple/issues/446)) ([a692b41](https://github.com/EightfoldAI/octuple/commits/a692b41afd7f30a9c7cd24d0e76216badc288731))

### Bug Fixes

- datepicker: refine animations, updates icon buttons to round and fixes today and week styles ([#453](https://github.com/EightfoldAI/octuple/issues/453)) ([49516d3](https://github.com/EightfoldAI/octuple/commits/49516d3302c2cee40beaaf3f7fc8560a7453785b))
- pill: fixes pill button hover and active styles to inherit from pill ([#457](https://github.com/EightfoldAI/octuple/issues/457)) ([ec71c91](https://github.com/EightfoldAI/octuple/commits/ec71c911d33d5e07eb09989dd6c1fac90843b9bb))
- slider: slider track width when isrange and showmarkers false and values intersect ([#449](https://github.com/EightfoldAI/octuple/issues/449)) ([c9ca0b5](https://github.com/EightfoldAI/octuple/commits/c9ca0b539a47e6ff958bf48eac2bb4317705d652))
- table: updates large size insets so they are not the same as medium ([#454](https://github.com/EightfoldAI/octuple/issues/454)) ([b923215](https://github.com/EightfoldAI/octuple/commits/b9232152d2d252d15c63264c9a3575062fafe224))

## [2.19.0](https://github.com/EightfoldAI/octuple/compare/v2.18.2...v2.19.0) (2022-11-24)

### Features

- add menu subtext ([#444](https://github.com/EightfoldAI/octuple/issues/444)) ([341729f](https://github.com/EightfoldAI/octuple/commits/341729fe0d3de306f9df13bbaad6e274a256046a))
- mdi icons ([#445](https://github.com/EightfoldAI/octuple/issues/445)) ([fe05c82](https://github.com/EightfoldAI/octuple/commits/fe05c823bdb743e8a7d1b48f1d0bc51c1dd778c4))
- slider: add custom marker, dots, hide thumb, tooltip, read only support ([#431](https://github.com/EightfoldAI/octuple/issues/431)) ([3719fa5](https://github.com/EightfoldAI/octuple/commits/3719fa5f503f97b33820a9263bf02fe2010b3d6b))
- slider: Add inline extremity label position option ([#432](https://github.com/EightfoldAI/octuple/issues/432)) ([944b2a5](https://github.com/EightfoldAI/octuple/commits/944b2a52d34e0598efc6e9651474eb3f59075c73))
- stat tabs: Add stat tabs component ([#428](https://github.com/EightfoldAI/octuple/issues/428)) ([30de7c1](https://github.com/EightfoldAI/octuple/commits/30de7c168a7e3b2a69eed6d0633c79f8ae4d0b17))
- table: add on row hover event ([#436](https://github.com/EightfoldAI/octuple/issues/436)) ([a80f7c4](https://github.com/EightfoldAI/octuple/commits/a80f7c4e5205b7c86c8278235d80b9a5eb4b383a))
- using React.ReactNode as content type in InfoBar and Snackbar ([#435](https://github.com/EightfoldAI/octuple/issues/435)) ([13dec8e](https://github.com/EightfoldAI/octuple/commits/13dec8ec999407133f29c6e569f2fc936c04092e))

### Bug Fixes

- added row key ([#441](https://github.com/EightfoldAI/octuple/issues/441)) ([07cba48](https://github.com/EightfoldAI/octuple/commits/07cba489d1b2adc319e7654b374993c56dcf68d5))
- changed mouse event on table row hover ([#443](https://github.com/EightfoldAI/octuple/issues/443)) ([b856c89](https://github.com/EightfoldAI/octuple/commits/b856c89679249d1e419259685966b4d5825b1d53))
- pagination: fixes pagination aria attributes ([#433](https://github.com/EightfoldAI/octuple/issues/433)) ([6c39b82](https://github.com/EightfoldAI/octuple/commits/6c39b82177e581397726a953b7adf8a261928346))
- security: dependabot audit deps fixup and upgrade vulnerable packages ([#437](https://github.com/EightfoldAI/octuple/issues/437)) ([4911307](https://github.com/EightfoldAI/octuple/commits/49113076877b13a39e2f1d7e3752ccce53d12fe3))
- security: dependabot audit deps fixup and upgrade vulnerable packages part two ([#440](https://github.com/EightfoldAI/octuple/issues/440)) ([e1af748](https://github.com/EightfoldAI/octuple/commits/e1af748dbe1de218690e994a4666c8f9d56f25cc))
- table: updates use selection hook selectors to have ids by row key ([#439](https://github.com/EightfoldAI/octuple/issues/439)) ([e4b9579](https://github.com/EightfoldAI/octuple/commits/e4b9579833a4f1966bcfa364a6c0e95ec919ae9e))

### [2.18.2](https://github.com/EightfoldAI/octuple/compare/v2.18.1...v2.18.2) (2022-11-03)

### Features

- pagination: add ability to hide last page ([#430](https://github.com/EightfoldAI/octuple/issues/430)) ([2a61a0c](https://github.com/EightfoldAI/octuple/commits/2a61a0c72f150111577cfbedd8d865e4067bb775))

### [2.18.1](https://github.com/EightfoldAI/octuple/compare/v2.18.0...v2.18.1) (2022-11-01)

### Bug Fixes

- slider: fixes collision detection in grid layouts ([#429](https://github.com/EightfoldAI/octuple/issues/429)) ([5981e55](https://github.com/EightfoldAI/octuple/commits/5981e55d10438a4edad619816fe38eca18f74e5a))

## [2.18.0](https://github.com/EightfoldAI/octuple/compare/v2.17.1...v2.18.0) (2022-10-27)

### Features

- avatar group: add the avatar group component ([#422](https://github.com/EightfoldAI/octuple/issues/422)) ([535cfe6](https://github.com/EightfoldAI/octuple/commits/535cfe61101c5716660ea905c4a016bafd7198e1))
- upload: add upload component ([#426](https://github.com/EightfoldAI/octuple/issues/426)) ([2fa465e](https://github.com/EightfoldAI/octuple/commits/2fa465e876b3abd742f2b80e26c0d6885c05246c))

### Bug Fixes

- exports: adds progress size and avatar group to exports ([#425](https://github.com/EightfoldAI/octuple/issues/425)) ([5028ace](https://github.com/EightfoldAI/octuple/commits/5028ace9f0de8f0da8ef492a22fd2c47cd76317b))
- form: add portal prop to tooltip to fix tooltip in modal ([#424](https://github.com/EightfoldAI/octuple/issues/424)) ([5c6beed](https://github.com/EightfoldAI/octuple/commits/5c6beedfe77a9c5d27f31b696cbaa6b4fa573f67))
- search box: pressing enter key clears text when clearable is true ([#427](https://github.com/EightfoldAI/octuple/issues/427)) ([498947c](https://github.com/EightfoldAI/octuple/commits/498947c216bab9777957623bf58bb39a7b37d70a))

### [2.17.1](https://github.com/EightfoldAI/octuple/compare/v2.17.0...v2.17.1) (2022-10-19)

### Bug Fixes

- dropdown: remove force focus on portaled dropdown ([#423](https://github.com/EightfoldAI/octuple/issues/423)) ([a7e894a](https://github.com/EightfoldAI/octuple/commits/a7e894aaf3af85e65624fd3ce875aa17d9e684c9))

## [2.17.0](https://github.com/EightfoldAI/octuple/compare/v2.16.1...v2.17.0) (2022-10-19)

### Features

- adding rtl addon ([#418](https://github.com/EightfoldAI/octuple/issues/418)) ([b65ef2c](https://github.com/EightfoldAI/octuple/commits/b65ef2c962a6dac05c7b184b9625901f730fd1ac))
- implementation of search box expandable ([#408](https://github.com/EightfoldAI/octuple/issues/408)) ([aba0df7](https://github.com/EightfoldAI/octuple/commits/aba0df7586de3932e4ea69a650436a02fa9b2146))
- progress: add progress component to octuple ([#420](https://github.com/EightfoldAI/octuple/issues/420)) ([aa1ad1d](https://github.com/EightfoldAI/octuple/commits/aa1ad1d07572453d2eb1c2f90859ba081bb7cf4c))

### Bug Fixes

- dropdown: remove inputRef from dropdown and use update method to fix position ([#421](https://github.com/EightfoldAI/octuple/issues/421)) ([da8c7e7](https://github.com/EightfoldAI/octuple/commits/da8c7e79995f58c3fc23f4d2a5d94f517076c8f5))

### [2.16.1](https://github.com/EightfoldAI/octuple/compare/v2.16.0...v2.16.1) (2022-10-12)

### Bug Fixes

- a11y fixes in cases of portal dropdown ([#405](https://github.com/EightfoldAI/octuple/issues/405)) ([2ab62d0](https://github.com/EightfoldAI/octuple/commits/2ab62d0a70065d4c6fae6f05cb39332a76243bb6))
- accordion: remove body top border on borderd false ([#416](https://github.com/EightfoldAI/octuple/issues/416)) ([95870ed](https://github.com/EightfoldAI/octuple/commits/95870eda3e03f29c030de06cd62dd53c8f7cdf00))
- dialog focus trap and restore ([#412](https://github.com/EightfoldAI/octuple/issues/412)) ([651d4fd](https://github.com/EightfoldAI/octuple/commits/651d4fd014cf8c82e384226f14e616ba9e6ef2bd))
- **dropdown:** modify flip behavior for filterable Select ([#417](https://github.com/EightfoldAI/octuple/issues/417)) ([25b6144](https://github.com/EightfoldAI/octuple/commits/25b6144d1725ce7c38107783a416814a23e56ed9))
- overflow fix in the panel ([#415](https://github.com/EightfoldAI/octuple/issues/415)) ([844be5e](https://github.com/EightfoldAI/octuple/commits/844be5eae68cb7f979c9759f974ea6205a5b5d52))
- panel: fix panel animation while closing ([#414](https://github.com/EightfoldAI/octuple/issues/414)) ([7e12a20](https://github.com/EightfoldAI/octuple/commits/7e12a2003fcefea5f46c3cd2aa185a3244876f7e))
- select: adds html type to chevron button ([#419](https://github.com/EightfoldAI/octuple/issues/419)) ([532c091](https://github.com/EightfoldAI/octuple/commits/532c0910c5902a5912091c2dfe00cb89a72bbeeb))

## [2.16.0](https://github.com/EightfoldAI/octuple/compare/v2.14.0...v2.16.0) (2022-10-06)

### Features

- panel: add localization support to panel ([#407](https://github.com/EightfoldAI/octuple/issues/407)) ([8413a18](https://github.com/EightfoldAI/octuple/commits/8413a1823b9a2501840c3b25743fea660aae3161))

### Bug Fixes

- card: custom card story ui polish ([#411](https://github.com/EightfoldAI/octuple/issues/411)) ([ad6bb46](https://github.com/EightfoldAI/octuple/commits/ad6bb465f63b69be9eb5c661736d1de0c19511f0))
- picker: fix flicker on resize, update buttons, and font weight to match latest design ([#410](https://github.com/EightfoldAI/octuple/issues/410)) ([1fe6e52](https://github.com/EightfoldAI/octuple/commits/1fe6e52cec371973cf22cbaeb5828598ac7494a7))

## [2.15.0](https://github.com/EightfoldAI/octuple/compare/v2.14.0...v2.15.0) (2022-10-06)

### Features

- panel: add localization support to panel ([#407](https://github.com/EightfoldAI/octuple/issues/407)) ([8413a18](https://github.com/EightfoldAI/octuple/commits/8413a1823b9a2501840c3b25743fea660aae3161))

### Bug Fixes

- card: custom card story ui polish ([#411](https://github.com/EightfoldAI/octuple/issues/411)) ([ad6bb46](https://github.com/EightfoldAI/octuple/commits/ad6bb465f63b69be9eb5c661736d1de0c19511f0))
- picker: fix flicker on resize, update buttons, and font weight to match latest design ([#410](https://github.com/EightfoldAI/octuple/issues/410)) ([1fe6e52](https://github.com/EightfoldAI/octuple/commits/1fe6e52cec371973cf22cbaeb5828598ac7494a7))

## [2.14.0](https://github.com/EightfoldAI/octuple/compare/v2.13.2...v2.14.0) (2022-10-03)

### Features

- add shape and size prop for accordion ([#397](https://github.com/EightfoldAI/octuple/issues/397)) ([8b006cd](https://github.com/EightfoldAI/octuple/commits/8b006cd672f8c291e9984d0f32f1fd2b82f2439a))
- dialog: add localization support to dialog ([#402](https://github.com/EightfoldAI/octuple/issues/402)) ([25366c9](https://github.com/EightfoldAI/octuple/commits/25366c989220432d2ea1b973631b7818732c370c))
- Enable readOnly for pills without buttons ([#396](https://github.com/EightfoldAI/octuple/issues/396)) ([66954ef](https://github.com/EightfoldAI/octuple/commits/66954efd8a7dc8a0ddad162711332a396adc3933))
- pagination: add localization support to pagination ([#399](https://github.com/EightfoldAI/octuple/issues/399)) ([e723bfc](https://github.com/EightfoldAI/octuple/commits/e723bfca9ce19dacb8ffb1738c0b27372facf210))
- picker: add localization support to date and time pickers ([#400](https://github.com/EightfoldAI/octuple/issues/400)) ([e1a3e24](https://github.com/EightfoldAI/octuple/commits/e1a3e244e3833fe3f73270e068bf228a9fa3a36d))
- table: Add loc support and column, cell css vertical alignment prop ([#394](https://github.com/EightfoldAI/octuple/issues/394)) ([e0045e3](https://github.com/EightfoldAI/octuple/commits/e0045e36631010e4c7d2b7216368adee669a2747))
- **tabs:** add underlined option to tabs ([#401](https://github.com/EightfoldAI/octuple/issues/401)) ([8f15496](https://github.com/EightfoldAI/octuple/commits/8f154962850f1c3f5cd5c4e1d272159b45ef983d))

### Bug Fixes

- select: update when options change ([#403](https://github.com/EightfoldAI/octuple/issues/403)) ([7cac956](https://github.com/EightfoldAI/octuple/commits/7cac956aa59b615592d7bbf3af817632f4d2978c))
- table: add page sizes prop to table pagination ([#393](https://github.com/EightfoldAI/octuple/issues/393)) ([5f45f94](https://github.com/EightfoldAI/octuple/commits/5f45f94b95babe252c8464d8ffb12394c7f582d4))
- table: revert overflow css and update esmx strings ([#398](https://github.com/EightfoldAI/octuple/issues/398)) ([d363abb](https://github.com/EightfoldAI/octuple/commits/d363abb2603609761ce3e9bdd7f35d37d2c26f67))
- type annotation cleanup ([#372](https://github.com/EightfoldAI/octuple/issues/372)) ([c3c5f32](https://github.com/EightfoldAI/octuple/commits/c3c5f320be13076d2777b773bc1bd0d7087f79db))

### [2.13.2](https://github.com/EightfoldAI/octuple/compare/v2.13.1...v2.13.2) (2022-09-27)

### Bug Fixes

- update snaps to fix broken build ([#392](https://github.com/EightfoldAI/octuple/issues/392)) ([e3c1429](https://github.com/EightfoldAI/octuple/commits/e3c14292f34f3de0bed0201bcd3e2b71e53ff07c))

### [2.13.1](https://github.com/EightfoldAI/octuple/compare/v2.13.0...v2.13.1) (2022-09-27)

### Features

- match score: add support for custom label ([#367](https://github.com/EightfoldAI/octuple/issues/367)) ([6e0cd0f](https://github.com/EightfoldAI/octuple/commits/6e0cd0fb491976ef12f8e34306f66206ec6fcc82))

### Bug Fixes

- panel add scrollLock prop and select handle 0 value ([#390](https://github.com/EightfoldAI/octuple/issues/390)) ([2538b7e](https://github.com/EightfoldAI/octuple/commits/2538b7eb2d2d108dfaad7ee4c36afa35effa22b5))
- rtl: rtl ui polish ([#387](https://github.com/EightfoldAI/octuple/issues/387)) ([5eb44e9](https://github.com/EightfoldAI/octuple/commits/5eb44e94756811a54efe862f579a0b6118097b0b))
- theme: fixes navbar and tabs configprovider theme ([#389](https://github.com/EightfoldAI/octuple/issues/389)) ([d72ad05](https://github.com/EightfoldAI/octuple/commits/d72ad0538d865f7dbdd5cd315cb89d40028d2a3f))

## [2.13.0](https://github.com/EightfoldAI/octuple/compare/v2.12.1...v2.13.0) (2022-09-21)

### Features

- slider: update to theme two, adds custom labels, and update value on click ([#383](https://github.com/EightfoldAI/octuple/issues/383)) ([f42be3f](https://github.com/EightfoldAI/octuple/commits/f42be3f2049fce75d89b6522e4eecc006adea9b3))

### Bug Fixes

- link: updates link story layout to account for link style flex removal ([#385](https://github.com/EightfoldAI/octuple/issues/385)) ([14b1e9d](https://github.com/EightfoldAI/octuple/commits/14b1e9dcd414a4f1f065863d50ebba83d7c645cd))
- tooltip: adds two props to improve configuration of portal mode ([#382](https://github.com/EightfoldAI/octuple/issues/382)) ([3982c91](https://github.com/EightfoldAI/octuple/commits/3982c912a274332e980a6985749ef2107a4f083e))

### [2.12.1](https://github.com/EightfoldAI/octuple/compare/v2.12.0...v2.12.1) (2022-09-16)

### Features

- picker: add time picker story and loc string support to pickers ([#378](https://github.com/EightfoldAI/octuple/issues/378)) ([33e516c](https://github.com/EightfoldAI/octuple/commits/33e516c9d80bd0886f25f94b42673f7095dc51a6))

### Bug Fixes

- button: fixes floating icon button distortion in some versions of safari ([#377](https://github.com/EightfoldAI/octuple/issues/377)) ([0fce942](https://github.com/EightfoldAI/octuple/commits/0fce94255ff03a5fc0f2f29bc8a4f1b5580e3d2a))
- panel: update the default shape of the header buttons to be round ([#371](https://github.com/EightfoldAI/octuple/issues/371)) ([c29b359](https://github.com/EightfoldAI/octuple/commits/c29b359599b8ad8e379fca62cdb1ad9fff2fdfef))
- persistent bar: export buttontype and type cleanup ([#373](https://github.com/EightfoldAI/octuple/issues/373)) ([dd77e4b](https://github.com/EightfoldAI/octuple/commits/dd77e4b539d0a436ce4bc3bc480f9b8d403eafba))
- remove flex style from link ([#380](https://github.com/EightfoldAI/octuple/issues/380)) ([0a47459](https://github.com/EightfoldAI/octuple/commits/0a47459fe6e7f499c621eba0c525b75d3d2f92da))

## [2.12.0](https://github.com/EightfoldAI/octuple/compare/v2.11.1...v2.12.0) (2022-09-12)

### Features

- dialog: add dialog helper method to render dialogs with ease ([#365](https://github.com/EightfoldAI/octuple/issues/365)) ([7a6f1e8](https://github.com/EightfoldAI/octuple/commits/7a6f1e8e31427436fb9ca7d53119d02de56910c6))
- label: add support for custom buttons and type clean up ([#366](https://github.com/EightfoldAI/octuple/issues/366)) ([4e9f352](https://github.com/EightfoldAI/octuple/commits/4e9f352e1bb46fab77c39045b23a21f312aeff8a))

### Bug Fixes

- config provider: export children prop type ([#369](https://github.com/EightfoldAI/octuple/issues/369)) ([2625c20](https://github.com/EightfoldAI/octuple/commits/2625c209f827cc7dde801f62e58ce7f363164ab6))

### [2.11.1](https://github.com/EightfoldAI/octuple/compare/v2.11.0...v2.11.1) (2022-09-12)

### Bug Fixes

- selectors: add minor paddding in start align ([#364](https://github.com/EightfoldAI/octuple/issues/364)) ([039779d](https://github.com/EightfoldAI/octuple/commits/039779db670b3c292203f0213257c9c9cca63509))

## [2.11.0](https://github.com/EightfoldAI/octuple/compare/v2.10.2...v2.11.0) (2022-09-12)

### Features

- add skeleton component ([#357](https://github.com/EightfoldAI/octuple/issues/357)) ([e84a4eb](https://github.com/EightfoldAI/octuple/commits/e84a4ebf48904529b7135c3725d9d4fde5f88118))
- dialog: add box shadows on scrollable content for modals, dialogs ([#339](https://github.com/EightfoldAI/octuple/issues/339)) ([4f1d5bf](https://github.com/EightfoldAI/octuple/commits/4f1d5bfe8cdb18d22ff40ec0039f5737eae27a4f))

### Bug Fixes

- search box: icon button default htmltype should be button path should have a default ([#356](https://github.com/EightfoldAI/octuple/issues/356)) ([0bb0072](https://github.com/EightfoldAI/octuple/commits/0bb00725aeaeac9770aad3535e6959eee1ab8624))
- table: adds type annotations and omits private transformColumns property ([#363](https://github.com/EightfoldAI/octuple/issues/363)) ([991de21](https://github.com/EightfoldAI/octuple/commits/991de21f17f367d30edf6c3a7efaeb35782c02a5))
- text input: removes unused interface omits a prop from text area and alphabetizes types ([#362](https://github.com/EightfoldAI/octuple/issues/362)) ([35cf3c5](https://github.com/EightfoldAI/octuple/commits/35cf3c5673aa4997231d02307e7dadd4dfb808dd))

### [2.10.2](https://github.com/EightfoldAI/octuple/compare/v2.10.1...v2.10.2) (2022-09-09)

### Bug Fixes

- remove table data text overflow ([#361](https://github.com/EightfoldAI/octuple/issues/361)) ([6042167](https://github.com/EightfoldAI/octuple/commits/604216716c98ccaa93e2a9571ab1eabda9808e30))

### [2.10.1](https://github.com/EightfoldAI/octuple/compare/v2.10.0...v2.10.1) (2022-09-09)

### Features

- adding support for 3 more icons ([#360](https://github.com/EightfoldAI/octuple/issues/360)) ([26569b5](https://github.com/EightfoldAI/octuple/commits/26569b56a707e4774a027b61d2b70642b39faf12))
- selectors: add ability to vertically align label ([#353](https://github.com/EightfoldAI/octuple/issues/353)) ([457b984](https://github.com/EightfoldAI/octuple/commits/457b9849f39c49acd9ab60aa644204dff1cf9fdc))

### Bug Fixes

- check box sizes ([#347](https://github.com/EightfoldAI/octuple/issues/347)) ([b7eee38](https://github.com/EightfoldAI/octuple/commits/b7eee38a53cfd637d1a507a12f13f6dd1a7c5cf8))
- date picker: adds type annotations and alphabetizes types ([#348](https://github.com/EightfoldAI/octuple/issues/348)) ([3859587](https://github.com/EightfoldAI/octuple/commits/38595878b0da95ed289e8c69e7cee41c09ab44a8))
- form: adds type annotations and sorts them renames one internal type ([#355](https://github.com/EightfoldAI/octuple/issues/355)) ([38b7c0a](https://github.com/EightfoldAI/octuple/commits/38b7c0acca0b0e7432198a77101a46d5fb8c32a8))
- radio button size ([#346](https://github.com/EightfoldAI/octuple/issues/346)) ([cab5d09](https://github.com/EightfoldAI/octuple/commits/cab5d092aeacdcff169d057394ab911e1a064f94))
- table: clip long table header text ([#354](https://github.com/EightfoldAI/octuple/issues/354)) ([31d534c](https://github.com/EightfoldAI/octuple/commits/31d534c83f0f67d57e97ed38534e2416a9c37dce))
- update styles for table header and empty component ([#345](https://github.com/EightfoldAI/octuple/issues/345)) ([da6353e](https://github.com/EightfoldAI/octuple/commits/da6353eb18e004de7eea80bdff3a967bee77833b))

## [2.10.0](https://github.com/EightfoldAI/octuple/compare/v2.9.1...v2.10.0) (2022-09-05)

### Features

- Add Loc support and Form component ([#332](https://github.com/EightfoldAI/octuple/issues/332)) ([af2882f](https://github.com/EightfoldAI/octuple/commits/af2882f689eab4a17ec6eefc8fe9af6c69e202ae))

### Bug Fixes

- dropdown: fix on click outside getting triggered on portaled dropdowns ([#343](https://github.com/EightfoldAI/octuple/issues/343)) ([f400b41](https://github.com/EightfoldAI/octuple/commits/f400b410b36ef85d9e4b4547d52cd32747b8d0ca))
- searchbox: set default shape to pill ([#344](https://github.com/EightfoldAI/octuple/issues/344)) ([6a1b136](https://github.com/EightfoldAI/octuple/commits/6a1b136002264d32ced750ebac899780845c92e3))
- table: remove box shadow from bordered table ([#341](https://github.com/EightfoldAI/octuple/issues/341)) ([931b2a8](https://github.com/EightfoldAI/octuple/commits/931b2a85509d59626995115e42355c54ff278c05))

### [2.9.1](https://github.com/EightfoldAI/octuple/compare/v2.9.0...v2.9.1) (2022-09-02)

### Bug Fixes

- dialog: update padding according to design guidelines ([#337](https://github.com/EightfoldAI/octuple/issues/337)) ([7a93319](https://github.com/EightfoldAI/octuple/commits/7a93319cab1067c8f7d435791f6124ab6b9057ac))
- pills: fix allignment of text ([#336](https://github.com/EightfoldAI/octuple/issues/336)) ([e022633](https://github.com/EightfoldAI/octuple/commits/e0226330b634986f66257ca23cc8107ce507972f))
- select: removes portal property from tooltip and replace with position ([#335](https://github.com/EightfoldAI/octuple/issues/335)) ([07cd4e4](https://github.com/EightfoldAI/octuple/commits/07cd4e477eadb5694d5d757a334c179ccf6b5b6a))
- stack: add ml size ([#338](https://github.com/EightfoldAI/octuple/issues/338)) ([b7fca4f](https://github.com/EightfoldAI/octuple/commits/b7fca4f0a605f292bea4dab368da72ac37d6a04c))

## [2.9.0](https://github.com/EightfoldAI/octuple/compare/v2.8.1...v2.9.0) (2022-08-31)

### Features

- select: add resizeobserver usemaxvisiblesections hook and dynamic pills ([#334](https://github.com/EightfoldAI/octuple/issues/334)) ([d9c21e0](https://github.com/EightfoldAI/octuple/commits/d9c21e0ff134e3055b1192cf2932f4f34b87fc05))

### Bug Fixes

- modal: fix modal header to correct font size and weight, update icons to round ([#333](https://github.com/EightfoldAI/octuple/issues/333)) ([24ab749](https://github.com/EightfoldAI/octuple/commits/24ab749d44813dbcaf0bbf38b7baa7b2a4267c24))

### [2.8.1](https://github.com/EightfoldAI/octuple/compare/v2.7.1...v2.8.1) (2022-08-26)

### Features

- add selfControlled prop to Pagination for indication of outside page control ([#330](https://github.com/EightfoldAI/octuple/issues/330)) ([4ef4aec](https://github.com/EightfoldAI/octuple/commits/4ef4aece5cc14f2cce1fb38926bd206bd7025756))

### Bug Fixes

- menuitem: add no wrap do long text doesnt wrap to next line ([#331](https://github.com/EightfoldAI/octuple/issues/331)) ([1df907c](https://github.com/EightfoldAI/octuple/commits/1df907c44fb66374fd5b8b48d873bc715a67a159))

## [2.8.0](https://github.com/EightfoldAI/octuple/compare/v2.7.1...v2.8.0) (2022-08-25)

### Features

- add selfControlled prop to Pagination for indication of outside page control ([#330](https://github.com/EightfoldAI/octuple/issues/330)) ([4ef4aec](https://github.com/EightfoldAI/octuple/commits/4ef4aece5cc14f2cce1fb38926bd206bd7025756))

### [2.7.1](https://github.com/EightfoldAI/octuple/compare/v2.7.0...v2.7.1) (2022-08-25)

### Bug Fixes

- inputs: text input color ([#328](https://github.com/EightfoldAI/octuple/issues/328)) ([263fb73](https://github.com/EightfoldAI/octuple/commits/263fb73fcd7e257c0da183c66ba94f84f5e44a49))
- menu: update menu min width and reduce font weight of menu item ([#327](https://github.com/EightfoldAI/octuple/issues/327)) ([565ac23](https://github.com/EightfoldAI/octuple/commits/565ac2341477736c48468377ac9677aec1ed9fb1))
- table: increase border radius ([#329](https://github.com/EightfoldAI/octuple/issues/329)) ([93a2ea1](https://github.com/EightfoldAI/octuple/commits/93a2ea104b7ac28e9c0b1b0af8977327034f6840))

## [2.7.0](https://github.com/EightfoldAI/octuple/compare/v2.6.2...v2.7.0) (2022-08-25)

### Features

- add loading state in button and tabs ([#326](https://github.com/EightfoldAI/octuple/issues/326)) ([954e6f6](https://github.com/EightfoldAI/octuple/commits/954e6f61e42a6838d4218907d95ebead419b16af))

### [2.6.2](https://github.com/EightfoldAI/octuple/compare/v2.6.1...v2.6.2) (2022-08-24)

### Bug Fixes

- system ui button transparency fix ([#325](https://github.com/EightfoldAI/octuple/issues/325)) ([232665d](https://github.com/EightfoldAI/octuple/commits/232665d60604d73fe5fd3688a42f706ecbf6efae))

### [2.6.1](https://github.com/EightfoldAI/octuple/compare/v2.6.0...v2.6.1) (2022-08-24)

### Bug Fixes

- exporting header ([#324](https://github.com/EightfoldAI/octuple/issues/324)) ([c166a71](https://github.com/EightfoldAI/octuple/commits/c166a71fba677ae4cc8868f272b46ce487670d88))

## [2.6.0](https://github.com/EightfoldAI/octuple/compare/v2.5.2...v2.6.0) (2022-08-24)

### Features

- panel custom header ([#318](https://github.com/EightfoldAI/octuple/issues/318)) ([6e80dad](https://github.com/EightfoldAI/octuple/commits/6e80dade501df9a48178551e618e7050b6f35827))

### Bug Fixes

- select: fixes pills layout and removes redundant options change ([#323](https://github.com/EightfoldAI/octuple/issues/323)) ([503f0d8](https://github.com/EightfoldAI/octuple/commits/503f0d8d68f8c9429210930d1f027b4850aa3b4f))
- update page as currentPage prop value updates ([#322](https://github.com/EightfoldAI/octuple/issues/322)) ([b5c6b8e](https://github.com/EightfoldAI/octuple/commits/b5c6b8e3e6c257f6cb1c917b35ad133f3da2c095))

### [2.5.3](https://github.com/EightfoldAI/octuple/compare/v2.5.2...v2.5.3) (2022-08-23)

### Bug Fixes

- select: fixes pills layout and removes redundant options change ([#323](https://github.com/EightfoldAI/octuple/issues/323)) ([503f0d8](https://github.com/EightfoldAI/octuple/commits/503f0d8d68f8c9429210930d1f027b4850aa3b4f))

### [2.5.2](https://github.com/EightfoldAI/octuple/compare/v2.5.1...v2.5.2) (2022-08-22)

### Features

- dropdown: add prop to disable closing on clicking outside ([#320](https://github.com/EightfoldAI/octuple/issues/320)) ([b329442](https://github.com/EightfoldAI/octuple/commits/b329442ce875fa9ca342e2cb5094803883d42a6a))

### Bug Fixes

- badge: fix font size ([#321](https://github.com/EightfoldAI/octuple/issues/321)) ([bf44706](https://github.com/EightfoldAI/octuple/commits/bf4470620fb8c8270935a018d427b25010c3fac2))

### [2.5.1](https://github.com/EightfoldAI/octuple/compare/v2.5.0...v2.5.1) (2022-08-19)

### Bug Fixes

- added fix for split btn icon ([#314](https://github.com/EightfoldAI/octuple/issues/314)) ([a1c0651](https://github.com/EightfoldAI/octuple/commits/a1c06513f0c8dd7c08aec5baef929c1f0c014ccd))
- added transparency prop to system ui button ([#313](https://github.com/EightfoldAI/octuple/issues/313)) ([8856895](https://github.com/EightfoldAI/octuple/commits/885689509f049fe22e3626c7275361ac4ca8141c))
- menu: remove octuple chrome from menu and menu item ([#315](https://github.com/EightfoldAI/octuple/issues/315)) ([119d0e6](https://github.com/EightfoldAI/octuple/commits/119d0e640cc6ad1c8ada1e5a0fa849cc346a008c))
- selectors: increase radio and checkbox paddings ([#317](https://github.com/EightfoldAI/octuple/issues/317)) ([442baf3](https://github.com/EightfoldAI/octuple/commits/442baf3fd71c6e15907935e7983428e1d340cd8c))
- table: remove background from a sorted row ([#311](https://github.com/EightfoldAI/octuple/issues/311)) ([98f1f70](https://github.com/EightfoldAI/octuple/commits/98f1f700d39da147cc8df79b36d5b7536b8df094))
- table: remove left border from last fixed cell ([#316](https://github.com/EightfoldAI/octuple/issues/316)) ([2268579](https://github.com/EightfoldAI/octuple/commits/226857990ae73733841935d9671fb5170419e2a7))

## [2.5.0](https://github.com/EightfoldAI/octuple/compare/v2.4.1...v2.5.0) (2022-08-18)

### Features

- theme 2 menu with headers, subheaders, footers and links ([#266](https://github.com/EightfoldAI/octuple/issues/266)) ([ac0d878](https://github.com/EightfoldAI/octuple/commits/ac0d8785ec18b035bd3379665d8c6fd181bb4a6e))

### [2.4.1](https://github.com/EightfoldAI/octuple/compare/v2.4.0...v2.4.1) (2022-08-17)

### Bug Fixes

- change default input and textarea shape to rectangle ([#305](https://github.com/EightfoldAI/octuple/issues/305)) ([93460a2](https://github.com/EightfoldAI/octuple/commits/93460a238e09779054869d2a0466a691f3c887f2))
- tooltips in safari for disabled element ([#309](https://github.com/EightfoldAI/octuple/issues/309)) ([26f76c0](https://github.com/EightfoldAI/octuple/commits/26f76c05cf8dda52f1573d9a33dc1ee1116f475a))

## [2.4.0](https://github.com/EightfoldAI/octuple/compare/v2.3.0...v2.4.0) (2022-08-12)

### Features

- tooltip: add sizes to tooltip ([#306](https://github.com/EightfoldAI/octuple/issues/306)) ([0f17fac](https://github.com/EightfoldAI/octuple/commits/0f17fac6238ec6161202b81e94176ffb5913f632))

### Bug Fixes

- select: export SelectShape and SelectSize ([#304](https://github.com/EightfoldAI/octuple/issues/304)) ([c62a081](https://github.com/EightfoldAI/octuple/commits/c62a081b8b54d114bca20dae142915e447fb710b))
- selectors: fix selectors getting squished in certain scenarios ([#303](https://github.com/EightfoldAI/octuple/issues/303)) ([053bd5b](https://github.com/EightfoldAI/octuple/commits/053bd5b94c3740af6ad4b875dd1d95fc67e3e497))
- selectors: fix selectors getting squished in certain scenarios part two ([#308](https://github.com/EightfoldAI/octuple/issues/308)) ([2d135a0](https://github.com/EightfoldAI/octuple/commits/2d135a0b33152a7ce2f494d2373cd5008a32be0d))
- toggle: fix toggles getting squished in certain scenarios ([#307](https://github.com/EightfoldAI/octuple/issues/307)) ([23ee9dd](https://github.com/EightfoldAI/octuple/commits/23ee9dda3b7adeeba39e77c424a0eccd3607fefd))

## [2.3.0](https://github.com/EightfoldAI/octuple/compare/v2.2.5...v2.3.0) (2022-08-11)

### Features

- add 12 column grid and layout components ([#291](https://github.com/EightfoldAI/octuple/issues/291)) ([c21df64](https://github.com/EightfoldAI/octuple/commits/c21df64cdfbd5f5940ad164647a15b8d5059bbdd))
- adds headerbuttonprops, headericon, bodypadding, and overlay props to surface ui ([#290](https://github.com/EightfoldAI/octuple/issues/290)) ([cbe4b87](https://github.com/EightfoldAI/octuple/commits/cbe4b87de7bfd75bd6a91080b903b3836a459da3))

### Bug Fixes

- button: use configprovider focus visible styles ([#301](https://github.com/EightfoldAI/octuple/issues/301)) ([6102bc6](https://github.com/EightfoldAI/octuple/commits/6102bc65b833e1c82f30d94b599c38165a39b441))
- input: fixes rectangle shape for theme 2 input and textarea ([#295](https://github.com/EightfoldAI/octuple/issues/295)) ([658d009](https://github.com/EightfoldAI/octuple/commits/658d009fe9a55caafc721a2ed18a6f74f39c64a9))
- searchbox: add form onSubmit prop ([#296](https://github.com/EightfoldAI/octuple/issues/296)) ([b13ce34](https://github.com/EightfoldAI/octuple/commits/b13ce34d66e1f99fafdffe47748dbbcd7f258869))
- select: fixes select clear when items are toggled ([#300](https://github.com/EightfoldAI/octuple/issues/300)) ([72ba459](https://github.com/EightfoldAI/octuple/commits/72ba459c59881d8aa3edce0e89294878accca3d0))

### [2.2.5](https://github.com/EightfoldAI/octuple/compare/v2.2.4...v2.2.5) (2022-08-07)

### Bug Fixes

- navbar: revert scoped css resets to navbar component ([#292](https://github.com/EightfoldAI/octuple/issues/292)) ([b3f03e0](https://github.com/EightfoldAI/octuple/commits/b3f03e02453de644a3e68e83175c0647b6d82389))

### [2.2.4](https://github.com/EightfoldAI/octuple/compare/v2.2.3...v2.2.4) (2022-08-04)

### Bug Fixes

- navbar: apply scoped css resets to navbar component ([#288](https://github.com/EightfoldAI/octuple/issues/288)) ([4a4e60c](https://github.com/EightfoldAI/octuple/commits/4a4e60cd2804dfef7967c48f38f7ef937ef831eb))

### [2.2.3](https://github.com/EightfoldAI/octuple/compare/v2.2.2...v2.2.3) (2022-08-03)

### Bug Fixes

- pagination: fix onCurrentChange event getting fired on change of total ([#285](https://github.com/EightfoldAI/octuple/issues/285)) ([74456a2](https://github.com/EightfoldAI/octuple/commits/74456a242eb227972ff5491d4c7390f8ec0abc5d))

### [2.2.2](https://github.com/EightfoldAI/octuple/compare/v2.2.1...v2.2.2) (2022-08-03)

### Bug Fixes

- css: scope normalize css reset to octuple components ([#283](https://github.com/EightfoldAI/octuple/issues/283)) ([1eeb0cd](https://github.com/EightfoldAI/octuple/commits/1eeb0cd3673fd03d599dc3aa84c5583fddaa26b2))
- radio group: updates story implementation to scope selection states ([#282](https://github.com/EightfoldAI/octuple/issues/282)) ([2ef7609](https://github.com/EightfoldAI/octuple/commits/2ef7609781b21f0682dee5c0a6affe4fe42fe217))

### [2.2.1](https://github.com/EightfoldAI/octuple/compare/v2.1.1...v2.2.1) (2022-08-02)

### Features

- codesandbox: adds basic codesandbox ci pr build config ([#278](https://github.com/EightfoldAI/octuple/issues/278)) ([a2b363f](https://github.com/EightfoldAI/octuple/commits/a2b363f3407cdd3c07d3c15d8d6f47dc0ce2bbc4))
- system ui button: add system ui button ([#280](https://github.com/EightfoldAI/octuple/issues/280)) ([4f79dbe](https://github.com/EightfoldAI/octuple/commits/4f79dbea8f00f651d213e7da976b094bb4770ad4))

### Bug Fixes

- match score: update logic for filled and half filled scores ([3f8dab5](https://github.com/EightfoldAI/octuple/commits/3f8dab5582af73d59cccb7e9bb8ec040c8c58f84))
- radiobutton: fixes width of radio element in flex when layout is constrained ([#279](https://github.com/EightfoldAI/octuple/issues/279)) ([aa1cb92](https://github.com/EightfoldAI/octuple/commits/aa1cb923ce9c2320b7ae91e6dbd19c1cee562875))
- selectors: adds size prop, fixes styles to match the latest ([#275](https://github.com/EightfoldAI/octuple/issues/275)) ([ffa7735](https://github.com/EightfoldAI/octuple/commits/ffa773586f4d105f44bf6bd9e11e33604b0c90c0))
- snackbar: increase snackbar z-index to be more than surface elements ([#277](https://github.com/EightfoldAI/octuple/issues/277)) ([40d8840](https://github.com/EightfoldAI/octuple/commits/40d8840c51ad8815f125e9203b3ae1e47deb1675))

## [2.2.0](https://github.com/EightfoldAI/octuple/compare/v2.1.2...v2.2.0) (2022-08-01)

### Features

- codesandbox: adds basic codesandbox ci pr build config ([#278](https://github.com/EightfoldAI/octuple/issues/278)) ([a2b363f](https://github.com/EightfoldAI/octuple/commits/a2b363f3407cdd3c07d3c15d8d6f47dc0ce2bbc4))
- system ui button: add system ui button ([#280](https://github.com/EightfoldAI/octuple/issues/280)) ([4f79dbe](https://github.com/EightfoldAI/octuple/commits/4f79dbea8f00f651d213e7da976b094bb4770ad4))

### Bug Fixes

- radiobutton: fixes width of radio element in flex when layout is constrained ([#279](https://github.com/EightfoldAI/octuple/issues/279)) ([aa1cb92](https://github.com/EightfoldAI/octuple/commits/aa1cb923ce9c2320b7ae91e6dbd19c1cee562875))

### [2.1.2](https://github.com/EightfoldAI/octuple/compare/v2.1.1...v2.1.2) (2022-07-29)

### Bug Fixes

- selectors: adds size prop, fixes styles to match the latest ([#275](https://github.com/EightfoldAI/octuple/issues/275)) ([ffa7735](https://github.com/EightfoldAI/octuple/commits/ffa773586f4d105f44bf6bd9e11e33604b0c90c0))
- snackbar: increase snackbar z-index to be more than surface elements ([#277](https://github.com/EightfoldAI/octuple/issues/277)) ([40d8840](https://github.com/EightfoldAI/octuple/commits/40d8840c51ad8815f125e9203b3ae1e47deb1675))

### [2.1.1](https://github.com/EightfoldAI/octuple/compare/v2.1.0...v2.1.1) (2022-07-29)

### Bug Fixes

- button: fixes secondary button border in safari, cleans up focus visible styles ([#272](https://github.com/EightfoldAI/octuple/issues/272)) ([3370a03](https://github.com/EightfoldAI/octuple/commits/3370a038efe18dcaa5164c656ea10ee0b6d1ece5))
- slider: fixes slider onchange event hang in react 16 ([#274](https://github.com/EightfoldAI/octuple/issues/274)) ([2ec21fd](https://github.com/EightfoldAI/octuple/commits/2ec21fd6e9a1f87988c242a404e69ce4214444d5))

## [2.1.0](https://github.com/EightfoldAI/octuple/compare/v2.0.2...v2.1.0) (2022-07-28)

### Features

- toggle: add toggle switch ([#269](https://github.com/EightfoldAI/octuple/issues/269)) ([b6ecc9d](https://github.com/EightfoldAI/octuple/commits/b6ecc9d217fadf0cd40a05ad2761d7be05affbbe))

### Bug Fixes

- tooltip: fixes tooltip visibility upon on mouse leave ([#273](https://github.com/EightfoldAI/octuple/issues/273)) ([0314b8c](https://github.com/EightfoldAI/octuple/commits/0314b8c307c7bfdcb20853d09543cecb350416e2))

### [2.0.2](https://github.com/EightfoldAI/octuple/compare/v2.0.1...v2.0.2) (2022-07-27)

### Bug Fixes

- dependabot: removes and upgrades developer dependencies ([#267](https://github.com/EightfoldAI/octuple/issues/267)) ([e082a3d](https://github.com/EightfoldAI/octuple/commits/e082a3d18d33cf68a25b16613c7aed66d317abbb))
- slider: fixes slider onresize event hang in react 16 ([#268](https://github.com/EightfoldAI/octuple/issues/268)) ([a03d14f](https://github.com/EightfoldAI/octuple/commits/a03d14faf5a1cdf5a2965347570f2dede98c2693))

### [2.0.1](https://github.com/EightfoldAI/octuple/compare/v1.19.1...v2.0.1) (2022-07-26)

### Features

- add all theme2 colors to avatar and pill component ([e00d129](https://github.com/EightfoldAI/octuple/commits/e00d1298ef842198f9c106d37b928bf0416327ad))
- table: update table hover color, fix accordion hover overflow ([#255](https://github.com/EightfoldAI/octuple/issues/255)) ([2f4a851](https://github.com/EightfoldAI/octuple/commits/2f4a851b96c20c2325999745c4fb17e23114b9cf))
- theme 2 color palette, default button & input shape to pull, styles for selectors, tabs, buttons, accordion & match score ([#174](https://github.com/EightfoldAI/octuple/issues/174)) ([286ec69](https://github.com/EightfoldAI/octuple/commits/286ec690769268a63e9b0d38aa214cdf67f6f6e2))
- theme 2 for dialog, modal, infobar, snackbar and dropdown ([#162](https://github.com/EightfoldAI/octuple/issues/162)) ([883bc8f](https://github.com/EightfoldAI/octuple/commits/883bc8fe39500c79c2e8ba3ebc63209b6ae0fa42))
- Update incorrect colors for Tabs and Buttons in theme 2 ([#214](https://github.com/EightfoldAI/octuple/issues/214)) ([89bdd03](https://github.com/EightfoldAI/octuple/commits/89bdd0397b22ccabe41fd4f949d15e559186e803))
- update menu item, pagination and inputs to theme 2 ([#213](https://github.com/EightfoldAI/octuple/issues/213)) ([cb89df6](https://github.com/EightfoldAI/octuple/commits/cb89df6b9972eb2cba0803ad78dcbee88e8d6197))

### Bug Fixes

- Update checkbox colors to the correct values ([#230](https://github.com/EightfoldAI/octuple/issues/230)) ([14babe6](https://github.com/EightfoldAI/octuple/commits/14babe674e1a8406e46fcbc1b7e3d24ac4ea2977)), closes [#162](https://github.com/EightfoldAI/octuple/issues/162) [#174](https://github.com/EightfoldAI/octuple/issues/174)
- update two state button to theme 2 ([#226](https://github.com/EightfoldAI/octuple/issues/226)) ([e42fc18](https://github.com/EightfoldAI/octuple/commits/e42fc18253bf28847ee209842918a82b8bb95853))

### [1.19.1](https://github.com/EightfoldAI/octuple/compare/v1.19.0...v1.19.1) (2022-07-26)

### Features

- tooltip: allow passing custom class and style to tooltip wrapper ([#264](https://github.com/EightfoldAI/octuple/issues/264)) ([4eeb0e4](https://github.com/EightfoldAI/octuple/commits/4eeb0e43ae4b50f657adcdedb8c59a1459bb993a))

## [1.19.0](https://github.com/EightfoldAI/octuple/compare/v1.18.0...v1.19.0) (2022-07-25)

### Features

- added filter options ([#252](https://github.com/EightfoldAI/octuple/issues/252)) ([5d14a7c](https://github.com/EightfoldAI/octuple/commits/5d14a7c749109b1c07e3772e12d97001b5a6caa8))

### Bug Fixes

- export TextInputSize ([#254](https://github.com/EightfoldAI/octuple/issues/254)) ([04ef8f0](https://github.com/EightfoldAI/octuple/commits/04ef8f004d584c608c214ad183663c0aef5efc12))
- radiobutton: multiple radio buttons on the same page doesnt work as intended ([#253](https://github.com/EightfoldAI/octuple/issues/253)) ([664c531](https://github.com/EightfoldAI/octuple/commits/664c5311a8a90f240536a35ca66e47ab6ff4caec))

## [1.18.0](https://github.com/EightfoldAI/octuple/compare/v1.17.0...v1.18.0) (2022-07-21)

### Features

- icon: adds mdi "auto-fix" icon ([#236](https://github.com/EightfoldAI/octuple/issues/236)) ([e1b99bb](https://github.com/EightfoldAI/octuple/commits/e1b99bb7f7668717174ea31d927d7bf7203e52ec))
- input: add inline prop ([#239](https://github.com/EightfoldAI/octuple/issues/239)) ([e52d79a](https://github.com/EightfoldAI/octuple/commits/e52d79a5ac411dbced3c19dabf618cf8262c189a))
- input: add underline variant ([#237](https://github.com/EightfoldAI/octuple/issues/237)) ([553fee7](https://github.com/EightfoldAI/octuple/commits/553fee7ea5512541f1402069b8389751b29c9ece))
- modal: add three additional header action button props ([#244](https://github.com/EightfoldAI/octuple/issues/244)) ([60abc1f](https://github.com/EightfoldAI/octuple/commits/60abc1f90ef8e18a277ccf48f8cfed74c84d153f))

### Bug Fixes

- select: fixes pills, filtering, empty text, and spinner position ([#243](https://github.com/EightfoldAI/octuple/issues/243)) ([c1bcf24](https://github.com/EightfoldAI/octuple/commits/c1bcf24f47d75d70e1eb74c07a82681de370321a))
- select: Move chevron indicator to the right side ([#240](https://github.com/EightfoldAI/octuple/issues/240)) ([e1d3ac0](https://github.com/EightfoldAI/octuple/commits/e1d3ac0071c93a3956a754aa7fc96b63a39b40d4))
- toggle hover dropdown on click, fixed dropdown flicker on close ([#238](https://github.com/EightfoldAI/octuple/issues/238)) ([ad9f340](https://github.com/EightfoldAI/octuple/commits/ad9f340558875f9be148d47015d3ecd795a5e838))
- usematchmedia: implement addlistener fallback for older browsers ([#241](https://github.com/EightfoldAI/octuple/issues/241)) ([f27b5bc](https://github.com/EightfoldAI/octuple/commits/f27b5bc35fea6b33af841384e85be1e175495245))

### [2.0.1-pre.2](https://github.com/EightfoldAI/octuple/compare/v1.17.0...v2.0.1-pre.2) (2022-07-20)

### Features

- add all theme2 colors to avatar and pill component ([1a29b95](https://github.com/EightfoldAI/octuple/commits/1a29b959ede50160df3ec58219ae8011daa6e87f))
- icon: adds mdi "auto-fix" icon ([#236](https://github.com/EightfoldAI/octuple/issues/236)) ([e1b99bb](https://github.com/EightfoldAI/octuple/commits/e1b99bb7f7668717174ea31d927d7bf7203e52ec))
- input: add inline prop ([#239](https://github.com/EightfoldAI/octuple/issues/239)) ([e52d79a](https://github.com/EightfoldAI/octuple/commits/e52d79a5ac411dbced3c19dabf618cf8262c189a))
- input: add underline variant ([#237](https://github.com/EightfoldAI/octuple/issues/237)) ([553fee7](https://github.com/EightfoldAI/octuple/commits/553fee7ea5512541f1402069b8389751b29c9ece))
- modal: add three additional header action button props ([#244](https://github.com/EightfoldAI/octuple/issues/244)) ([60abc1f](https://github.com/EightfoldAI/octuple/commits/60abc1f90ef8e18a277ccf48f8cfed74c84d153f))
- theme 2 color palette, default button & input shape to pull, styles for selectors, tabs, buttons, accordion & match score ([#174](https://github.com/EightfoldAI/octuple/issues/174)) ([38cc2fe](https://github.com/EightfoldAI/octuple/commits/38cc2fe182b76014ce4fcba44f0f39555d1ac920))
- theme 2 for dialog, modal, infobar, snackbar and dropdown ([#162](https://github.com/EightfoldAI/octuple/issues/162)) ([ba57712](https://github.com/EightfoldAI/octuple/commits/ba577125537c54e7015baa65b3316132d5dc8020))
- Update incorrect colors for Tabs and Buttons in theme 2 ([#214](https://github.com/EightfoldAI/octuple/issues/214)) ([897e93b](https://github.com/EightfoldAI/octuple/commits/897e93bd4a1bdfff2994422864486f205543a4fb))
- update menu item, pagination and inputs to theme 2 ([#213](https://github.com/EightfoldAI/octuple/issues/213)) ([867a01a](https://github.com/EightfoldAI/octuple/commits/867a01aa0c33d51953f134fac05c81faf6d0895b))

### Bug Fixes

- select: Move chevron indicator to the right side ([#240](https://github.com/EightfoldAI/octuple/issues/240)) ([e1d3ac0](https://github.com/EightfoldAI/octuple/commits/e1d3ac0071c93a3956a754aa7fc96b63a39b40d4))
- toggle hover dropdown on click, fixed dropdown flicker on close ([#238](https://github.com/EightfoldAI/octuple/issues/238)) ([ad9f340](https://github.com/EightfoldAI/octuple/commits/ad9f340558875f9be148d47015d3ecd795a5e838))
- Update checkbox colors to the correct values ([#230](https://github.com/EightfoldAI/octuple/issues/230)) ([07f4cdb](https://github.com/EightfoldAI/octuple/commits/07f4cdb4a451f7c047eda04f986bfd51b3d727e6)), closes [#162](https://github.com/EightfoldAI/octuple/issues/162) [#174](https://github.com/EightfoldAI/octuple/issues/174)
- update two state button to theme 2 ([#226](https://github.com/EightfoldAI/octuple/issues/226)) ([a9f1a8b](https://github.com/EightfoldAI/octuple/commits/a9f1a8bf7a091ec51d3a2a060b0563c5427dd89e))
- usematchmedia: implement addlistener fallback for older browsers ([#241](https://github.com/EightfoldAI/octuple/issues/241)) ([f27b5bc](https://github.com/EightfoldAI/octuple/commits/f27b5bc35fea6b33af841384e85be1e175495245))

## [1.17.0](https://github.com/EightfoldAI/octuple/compare/v1.16.0...v1.17.0) (2022-07-14)

### Features

- add ability to pass custom class to table header ([#224](https://github.com/EightfoldAI/octuple/issues/224)) ([e819423](https://github.com/EightfoldAI/octuple/commits/e819423ff72688bf2597f2e1c6c67683dc8a0a6a))
- datepicker: adds date and time picker components ([#233](https://github.com/EightfoldAI/octuple/issues/233)) ([14e652c](https://github.com/EightfoldAI/octuple/commits/14e652c52cffef5922807e24ea5d153a2bbcc30f))

### Bug Fixes

- datepicker: adds missing module selector ([#235](https://github.com/EightfoldAI/octuple/issues/235)) ([4cf98b0](https://github.com/EightfoldAI/octuple/commits/4cf98b091aa268c0c47ea425ffd656a5f9740405))
- prevent slider from firing onChange during init ([#232](https://github.com/EightfoldAI/octuple/issues/232)) ([5616347](https://github.com/EightfoldAI/octuple/commits/5616347496448384494a03b879c9c01fb2c5813e))

### [2.0.1-pre.1](https://github.com/EightfoldAI/octuple/compare/v1.16.0...v2.0.1-pre.1) (2022-07-10)

### Features

- add all theme2 colors to avatar and pill component ([16d2eda](https://github.com/EightfoldAI/octuple/commits/16d2edab25e0a8ca2da789049f1f6e89ca69985d))
- theme 2 color palette, default button & input shape to pull, styles for selectors, tabs, buttons, accordion & match score ([#174](https://github.com/EightfoldAI/octuple/issues/174)) ([bf405e7](https://github.com/EightfoldAI/octuple/commits/bf405e75171df5d82479d485be05bc777acdd28b))
- theme 2 for dialog, modal, infobar, snackbar and dropdown ([#162](https://github.com/EightfoldAI/octuple/issues/162)) ([20ba49a](https://github.com/EightfoldAI/octuple/commits/20ba49a5ccbc906152a77ffeb6d3cae12513e2b1))
- Update incorrect colors for Tabs and Buttons in theme 2 ([#214](https://github.com/EightfoldAI/octuple/issues/214)) ([46079ac](https://github.com/EightfoldAI/octuple/commits/46079acbbe8d00a044d28f824d0be51e8c016b76))
- update menu item, pagination and inputs to theme 2 ([#213](https://github.com/EightfoldAI/octuple/issues/213)) ([e038591](https://github.com/EightfoldAI/octuple/commits/e038591d5147a7a2c15e041e06401ddbaaeadff6))

### Bug Fixes

- Update checkbox colors to the correct values ([#230](https://github.com/EightfoldAI/octuple/issues/230)) ([f3219a3](https://github.com/EightfoldAI/octuple/commits/f3219a3f63b3615f0528e4131ab9b88df885dbd2)), closes [#162](https://github.com/EightfoldAI/octuple/issues/162) [#174](https://github.com/EightfoldAI/octuple/issues/174)
- update two state button to theme 2 ([#226](https://github.com/EightfoldAI/octuple/issues/226)) ([0eeba80](https://github.com/EightfoldAI/octuple/commits/0eeba80f4b7dccda181264f7493171c29cf4e602))

## [1.16.0](https://github.com/EightfoldAI/octuple/compare/v1.15.3...v1.16.0) (2022-07-08)

### Features

- add persistent bar ([#229](https://github.com/EightfoldAI/octuple/issues/229)) ([c760e07](https://github.com/EightfoldAI/octuple/commits/c760e0756b9cba57e03cced654ee45367a7f0d3b))

### [1.15.3](https://github.com/EightfoldAI/octuple/compare/v1.15.2...v1.15.3) (2022-07-08)

### [1.15.2](https://github.com/EightfoldAI/octuple/compare/v1.15.1...v1.15.2) (2022-07-07)

### [1.15.1](https://github.com/EightfoldAI/octuple/compare/v1.15.1-0...v1.15.1) (2022-07-07)

### [1.15.1-0](https://github.com/EightfoldAI/octuple/compare/v1.15.0...v1.15.1-0) (2022-07-07)

### Bug Fixes

- export slider component ([#221](https://github.com/EightfoldAI/octuple/issues/221)) ([a048ad2](https://github.com/EightfoldAI/octuple/commits/a048ad29004907df24c38bdbcce308ca2ea90cd9))

### [2.0.1-pre.0](https://github.com/EightfoldAI/octuple/compare/v1.15.0...v2.0.1-pre.0) (2022-07-06)

### Features

- add all theme2 colors to avatar and pill component ([190ac3d](https://github.com/EightfoldAI/octuple/commits/190ac3daeae040b077286b8e0ddfb8d579e27640))
- theme 2 color palette, default button & input shape to pull, styles for selectors, tabs, buttons, accordion & match score ([#174](https://github.com/EightfoldAI/octuple/issues/174)) ([e8a64eb](https://github.com/EightfoldAI/octuple/commits/e8a64eb1e511557f04140987f1290a0116cd8544))
- theme 2 for dialog, modal, infobar, snackbar and dropdown ([#162](https://github.com/EightfoldAI/octuple/issues/162)) ([f28cb26](https://github.com/EightfoldAI/octuple/commits/f28cb265fd4d608a32e38bf7cfd50c5cc4067038))
- Update incorrect colors for Tabs and Buttons in theme 2 ([#214](https://github.com/EightfoldAI/octuple/issues/214)) ([deb36f4](https://github.com/EightfoldAI/octuple/commits/deb36f4f0ee85702f90d814741ecf9b83c9d0073))
- update menu item, pagination and inputs to theme 2 ([#213](https://github.com/EightfoldAI/octuple/issues/213)) ([623e0af](https://github.com/EightfoldAI/octuple/commits/623e0af61c290f64e8dde0ad1b12f0ba7400e6e4))

## [1.15.0](https://github.com/EightfoldAI/octuple/compare/v1.14.3...v1.15.0) (2022-07-01)

### Features

- eng-22373: enable floating buttons ([#212](https://github.com/EightfoldAI/octuple/issues/212)) ([d1ac476](https://github.com/EightfoldAI/octuple/commits/d1ac476302172a387514bfcb4434afc881f06ec6))

### Bug Fixes

- remove buttons from menu item ([#202](https://github.com/EightfoldAI/octuple/issues/202)) ([305c932](https://github.com/EightfoldAI/octuple/commits/305c932e1ee7e594ec6e856654a3baa97b1b4126))

### [1.14.3](https://github.com/EightfoldAI/octuple/compare/v1.14.2...v1.14.3) (2022-06-30)

### Features

- dropdown: add ability to portal ([#210](https://github.com/EightfoldAI/octuple/issues/210)) ([9a385ca](https://github.com/EightfoldAI/octuple/commits/9a385ca16aae7d8ae02a77b2439340b1e4d93499))

### Bug Fixes

- table: increase selection column size, add border bottom header prop ([#209](https://github.com/EightfoldAI/octuple/issues/209)) ([2a36bee](https://github.com/EightfoldAI/octuple/commits/2a36beebce09cd58929b6ddc41b0e41b7fba0743))

### [1.14.2](https://github.com/EightfoldAI/octuple/compare/v1.14.1...v1.14.2) (2022-06-28)

### Features

- add layout type for radiogroup, checkboxgroup ([#207](https://github.com/EightfoldAI/octuple/issues/207)) ([3ecb719](https://github.com/EightfoldAI/octuple/commits/3ecb7192edf3c1767edb1f071d7f49985bc03ba8))

### Bug Fixes

- tabs: allign first item to the left ([#208](https://github.com/EightfoldAI/octuple/issues/208)) ([daa2175](https://github.com/EightfoldAI/octuple/commits/daa21756884f1c0741d7e61d3b306b3e0daa5896))
- update button font sizes and outline colors ([#206](https://github.com/EightfoldAI/octuple/issues/206)) ([2fccac3](https://github.com/EightfoldAI/octuple/commits/2fccac34714049486dd599405da15faa27969186))

### [1.14.1](https://github.com/EightfoldAI/octuple/compare/v1.13.0...v1.14.1) (2022-06-24)

### Features

- table: add table component ([#193](https://github.com/EightfoldAI/octuple/issues/193)) ([427bca7](https://github.com/EightfoldAI/octuple/commits/427bca77438eff26a02a5d13fcfc914f007c51f4))

### Bug Fixes

- button: removes focus outline and border style when not in keyboard mode ([#205](https://github.com/EightfoldAI/octuple/issues/205)) ([142200e](https://github.com/EightfoldAI/octuple/commits/142200ef8f763dbecbbf0ef4eeb137567cf00aff))

## [1.14.0](https://github.com/EightfoldAI/octuple/compare/v1.13.0...v1.14.0) (2022-06-24)

### Features

- table: add table component ([#193](https://github.com/EightfoldAI/octuple/issues/193)) ([427bca7](https://github.com/EightfoldAI/octuple/commits/427bca77438eff26a02a5d13fcfc914f007c51f4))

### Bug Fixes

- button: removes focus outline and border style when not in keyboard mode ([#205](https://github.com/EightfoldAI/octuple/issues/205)) ([142200e](https://github.com/EightfoldAI/octuple/commits/142200ef8f763dbecbbf0ef4eeb137567cf00aff))

## [1.13.0](https://github.com/EightfoldAI/octuple/compare/v1.8.0...v1.13.0) (2022-06-23)

### Features

- added navbar component ([#201](https://github.com/EightfoldAI/octuple/issues/201)) ([2866410](https://github.com/EightfoldAI/octuple/commits/286641030e28cab1ee47bc060a513c442b88e459))

## [1.12.0](https://github.com/EightfoldAI/octuple/compare/v1.11.2...v1.12.0) (2022-06-22)

### Features

- add Slider component ([#190](https://github.com/EightfoldAI/octuple/issues/190)) ([8c8712d](https://github.com/EightfoldAI/octuple/commits/8c8712db1abbd31d3e408b4e378031949b23d581))

### Bug Fixes

- interaction bugs in input, accordion and buttons ([#198](https://github.com/EightfoldAI/octuple/issues/198)) ([f5c1246](https://github.com/EightfoldAI/octuple/commits/f5c1246bd4a31ad8c9796a0830820dddd5b2a20b))

### [1.11.2](https://github.com/EightfoldAI/octuple/compare/v1.11.1...v1.11.2) (2022-06-22)

### Features

- add ability to define theme at a component level ([#197](https://github.com/EightfoldAI/octuple/issues/197)) ([11ef3c0](https://github.com/EightfoldAI/octuple/commits/11ef3c0de582f1bc62990e0d1b2ae266fa3a432c))

### Bug Fixes

- textarea: event persist issue in react 16 ([#199](https://github.com/EightfoldAI/octuple/issues/199)) ([4ea9809](https://github.com/EightfoldAI/octuple/commits/4ea9809de0eac70115597179e1938313b29e92f6))

### [1.11.1](https://github.com/EightfoldAI/octuple/compare/v1.11.0...v1.11.1) (2022-06-21)

### Features

- icon: adds two mdi icons, account eye and its outline variant ([#196](https://github.com/EightfoldAI/octuple/issues/196)) ([f1d744b](https://github.com/EightfoldAI/octuple/commits/f1d744b632e9dc1087a0e18979cc1169c7551201))

### Bug Fixes

- add total in dependencies to pickup latest changes ([#195](https://github.com/EightfoldAI/octuple/issues/195)) ([11a6d4b](https://github.com/EightfoldAI/octuple/commits/11a6d4b8b198ef5fef157f0c22859a1d1a484a5c))

## [1.11.0](https://github.com/EightfoldAI/octuple/compare/v1.10.0...v1.11.0) (2022-06-16)

### Features

- add neutral menu type, add default dropdown offset ([#189](https://github.com/EightfoldAI/octuple/issues/189)) ([e70b338](https://github.com/EightfoldAI/octuple/commits/e70b338953a15694f92488d42b88487d5d710793))
- button: adds counter badge support to all buttons ([#187](https://github.com/EightfoldAI/octuple/issues/187)) ([45eaec1](https://github.com/EightfoldAI/octuple/commits/45eaec1f04d9a8bf212bd0c776c50e5bfbfaab74))

### Bug Fixes

- pagination: ensure jumper applies current page ([#182](https://github.com/EightfoldAI/octuple/issues/182)) ([16d26fa](https://github.com/EightfoldAI/octuple/commits/16d26fa6b593ba77b79be33fe813f3532379d3a8))

## [1.10.0](https://github.com/EightfoldAI/octuple/compare/v1.9.1...v1.10.0) (2022-06-14)

### Features

- empty: adds empty state component ([#180](https://github.com/EightfoldAI/octuple/issues/180)) ([9927e96](https://github.com/EightfoldAI/octuple/commits/9927e96641c014159c41c161da8d33707675cddb))
- tooltip: adds portal prop to tooltips ([#179](https://github.com/EightfoldAI/octuple/issues/179)) ([e48479a](https://github.com/EightfoldAI/octuple/commits/e48479a8b0f5c8eac3439a322a6ee4a991edac26))

### Bug Fixes

- inputs: adds forward ref support, adjusts default wait interval ([#177](https://github.com/EightfoldAI/octuple/issues/177)) ([996f8d6](https://github.com/EightfoldAI/octuple/commits/996f8d62f8dd28030f5fd41ce81434e24c6ae3a9))
- pagination: enables page size and jumper controls and hides elements via total ([#178](https://github.com/EightfoldAI/octuple/issues/178)) ([d8de579](https://github.com/EightfoldAI/octuple/commits/d8de57926f4c2029a1e7379d40293cecd37aafc5))
- radio button: add classnames prop to radio button ([#176](https://github.com/EightfoldAI/octuple/issues/176)) ([3810d9a](https://github.com/EightfoldAI/octuple/commits/3810d9a5d77d4effb6c6b0d71cbadf6fcbf1baca))

### [1.9.1](https://github.com/EightfoldAI/octuple/compare/v1.9.0...v1.9.1) (2022-06-13)

### Bug Fixes

- modal: disable scroll in body on x axis ([#173](https://github.com/EightfoldAI/octuple/issues/173)) ([d6f38df](https://github.com/EightfoldAI/octuple/commits/d6f38dfdde99abfc6892a631f34c0cc2d92a4a0b))

## [1.9.0](https://github.com/EightfoldAI/octuple/compare/v1.8.1...v1.9.0) (2022-06-13)

### Features

- adds select component ([#155](https://github.com/EightfoldAI/octuple/issues/155)) ([2dc3bd7](https://github.com/EightfoldAI/octuple/commits/2dc3bd7835da49a26adb16c6b1e75a8e1dcf1146))

### Bug Fixes

- tooltip: allow pointer events when tooltip is disabled ([#172](https://github.com/EightfoldAI/octuple/issues/172)) ([c99e226](https://github.com/EightfoldAI/octuple/commits/c99e2264ed57f8988eff1343440cc473ef136680))

### [1.8.1](https://github.com/EightfoldAI/octuple/compare/v1.8.0...v1.8.1) (2022-06-10)

### Bug Fixes

- modal: make position strategy fixed by default ([#171](https://github.com/EightfoldAI/octuple/issues/171)) ([98c7af5](https://github.com/EightfoldAI/octuple/commits/98c7af58ef68a99815e7ddab279b0e478aa5b71a))

## [1.8.0](https://github.com/EightfoldAI/octuple/compare/v1.7.2...v1.8.0) (2022-06-08)

### Bug Fixes

- fixed search event persist issue ([#169](https://github.com/EightfoldAI/octuple/issues/169)) ([55c99df](https://github.com/EightfoldAI/octuple/commits/55c99dfe1aff29e6e91b1995b8c516086db061ff))
- handle onScrollLock cleanly, dialog to render inside parent element ([#168](https://github.com/EightfoldAI/octuple/issues/168)) ([e9a5f0e](https://github.com/EightfoldAI/octuple/commits/e9a5f0e23d2de336aa2bca64c319b20003ab8c7d))

## [2.0.0](https://github.com/EightfoldAI/octuple/compare/v1.7.1...v2.0.0) (2022-06-01)

### Features

- theme 2 for dialog, modal, infobar, snackbar and dropdown ([#162](https://github.com/EightfoldAI/octuple/issues/162)) ([e99251d](https://github.com/EightfoldAI/octuple/commits/e99251d5460032f0167b9ff7f1c55ec8edf868f2))

### Bug Fixes

- pass classnames to icons in base button ([#159](https://github.com/EightfoldAI/octuple/issues/159)) ([bcfb1a6](https://github.com/EightfoldAI/octuple/commits/bcfb1a66b0110b9e7f2ac9df579cf63596e7c249))

### [1.7.2](https://github.com/EightfoldAI/octuple/compare/v1.7.1...v1.7.2) (2022-06-02)

### Bug Fixes

- pass classnames to icons in base button ([#159](https://github.com/EightfoldAI/octuple/issues/159)) ([bcfb1a6](https://github.com/EightfoldAI/octuple/commits/bcfb1a66b0110b9e7f2ac9df579cf63596e7c249))

### [1.7.1](https://github.com/EightfoldAI/octuple/compare/v1.7.0...v1.7.1) (2022-06-01)

### Bug Fixes

- button: update default color scheme to use primary ([#158](https://github.com/EightfoldAI/octuple/issues/158)) ([a8af8d9](https://github.com/EightfoldAI/octuple/commits/a8af8d91772e02a9ab298c9bc2ee5e1ac4c3dc6d))

## [1.7.0](https://github.com/EightfoldAI/octuple/compare/v1.6.0...v1.7.0) (2022-05-31)

### Bug Fixes

- forward classNames to tab component ([#157](https://github.com/EightfoldAI/octuple/issues/157)) ([bb032ac](https://github.com/EightfoldAI/octuple/commits/bb032acf4a801bf2f57a8c9d7b5c04590ec7db16))
- improve usability of checkbox, checkbox group, radio and radio group component ([#156](https://github.com/EightfoldAI/octuple/issues/156)) ([7369636](https://github.com/EightfoldAI/octuple/commits/736963614e8b0a311a70e8e953fd6b1bdcf79c9f))

## [1.6.0](https://github.com/EightfoldAI/octuple/compare/v1.5.3...v1.6.0) (2022-05-30)

### Features

- config provider: move css variables to root selector, make base font size configurable ([#150](https://github.com/EightfoldAI/octuple/issues/150)) ([db84a9b](https://github.com/EightfoldAI/octuple/commits/db84a9b50b44550f68c187e70c8e62d07733f0f7))
- storybook: adds storybook controls and documentation ([#147](https://github.com/EightfoldAI/octuple/issues/147)) ([2ab1362](https://github.com/EightfoldAI/octuple/commits/2ab1362ec2ea3a8dc0361132d8126a51b5701ca8))

### Bug Fixes

- modal: fix styling of modal header ([#149](https://github.com/EightfoldAI/octuple/issues/149)) ([10fc5d6](https://github.com/EightfoldAI/octuple/commits/10fc5d61bdc49b48e374c5ca2a61b6acdcc0ecaa))
- selectors: adds null check to radio button onchange event ([#145](https://github.com/EightfoldAI/octuple/issues/145)) ([499c4f5](https://github.com/EightfoldAI/octuple/commits/499c4f5d96eba1f878e7113bfd792731d3aaa548))

### [1.5.3](https://github.com/EightfoldAI/octuple/compare/v1.5.2...v1.5.3) (2022-05-25)

### Bug Fixes

- extend RadioButtonProps and CheckBoxProps to OcBaseProps ([#143](https://github.com/EightfoldAI/octuple/issues/143)) ([08e9696](https://github.com/EightfoldAI/octuple/commits/08e969600a36c420ed12f3bb60b0cc48d65f947d))
- remove classname prop from CheckBoxProps ([#144](https://github.com/EightfoldAI/octuple/issues/144)) ([bdce5c3](https://github.com/EightfoldAI/octuple/commits/bdce5c3c25e9f9486661ccf6b49eca8663ffdb06))

### [1.5.2](https://github.com/EightfoldAI/octuple/compare/v1.5.1...v1.5.2) (2022-05-24)

### [1.5.1](https://github.com/EightfoldAI/octuple/compare/v1.5.0...v1.5.1) (2022-05-24)

### Bug Fixes

- exports: adds stack and selectors to exports ([#139](https://github.com/EightfoldAI/octuple/issues/139)) ([a209f3b](https://github.com/EightfoldAI/octuple/commits/a209f3ba2eca8e8a7a673e8bec17e1fefbc8344d))

## [1.5.0](https://github.com/EightfoldAI/octuple/compare/v1.4.0...v1.5.0) (2022-05-24)

### Features

- add <Stack> ... </Stack> ([#132](https://github.com/EightfoldAI/octuple/issues/132)) ([57e3ee7](https://github.com/EightfoldAI/octuple/commits/57e3ee7a5e8c2f52ecb162f7a1f5c6ef8c3e5e4c))
- add Accordion component ([#126](https://github.com/EightfoldAI/octuple/issues/126)) ([9b9e7fe](https://github.com/EightfoldAI/octuple/commits/9b9e7fe670ddeedd40472f0b294fdc3cf69e6bf3))
- add checkbox and radio button components ([#56](https://github.com/EightfoldAI/octuple/issues/56)) ([80bc310](https://github.com/EightfoldAI/octuple/commits/80bc310df554a7b0527dcf6403f2e31e0f6801d7))
- added link component ([#135](https://github.com/EightfoldAI/octuple/issues/135)) ([b9ecc0f](https://github.com/EightfoldAI/octuple/commits/b9ecc0f09033e011a7b78121f584af5209f430b8))

### Bug Fixes

- button: fixes bugs in split and toggle buttons ([#133](https://github.com/EightfoldAI/octuple/issues/133)) ([b28024d](https://github.com/EightfoldAI/octuple/commits/b28024dcb8d99e6e3ba9c36d45f97782cbb1911d))

## [1.4.0](https://github.com/EightfoldAI/octuple/compare/v1.3.0...v1.4.0) (2022-05-24)

### Features

- added avatar component ([#131](https://github.com/EightfoldAI/octuple/issues/131)) ([3f12842](https://github.com/EightfoldAI/octuple/commits/3f128427b6b8d819f18ae2cb5876994fe3c0f30e))
- added support for icomoon icons ([#129](https://github.com/EightfoldAI/octuple/issues/129)) ([637f986](https://github.com/EightfoldAI/octuple/commits/637f986f6887fd360f55b22021bad8451b9494ee))

### Bug Fixes

- click on menu item not working intermittently ([#128](https://github.com/EightfoldAI/octuple/issues/128)) ([d4d52a4](https://github.com/EightfoldAI/octuple/commits/d4d52a4868857a5440ee26cb0b0428a468a9fccc))

## [1.3.0](https://github.com/EightfoldAI/octuple/compare/v1.2.0...v1.3.0) (2022-05-19)

### Features

- pagination: adds pagination component ([#121](https://github.com/EightfoldAI/octuple/issues/121)) ([dd8fa43](https://github.com/EightfoldAI/octuple/commits/dd8fa438f81a286a7860bd5d55d11a9370b310fa))

### Bug Fixes

- button: use root inverse text color instead of local variable ([#119](https://github.com/EightfoldAI/octuple/issues/119)) ([95f2c12](https://github.com/EightfoldAI/octuple/commits/95f2c1245279045dd40bedfa50aa962733186898))
- input: fixes onchange handler of inputs ([#120](https://github.com/EightfoldAI/octuple/issues/120)) ([e5158e3](https://github.com/EightfoldAI/octuple/commits/e5158e381fe34ba98b596567964bf6184ea93647))
- pixel baseline: removes rem calculations ([#124](https://github.com/EightfoldAI/octuple/issues/124)) ([2739633](https://github.com/EightfoldAI/octuple/commits/27396335937f95ffa99fead987ea2fdb4f447720))
- snackbar: handle snackbar width on different screen sizes ([#116](https://github.com/EightfoldAI/octuple/issues/116)) ([c1b8d6c](https://github.com/EightfoldAI/octuple/commits/c1b8d6cac2a04216ea94d080628e50ddfabb8691))
- text input: hides clear button for number inputs ([#118](https://github.com/EightfoldAI/octuple/issues/118)) ([2738e1d](https://github.com/EightfoldAI/octuple/commits/2738e1d0ac86556943f45a89e551d506c0215119))

## [1.2.0](https://github.com/EightfoldAI/octuple/compare/v1.1.0...v1.2.0) (2022-05-13)

### Features

- accessibility and i18n: adds keyboard focus, canvas direction support ([#109](https://github.com/EightfoldAI/octuple/issues/109)) ([c6704b3](https://github.com/EightfoldAI/octuple/commits/c6704b36db85c6c3ecd1f27f1a5f8e486ce987ff))
- adds octuple spinner component ([#114](https://github.com/EightfoldAI/octuple/issues/114)) ([702931d](https://github.com/EightfoldAI/octuple/commits/702931d45d8101bfc37d938dbe01aabea0e4f6f3))

### Bug Fixes

- button: ensures the height of buttons and clarifies class names ([#112](https://github.com/EightfoldAI/octuple/issues/112)) ([882b3fd](https://github.com/EightfoldAI/octuple/commits/882b3fdcdced40202bb959e6bb99fc9c2a5f4566))
- text input: adds line height to text input to prevent descenders from clipping ([#113](https://github.com/EightfoldAI/octuple/issues/113)) ([362dc1b](https://github.com/EightfoldAI/octuple/commits/362dc1b557736c6a94a5bfaaf8d3f9cf89ae7459))

## [1.1.0](https://github.com/EightfoldAI/octuple/compare/v1.0.0...v1.1.0) (2022-05-05)

### Features

- abstract out common component props as oc base props, add ability to forward ref ([#106](https://github.com/EightfoldAI/octuple/issues/106)) ([f9c6f1b](https://github.com/EightfoldAI/octuple/commits/f9c6f1b601ac9a5aafba6b3e6b7783ac3265cb5c))

## [1.0.0](https://github.com/EightfoldAI/octuple/compare/v0.0.17...v1.0.0) (2022-05-03)

### ⚠ BREAKING CHANGES

- classnames and icon props must be updated to match latest

- fix: match score: updates references and classname prop

### Features

- add match score component 🟢 🟢 🟢 ⚪️ ⚪️ ([#92](https://github.com/EightfoldAI/octuple/issues/92)) ([99f07ec](https://github.com/EightfoldAI/octuple/commits/99f07ec4179f22c05163b8d2da6263eaf2c99b76))
- props: normalize label, classnames, button alignment and iconprops ([#97](https://github.com/EightfoldAI/octuple/issues/97)) ([5b3456a](https://github.com/EightfoldAI/octuple/commits/5b3456a322b977210f580383fb2e74e042e1fb31))

### Bug Fixes

- tabs: use tab value to set the current active tab([#100](https://github.com/EightfoldAI/octuple/issues/100)) ([5e0ec1f](https://github.com/EightfoldAI/octuple/commits/5e0ec1f8962ab4a615e7c6f145d16fd4411c92ee))

### [0.0.17](https://github.com/EightfoldAI/octuple/compare/v0.0.16...v0.0.17) (2022-05-02)

### Features

- adds octuple badge, use badge in tabs ([#89](https://github.com/EightfoldAI/octuple/issues/89)) ([81f6fa5](https://github.com/EightfoldAI/octuple/commits/81f6fa596848ba041f163bf2ec71a1b989b3522a))
- change menu item value to type any ([#93](https://github.com/EightfoldAI/octuple/issues/93)) ([b5cff2e](https://github.com/EightfoldAI/octuple/commits/b5cff2e6b808c3ddbf8b14b7e8461dca20ab5dc8))

### Bug Fixes

- button: fixes button height and min width in flex layouts ([#95](https://github.com/EightfoldAI/octuple/issues/95)) ([0ba62c0](https://github.com/EightfoldAI/octuple/commits/0ba62c0adbd1c8d0a3c5df805d368f9bc1d86b21))
- dropdown: fix memory leak in dropdowns, change position strategy to absolute ([#90](https://github.com/EightfoldAI/octuple/issues/90)) ([25de4bf](https://github.com/EightfoldAI/octuple/commits/25de4bfd78afa2dae2731bb7ff84910e719b1322))
- tooltip: dont show tooltip if no content ([#94](https://github.com/EightfoldAI/octuple/issues/94)) ([13f6a2e](https://github.com/EightfoldAI/octuple/commits/13f6a2e70e8efa6529240e24508dc564a6bec327))

### [0.0.16](https://github.com/EightfoldAI/octuple/compare/v0.0.15...v0.0.16) (2022-04-28)

### Features

- adds octuple info bars ([#84](https://github.com/EightfoldAI/octuple/issues/84)) ([3ef3840](https://github.com/EightfoldAI/octuple/commits/3ef3840944a9c4a7e258644fc632ecc470650658))
- adds octuple snackbar component ([#81](https://github.com/EightfoldAI/octuple/issues/81)) ([6559c78](https://github.com/EightfoldAI/octuple/commits/6559c78308417cff306ef7a19f17399f6b17768e))
- button: adds two state button component ([#80](https://github.com/EightfoldAI/octuple/issues/80)) ([3ea58e3](https://github.com/EightfoldAI/octuple/commits/3ea58e35a7f3efa58c44647cad10af8784e9a542))

### Bug Fixes

- modal scrollbar only if content is scrollable ([#78](https://github.com/EightfoldAI/octuple/issues/78)) ([e72ffb8](https://github.com/EightfoldAI/octuple/commits/e72ffb8ce2506bbf5d540f00220b701e2ff259c8))
- panel: footer not sticking to the bottom ([#83](https://github.com/EightfoldAI/octuple/issues/83)) ([e31a070](https://github.com/EightfoldAI/octuple/commits/e31a070fe1ccbcc30f42de4ec9d53190fab78626))
- tabs: remove background from tabs ([#85](https://github.com/EightfoldAI/octuple/issues/85)) ([4ddb663](https://github.com/EightfoldAI/octuple/commits/4ddb6630a6de32f8c62b679957af09a041e41b27))

### [0.0.15](https://github.com/EightfoldAI/octuple/compare/v0.0.14...v0.0.15) (2022-04-20)

### Features

- adds octuples modal component, handle mobile view in dialog ([#65](https://github.com/EightfoldAI/octuple/issues/65)) ([3dfd43f](https://github.com/EightfoldAI/octuple/commits/3dfd43f9763e44026de4e7f0a98928b083610db9))

### [0.0.14](https://github.com/EightfoldAI/octuple/compare/v0.0.13...v0.0.14) (2022-04-19)

### Bug Fixes

- button: move unreferenced global style into the module ([#74](https://github.com/EightfoldAI/octuple/issues/74)) ([3f87bcd](https://github.com/EightfoldAI/octuple/commits/3f87bcd7b9c612a3bcd103a9899a9f812d27d6cd))

### [0.0.13](https://github.com/EightfoldAI/octuple/compare/v0.0.12...v0.0.13) (2022-04-19)

### Features

- handle inverse themes in config provider ([#67](https://github.com/EightfoldAI/octuple/issues/67)) ([a8ac667](https://github.com/EightfoldAI/octuple/commits/a8ac667cc2e4f19f5fc68d31ad2a3b5f06badd4f))

### [0.0.12](https://github.com/EightfoldAI/octuple/compare/v0.0.11...v0.0.12) (2022-04-13)

### Bug Fixes

- input: ensures there is no visible outline on clear button hover ([#63](https://github.com/EightfoldAI/octuple/issues/63)) ([38258a9](https://github.com/EightfoldAI/octuple/commits/38258a95c1585d2dea053176bae0a5bc55674e4c))

### [0.0.11](https://github.com/EightfoldAI/octuple/compare/v0.0.10...v0.0.11) (2022-04-13)

### Features

- adds octuple panel component, add portal component ([#55](https://github.com/EightfoldAI/octuple/issues/55)) ([4e1a7e1](https://github.com/EightfoldAI/octuple/commits/4e1a7e14348f9bb6b4bbe281872b9d8ec5941e09))
- adds octuples dialog component ([#58](https://github.com/EightfoldAI/octuple/issues/58)) ([7fbf365](https://github.com/EightfoldAI/octuple/commits/7fbf3651d3ce53c63f953a49bc9e53b0e42f8e84))
- button: add split button component ([#57](https://github.com/EightfoldAI/octuple/issues/57)) ([46246b7](https://github.com/EightfoldAI/octuple/commits/46246b74514b3ae234517ecfa9a52fe9242ab9cd))

### Bug Fixes

- button: fixes disruptive button foreground color state css variable reference ([#54](https://github.com/EightfoldAI/octuple/issues/54)) ([25a45be](https://github.com/EightfoldAI/octuple/commits/25a45be203c9f6e954e2fe7ba23c5ae26325c757))

### 0.0.10 (2022-04-11)

### Features

- Adds octuple list, menu, dropdown components ([#30](https://github.com/EightfoldAI/octuple/issues/30)) ([3f558f5](https://github.com/EightfoldAI/octuple/commits/3f558f57160c6a66273da9b33d9afda7f69097f4))
- Adds octuple pills component ([#22](https://github.com/EightfoldAI/octuple/issues/22)) ([4ddec57](https://github.com/EightfoldAI/octuple/commits/4ddec57f60a8d4a0cf6b7a33a88a211e536c520f))
- baseline font size: add use font size hook, update config provider using font size css var ([#50](https://github.com/EightfoldAI/octuple/issues/50)) ([4749c03](https://github.com/EightfoldAI/octuple/commits/4749c038c726a507e8c9ccf06111efbdd08e4438))
- button and input: adds neutral button, exports components, renames enum to better match others ([#48](https://github.com/EightfoldAI/octuple/issues/48)) ([7fc3bf9](https://github.com/EightfoldAI/octuple/commits/7fc3bf9858ec6bc6cb9b380056299fb87b27587e))
- changelog and commit linting: adds changelog scripts, commit message linter and updates readmes ([#18](https://github.com/EightfoldAI/octuple/issues/18)) ([6401ec5](https://github.com/EightfoldAI/octuple/commits/6401ec59f3470b7ad15b75ae93c6480c9f5d4ec6))
- input component: adds searchbox, textarea and textinput components ([#40](https://github.com/EightfoldAI/octuple/issues/40)) ([22e6657](https://github.com/EightfoldAI/octuple/commits/22e6657029da8a739513b25e4442275542b38be8))
- toggle button: adds toggle button and its hooks, updates scss ([#43](https://github.com/EightfoldAI/octuple/issues/43)) ([67149a2](https://github.com/EightfoldAI/octuple/commits/67149a2d6300279ac9befa8a4450f5765f4b905f))

### Bug Fixes

- asset swap: updates highlight rectangle making it symmetrical ([#23](https://github.com/EightfoldAI/octuple/issues/23)) ([879589a](https://github.com/EightfoldAI/octuple/commits/879589a8c90453d16e037c906c4aaa5b89824d35))
- button: refines button prop and adds form type support ([#19](https://github.com/EightfoldAI/octuple/issues/19)) ([44636b1](https://github.com/EightfoldAI/octuple/commits/44636b1650ec66ee7dfe61dbe34410ba24deacbc))
- button: there was a missing scss selector ([#17](https://github.com/EightfoldAI/octuple/issues/17)) ([afb91ac](https://github.com/EightfoldAI/octuple/commits/afb91ac7ace612799567a03e1eb624790ec1d1e7))
- commitlint: adds custom commitlint config ([#25](https://github.com/EightfoldAI/octuple/issues/25)) ([ebf31f9](https://github.com/EightfoldAI/octuple/commits/ebf31f965af5ba3c14ed03932e1b047f94b1982c))
- handle menu item value type ([#44](https://github.com/EightfoldAI/octuple/issues/44)) ([cc66e8e](https://github.com/EightfoldAI/octuple/commits/cc66e8e57d7dd6c762f36e9ce03f3ad636afe2a5))
- html base pixel unit: changes the base from 16 to 10 ([#34](https://github.com/EightfoldAI/octuple/issues/34)) ([61b4825](https://github.com/EightfoldAI/octuple/commits/61b482528bb91c34e3cdca79580034e88d34560b))
- peer dependencies: ensure react is installed as a peer dependency ([#32](https://github.com/EightfoldAI/octuple/issues/32)) ([e079310](https://github.com/EightfoldAI/octuple/commits/e079310404aa3f9caebf7c2dbd09e4d7b81dad14))
- pill button: updates hover state to match latest button styles ([#45](https://github.com/EightfoldAI/octuple/issues/45)) ([b98488f](https://github.com/EightfoldAI/octuple/commits/b98488f6740a8016d722306c96cd5b331f98b678))
- pills: removes unused selectors ([#36](https://github.com/EightfoldAI/octuple/issues/36)) ([28b11ef](https://github.com/EightfoldAI/octuple/commits/28b11ef3e294564754a12d3e6510ca9e6406191b))
- react: ignore react in production build to avoid conflicts ([#29](https://github.com/EightfoldAI/octuple/issues/29)) ([718c3f5](https://github.com/EightfoldAI/octuple/commits/718c3f54de05107b962f0313187f3f28aeee55b2))
- readme: fixes asset and documentation urls ([#27](https://github.com/EightfoldAI/octuple/issues/27)) ([6c2fb07](https://github.com/EightfoldAI/octuple/commits/6c2fb0741a04265d4eaf6ec51d8d3a296a1c4519))
- textarea: pixel push resize icon ([#46](https://github.com/EightfoldAI/octuple/issues/46)) ([bbf1e7e](https://github.com/EightfoldAI/octuple/commits/bbf1e7eb4e9f64fcceff44de7230840db186d060))
- user agent border in tabs: overrides ua style ([#20](https://github.com/EightfoldAI/octuple/issues/20)) ([1396bbb](https://github.com/EightfoldAI/octuple/commits/1396bbb1f19bd5dad5232be09eb483cec1017f35))

### 0.0.9 (2022-04-11)

### Features

- Adds octuple list, menu, dropdown components ([#30](https://github.com/EightfoldAI/octuple/issues/30)) ([3f558f5](https://github.com/EightfoldAI/octuple/commits/3f558f57160c6a66273da9b33d9afda7f69097f4))
- Adds octuple pills component ([#22](https://github.com/EightfoldAI/octuple/issues/22)) ([4ddec57](https://github.com/EightfoldAI/octuple/commits/4ddec57f60a8d4a0cf6b7a33a88a211e536c520f))
- baseline font size: add use font size hook, update config provider using font size css var ([#50](https://github.com/EightfoldAI/octuple/issues/50)) ([4749c03](https://github.com/EightfoldAI/octuple/commits/4749c038c726a507e8c9ccf06111efbdd08e4438))
- button and input: adds neutral button, exports components, renames enum to better match others ([#48](https://github.com/EightfoldAI/octuple/issues/48)) ([7fc3bf9](https://github.com/EightfoldAI/octuple/commits/7fc3bf9858ec6bc6cb9b380056299fb87b27587e))
- changelog and commit linting: adds changelog scripts, commit message linter and updates readmes ([#18](https://github.com/EightfoldAI/octuple/issues/18)) ([6401ec5](https://github.com/EightfoldAI/octuple/commits/6401ec59f3470b7ad15b75ae93c6480c9f5d4ec6))
- input component: adds searchbox, textarea and textinput components ([#40](https://github.com/EightfoldAI/octuple/issues/40)) ([22e6657](https://github.com/EightfoldAI/octuple/commits/22e6657029da8a739513b25e4442275542b38be8))
- toggle button: adds toggle button and its hooks, updates scss ([#43](https://github.com/EightfoldAI/octuple/issues/43)) ([67149a2](https://github.com/EightfoldAI/octuple/commits/67149a2d6300279ac9befa8a4450f5765f4b905f))

### Bug Fixes

- asset swap: updates highlight rectangle making it symmetrical ([#23](https://github.com/EightfoldAI/octuple/issues/23)) ([879589a](https://github.com/EightfoldAI/octuple/commits/879589a8c90453d16e037c906c4aaa5b89824d35))
- button: refines button prop and adds form type support ([#19](https://github.com/EightfoldAI/octuple/issues/19)) ([44636b1](https://github.com/EightfoldAI/octuple/commits/44636b1650ec66ee7dfe61dbe34410ba24deacbc))
- button: there was a missing scss selector ([#17](https://github.com/EightfoldAI/octuple/issues/17)) ([afb91ac](https://github.com/EightfoldAI/octuple/commits/afb91ac7ace612799567a03e1eb624790ec1d1e7))
- commitlint: adds custom commitlint config ([#25](https://github.com/EightfoldAI/octuple/issues/25)) ([ebf31f9](https://github.com/EightfoldAI/octuple/commits/ebf31f965af5ba3c14ed03932e1b047f94b1982c))
- handle menu item value type ([#44](https://github.com/EightfoldAI/octuple/issues/44)) ([cc66e8e](https://github.com/EightfoldAI/octuple/commits/cc66e8e57d7dd6c762f36e9ce03f3ad636afe2a5))
- html base pixel unit: changes the base from 16 to 10 ([#34](https://github.com/EightfoldAI/octuple/issues/34)) ([61b4825](https://github.com/EightfoldAI/octuple/commits/61b482528bb91c34e3cdca79580034e88d34560b))
- peer dependencies: ensure react is installed as a peer dependency ([#32](https://github.com/EightfoldAI/octuple/issues/32)) ([e079310](https://github.com/EightfoldAI/octuple/commits/e079310404aa3f9caebf7c2dbd09e4d7b81dad14))
- pill button: updates hover state to match latest button styles ([#45](https://github.com/EightfoldAI/octuple/issues/45)) ([b98488f](https://github.com/EightfoldAI/octuple/commits/b98488f6740a8016d722306c96cd5b331f98b678))
- pills: removes unused selectors ([#36](https://github.com/EightfoldAI/octuple/issues/36)) ([28b11ef](https://github.com/EightfoldAI/octuple/commits/28b11ef3e294564754a12d3e6510ca9e6406191b))
- react: ignore react in production build to avoid conflicts ([#29](https://github.com/EightfoldAI/octuple/issues/29)) ([718c3f5](https://github.com/EightfoldAI/octuple/commits/718c3f54de05107b962f0313187f3f28aeee55b2))
- readme: fixes asset and documentation urls ([#27](https://github.com/EightfoldAI/octuple/issues/27)) ([6c2fb07](https://github.com/EightfoldAI/octuple/commits/6c2fb0741a04265d4eaf6ec51d8d3a296a1c4519))
- textarea: pixel push resize icon ([#46](https://github.com/EightfoldAI/octuple/issues/46)) ([bbf1e7e](https://github.com/EightfoldAI/octuple/commits/bbf1e7eb4e9f64fcceff44de7230840db186d060))
- user agent border in tabs: overrides ua style ([#20](https://github.com/EightfoldAI/octuple/issues/20)) ([1396bbb](https://github.com/EightfoldAI/octuple/commits/1396bbb1f19bd5dad5232be09eb483cec1017f35))

### 0.0.8 (2022-04-09)

### Features

- Adds octuple list, menu, dropdown components ([#30](https://github.com/EightfoldAI/octuple/issues/30)) ([3f558f5](https://github.com/EightfoldAI/octuple/commits/3f558f57160c6a66273da9b33d9afda7f69097f4))
- Adds octuple pills component ([#22](https://github.com/EightfoldAI/octuple/issues/22)) ([4ddec57](https://github.com/EightfoldAI/octuple/commits/4ddec57f60a8d4a0cf6b7a33a88a211e536c520f))
- baseline font size: add use font size hook, update config provider using font size css var ([#50](https://github.com/EightfoldAI/octuple/issues/50)) ([4749c03](https://github.com/EightfoldAI/octuple/commits/4749c038c726a507e8c9ccf06111efbdd08e4438))
- button and input: adds neutral button, exports components, renames enum to better match others ([#48](https://github.com/EightfoldAI/octuple/issues/48)) ([7fc3bf9](https://github.com/EightfoldAI/octuple/commits/7fc3bf9858ec6bc6cb9b380056299fb87b27587e))
- changelog and commit linting: adds changelog scripts, commit message linter and updates readmes ([#18](https://github.com/EightfoldAI/octuple/issues/18)) ([6401ec5](https://github.com/EightfoldAI/octuple/commits/6401ec59f3470b7ad15b75ae93c6480c9f5d4ec6))
- input component: adds searchbox, textarea and textinput components ([#40](https://github.com/EightfoldAI/octuple/issues/40)) ([22e6657](https://github.com/EightfoldAI/octuple/commits/22e6657029da8a739513b25e4442275542b38be8))
- toggle button: adds toggle button and its hooks, updates scss ([#43](https://github.com/EightfoldAI/octuple/issues/43)) ([67149a2](https://github.com/EightfoldAI/octuple/commits/67149a2d6300279ac9befa8a4450f5765f4b905f))

### Bug Fixes

- asset swap: updates highlight rectangle making it symmetrical ([#23](https://github.com/EightfoldAI/octuple/issues/23)) ([879589a](https://github.com/EightfoldAI/octuple/commits/879589a8c90453d16e037c906c4aaa5b89824d35))
- button: refines button prop and adds form type support ([#19](https://github.com/EightfoldAI/octuple/issues/19)) ([44636b1](https://github.com/EightfoldAI/octuple/commits/44636b1650ec66ee7dfe61dbe34410ba24deacbc))
- button: there was a missing scss selector ([#17](https://github.com/EightfoldAI/octuple/issues/17)) ([afb91ac](https://github.com/EightfoldAI/octuple/commits/afb91ac7ace612799567a03e1eb624790ec1d1e7))
- commitlint: adds custom commitlint config ([#25](https://github.com/EightfoldAI/octuple/issues/25)) ([ebf31f9](https://github.com/EightfoldAI/octuple/commits/ebf31f965af5ba3c14ed03932e1b047f94b1982c))
- handle menu item value type ([#44](https://github.com/EightfoldAI/octuple/issues/44)) ([cc66e8e](https://github.com/EightfoldAI/octuple/commits/cc66e8e57d7dd6c762f36e9ce03f3ad636afe2a5))
- html base pixel unit: changes the base from 16 to 10 ([#34](https://github.com/EightfoldAI/octuple/issues/34)) ([61b4825](https://github.com/EightfoldAI/octuple/commits/61b482528bb91c34e3cdca79580034e88d34560b))
- peer dependencies: ensure react is installed as a peer dependency ([#32](https://github.com/EightfoldAI/octuple/issues/32)) ([e079310](https://github.com/EightfoldAI/octuple/commits/e079310404aa3f9caebf7c2dbd09e4d7b81dad14))
- pill button: updates hover state to match latest button styles ([#45](https://github.com/EightfoldAI/octuple/issues/45)) ([b98488f](https://github.com/EightfoldAI/octuple/commits/b98488f6740a8016d722306c96cd5b331f98b678))
- pills: removes unused selectors ([#36](https://github.com/EightfoldAI/octuple/issues/36)) ([28b11ef](https://github.com/EightfoldAI/octuple/commits/28b11ef3e294564754a12d3e6510ca9e6406191b))
- react: ignore react in production build to avoid conflicts ([#29](https://github.com/EightfoldAI/octuple/issues/29)) ([718c3f5](https://github.com/EightfoldAI/octuple/commits/718c3f54de05107b962f0313187f3f28aeee55b2))
- readme: fixes asset and documentation urls ([#27](https://github.com/EightfoldAI/octuple/issues/27)) ([6c2fb07](https://github.com/EightfoldAI/octuple/commits/6c2fb0741a04265d4eaf6ec51d8d3a296a1c4519))
- textarea: pixel push resize icon ([#46](https://github.com/EightfoldAI/octuple/issues/46)) ([bbf1e7e](https://github.com/EightfoldAI/octuple/commits/bbf1e7eb4e9f64fcceff44de7230840db186d060))
- user agent border in tabs: overrides ua style ([#20](https://github.com/EightfoldAI/octuple/issues/20)) ([1396bbb](https://github.com/EightfoldAI/octuple/commits/1396bbb1f19bd5dad5232be09eb483cec1017f35))

### 0.0.7 (2022-04-07)

### Features

- Adds octuple list, menu, dropdown components ([#30](https://github.com/EightfoldAI/octuple/issues/30)) ([3f558f5](https://github.com/EightfoldAI/octuple/commits/3f558f57160c6a66273da9b33d9afda7f69097f4))
- Adds octuple pills component ([#22](https://github.com/EightfoldAI/octuple/issues/22)) ([4ddec57](https://github.com/EightfoldAI/octuple/commits/4ddec57f60a8d4a0cf6b7a33a88a211e536c520f))
- changelog and commit linting: adds changelog scripts, commit message linter and updates readmes ([#18](https://github.com/EightfoldAI/octuple/issues/18)) ([6401ec5](https://github.com/EightfoldAI/octuple/commits/6401ec59f3470b7ad15b75ae93c6480c9f5d4ec6))
- input component: adds searchbox, textarea and textinput components ([#40](https://github.com/EightfoldAI/octuple/issues/40)) ([22e6657](https://github.com/EightfoldAI/octuple/commits/22e6657029da8a739513b25e4442275542b38be8))
- toggle button: adds toggle button and its hooks, updates scss ([#43](https://github.com/EightfoldAI/octuple/issues/43)) ([67149a2](https://github.com/EightfoldAI/octuple/commits/67149a2d6300279ac9befa8a4450f5765f4b905f))

### Bug Fixes

- asset swap: updates highlight rectangle making it symmetrical ([#23](https://github.com/EightfoldAI/octuple/issues/23)) ([879589a](https://github.com/EightfoldAI/octuple/commits/879589a8c90453d16e037c906c4aaa5b89824d35))
- button: refines button prop and adds form type support ([#19](https://github.com/EightfoldAI/octuple/issues/19)) ([44636b1](https://github.com/EightfoldAI/octuple/commits/44636b1650ec66ee7dfe61dbe34410ba24deacbc))
- button: there was a missing scss selector ([#17](https://github.com/EightfoldAI/octuple/issues/17)) ([afb91ac](https://github.com/EightfoldAI/octuple/commits/afb91ac7ace612799567a03e1eb624790ec1d1e7))
- commitlint: adds custom commitlint config ([#25](https://github.com/EightfoldAI/octuple/issues/25)) ([ebf31f9](https://github.com/EightfoldAI/octuple/commits/ebf31f965af5ba3c14ed03932e1b047f94b1982c))
- handle menu item value type ([#44](https://github.com/EightfoldAI/octuple/issues/44)) ([cc66e8e](https://github.com/EightfoldAI/octuple/commits/cc66e8e57d7dd6c762f36e9ce03f3ad636afe2a5))
- html base pixel unit: changes the base from 16 to 10 ([#34](https://github.com/EightfoldAI/octuple/issues/34)) ([61b4825](https://github.com/EightfoldAI/octuple/commits/61b482528bb91c34e3cdca79580034e88d34560b))
- peer dependencies: ensure react is installed as a peer dependency ([#32](https://github.com/EightfoldAI/octuple/issues/32)) ([e079310](https://github.com/EightfoldAI/octuple/commits/e079310404aa3f9caebf7c2dbd09e4d7b81dad14))
- pill button: updates hover state to match latest button styles ([#45](https://github.com/EightfoldAI/octuple/issues/45)) ([b98488f](https://github.com/EightfoldAI/octuple/commits/b98488f6740a8016d722306c96cd5b331f98b678))
- pills: removes unused selectors ([#36](https://github.com/EightfoldAI/octuple/issues/36)) ([28b11ef](https://github.com/EightfoldAI/octuple/commits/28b11ef3e294564754a12d3e6510ca9e6406191b))
- react: ignore react in production build to avoid conflicts ([#29](https://github.com/EightfoldAI/octuple/issues/29)) ([718c3f5](https://github.com/EightfoldAI/octuple/commits/718c3f54de05107b962f0313187f3f28aeee55b2))
- readme: fixes asset and documentation urls ([#27](https://github.com/EightfoldAI/octuple/issues/27)) ([6c2fb07](https://github.com/EightfoldAI/octuple/commits/6c2fb0741a04265d4eaf6ec51d8d3a296a1c4519))
- textarea: pixel push resize icon ([#46](https://github.com/EightfoldAI/octuple/issues/46)) ([bbf1e7e](https://github.com/EightfoldAI/octuple/commits/bbf1e7eb4e9f64fcceff44de7230840db186d060))
- user agent border in tabs: overrides ua style ([#20](https://github.com/EightfoldAI/octuple/issues/20)) ([1396bbb](https://github.com/EightfoldAI/octuple/commits/1396bbb1f19bd5dad5232be09eb483cec1017f35))

### 0.0.6 (2022-04-06)

### Features

- Adds octuple pills component ([#22](https://github.com/EightfoldAI/octuple/issues/22)) ([4ddec57](https://github.com/EightfoldAI/octuple/commits/4ddec57f60a8d4a0cf6b7a33a88a211e536c520f))
- changelog and commit linting: adds changelog scripts, commit message linter and updates readmes ([#18](https://github.com/EightfoldAI/octuple/issues/18)) ([6401ec5](https://github.com/EightfoldAI/octuple/commits/6401ec59f3470b7ad15b75ae93c6480c9f5d4ec6))

### Bug Fixes

- asset swap: updates highlight rectangle making it symmetrical ([#23](https://github.com/EightfoldAI/octuple/issues/23)) ([879589a](https://github.com/EightfoldAI/octuple/commits/879589a8c90453d16e037c906c4aaa5b89824d35))
- button: refines button prop and adds form type support ([#19](https://github.com/EightfoldAI/octuple/issues/19)) ([44636b1](https://github.com/EightfoldAI/octuple/commits/44636b1650ec66ee7dfe61dbe34410ba24deacbc))
- button: there was a missing scss selector ([#17](https://github.com/EightfoldAI/octuple/issues/17)) ([afb91ac](https://github.com/EightfoldAI/octuple/commits/afb91ac7ace612799567a03e1eb624790ec1d1e7))
- commitlint: adds custom commitlint config ([#25](https://github.com/EightfoldAI/octuple/issues/25)) ([ebf31f9](https://github.com/EightfoldAI/octuple/commits/ebf31f965af5ba3c14ed03932e1b047f94b1982c))
- html base pixel unit: changes the base from 16 to 10 ([#34](https://github.com/EightfoldAI/octuple/issues/34)) ([61b4825](https://github.com/EightfoldAI/octuple/commits/61b482528bb91c34e3cdca79580034e88d34560b))
- peer dependencies: ensure react is installed as a peer dependency ([#32](https://github.com/EightfoldAI/octuple/issues/32)) ([e079310](https://github.com/EightfoldAI/octuple/commits/e079310404aa3f9caebf7c2dbd09e4d7b81dad14))
- pills: removes unused selectors ([#36](https://github.com/EightfoldAI/octuple/issues/36)) ([28b11ef](https://github.com/EightfoldAI/octuple/commits/28b11ef3e294564754a12d3e6510ca9e6406191b))
- react: ignore react in production build to avoid conflicts ([#29](https://github.com/EightfoldAI/octuple/issues/29)) ([718c3f5](https://github.com/EightfoldAI/octuple/commits/718c3f54de05107b962f0313187f3f28aeee55b2))
- readme: fixes asset and documentation urls ([#27](https://github.com/EightfoldAI/octuple/issues/27)) ([6c2fb07](https://github.com/EightfoldAI/octuple/commits/6c2fb0741a04265d4eaf6ec51d8d3a296a1c4519))
- user agent border in tabs: overrides ua style ([#20](https://github.com/EightfoldAI/octuple/issues/20)) ([1396bbb](https://github.com/EightfoldAI/octuple/commits/1396bbb1f19bd5dad5232be09eb483cec1017f35))

### 0.0.5 (2022-04-04)

### Features

- Adds octuple pills component ([#22](https://github.com/EightfoldAI/octuple/issues/22)) ([4ddec57](https://github.com/EightfoldAI/octuple/commits/4ddec57f60a8d4a0cf6b7a33a88a211e536c520f))
- changelog and commit linting: adds changelog scripts, commit message linter and updates readmes ([#18](https://github.com/EightfoldAI/octuple/issues/18)) ([6401ec5](https://github.com/EightfoldAI/octuple/commits/6401ec59f3470b7ad15b75ae93c6480c9f5d4ec6))

### Bug Fixes

- asset swap: updates highlight rectangle making it symmetrical ([#23](https://github.com/EightfoldAI/octuple/issues/23)) ([879589a](https://github.com/EightfoldAI/octuple/commits/879589a8c90453d16e037c906c4aaa5b89824d35))
- button: refines button prop and adds form type support ([#19](https://github.com/EightfoldAI/octuple/issues/19)) ([44636b1](https://github.com/EightfoldAI/octuple/commits/44636b1650ec66ee7dfe61dbe34410ba24deacbc))
- button: there was a missing scss selector ([#17](https://github.com/EightfoldAI/octuple/issues/17)) ([afb91ac](https://github.com/EightfoldAI/octuple/commits/afb91ac7ace612799567a03e1eb624790ec1d1e7))
- commitlint: adds custom commitlint config ([#25](https://github.com/EightfoldAI/octuple/issues/25)) ([ebf31f9](https://github.com/EightfoldAI/octuple/commits/ebf31f965af5ba3c14ed03932e1b047f94b1982c))
- html base pixel unit: changes the base from 16 to 10 ([#34](https://github.com/EightfoldAI/octuple/issues/34)) ([61b4825](https://github.com/EightfoldAI/octuple/commits/61b482528bb91c34e3cdca79580034e88d34560b))
- peer dependencies: ensure react is installed as a peer dependency ([#32](https://github.com/EightfoldAI/octuple/issues/32)) ([e079310](https://github.com/EightfoldAI/octuple/commits/e079310404aa3f9caebf7c2dbd09e4d7b81dad14))
- react: ignore react in production build to avoid conflicts ([#29](https://github.com/EightfoldAI/octuple/issues/29)) ([718c3f5](https://github.com/EightfoldAI/octuple/commits/718c3f54de05107b962f0313187f3f28aeee55b2))
- readme: fixes asset and documentation urls ([#27](https://github.com/EightfoldAI/octuple/issues/27)) ([6c2fb07](https://github.com/EightfoldAI/octuple/commits/6c2fb0741a04265d4eaf6ec51d8d3a296a1c4519))
- user agent border in tabs: overrides ua style ([#20](https://github.com/EightfoldAI/octuple/issues/20)) ([1396bbb](https://github.com/EightfoldAI/octuple/commits/1396bbb1f19bd5dad5232be09eb483cec1017f35))

### 0.0.4 (2022-04-04)

### Features

- Adds octuple pills component ([#22](https://github.com/EightfoldAI/octuple/issues/22)) ([4ddec57](https://github.com/EightfoldAI/octuple/commits/4ddec57f60a8d4a0cf6b7a33a88a211e536c520f))
- changelog and commit linting: adds changelog scripts, commit message linter and updates readmes ([#18](https://github.com/EightfoldAI/octuple/issues/18)) ([6401ec5](https://github.com/EightfoldAI/octuple/commits/6401ec59f3470b7ad15b75ae93c6480c9f5d4ec6))

### Bug Fixes

- asset swap: updates highlight rectangle making it symmetrical ([#23](https://github.com/EightfoldAI/octuple/issues/23)) ([879589a](https://github.com/EightfoldAI/octuple/commits/879589a8c90453d16e037c906c4aaa5b89824d35))
- button: refines button prop and adds form type support ([#19](https://github.com/EightfoldAI/octuple/issues/19)) ([44636b1](https://github.com/EightfoldAI/octuple/commits/44636b1650ec66ee7dfe61dbe34410ba24deacbc))
- button: there was a missing scss selector ([#17](https://github.com/EightfoldAI/octuple/issues/17)) ([afb91ac](https://github.com/EightfoldAI/octuple/commits/afb91ac7ace612799567a03e1eb624790ec1d1e7))
- commitlint: adds custom commitlint config ([#25](https://github.com/EightfoldAI/octuple/issues/25)) ([ebf31f9](https://github.com/EightfoldAI/octuple/commits/ebf31f965af5ba3c14ed03932e1b047f94b1982c))
- peer dependencies: ensure react is installed as a peer dependency ([#32](https://github.com/EightfoldAI/octuple/issues/32)) ([e079310](https://github.com/EightfoldAI/octuple/commits/e079310404aa3f9caebf7c2dbd09e4d7b81dad14))
- react: ignore react in production build to avoid conflicts ([#29](https://github.com/EightfoldAI/octuple/issues/29)) ([718c3f5](https://github.com/EightfoldAI/octuple/commits/718c3f54de05107b962f0313187f3f28aeee55b2))
- readme: fixes asset and documentation urls ([#27](https://github.com/EightfoldAI/octuple/issues/27)) ([6c2fb07](https://github.com/EightfoldAI/octuple/commits/6c2fb0741a04265d4eaf6ec51d8d3a296a1c4519))
- user agent border in tabs: overrides ua style ([#20](https://github.com/EightfoldAI/octuple/issues/20)) ([1396bbb](https://github.com/EightfoldAI/octuple/commits/1396bbb1f19bd5dad5232be09eb483cec1017f35))

### 0.0.3 (2022-04-04)

### Features

- Adds octuple pills component ([#22](https://github.com/EightfoldAI/octuple/issues/22)) ([4ddec57](https://github.com/EightfoldAI/octuple/commits/4ddec57f60a8d4a0cf6b7a33a88a211e536c520f))
- changelog and commit linting: adds changelog scripts, commit message linter and updates readmes ([#18](https://github.com/EightfoldAI/octuple/issues/18)) ([6401ec5](https://github.com/EightfoldAI/octuple/commits/6401ec59f3470b7ad15b75ae93c6480c9f5d4ec6))

### Bug Fixes

- asset swap: updates highlight rectangle making it symmetrical ([#23](https://github.com/EightfoldAI/octuple/issues/23)) ([879589a](https://github.com/EightfoldAI/octuple/commits/879589a8c90453d16e037c906c4aaa5b89824d35))
- button: refines button prop and adds form type support ([#19](https://github.com/EightfoldAI/octuple/issues/19)) ([44636b1](https://github.com/EightfoldAI/octuple/commits/44636b1650ec66ee7dfe61dbe34410ba24deacbc))
- button: there was a missing scss selector ([#17](https://github.com/EightfoldAI/octuple/issues/17)) ([afb91ac](https://github.com/EightfoldAI/octuple/commits/afb91ac7ace612799567a03e1eb624790ec1d1e7))
- react: ignore react in production build to avoid conflicts ([#29](https://github.com/EightfoldAI/octuple/issues/29)) ([718c3f5](https://github.com/EightfoldAI/octuple/commits/718c3f54de05107b962f0313187f3f28aeee55b2))
- readme: fixes asset and documentation urls ([#27](https://github.com/EightfoldAI/octuple/issues/27)) ([6c2fb07](https://github.com/EightfoldAI/octuple/commits/6c2fb0741a04265d4eaf6ec51d8d3a296a1c4519))
- user agent border in tabs: overrides ua style ([#20](https://github.com/EightfoldAI/octuple/issues/20)) ([1396bbb](https://github.com/EightfoldAI/octuple/commits/1396bbb1f19bd5dad5232be09eb483cec1017f35))

### 0.0.2 (2022-04-01)

### Features

- Adds octuple pills component ([#22](https://github.com/EightfoldAI/octuple/issues/22)) ([4ddec57](https://github.com/EightfoldAI/octuple/commits/4ddec57f60a8d4a0cf6b7a33a88a211e536c520f))
- changelog and commit linting: adds changelog scripts, commit message linter and updates readmes ([#18](https://github.com/EightfoldAI/octuple/issues/18)) ([6401ec5](https://github.com/EightfoldAI/octuple/commits/6401ec59f3470b7ad15b75ae93c6480c9f5d4ec6))

### Bug Fixes

- asset swap: updates highlight rectangle making it symmetrical ([#23](https://github.com/EightfoldAI/octuple/issues/23)) ([879589a](https://github.com/EightfoldAI/octuple/commits/879589a8c90453d16e037c906c4aaa5b89824d35))
- button: refines button prop and adds form type support ([#19](https://github.com/EightfoldAI/octuple/issues/19)) ([44636b1](https://github.com/EightfoldAI/octuple/commits/44636b1650ec66ee7dfe61dbe34410ba24deacbc))
- button: there was a missing scss selector ([#17](https://github.com/EightfoldAI/octuple/issues/17)) ([afb91ac](https://github.com/EightfoldAI/octuple/commits/afb91ac7ace612799567a03e1eb624790ec1d1e7))
- readme: fixes asset and documentation urls ([#27](https://github.com/EightfoldAI/octuple/issues/27)) ([6c2fb07](https://github.com/EightfoldAI/octuple/commits/6c2fb0741a04265d4eaf6ec51d8d3a296a1c4519))
- user agent border in tabs: overrides ua style ([#20](https://github.com/EightfoldAI/octuple/issues/20)) ([1396bbb](https://github.com/EightfoldAI/octuple/commits/1396bbb1f19bd5dad5232be09eb483cec1017f35))

### 0.0.1 (2022-04-01)

### Features

- Adds octuple pills component ([#22](https://github.com/EightfoldAI/octuple/issues/22)) ([4ddec57](https://github.com/EightfoldAI/octuple/commits/4ddec57f60a8d4a0cf6b7a33a88a211e536c520f))
- changelog and commit linting: adds changelog scripts, commit message linter and updates readmes ([#18](https://github.com/EightfoldAI/octuple/issues/18)) ([6401ec5](https://github.com/EightfoldAI/octuple/commits/6401ec59f3470b7ad15b75ae93c6480c9f5d4ec6))

### Bug Fixes

- asset swap: updates highlight rectangle making it symmetrical ([#23](https://github.com/EightfoldAI/octuple/issues/23)) ([879589a](https://github.com/EightfoldAI/octuple/commits/879589a8c90453d16e037c906c4aaa5b89824d35))
- button: refines button prop and adds form type support ([#19](https://github.com/EightfoldAI/octuple/issues/19)) ([44636b1](https://github.com/EightfoldAI/octuple/commits/44636b1650ec66ee7dfe61dbe34410ba24deacbc))
- button: there was a missing scss selector ([#17](https://github.com/EightfoldAI/octuple/issues/17)) ([afb91ac](https://github.com/EightfoldAI/octuple/commits/afb91ac7ace612799567a03e1eb624790ec1d1e7))
- user agent border in tabs: overrides ua style ([#20](https://github.com/EightfoldAI/octuple/issues/20)) ([1396bbb](https://github.com/EightfoldAI/octuple/commits/1396bbb1f19bd5dad5232be09eb483cec1017f35))

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.
