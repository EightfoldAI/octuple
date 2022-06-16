import React from 'react';
import { render } from '@testing-library/react';
import { useMergedState } from './useMergedState';

describe('useMergedState', () => {
    const FC = (props: { value?: string; defaultValue?: string }) => {
        const { value, defaultValue } = props;
        const [val, setVal] = useMergedState(null, { value, defaultValue });
        return (
            <input
                value={val}
                onChange={(e) => {
                    setVal(e.target.value);
                }}
            />
        );
    };

    it('still control of to undefined', () => {
        const { container, rerender } = render(<FC value="test" />);

        expect(container.querySelector('input').value).toEqual('test');

        rerender(<FC value={undefined} />);
        expect(container.querySelector('input').value).toEqual('test');
    });

    it('correct defaultValue', () => {
        const { container } = render(<FC defaultValue="test" />);

        expect(container.querySelector('input').value).toEqual('test');
    });

    it('not rerender when setState as deps', () => {
        let renderTimes = 0;

        const Test = () => {
            const [val, setVal] = useMergedState(0);

            React.useEffect(() => {
                renderTimes += 1;
                expect(renderTimes < 10).toBeTruthy();

                setVal(1);
            }, [setVal]);

            return <div>{val}</div>;
        };

        const { container } = render(<Test />);
        expect(container.firstChild.textContent).toEqual('1');
    });

    it('React 18 should not reset to undefined', () => {
        const Demo = () => {
            const [val] = useMergedState(33, { value: undefined });

            return <div>{val}</div>;
        };

        const { container } = render(
            <React.StrictMode>
                <Demo />
            </React.StrictMode>
        );

        expect(container.querySelector('div').textContent).toEqual('33');
    });

    it('postState', () => {
        const Demo = () => {
            const [val] = useMergedState(1, { postState: (v) => v * 2 });

            return <div>{val}</div>;
        };

        const { container } = render(
            <React.StrictMode>
                <Demo />
            </React.StrictMode>
        );

        expect(container.querySelector('div').textContent).toEqual('2');
    });
});
