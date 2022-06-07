import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import useState from './useState';

describe('useState', () => {
    it('not throw', (done) => {
        const errorSpy = jest.spyOn(console, 'error');

        const Demo = () => {
            const [val, setValue] = useState(0);

            React.useEffect(
                () => () => {
                    setTimeout(() => {
                        setValue(1, true);
                    }, 0);
                },
                []
            );

            return (
                <button
                    onClick={() => {
                        setValue(93, true);
                    }}
                >
                    {val}
                </button>
            );
        };

        const { container, unmount } = render(
            <React.StrictMode>
                <Demo />
            </React.StrictMode>
        );
        expect(container.querySelector('button').textContent).toEqual('0');

        // Update Value
        fireEvent.click(container.querySelector('button'));
        expect(container.querySelector('button').textContent).toEqual('93');

        unmount();

        setTimeout(() => {
            expect(errorSpy).not.toHaveBeenCalled();
            done();
        }, 50);
    });

    // This test no need in React 18 anymore
    it.skip('throw', (done) => {
        const errorSpy = jest.spyOn(console, 'error');

        const Demo = (): any => {
            const [val, setValue] = useState(0);

            React.useEffect(
                () => () => {
                    setTimeout(() => {
                        setValue(1);
                    }, 0);
                },
                []
            );

            return null;
        };

        const { unmount } = render(<Demo />);
        unmount();

        setTimeout(() => {
            expect(errorSpy).toHaveBeenCalled();
            done();
        }, 50);
    });
});
