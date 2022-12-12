import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { ScrollContainer } from '../ScrollContainer';
import { ScrollContainerProps } from '../Carousel.types';
import { act, fireEvent, render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

const setup = ({ classNames, ref, onScroll }: ScrollContainerProps) => {
    return render(
        <ScrollContainer classNames={classNames} onScroll={onScroll} ref={ref}>
            Child
        </ScrollContainer>
    );
};

describe('ScrollContainer', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });
    afterEach(() => {
        matchMedia.clear();
    });

    describe('classNames', () => {
        test('default', () => {
            const ref: React.Ref<HTMLUListElement> = { current: null };
            const { container } = setup({ ref });

            expect(
                container.firstElementChild.classList.contains(
                    'carousel-auto-scroll-container'
                )
            ).toBeTruthy();
        });

        test('custom', () => {
            const classNames = 'test123';

            const ref: React.Ref<HTMLUListElement> = { current: null };
            const { container } = setup({ classNames, ref });

            expect(
                container.firstElementChild.classList.contains(
                    'carousel-auto-scroll-container'
                )
            ).toBeTruthy();
            expect(
                container.firstElementChild.classList.contains(classNames)
            ).toBeTruthy();
        });
    });

    test('should render children and use ref', () => {
        const ref: React.Ref<HTMLUListElement> = { current: null };
        const { container, getByText } = setup({ ref });

        expect(ref.current).toEqual(container.firstElementChild);
        expect(getByText('Child')).toBeTruthy();
    });

    test.skip('should fire onScroll', () => {
        const onScroll = jest.fn();
        const ref: React.Ref<HTMLUListElement> = { current: null };
        const { container } = setup({ onScroll, ref });

        expect(onScroll).toHaveBeenCalledTimes(0);
        act(() => {
            fireEvent.scroll(container.firstElementChild);
        });

        expect(onScroll).toHaveBeenCalledTimes(1);
    });
});
