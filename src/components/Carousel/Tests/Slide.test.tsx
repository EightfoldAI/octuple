import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Carousel, CarouselSize, Slide } from '..';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Slide', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });
  afterEach(() => {
    matchMedia.clear();
  });

  test('loads and displays Carousel component', () => {
    const { container } = render(
      <Carousel controls pagination>
        <Slide classNames="slide-1">Slide-1</Slide>
        <Slide classNames="slide-2">Slide-2</Slide>
        <Slide classNames="slide-3">Slide-3</Slide>
      </Carousel>
    );
    const carousel = container.querySelector('.carousel');

    const slide1 = container.querySelector('.slide-1');
    const slide2 = container.querySelector('.slide-2');
    const slide3 = container.querySelector('.slide-3');

    expect(carousel).toHaveClass('carousel carousel-slider');
    if (carousel === null) {
      expect(true).toBe(false);
    } else {
      expect(carousel.children[0]).toHaveClass('carousel-pagination');
      expect(carousel.children[1]).toHaveClass('carousel-inner');
    }

    expect(slide1).toHaveClass('carousel-slide');
    expect(slide2).toHaveClass('carousel-slide');
    expect(slide3).toHaveClass('carousel-slide');

    let button = container.querySelector('.carousel-next');
    if (button === null) {
      expect(true).toBe(false);
    } else {
      expect(button.firstChild).toHaveClass('icon');
    }
    button = container.querySelector('.carousel-previous');
    if (button === null) {
      expect(true).toBe(false);
    } else {
      expect(button.firstChild).toHaveClass('icon');
    }

    expect(container).toMatchSnapshot();
  });

  test('Carousel click on pagination', () => {
    const { container } = render(
      <Carousel controls pagination>
        <Slide classNames="slide-1">Slide-1</Slide>
        <Slide classNames="slide-2">Slide-2</Slide>
        <Slide classNames="slide-3">Slide-3</Slide>
      </Carousel>
    );
    const slide1 = container.querySelector('.slide-1');
    const slide2 = container.querySelector('.slide-2');

    expect(slide1).toHaveClass('active');
    expect(slide1).toHaveClass('carousel-slide');
    expect(slide2.classList.contains('active')).toBe(false);
    expect(slide2).toHaveClass('carousel-slide');

    const pagination = container.querySelector('.carousel-pagination');
    pagination && fireEvent.click(container.querySelector('.pagination-next'));
    fireEvent.transitionEnd(slide1);
    fireEvent.transitionEnd(slide2);

    expect(slide1.classList.contains('active')).toBe(false);
    expect(slide2.classList.contains('active')).toBe(true);

    pagination &&
      fireEvent.click(container.querySelector('.pagination-previous'));
    fireEvent.transitionEnd(slide2);
    fireEvent.transitionEnd(slide1);

    expect(slide1.classList.contains('active')).toBe(true);
    expect(slide2.classList.contains('active')).toBe(false);
  });

  test('Carousel click on next button', () => {
    jest.useFakeTimers();
    const { container } = render(
      <Carousel controls pagination>
        <Slide classNames="slide-1">Slide-1</Slide>
        <Slide classNames="slide-2">Slide-2</Slide>
        <Slide classNames="slide-3">Slide-3</Slide>
      </Carousel>
    );
    const slide1 = container.querySelector('.slide-1');
    const slide2 = container.querySelector('.slide-2');

    expect(slide1).toHaveClass('active');
    expect(slide1).toHaveClass('carousel-slide');
    expect(slide2.classList.contains('active')).toBe(false);
    expect(slide2).toHaveClass('carousel-slide');

    const buttonNext = container.querySelector('.carousel-next');
    buttonNext && fireEvent.click(buttonNext);
    fireEvent.transitionEnd(slide1);
    fireEvent.transitionEnd(slide2);

    expect(slide2).toHaveClass('active');
    expect(slide2).toHaveClass('carousel-slide');
    expect(slide1.classList.contains('active')).toBe(false);
    expect(slide1).toHaveClass('carousel-slide');
  });

  test('Carousel click on previous button', () => {
    jest.useFakeTimers();
    const { container } = render(
      <Carousel controls pagination>
        <Slide classNames="slide-1">Slide-1</Slide>
        <Slide classNames="slide-2">Slide-2</Slide>
        <Slide classNames="slide-3">Slide-3</Slide>
      </Carousel>
    );
    const slide1 = container.querySelector('.slide-1');
    const slide3 = container.querySelector('.slide-3');

    expect(slide1).toHaveClass('active');
    expect(slide1).toHaveClass('carousel-slide');
    expect(slide3.classList.contains('active')).toBe(false);
    expect(slide3).toHaveClass('carousel-slide');

    const buttonPrev = container.querySelector('.carousel-previous');
    buttonPrev && fireEvent.click(buttonPrev);
    fireEvent.transitionEnd(slide1);
    fireEvent.transitionEnd(slide3);

    expect(slide3).toHaveClass('active');
    expect(slide3).toHaveClass('carousel-slide');
    expect(slide1.classList.contains('active')).toBe(false);
    expect(slide1).toHaveClass('carousel-slide');
  });

  test('Carousel default size is large', () => {
    const { container } = render(
      <Carousel controls pagination>
        <Slide classNames="slide-1">Slide-1</Slide>
        <Slide classNames="slide-2">Slide-2</Slide>
        <Slide classNames="slide-3">Slide-3</Slide>
      </Carousel>
    );
    const buttonNext = container.querySelector('.carousel-next');
    const carousel = container.querySelector('.carousel');
    const buttonPrev = container.querySelector('.carousel-previous');

    expect(carousel).toHaveClass('carousel-large');
    expect(buttonNext).toHaveClass('button-large');
    expect(buttonPrev).toHaveClass('button-large');
  });

  test('Carousel size is medium', () => {
    const { container } = render(
      <Carousel controls pagination size={CarouselSize.Medium}>
        <Slide classNames="slide-1">Slide-1</Slide>
        <Slide classNames="slide-2">Slide-2</Slide>
        <Slide classNames="slide-3">Slide-3</Slide>
      </Carousel>
    );
    const buttonNext = container.querySelector('.carousel-next');
    const carousel = container.querySelector('.carousel');
    const buttonPrev = container.querySelector('.carousel-previous');

    expect(carousel).toHaveClass('carousel-medium');
    expect(buttonNext).toHaveClass('button-medium');
    expect(buttonPrev).toHaveClass('button-medium');
  });

  test('Carousel size is small', () => {
    const { container } = render(
      <Carousel controls pagination size={CarouselSize.Small}>
        <Slide classNames="slide-1">Slide-1</Slide>
        <Slide classNames="slide-2">Slide-2</Slide>
        <Slide classNames="slide-3">Slide-3</Slide>
      </Carousel>
    );
    const buttonNext = container.querySelector('.carousel-next');
    const carousel = container.querySelector('.carousel');
    const buttonPrev = container.querySelector('.carousel-previous');

    expect(carousel).toHaveClass('carousel-small');
    expect(buttonNext).toHaveClass('button-small');
    expect(buttonPrev).toHaveClass('button-small');
  });

  test('Carousel renders only React elements', () => {
    const { container } = render(
      <Carousel controls={false} pagination={false}>
        <Slide classNames="slide-1">Slide-1</Slide>
        <Slide classNames="slide-2">Slide-2</Slide>
        <Slide classNames="slide-3">Slide-3</Slide>
        {/* The below elements will not be rendered */}
        {'Invalid Element'}
        {42}
        {true}
        {false}
      </Carousel>
    );
    const carousel = container.querySelector('.carousel');
    const carouselInner = carousel.children[0];
    expect(carouselInner.children.length).toBe(3);
  });
});
