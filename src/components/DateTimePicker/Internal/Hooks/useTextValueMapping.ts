import React from 'react';

export default function useTextValueMapping({
    valueTexts,
    onTextChange,
}: {
    /** Must useMemo, to assume that `valueTexts` only match on the first change */
    valueTexts: string[];
    onTextChange: (text: string) => void;
}): [string, (text: string) => void, () => void] {
    const [text, setInnerText] = React.useState('');
    const valueTextsRef: React.MutableRefObject<string[]> = React.useRef<
        string[]
    >([]);
    valueTextsRef.current = valueTexts;

    function triggerTextChange(value: string): void {
        setInnerText(value);
        onTextChange(value);
    }

    function resetText(): void {
        setInnerText(valueTextsRef.current[0]);
    }

    React.useEffect(() => {
        if (valueTexts.every((valText) => valText !== text)) {
            resetText();
        }
    }, [valueTexts.join('||')]);

    return [text, triggerTextChange, resetText];
}
