import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { MenuItems } from '../MenuItems';
import { render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

const items = ['test1', 'test2'];
const children = items.map((item) => {
    return (
        <div data-testid={item} key={item} id={item}>
            {item}
        </div>
    );
});

type mockProps = {
    refs: any;
    itemClassNames?: string;
    separatorClassNames?: string;
};
const setup = ({ refs, itemClassNames, separatorClassNames }: mockProps) => {
    return render(
        <MenuItems
            itemClassNames={itemClassNames}
            separatorClassNames={separatorClassNames}
            refs={refs}
        >
            {children}
        </MenuItems>
    );
};

describe('MenuItems', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });
    afterEach(() => {
        matchMedia.clear();
    });

    test('should render children with separators', () => {
        const refs = { current: 'test123' };
        const itemClassNames = 'item-123';
        const separatorClassNames = 'sep-123';
        const { container } = setup({
            itemClassNames,
            separatorClassNames,
            refs,
        });

        const renderedChildren = container.childNodes;
        expect(renderedChildren).toHaveLength(3);

        const isOdd = (number: number) => !!(number % 2);
        const isEven = (number: number) => !isOdd(number);

        renderedChildren.forEach((_child, ind) => {
            const child = _child as HTMLElement;
            if (isEven(ind)) {
                const item = items[Math.floor(ind / 2)];
                expect(+child.getAttribute('data-index')!).toEqual(
                    +item.replace(/\D/g, '') - 1
                );
                expect(child.childNodes).toHaveLength(1);
                expect(child.classList.contains(itemClassNames)).toBe(true);
            } else {
                const item = items[Math.floor(ind / 2)];
                expect(child.classList.contains(separatorClassNames)).toBe(
                    true
                );
                expect(+child.getAttribute('data-index')!).toEqual(
                    +String(item).replace(/\D/g, '') - 1 + 0.1
                );
            }
        });
    });
});
