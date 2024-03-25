import { useCallback, useRef, useState } from 'react';
import { defaultSnapBreakPoints } from '../utils';

import styles from '../drawer.module.scss';

export const ANIMATION_DURATION: number = 200;

export const useDrawer = ({
  initialPlacement = 0,
  initialVisibility = false,
  snapBreakPoints = defaultSnapBreakPoints,
}) => {
  const [deltaY, setDeltaY] = useState<number>(initialPlacement);
  const [drawerLevel, setLevel] = useState<number>(initialPlacement);
  const [drawerVisible, setVisible] = useState<boolean>(initialVisibility);
  const [startPoint, setStartPoint] = useState(null);
  const [isSnapped, setIsSnapped] = useState(
    snapBreakPoints?.[initialPlacement]?.position || {}
  );

  // Defaults to a transparent pixel.
  // https://www.sam.today/blog/html5-dnd-globe-icon
  // Thanks to Sam Parkinson for the tip!
  const img: HTMLImageElement = new Image(1, 1);
  img.src =
    'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

  const drawerRef: React.MutableRefObject<HTMLDivElement> = useRef(null);

  // INFO: When user starts swiping the drawer (drag/touch),
  // Capture initial touch point
  // Also set .expand-content so that the drawer always takes up full space since transform is being used
  const onSwipeStart = useCallback(
    (e): void => {
      if (!drawerRef.current) return;
      const clientY = e?.touches?.[0]?.clientY || e?.clientY || null;
      if (clientY !== null && drawerRef.current) {
        setStartPoint(clientY);
        if (!drawerRef.current.classList.contains(styles.expandContent)) {
          drawerRef.current.classList.add(styles.expandContent);
        }
      }

      if (e?.dataTransfer && img?.complete) {
        e.dataTransfer.setDragImage(img, 0, 0);
      }
    },
    [drawerRef.current]
  );

  // INFO: When user is swiping the drawer (drag/touch),
  // Update transform to make the drawer move with the swipe direction
  const onSwipe = useCallback(
    (e): void => {
      if (!drawerRef.current) return;
      const clientY = e?.touches?.[0]?.clientY || e?.clientY || null;

      if (clientY !== null && clientY > 0 && startPoint !== null) {
        const newDelta = Math.round(clientY) - Math.round(startPoint);
        setDeltaY(newDelta);
        drawerRef.current.style.transform = `translateY(${newDelta}px)`;
      }
    },
    [drawerRef.current, startPoint]
  );

  // INFO: When user stopped swiping on the drawer (drag/touch)
  // Check which snapbreak point qualifies and adjust the final position of the drawer
  // Remove expand-content because the final `top` position has been calculated
  const onSwipeEnd = useCallback((): void => {
    if (!drawerRef.current) return;
    const currentTop = drawerRef.current.getBoundingClientRect().top;
    snapBreakPoints.every(({ breakpoint, position }) => {
      if ((currentTop <= 0 ? 0 : currentTop) >= breakpoint) {
        setIsSnapped(position);
        setDeltaY(0);
        if (position.top) {
          drawerRef.current.animate?.(
            [{ top: `${currentTop}px` }, { top: position.top }],
            ANIMATION_DURATION
          );
        }
        if (drawerRef.current.classList.contains(styles.expandContent)) {
          drawerRef.current.classList.remove(styles.expandContent);
        }
        return false;
      }
      return true;
    });
  }, [drawerRef.current, snapBreakPoints]);

  const setDrawerLevel = useCallback(
    (index: number): void => {
      if (!drawerRef.current) return;
      const position = snapBreakPoints?.[index]?.position;
      if (position) {
        setIsSnapped(snapBreakPoints[index].position);
        setLevel(index);
        setDeltaY(0);
        if (position.top) {
          drawerRef.current.animate?.(
            [
              { top: `${drawerRef.current.getBoundingClientRect().top}px` },
              { top: `${position.top}` },
            ],
            ANIMATION_DURATION
          );
        }
      }
    },
    [drawerRef.current, snapBreakPoints]
  );

  const setDrawerVisibility = useCallback(
    (visible: boolean): void => {
      if (!drawerRef.current) return;
      setVisible(visible);
    },
    [drawerRef.current]
  );

  return {
    isSnapped,
    setDrawerLevel,
    setDrawerVisibility,
    drawerRef,
    draggerProps: {
      onTouchStart: onSwipeStart,
      onTouchMove: onSwipe,
      onTouchEnd: onSwipeEnd,
      onDrag: onSwipe,
      onDragStart: onSwipeStart,
      onDragEnd: onSwipeEnd,
    },
    drawerStyle: {
      transform: `translateY(${deltaY}px)`,
      ...isSnapped,
    },
    deltaY,
    drawerLevel,
    drawerVisible,
  };
};
