import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Button } from '../Button';
import { Skeleton } from './Skeleton';
import {
  SkeletonAnimation,
  SkeletonProps,
  SkeletonVariant,
} from './Skeleton.types';
import { render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

const skeletonProps: SkeletonProps = {
  animating: true,
  animation: SkeletonAnimation.Wave,
};

describe('Skeleton', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Renders without crashing', () => {
    const { container } = render(
      <Skeleton {...skeletonProps} variant={SkeletonVariant.Pill}>
        <Button text={'Sample button'} />
      </Skeleton>
    );
    const skeleton = container.getElementsByClassName('skeleton');
    expect(() => container).not.toThrowError();
    expect(skeleton).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
