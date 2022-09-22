import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { MatchScore } from './';
import { render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('MatchScore', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });

    afterEach(() => {
        matchMedia.clear();
    });

    test('MatchScore is default', () => {
        const { container } = render(<MatchScore score={3} total={5} />);
        expect(container.querySelector('.match-score-container')).toBeTruthy();
    });

    test('MatchScore has hidden label', () => {
        const { container } = render(
            <MatchScore hideLabel score={3} total={5} />
        );
        expect(container.querySelector('.label')).toBeFalsy();
    });

    test('MatchScore has custom label', () => {
        const { container } = render(
            <MatchScore label={'Some label'} score={3} total={5} />
        );
        expect(container.querySelector('.label').textContent).toContain(
            'Some label'
        );
    });

    test('MatchScore has custom label with hidden score', () => {
        const { container } = render(
            <MatchScore hideValues label={'Some label'} score={3} total={5} />
        );
        expect(container.querySelector('.label').textContent).toBe(
            'Some label '
        );
    });
});
