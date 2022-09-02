import type React from 'react';

export function resolveOnChange<
    E extends HTMLInputElement | HTMLTextAreaElement
>(
    target: E,
    e:
        | React.ChangeEvent<E>
        | React.MouseEvent<HTMLElement, MouseEvent>
        | React.CompositionEvent<HTMLElement>,
    onChange: undefined | ((event: React.ChangeEvent<E>) => void),
    targetValue?: string
) {
    if (!onChange) {
        return;
    }
    let event = e;

    if (e.type === 'click') {
        // Clone a new target for event.
        // Avoid the following usage, the setQuery method gets the original value.
        //
        // const [query, setQuery] = React.useState('');
        // <TextInput
        //   clearable
        //   value={query}
        //   onChange={(e)=> {
        //     setQuery((prevStatus) => e.target.value);
        //   }}
        // />

        const currentTarget = target.cloneNode(true) as E;

        // click clear icon
        event = Object.create(e, {
            target: { value: currentTarget },
            currentTarget: { value: currentTarget },
        });

        currentTarget.value = '';
        onChange(event as React.ChangeEvent<E>);
        return;
    }

    // Trigger by composition event, this means we need force change the input value
    if (targetValue !== undefined) {
        event = Object.create(e, {
            target: { value: target },
            currentTarget: { value: target },
        });

        target.value = targetValue;
        onChange(event as React.ChangeEvent<E>);
        return;
    }
    onChange(event as React.ChangeEvent<E>);
}
