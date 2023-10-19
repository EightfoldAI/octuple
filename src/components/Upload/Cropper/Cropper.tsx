import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { default as EasyCropper } from 'react-easy-crop';
import type { CropperProps } from './Cropper.types';
import { EasyCropHandle, INIT_ZOOM, INIT_ROTATE } from './Cropper.types';
import EasyCrop from './EasyCrop';
import Upload from '../';
import { UploadLocale } from '../Upload.types';
import type { OcFile, UploadProps } from '../Upload.types';
import { Button, ButtonVariant } from '../../Button';
import { Modal, ModalSize } from '../../Modal';
import LocaleReceiver, {
  useLocaleReceiver,
} from '../../LocaleProvider/LocaleReceiver';
import { mergeClasses } from '../../../shared/utilities';
import enUS from '../Locale/en_US';

import styles from './cropper.module.scss';

const Cropper = forwardRef<EasyCropper, CropperProps>((props, ref) => {
  const {
    aspect = 1,
    beforeCrop,
    children,
    cropperProps,
    fillColor = 'white',
    grid = false,
    locale = enUS,
    maxZoom = 3,
    minZoom = 1,
    modalCancelText: defaultModalCancelText,
    modalCloseButtonAriaLabelText: defaultModalCloseButtonAriaLabelText,
    modalOkText: defaultModalOkText,
    modalWrapperClassNames,
    modalHeight,
    modalTitleText: defaultModalTitleText,
    modalWidth,
    onModalCancel,
    onModalOk,
    onUploadFail,
    quality = 0.4,
    rotate = false,
    rotateLeftButtonAriaLabelText: defaultRotateLeftButtonAriaLabelText,
    rotateRightButtonAriaLabelText: defaultRotateRightButtonAriaLabelText,
    shape = 'rect',
    zoom = true,
    zoomInButtonAriaLabelText: defaultZoomInButtonAriaLabelText,
    zoomOutButtonAriaLabelText: defaultZoomOutButtonAriaLabelText,
  } = props;
  const cb = useRef<
    Pick<
      CropperProps,
      'onModalOk' | 'onModalCancel' | 'beforeCrop' | 'onUploadFail'
    >
  >({});
  cb.current.onModalOk = onModalOk;
  cb.current.onModalCancel = onModalCancel;
  cb.current.beforeCrop = beforeCrop;
  cb.current.onUploadFail = onUploadFail;

  const [image, setImage] = useState<string>('');
  const fileRef = useRef<OcFile>();
  const beforeUploadRef = useRef<UploadProps['beforeUpload']>();
  const resolveRef = useRef<CropperProps['onModalOk']>();
  const rejectRef = useRef<(err: Error) => void>();

  // ============================ Strings ===========================
  const [uploadLocale] = useLocaleReceiver('Upload');
  let mergedLocale: UploadLocale;

  if (locale) {
    mergedLocale = locale;
  } else {
    mergedLocale = uploadLocale || locale;
  }

  const [modalCancelText, setModalCancelText] = useState<string>(
    defaultModalCancelText
  );
  const [modalCloseButtonAriaLabelText, setModalCloseButtonAriaLabelText] =
    useState<string>(defaultModalCloseButtonAriaLabelText);
  const [modalOkText, setModalOkText] = useState<string>(defaultModalOkText);
  const [modalTitleText, setModalTitleText] = useState<string>(
    defaultModalTitleText
  );
  const [rotateLeftButtonAriaLabelText, setRotateLeftButtonAriaLabelText] =
    useState<string>(defaultRotateLeftButtonAriaLabelText);
  const [rotateRightButtonAriaLabelText, setRotateRightButtonAriaLabelText] =
    useState<string>(defaultRotateRightButtonAriaLabelText);
  const [zoomInButtonAriaLabelText, setZoomInButtonAriaLabelText] =
    useState<string>(defaultZoomInButtonAriaLabelText);
  const [zoomOutButtonAriaLabelText, setZoomOutButtonAriaLabelText] =
    useState<string>(defaultZoomOutButtonAriaLabelText);

  // Locs: if the prop isn't provided use the loc defaults.
  // If the mergedLocale is changed, update.
  useEffect(() => {
    setModalCancelText(
      props.modalCancelText
        ? props.modalCancelText
        : mergedLocale.lang!.modalCancelText
    );
    setModalCloseButtonAriaLabelText(
      props.modalCloseButtonAriaLabelText
        ? props.modalCloseButtonAriaLabelText
        : mergedLocale.lang!.modalCloseButtonAriaLabelText
    );
    setModalOkText(
      props.modalOkText ? props.modalOkText : mergedLocale.lang!.modalOkText
    );
    setModalTitleText(
      props.modalTitleText
        ? props.modalTitleText
        : mergedLocale.lang!.modalTitleText
    );
    setRotateLeftButtonAriaLabelText(
      props.rotateLeftButtonAriaLabelText
        ? props.rotateLeftButtonAriaLabelText
        : mergedLocale.lang!.rotateLeftButtonAriaLabelText
    );
    setRotateRightButtonAriaLabelText(
      props.rotateRightButtonAriaLabelText
        ? props.rotateRightButtonAriaLabelText
        : mergedLocale.lang!.rotateRightButtonAriaLabelText
    );
    setZoomInButtonAriaLabelText(
      props.zoomInButtonAriaLabelText
        ? props.zoomInButtonAriaLabelText
        : mergedLocale.lang!.zoomInButtonAriaLabelText
    );
    setZoomOutButtonAriaLabelText(
      props.zoomOutButtonAriaLabelText
        ? props.zoomOutButtonAriaLabelText
        : mergedLocale.lang!.zoomOutButtonAriaLabelText
    );
  }, [mergedLocale]);

  const uploadComponent = useMemo(() => {
    const upload = Array.isArray(children) ? children[0] : children;
    const { beforeUpload, accept, ...restUploadProps } = upload.props;
    beforeUploadRef.current = beforeUpload;

    return {
      ...upload,
      props: {
        ...restUploadProps,
        accept: accept || 'image/*',
        beforeUpload: (file: OcFile, fileListArgs: OcFile[]) => {
          return new Promise(async (resolve, reject) => {
            if (cb.current.beforeCrop) {
              const shouldCrop: boolean = await cb.current.beforeCrop(
                file,
                fileListArgs
              );
              if (!shouldCrop) {
                return reject();
              }
            }

            fileRef.current = file;
            resolveRef.current = (newFile) => {
              cb.current.onModalOk?.(newFile);
              resolve(newFile);
            };
            rejectRef.current = (uploadErr) => {
              cb.current.onUploadFail?.(uploadErr);
              reject();
            };

            const reader = new FileReader();
            reader.addEventListener('load', () => {
              if (typeof reader.result === 'string') {
                setImage(reader.result);
              }
            });
            reader.readAsDataURL(file);
          });
        },
      },
    };
  }, [children]);

  const easyCropRef: React.MutableRefObject<EasyCropHandle> =
    useRef<EasyCropHandle>({} as EasyCropHandle);

  const modalProps = useMemo(() => {
    const obj = {
      closeButtonAriaLabelText: modalCloseButtonAriaLabelText,
      header: modalTitleText,
      height: modalHeight,
      width: modalWidth,
    };
    Object.keys(obj).forEach((key) => {
      if (!(obj as any)[key]) delete (obj as any)[key];
    });
    return obj;
  }, [modalCloseButtonAriaLabelText, modalHeight, modalTitleText, modalWidth]);

  const onClose = (): void => {
    setImage('');
    easyCropRef.current.setZoomVal(INIT_ZOOM);
    easyCropRef.current.setRotateVal(INIT_ROTATE);
  };

  const onCancel = useCallback((): void => {
    cb.current.onModalCancel?.();
    onClose();
  }, []);

  const onOk = useCallback(async (): Promise<void> => {
    onClose();

    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    const imgSource = document.querySelector(
      '.cropper-media'
    ) as CanvasImageSource & {
      naturalWidth: number;
      naturalHeight: number;
    };
    const {
      width: cropWidth,
      height: cropHeight,
      x: cropX,
      y: cropY,
    } = easyCropRef.current.cropPixelsRef?.current;

    if (rotate && easyCropRef.current.rotateVal !== INIT_ROTATE) {
      const { naturalWidth: imgWidth, naturalHeight: imgHeight } = imgSource;
      const angle: number = easyCropRef.current.rotateVal * (Math.PI / 180);

      // Get container for rotated image
      const sine: number = Math.abs(Math.sin(angle));
      const cosine: number = Math.abs(Math.cos(angle));
      const squareWidth: number = imgWidth * cosine + imgHeight * sine;
      const squareHeight: number = imgHeight * cosine + imgWidth * sine;

      canvas.width = squareWidth;
      canvas.height = squareHeight;
      ctx.fillStyle = fillColor;
      ctx.fillRect(0, 0, squareWidth, squareHeight);

      // Rotate container
      const squareHalfWidth: number = squareWidth / 2;
      const squareHalfHeight: number = squareHeight / 2;
      ctx.translate(squareHalfWidth, squareHalfHeight);
      ctx.rotate(angle);
      ctx.translate(-squareHalfWidth, -squareHalfHeight);

      // Draw rotated image
      const imgX: number = (squareWidth - imgWidth) / 2;
      const imgY: number = (squareHeight - imgHeight) / 2;
      ctx.drawImage(
        imgSource,
        0,
        0,
        imgWidth,
        imgHeight,
        imgX,
        imgY,
        imgWidth,
        imgHeight
      );

      // Crop rotated image
      const imgData: ImageData = ctx.getImageData(
        0,
        0,
        squareWidth,
        squareHeight
      );
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      ctx.putImageData(imgData, -cropX, -cropY);
    } else {
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      ctx.fillStyle = fillColor;
      ctx.fillRect(0, 0, cropWidth, cropHeight);

      ctx.drawImage(
        imgSource,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );
    }

    // Get the new image
    const { type, name, uid } = fileRef.current;
    canvas.toBlob(
      async (blob: Blob | null) => {
        const newFile = Object.assign(new File([blob], name, { type }), {
          uid,
        }) as OcFile;

        if (!beforeUploadRef.current) {
          return resolveRef.current(newFile);
        }

        const result = await beforeUploadRef.current(newFile, [newFile]);

        if (result === true) {
          return resolveRef.current(newFile);
        }

        if (result === false) {
          return rejectRef.current(new Error('beforeUpload returned false'));
        }

        delete (newFile as any)[Upload.LIST_IGNORE];
        if (result === Upload.LIST_IGNORE) {
          Object.defineProperty(newFile, Upload.LIST_IGNORE, {
            value: true,
            configurable: true,
          });
          return rejectRef.current(
            new Error('beforeUpload returned LIST_IGNORE')
          );
        }

        if (typeof result === 'object' && result !== null) {
          return resolveRef.current(result);
        }
      },
      type,
      quality
    );
  }, [fillColor, quality, rotate]);

  return (
    <LocaleReceiver componentName={'Upload'} defaultLocale={enUS}>
      {(_contextLocale: UploadLocale) => {
        return (
          <>
            {uploadComponent}
            {image && (
              <Modal
                actions={
                  <>
                    <Button text={modalCancelText} onClick={onCancel} />
                    <Button
                      text={modalOkText}
                      onClick={onOk}
                      variant={ButtonVariant.Primary}
                    />
                  </>
                }
                body={
                  <EasyCrop
                    ref={easyCropRef}
                    aspect={aspect}
                    cropperProps={cropperProps}
                    cropperRef={ref}
                    grid={grid}
                    image={image}
                    maxZoom={maxZoom}
                    minZoom={minZoom}
                    rotate={rotate}
                    rotateLeftButtonAriaLabelText={
                      rotateLeftButtonAriaLabelText
                    }
                    rotateRightButtonAriaLabelText={
                      rotateRightButtonAriaLabelText
                    }
                    shape={shape}
                    zoom={zoom}
                    zoomInButtonAriaLabelText={zoomInButtonAriaLabelText}
                    zoomOutButtonAriaLabelText={zoomOutButtonAriaLabelText}
                  />
                }
                maskClosable={false}
                modalClassNames={styles.cropperModal}
                modalWrapperClassNames={mergeClasses([
                  styles.cropperModal,
                  modalWrapperClassNames,
                ])}
                onClose={onCancel}
                size={ModalSize.medium}
                visible={true}
                {...modalProps}
              />
            )}
          </>
        );
      }}
    </LocaleReceiver>
  );
});

export default Cropper;
