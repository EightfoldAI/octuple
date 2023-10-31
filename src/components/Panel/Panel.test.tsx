import React from 'react';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Panel } from './';
import { Button, ButtonVariant } from '../Button';
import { IconName } from '../Icon';
import { render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Panel', () => {
  let wrapper: ReactWrapper;
  const body: string = 'This is the panel body';
  const title: string = 'This is the title';
  const footer: JSX.Element = (
    <div>
      <Button text={'Close'} variant={ButtonVariant.Primary} />
    </div>
  );

  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });
  afterEach(() => {
    matchMedia.clear();
  });

  beforeEach(() => {
    wrapper = mount(
      <Panel footer={footer} visible={false}>
        <div>{body}</div>
      </Panel>
    );
  });

  test('Panel visibility', () => {
    expect(wrapper.hasClass('visible')).not.toEqual(true);
    wrapper.setProps({
      visible: true,
    });
    expect(wrapper.hasClass('visible')).toBe(false);
  });

  test('Panel content', () => {
    wrapper.setProps({
      visible: true,
      title,
      body,
    });
    expect(wrapper.find('.body').text()).toBe(body);
    expect(wrapper.find('.header').text()).toBe(title);
  });

  test('Panel actions', () => {
    const onClose = jest.fn();
    wrapper.setProps({
      visible: true,
      onClose,
    });
    wrapper.find('.panel-backdrop').at(0).simulate('click');

    wrapper.find('.button-neutral').at(0).simulate('click');
    expect(onClose).toHaveBeenCalledTimes(2);

    wrapper.setProps({
      maskClosable: false,
    });
    wrapper.find('.panel-backdrop').at(0).simulate('click');
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  test('Panel header actions exist', () => {
    wrapper.setProps({
      visible: true,
      headerButtonProps: {
        classNames: 'header-button',
        iconProps: { path: IconName.mdiArrowLeftThick },
      },
      actionButtonOneProps: {
        classNames: 'header-action-button-1',
        iconProps: { path: IconName.mdiCogOutline },
      },
      actionButtonTwoProps: {
        classNames: 'header-action-button-2',
        iconProps: { path: IconName.mdiHistory },
      },
      actionButtonThreeProps: {
        classNames: 'header-action-button-3',
        iconProps: { path: IconName.mdiDatabaseArrowDownOutline },
      },
    });
    expect(wrapper.find('.header-button').length).toBeTruthy();
    expect(wrapper.find('.header-action-button-1').length).toBeTruthy();
    expect(wrapper.find('.header-action-button-2').length).toBeTruthy();
    expect(wrapper.find('.header-action-button-3').length).toBeTruthy();
  });

  test('Panel no body padding', () => {
    wrapper.setProps({
      visible: true,
      bodyPadding: false,
    });
    expect(wrapper.find('.no-body-padding').length).toBeTruthy();
    expect(wrapper.render()).toMatchSnapshot();
  });

  test('Panel no header padding', () => {
    wrapper.setProps({
      visible: true,
      headerPadding: false,
    });
    expect(wrapper.find('.no-header-padding').length).toBeTruthy();
    expect(wrapper.render()).toMatchSnapshot();
  });

  test('Panel no body and header padding', () => {
    wrapper.setProps({
      visible: true,
      bodyPadding: false,
      headerPadding: false,
    });
    expect(wrapper.find('.no-body-padding').length).toBeTruthy();
    expect(wrapper.find('.no-header-padding').length).toBeTruthy();
    expect(wrapper.render()).toMatchSnapshot();
  });

  test('Panel overlay is hidden', () => {
    wrapper.setProps({
      visible: true,
      overlay: false,
    });
    expect(wrapper.find('.modeless').length).toBeTruthy();
  });

  test('Panel footer', () => {
    wrapper.setProps({
      visible: true,
      title,
      body,
      footer,
    });
    expect(wrapper.find('.footer')).toBeTruthy();
    expect(wrapper.find('.button-primary').text()).toBe('Close');
  });

  test('Should render content when renderContentAlways is true', () => {
    const { getByText } = render(
      <Panel renderContentAlways>
        <div>Content is always rendered</div>
      </Panel>
    );
    expect(getByText('Content is always rendered')).toBeTruthy();
  });

  test('Should not render content when renderContentAlways is false', () => {
    const { queryByText } = render(
      <Panel renderContentAlways={false}>
        <div>Content is not always rendered</div>
      </Panel>
    );
    expect(queryByText('Content is not always rendered')).toBeNull();
  });
});
