import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Avatar, AvatarGroup } from './';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Avatar', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Should render', () => {
    const wrapper = mount(<Avatar>AB</Avatar>);
    expect(wrapper.children().length).toEqual(1);
  });

  test('Avatar type square is default', () => {
    const wrapper = mount(<Avatar>AB</Avatar>);
    expect(wrapper.find('.avatar').hasClass('round-image')).toBeFalsy();
    expect(wrapper.render()).toMatchSnapshot();
  });

  test('Avatar type is round', () => {
    const wrapper = mount(<Avatar type={'round'}>AB</Avatar>);
    expect(wrapper.find('.round-image')).toBeTruthy();
    expect(wrapper.render()).toMatchSnapshot();
  });

  test('Avatar size is 40px', () => {
    const wrapper = mount(<Avatar size={'40px'}>AB</Avatar>);
    expect(wrapper.render()).toMatchSnapshot();
  });

  test('Should render a group', () => {
    const wrapper = mount(
      <AvatarGroup>
        <Avatar>AB</Avatar>
        <Avatar>CD</Avatar>
        <Avatar>EF</Avatar>
        <Avatar>GH</Avatar>
      </AvatarGroup>
    );
    expect(wrapper.children().length).toEqual(1);
  });

  test('Should render a list group', () => {
    const imageProps = {
      src: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
      alt: 'random profile image',
    };

    interface User {
      'data-test-id': string;
      alt: string;
      children: React.ReactNode;
      classNames: string;
      img: string;
      key: string;
      name: string;
      randomiseTheme: boolean;
    }

    const sampleList: User[] = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ].map((i) => ({
      'data-test-id': `my-avatar-test-id-${i}`,
      alt: i === 1 ? imageProps.alt : null,
      children: `U${i}`,
      classNames: `my-avatar-class-${i}`,
      img: i === 1 ? imageProps.src : null,
      key: `key-${i}`,
      name: `User ${i}`,
      randomiseTheme: true,
    }));
    const wrapper = mount(
      <AvatarGroup
        avatarListProps={{
          items: sampleList,
          renderItem: (item: User) => (
            <Avatar
              alt={item.alt}
              classNames={item.classNames}
              data-test-id={item['data-test-id']}
              hashingFunction={() => 3}
              randomiseTheme={item.randomiseTheme}
              src={item.img}
            >
              {item.children}
            </Avatar>
          ),
        }}
      />
    );
    expect(wrapper.children().length).toEqual(1);
  });

  test('Should render a list group with max count', () => {
    const imageProps = {
      src: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
      alt: 'random profile image',
    };

    interface User {
      'data-test-id': string;
      alt: string;
      children: React.ReactNode;
      classNames: string;
      img: string;
      key: string;
      name: string;
      randomiseTheme: boolean;
    }

    const sampleList: User[] = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ].map((i) => ({
      'data-test-id': `my-avatar-test-id-${i}`,
      alt: i === 1 ? imageProps.alt : null,
      children: `U${i}`,
      classNames: `my-avatar-class-${i}`,
      img: i === 1 ? imageProps.src : null,
      key: `key-${i}`,
      name: `User ${i}`,
      randomiseTheme: true,
    }));
    const wrapper = mount(
      <AvatarGroup
        avatarListProps={{
          items: sampleList,
          renderItem: (item: User) => (
            <Avatar
              alt={item.alt}
              classNames={item.classNames}
              data-test-id={item['data-test-id']}
              hashingFunction={() => 3}
              randomiseTheme={item.randomiseTheme}
              src={item.img}
            >
              {item.children}
            </Avatar>
          ),
        }}
        maxProps={{
          count: 24,
        }}
      />
    );
    expect(wrapper.children().length).toEqual(1);
  });
});
