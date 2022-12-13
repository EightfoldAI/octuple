import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Separator } from '../Separator';
import { separatorClassName, SeparatorProps } from '../Carousel.types';
import { render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

const setup = ({ classNames, id, index, refs }: SeparatorProps) => {
    return render(
        <Separator classNames={classNames} id={id} index={index} refs={refs} />
    );
};

describe('Separator', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });
    afterEach(() => {
        matchMedia.clear();
    });

    const classNames = `${separatorClassName} custom-separator`;

    test('should pass data-key, data-index and classNames attrs', () => {
        const id = 'test1';
        const index = 1.1;
        const refs = {};
        const { container } = setup({ classNames, id, index, refs });

        const child = container.firstChild as HTMLElement;
        expect(child.getAttribute('data-key')).toEqual(id);
        expect(child.getAttribute('data-index')).toEqual(String(index));
        expect(child.getAttribute('class')).toEqual(classNames);
    });

    test('should assign ref to refs', () => {
        const id = 'test1';
        const index = 1.1;
        const refs: any = {};
        setup({ classNames, id, index, refs });

        expect(Object.keys(refs)).toHaveLength(1);
        expect(refs[index].current).toBeTruthy();
    });
});
