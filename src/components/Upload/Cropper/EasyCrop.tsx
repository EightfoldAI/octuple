import React, {
  forwardRef,
  memo,
  useCallback,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
  useLayoutEffect,
} from 'react';
import { OcThemeName } from '../../ConfigProvider';
import ThemeContext from '../../ConfigProvider/ThemeContext';
import { default as EasyCropper } from 'react-easy-crop';
import type { Area, Point, Size } from 'react-easy-crop/types';
import {
  EasyCropHandle,
  EasyCropProps,
  INIT_ZOOM,
  ZOOM_STEP,
  INIT_ROTATE,
  ROTATE_STEP,
  MIN_ROTATE,
  MAX_ROTATE,
} from './Cropper.types';
import { Slider } from '../../Slider';
import { Stack } from '../../Stack';
import { Button, ButtonShape, ButtonSize, ButtonVariant } from '../../Button';
import { IconName } from '../../Icon';

import styles from './cropper.module.scss';

const EasyCrop = forwardRef<EasyCropHandle, EasyCropProps>((props, ref) => {
  const {
    aspect,
    configContextProps,
    cropperProps,
    cropperRef,
    gradient,
    grid,
    image,
    maxZoom,
    minZoom,
    rotate,
    rotateLeftButtonAriaLabelText,
    rotateRightButtonAriaLabelText,
    shape,
    theme,
    themeContainerId,
    zoom,
    zoomInButtonAriaLabelText,
    zoomOutButtonAriaLabelText,
  } = props;

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [cropSize, setCropSize] = useState<Size>({ width: 0, height: 0 });
  const [zoomVal, setZoomVal] = useState<number>(INIT_ZOOM);
  const [rotateVal, setRotateVal] = useState<number>(INIT_ROTATE);
  const [zoomButtonDirection, setZoomButtonDirection] = useState<
    'in' | 'out' | ''
  >('');
  const [rotateButtonDirection, setRotateButtonDirection] = useState<
    'right' | 'left' | ''
  >('');
  const cropPixelsRef: React.MutableRefObject<Area> = useRef<Area>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const contextualTheme: OcThemeName = useContext(ThemeContext);
  const mergedTheme: OcThemeName = configContextProps.noThemeContext
    ? theme
    : contextualTheme || theme;

  const onMediaLoaded = useCallback(
    (mediaSize): void => {
      const { height, width } = mediaSize;
      const ratioWidth: number = height * aspect;

      if (width > ratioWidth) {
        setCropSize({ width: ratioWidth, height });
      } else {
        setCropSize({ width, height: width / aspect });
      }
    },
    [aspect]
  );

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area): void => {
      cropPixelsRef.current = croppedAreaPixels;
    },
    []
  );

  useImperativeHandle(
    ref,
    () => ({
      rotateVal,
      setZoomVal,
      setRotateVal,
      cropPixelsRef,
    }),
    [rotateVal]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const step = 5;
      setCrop((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        switch (event.key) {
          case 'ArrowLeft':
            newX = Math.max(prev.x - step, -cropSize.width / 2);
            break;
          case 'ArrowRight':
            newX = Math.min(prev.x + step, cropSize.width / 2);
            break;
          case 'ArrowUp':
            newY = Math.max(prev.y - step, -cropSize.height / 2);
            break;
          case 'ArrowDown':
            newY = Math.min(prev.y + step, cropSize.height / 2);
            break;
          default:
            return prev;
        }

        event.preventDefault();
        return { x: newX, y: newY };
      });
    },
    [cropSize]
  );

  // Add event listener for keyboard events
  useLayoutEffect(() => {
    const cropperElement = document.getElementsByClassName(
      'reactEasyCrop_Container'
    )?.[0];
    cropperElement?.setAttribute('tabindex', '0'); // to make it focusable
    cropperElement?.addEventListener('keydown', handleKeyDown);
    return () => {
      cropperElement?.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      <EasyCropper
        {...cropperProps}
        ref={cropperRef}
        aspect={aspect}
        classes={{
          containerClassName: styles.cropperContainer,
          mediaClassName: 'cropper-media',
        }}
        crop={crop}
        cropShape={shape}
        cropSize={cropSize}
        image={image}
        maxZoom={maxZoom}
        minZoom={minZoom}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onMediaLoaded={onMediaLoaded}
        onRotationChange={setRotateVal}
        onZoomChange={setZoomVal}
        rotation={rotateVal}
        showGrid={grid}
        zoom={zoomVal}
        zoomWithScroll={zoom}
      />
      {zoom && (
        <section className={styles.cropperZoomControl}>
          <Stack direction={'horizontal'} fullWidth flexGap={'s'}>
            <Button
              ariaLabel={zoomOutButtonAriaLabelText}
              classNames={styles.cropperIconButton}
              configContextProps={configContextProps}
              disabled={zoomVal - ZOOM_STEP < minZoom}
              gradient={gradient}
              iconProps={{
                path: IconName.mdiMinus,
              }}
              onClick={() => {
                setRotateButtonDirection('');
                setZoomButtonDirection('out');
                setZoomVal(zoomVal - ZOOM_STEP);
              }}
              shape={ButtonShape.Round}
              size={ButtonSize.Small}
              theme={mergedTheme}
              themeContainerId={themeContainerId}
              variant={ButtonVariant.SystemUI}
            />
            <Slider
              configContextProps={configContextProps}
              containerClassNames={styles.cropperSlider}
              max={maxZoom}
              min={minZoom}
              onChange={(value: number | number[]) => {
                setRotateButtonDirection('');
                zoomVal < Number(value)
                  ? setZoomButtonDirection('in')
                  : setZoomButtonDirection('out');
                setZoomVal(Number(value));
              }}
              hideMax
              hideMin
              step={ZOOM_STEP}
              theme={mergedTheme}
              themeContainerId={themeContainerId}
              value={zoomVal}
            />
            <Button
              ariaLabel={zoomInButtonAriaLabelText}
              classNames={styles.cropperIconButton}
              configContextProps={configContextProps}
              disabled={zoomVal + ZOOM_STEP > maxZoom}
              gradient={gradient}
              iconProps={{
                path: IconName.mdiPlus,
              }}
              onClick={() => {
                setRotateButtonDirection('');
                setZoomButtonDirection('in');
                setZoomVal(zoomVal + ZOOM_STEP);
              }}
              shape={ButtonShape.Round}
              size={ButtonSize.Small}
              theme={mergedTheme}
              themeContainerId={themeContainerId}
              variant={ButtonVariant.SystemUI}
            />
          </Stack>
          <div
            className={styles.visuallyhidden}
            aria-live="assertive"
            role="status"
          >
            {zoomButtonDirection === 'in'
              ? `${zoomInButtonAriaLabelText} ${parseFloat(zoomVal.toFixed(2))}`
              : `${zoomOutButtonAriaLabelText} ${parseFloat(
                  zoomVal.toFixed(2)
                )}`}
          </div>
        </section>
      )}
      {rotate && (
        <section className={styles.cropperRotateControl}>
          <Stack direction={'horizontal'} fullWidth flexGap={'s'}>
            <Button
              ariaLabel={rotateLeftButtonAriaLabelText}
              classNames={styles.cropperIconButton}
              configContextProps={configContextProps}
              disabled={rotateVal === MIN_ROTATE}
              gradient={gradient}
              iconProps={{
                path: IconName.mdiRotateLeft,
              }}
              onClick={() => {
                setZoomButtonDirection('');
                setRotateButtonDirection('left');
                setRotateVal(rotateVal - ROTATE_STEP);
              }}
              shape={ButtonShape.Round}
              size={ButtonSize.Small}
              theme={mergedTheme}
              themeContainerId={themeContainerId}
              variant={ButtonVariant.SystemUI}
            />
            <Slider
              configContextProps={configContextProps}
              containerClassNames={styles.cropperSlider}
              max={MAX_ROTATE}
              min={MIN_ROTATE}
              onChange={(value: number | number[]) => {
                setZoomButtonDirection('');
                rotateVal < Number(value)
                  ? setRotateButtonDirection('right')
                  : setRotateButtonDirection('left');
                setRotateVal(Number(value));
              }}
              hideMax
              hideMin
              step={ROTATE_STEP}
              theme={mergedTheme}
              themeContainerId={themeContainerId}
              value={rotateVal}
            />
            <Button
              ariaLabel={rotateRightButtonAriaLabelText}
              classNames={styles.cropperIconButton}
              configContextProps={configContextProps}
              disabled={rotateVal === MAX_ROTATE}
              gradient={gradient}
              iconProps={{
                path: IconName.mdiRotateRight,
              }}
              onClick={() => {
                setRotateButtonDirection('right');
                setRotateVal(rotateVal + ROTATE_STEP);
              }}
              shape={ButtonShape.Round}
              size={ButtonSize.Small}
              theme={mergedTheme}
              themeContainerId={themeContainerId}
              variant={ButtonVariant.SystemUI}
            />
          </Stack>
          <div
            className={styles.visuallyhidden}
            aria-live="assertive"
            role="status"
          >
            {rotateButtonDirection === 'right'
              ? `${rotateRightButtonAriaLabelText} ${rotateVal}`
              : `${rotateLeftButtonAriaLabelText} ${rotateVal}`}
          </div>
        </section>
      )}
    </>
  );
});

export default memo(EasyCrop);
