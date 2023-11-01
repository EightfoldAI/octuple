import React from 'react';
import MatchMediaMock from 'jest-matchmedia-mock';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import { Dialog } from './Dialog';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Dialog', () => {
  let wrapper: ReactWrapper;
  const body = 'This is the dialog body';
  const header = 'This is the header';

  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });
  afterEach(() => {
    matchMedia.clear();
  });

  beforeEach(() => {
    wrapper = mount(<Dialog visible={false} />);
  });

  test('dialog not visible', () => {
    expect(wrapper.hasClass('visible')).not.toEqual(true);
  });

  test('dialog visible', () => {
    wrapper.setProps({
      visible: true,
    });
    expect(wrapper.hasClass('visible')).toBe(false);
  });

  test('dialog content', () => {
    wrapper.setProps({
      visible: true,
      header,
      body,
    });
    expect(wrapper.find('.body').text()).toBe(body);
    expect(wrapper.find('.header').text()).toBe(header);
  });

  test('dialog actions', () => {
    const onOk = jest.fn();
    const onCancel = jest.fn();
    const onClose = jest.fn();
    wrapper.setProps({
      visible: true,
      header,
      body,
      okButtonProps: {
        text: 'ok',
      },
      cancelButtonProps: {
        text: 'Cancel',
      },
      onOk,
      onCancel,
      onClose,
    });
    wrapper.find('.footer .button-primary').at(0).simulate('click');
    wrapper.find('.footer .button-neutral').at(0).simulate('click');
    wrapper.find('.button-neutral').at(0).simulate('click');
    wrapper.find('.dialog-backdrop').at(0).simulate('click');

    expect(onOk).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(2);

    wrapper.setProps({
      maskClosable: false,
    });

    wrapper.find('.dialog-backdrop').at(0).simulate('click');
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  test('dialog no body padding', () => {
    wrapper.setProps({
      visible: true,
      bodyPadding: false,
    });
    expect(wrapper.find('.no-body-padding').length).toBeTruthy();
  });

  test('dialog overlay is hidden', () => {
    wrapper.setProps({
      visible: true,
      overlay: false,
    });
    expect(wrapper.find('.modeless').length).toBeTruthy();
  });

  test('Should render content when renderContentAlways is true', () => {
    wrapper.setProps({
      header,
      body,
    });
    expect(wrapper.find('.body').contains('This is the dialog body')).toBe(
      true
    );
  });

  test('Should not render content when renderContentAlways is false', () => {
    wrapper.setProps({
      header,
      body,
      renderContentAlways: false,
    });
    expect(wrapper.find('.body').contains('This is the dialog body')).toBe(
      false
    );
  });
});
