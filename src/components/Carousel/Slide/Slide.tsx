'use client';

import React, { FC, Ref, useContext, useEffect, useState, useRef } from 'react';
import { CarouselContext, CarouselSlideProps } from '../Carousel.types';
import { useForkedRef } from '../../../hooks/useForkedRef';
import { mergeClasses } from '../../../shared/utilities';

import styles from '../carousel.module.scss';

export const SLIDE_TRANSITION_DURATION: number = 200;

export const Slide: FC<CarouselSlideProps> = React.forwardRef(
  (props: CarouselSlideProps, ref: Ref<HTMLDivElement>) => {
    const {
      active,
      children,
      classNames,
      direction,
      interval = false,
      ...rest
    } = props;
    const { setAnimating, setCustomInterval } = useContext(CarouselContext);
    const carouselSlideRef: React.MutableRefObject<HTMLDivElement> =
      useRef<HTMLDivElement>(null);
    const forkedRef: (node: any) => void = useForkedRef(ref, carouselSlideRef);

    const prevActive: React.MutableRefObject<boolean> = useRef<boolean>();
    const [directionClassName, setDirectionClassName] = useState<string>();
    const [orderClassName, setOrderClassName] = useState<string>();
    const [activeClassName, setActiveClassName] = useState<string>(
      active && styles.active
    );
    const [count, setCount] = useState(0);

    useEffect((): void => {
      if (active) {
        setCustomInterval(interval);
        if (count !== 0)
          setOrderClassName((styles as any)[`carousel-slide-${direction}`]);
      }

      if (prevActive.current && !active) {
        setActiveClassName(styles.active);
      }

      if (active || prevActive.current) {
        setTimeout(() => {
          if (count !== 0) {
            setDirectionClassName(
              (styles as any)[
                `carousel-slide-${direction === 'next' ? 'start' : 'end'}`
              ]
            );
          }
        }, SLIDE_TRANSITION_DURATION);
      }

      prevActive.current = active;

      if (count === 0) setCount(count + 1);
    }, [active]);

    useEffect(() => {
      carouselSlideRef.current?.addEventListener('transitionstart', () => {
        active && setAnimating(true);
      });
      carouselSlideRef.current?.addEventListener('transitionend', () => {
        active && setAnimating(false);
        setDirectionClassName('');
        setOrderClassName('');
        if (active) {
          setActiveClassName(styles.active);
        }
        if (!active) {
          setActiveClassName('');
        }
      });
      return () => {
        carouselSlideRef.current?.removeEventListener('transitionstart', () => {
          active && setAnimating(true);
        });
        carouselSlideRef.current?.removeEventListener('transitionend', () => {
          active && setAnimating(false);
          setDirectionClassName('');
          setOrderClassName('');
          if (active) {
            setActiveClassName(styles.active);
          }
          if (!active) {
            setActiveClassName('');
          }
        });
      };
    });

    const slideClassNames: string = mergeClasses([
      styles.carouselSlide,
      activeClassName,
      directionClassName,
      orderClassName,
      classNames,
    ]);

    return (
      <div className={slideClassNames} ref={forkedRef} {...rest}>
        {children}
      </div>
    );
  }
);
