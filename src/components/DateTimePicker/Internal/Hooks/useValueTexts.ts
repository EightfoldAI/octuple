import shallowEqual from 'shallowequal';
import { useMemo } from '../../../../hooks/useMemo';
import type { GenerateConfig } from '../Generate';
import type { CustomFormat, Locale } from '../Picker.types';
import { formatValue } from '../Utils/dateUtil';

export type ValueTextConfig<DateType> = {
    formatList: (string | CustomFormat<DateType>)[];
    generateConfig: GenerateConfig<DateType>;
    locale: Locale;
};

export default function useValueTexts<DateType>(
    value: DateType | null,
    { formatList, generateConfig, locale }: ValueTextConfig<DateType>
) {
    return useMemo<[string[], string]>(
        () => {
            if (!value) {
                return [[''], ''];
            }

            // We will convert data format back to first format
            let firstValueText: string = '';
            const fullValueTexts: string[] = [];

            for (let i = 0; i < formatList.length; i += 1) {
                const format: string | CustomFormat<DateType> = formatList[i];
                const formatStr: string = formatValue(value, {
                    generateConfig,
                    locale,
                    format,
                });
                fullValueTexts.push(formatStr);

                if (i === 0) {
                    firstValueText = formatStr;
                }
            }

            return [fullValueTexts, firstValueText];
        },
        [value, formatList],
        (prev, next) => prev[0] !== next[0] || !shallowEqual(prev[1], next[1])
    );
}
