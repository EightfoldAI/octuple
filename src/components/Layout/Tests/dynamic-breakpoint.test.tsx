import React, { useState } from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Aside } from '../Aside';
import { render, fireEvent } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

const Content = () => {
    const [breakpoint, setBreakpoint] = useState('sm');
    const toggleBreakpoint = () => {
        if (breakpoint === 'sm') {
            setBreakpoint('lg');
        } else {
            setBreakpoint('sm');
        }
    };
    return (
        <Aside breakpoint={breakpoint as any}>
            <button type="button" id="toggle" onClick={toggleBreakpoint}>
                Toggle
            </button>
        </Aside>
    );
};

describe('Breakpoints', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });

    afterEach(() => {
        matchMedia.clear();
    });

    test('Dynamic breakpoint in Aside component', () => {
        const add = jest.fn();
        const remove = jest.fn();
        const newMatch = jest.spyOn(window, 'matchMedia').mockReturnValue({
            matches: true,
            addEventListener: add,
            removeEventListener: remove,
        } as any);

        const { container } = render(<Content />);

        // Record here since React 18 strict mode will render twice at first mount
        const originCallTimes = newMatch.mock.calls.length;
        expect(originCallTimes <= 2).toBeTruthy();

        // subscribe at first
        expect(add.mock.calls).toHaveLength(originCallTimes);
        expect(remove.mock.calls).toHaveLength(originCallTimes - 1);

        fireEvent.click(container.querySelector('#toggle') as Element);

        expect(newMatch.mock.calls).toHaveLength(originCallTimes + 1);
        expect(add.mock.calls).toHaveLength(originCallTimes + 1);
        expect(remove.mock.calls).toHaveLength(originCallTimes);

        jest.restoreAllMocks();
    });
});
