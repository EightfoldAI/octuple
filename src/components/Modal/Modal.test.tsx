import React from 'react';
import MatchMediaMock from 'jest-matchmedia-mock';
import { fireEvent, render } from '@testing-library/react';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Modal } from './Modal';
import { IconName } from '../Icon';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Modal', () => {
  let wrapper: ReactWrapper;
  const body = 'This is the modal body';
  const header = 'This is the header';

  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });
  afterEach(() => {
    matchMedia.clear();
  });

  beforeEach(() => {
    wrapper = mount(<Modal visible={false} />);
  });

  test('modal not visible', () => {
    expect(wrapper.hasClass('visible')).not.toEqual(true);
  });

  test('modal visible', () => {
    wrapper.setProps({
      visible: true,
    });
    expect(wrapper.hasClass('visible')).toBe(false);
  });

  test('modal content', () => {
    wrapper.setProps({
      visible: true,
      header,
      body,
    });
    expect(wrapper.find('.body').text()).toBe(body);
    expect(wrapper.find('.header').text()).toBe(header);
  });

  test('modal actions', () => {
    const onClose = jest.fn();
    wrapper.setProps({
      visible: true,
      header,
      body,
      onClose,
    });
    wrapper.find('.button-neutral').at(0).simulate('click');
    wrapper.find('.dialog-backdrop').at(0).simulate('click');

    expect(onClose).toHaveBeenCalledTimes(2);

    wrapper.setProps({
      maskClosable: false,
    });

    wrapper.find('.dialog-backdrop').at(0).simulate('click');
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  test('modal header actions exist', () => {
    const onClose = jest.fn();
    wrapper.setProps({
      visible: true,
      header,
      body,
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

  test('modal no body padding', () => {
    wrapper.setProps({
      visible: true,
      bodyPadding: false,
    });
    expect(wrapper.find('.no-body-padding').length).toBeTruthy();
  });

  test('modal overlay is hidden', () => {
    wrapper.setProps({
      visible: true,
      overlay: false,
    });
    expect(wrapper.find('.modeless').length).toBeTruthy();
  });

  test('closes on Escape', () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <Modal
        visible
        closeOnEscape
        onClose={onClose}
        body={<button>Inside</button>}
      />
    );
    fireEvent.keyDown(getByText('Inside'), { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('leaves Escape to an open popup inside it', () => {
    const onClose = jest.fn();
    const { getByRole } = render(
      <Modal
        visible
        closeOnEscape
        onClose={onClose}
        body={<input role="combobox" aria-expanded="true" aria-label="Stage" />}
      />
    );
    fireEvent.keyDown(getByRole('combobox'), { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  test('only the innermost dialog closes on Escape', () => {
    const onOuterClose = jest.fn();
    const onInnerClose = jest.fn();
    const { getByText } = render(
      <Modal
        visible
        closeOnEscape
        onClose={onOuterClose}
        body={
          <Modal
            visible
            closeOnEscape
            onClose={onInnerClose}
            body={<button>Nested</button>}
          />
        }
      />
    );
    fireEvent.keyDown(getByText('Nested'), { key: 'Escape' });
    expect(onInnerClose).toHaveBeenCalledTimes(1);
    expect(onOuterClose).not.toHaveBeenCalled();
  });

  test('stays open on Escape by default', () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <Modal visible onClose={onClose} body={<button>Inside</button>} />
    );
    fireEvent.keyDown(getByText('Inside'), { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });
});
