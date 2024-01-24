import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Carousel } from '..';
import { Card } from '../../Card';
import { ButtonShape } from '../../Button';
import { useIntersectionObserver } from '../Hooks/useIntersectionObserver';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

jest.mock('../Hooks/useIntersectionObserver');

interface SampleItem {
  name: string;
  key: string;
}

const sampleList: SampleItem[] = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
  name: `test${i}`,
  key: `key${i}`,
}));
// eslint-disable-next-line radar/no-duplicate-string
const defaultItemsWithSeparators = [
  'test1',
  'item1-separator',
  'test2',
  'item2-separator',
  'test3',
  'item3-separator',
  'test4',
  'item4-separator',
  'test5',
  'item5-separator',
  'test6',
  'item6-separator',
  'test7',
  'item7-separator',
  'test8',
];

describe('Scroll', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });
  afterEach(() => {
    matchMedia.clear();
  });

  test('Carousel button props', () => {
    (useIntersectionObserver as jest.Mock).mockReturnValue({
      visibleElementsWithSeparators: defaultItemsWithSeparators,
    });
    const { container } = render(
      <Carousel
        carouselScrollMenuProps={{
          children: sampleList.map((item: SampleItem) => (
            <Card bordered height={344} key={item.key} tabIndex={0} width={280}>
              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  height: '100%',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                {item.name}
              </div>
            </Card>
          )),
          containerPadding: 8,
          gap: 24,
        }}
        nextButtonProps={{ shape: ButtonShape.Round }}
        previousButtonProps={{ shape: ButtonShape.Round }}
        type="scroll"
      />
    );
    const buttonNext = container.querySelector('.carousel-next');
    const buttonPrevious = container.querySelector('.carousel-previous');

    expect(buttonNext).toHaveClass('round-shape');
    expect(buttonPrevious).toHaveClass('round-shape');

    expect(container).toMatchSnapshot();
  });
});
