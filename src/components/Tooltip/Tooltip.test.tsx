import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Tooltip, TooltipSize } from './';
import {
    fireEvent,
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Tooltip', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });

    afterEach(() => {
        matchMedia.clear();
    });

    test('Tooltip shows and hides', async () => {
        const { container } = render(
            <Tooltip
                content={<div data-testid="tooltip">This is a tooltip.</div>}
            >
                <div className="test-div">test</div>
            </Tooltip>
        );
        fireEvent.mouseOver(container.querySelector('.test-div'));
        await waitFor(() => screen.getByTestId('tooltip'));
        expect(container.querySelector('.tooltip')).toBeTruthy();
        fireEvent.mouseOut(container.querySelector('.test-div'));
        await waitForElementToBeRemoved(() => screen.getByTestId('tooltip'));
        expect(container.querySelector('.tooltip')).toBeFalsy();
    });

    test('Tooltip is large', async () => {
        const { container } = render(
            <Tooltip
                size={TooltipSize.Large}
                content={
                    <div data-testid="tooltipLarge">This is a tooltip.</div>
                }
            >
                <div className="test-div">test</div>
            </Tooltip>
        );
        fireEvent.mouseOver(container.querySelector('.test-div'));
        await waitFor(() => screen.getByTestId('tooltipLarge'));
        expect(container.querySelector('.large')).toBeTruthy();
    });

    test('Tooltip is medium', async () => {
        const { container } = render(
            <Tooltip
                size={TooltipSize.Medium}
                content={
                    <div data-testid="tooltipMedium">This is a tooltip.</div>
                }
            >
                <div className="test-div">test</div>
            </Tooltip>
        );
        fireEvent.mouseOver(container.querySelector('.test-div'));
        await waitFor(() => screen.getByTestId('tooltipMedium'));
        expect(container.querySelector('.medium')).toBeTruthy();
    });

    test('Tooltip is small', async () => {
        const { container } = render(
            <Tooltip
                size={TooltipSize.Small}
                content={
                    <div data-testid="tooltipSmall">This is a tooltip.</div>
                }
            >
                <div className="test-div">test</div>
            </Tooltip>
        );
        fireEvent.mouseOver(container.querySelector('.test-div'));
        await waitFor(() => screen.getByTestId('tooltipSmall'));
        expect(container.querySelector('.small')).toBeTruthy();
    });

    test('Tooltip is portaled', async () => {
        const { container } = render(
            <>
                <Tooltip
                    portal
                    content={
                        <div data-testid="tooltipPortaled">
                            This is a tooltip.
                        </div>
                    }
                >
                    <div className="test-div">test</div>
                </Tooltip>
            </>,
            { container: document.body }
        );
        fireEvent.mouseOver(container.querySelector('.test-div'));
        await waitFor(() => screen.getByTestId('tooltipPortaled'));
        expect(container.querySelector('.tooltip')).toBeTruthy();
    });

    test('Tooltip is portaled in a defined root element', async () => {
        const { container } = render(
            <>
                <Tooltip
                    portal
                    portalRoot={document.body}
                    content={
                        <div data-testid="tooltipPortaled">
                            This is a tooltip.
                        </div>
                    }
                >
                    <div className="test-div">test</div>
                </Tooltip>
            </>,
            { container: document.body }
        );
        fireEvent.mouseOver(container.querySelector('.test-div'));
        await waitFor(() => screen.getByTestId('tooltipPortaled'));
        expect(container.querySelector('.tooltip')).toBeTruthy();
    });
});
