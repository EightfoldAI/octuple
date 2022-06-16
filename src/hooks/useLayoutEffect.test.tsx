import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useLayoutEffect } from './useLayoutEffect';

describe('useLayoutEffect', () => {
    const FC = (props: { defaultValue: string }) => {
        const [val, setVal] = React.useState<string>(props.defaultValue);
        const [val2, setVal2] = React.useState<string>();
        useLayoutEffect(() => {
            setVal2(`${val}a`);
        }, [val]);
        return (
            <div>
                <input
                    value={val}
                    onChange={(e) => {
                        setVal(e.target.value);
                    }}
                />
                <label>{val2}</label>
            </div>
        );
    };

    it('correct effect', () => {
        const errorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const { container } = render(<FC defaultValue="test" />);
        expect(container.querySelector('label').textContent).toEqual('testa');

        fireEvent.change(container.querySelector('input'), {
            target: { value: '1' },
        });
        expect(container.querySelector('label').textContent).toEqual('1a');

        fireEvent.change(container.querySelector('input'), {
            target: { value: '2' },
        });
        expect(container.querySelector('label').textContent).toEqual('2a');

        expect(errorSpy).not.toHaveBeenCalled();
        errorSpy.mockRestore();
    });
});
