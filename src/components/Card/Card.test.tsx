import React from 'react';
import MatchMediaMock from 'jest-matchmedia-mock';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Card } from './Card';
import { IconName } from '../Icon';
import { render } from '@testing-library/react';
import { CardSize } from './Card.types';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Card', () => {
  let wrapper: ReactWrapper;
  const footer = 'This is the card footer';
  const body = 'This is the card body';
  const header = 'This is the card header';

  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });
  afterEach(() => {
    matchMedia.clear();
  });

  beforeEach(() => {
    wrapper = mount(<Card />);
  });

  test('card content', () => {
    wrapper.setProps({
      footer,
      header,
      body,
    });
    expect(wrapper.find('.footer').text()).toBe(footer);
    expect(wrapper.find('.body').text()).toBe(body);
    expect(wrapper.find('.header').text()).toBe(header);
  });

  test('card header actions exist', () => {
    wrapper.setProps({
      footer,
      header,
      body,
      headerButtonProps: {
        classNames: 'header-button',
        iconProps: { path: IconName.mdiArrowLeftThick },
      },
    });
    expect(wrapper.find('.header-button').length).toBeTruthy();
  });

  test('Card is large', () => {
    const { container } = render(
      <Card body={body} footer={footer} header={header} size={CardSize.Large} />
    );
    expect(container.getElementsByClassName('card-large')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Card is medium', () => {
    const { container } = render(
      <Card
        body={body}
        footer={footer}
        header={header}
        size={CardSize.Medium}
      />
    );
    expect(container.getElementsByClassName('card-medium')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });

  test('Card is small', () => {
    const { container } = render(
      <Card body={body} footer={footer} header={header} size={CardSize.Small} />
    );
    expect(container.getElementsByClassName('card-small')).toHaveLength(1);
    expect(container).toMatchSnapshot();
  });
});
