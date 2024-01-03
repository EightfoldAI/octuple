import type { InternalUploadFile, OcFile, UploadFile } from './Upload.types';
import { canUseDocElement, canUseDom } from '../../shared/utilities';

export function file2Obj(file: OcFile): InternalUploadFile {
  return {
    ...file,
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    percent: 0,
    originFileObj: file,
  };
}

export function updateFileList(
  file: UploadFile<any>,
  fileList: UploadFile<any>[]
): UploadFile<any>[] {
  const nextFileList: UploadFile<any>[] = [...fileList];
  const fileIndex: number = nextFileList.findIndex(
    ({ uid }: UploadFile) => uid === file.uid
  );
  if (fileIndex === -1) {
    nextFileList.push(file);
  } else {
    nextFileList[fileIndex] = file;
  }
  return nextFileList;
}

export function getFileItem(
  file: OcFile,
  fileList: UploadFile[]
): UploadFile<any> {
  const matchKey: 'uid' | 'name' = file.uid !== undefined ? 'uid' : 'name';
  return fileList.filter((item) => item[matchKey] === file[matchKey])[0];
}

export function removeFileItem(
  file: UploadFile,
  fileList: UploadFile[]
): UploadFile<any>[] {
  const matchKey: 'uid' | 'name' = file.uid !== undefined ? 'uid' : 'name';
  const removed: UploadFile<any>[] = fileList.filter(
    (item: UploadFile<any>) => item[matchKey] !== file[matchKey]
  );
  if (removed.length === fileList.length) {
    return null;
  }
  return removed;
}

const extname = (url: string = ''): string => {
  const temp: string[] = url.split('/');
  const filename: string = temp[temp.length - 1];
  const filenameWithoutSuffix: string = filename.split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
};

const isImageFileType = (type: string): boolean => type.indexOf('image/') === 0;

export const isImageUrl = (file: UploadFile): boolean => {
  if (file.type && !file.thumbUrl) {
    return isImageFileType(file.type);
  }
  const url: string = (file.thumbUrl || file.url || '') as string;
  const extension: string = extname(url);
  if (
    /^data:image\//.test(url) ||
    /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico|heic|heif)$/i.test(extension)
  ) {
    return true;
  }
  if (/^data:/.test(url)) {
    // other file types of base64
    return false;
  }
  if (extension) {
    // other file types which have extension
    return false;
  }
  return true;
};

export function previewImage(file: File | Blob): Promise<string> {
  return new Promise((resolve) => {
    if (!file.type || !isImageFileType(file.type)) {
      resolve('');
      return;
    }

    if (canUseDom() && canUseDocElement()) {
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      document.body.appendChild(canvas);

      const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
      const img: HTMLImageElement = new Image();

      img.onload = () => {
        const { width, height } = img;

        let offsetX: number = 0;
        let offsetY: number = 0;

        canvas.width = width;
        canvas.height = height;
        canvas.style.cssText = `position: fixed; left: 0; top: 0; width: ${width}px; height: ${height}px; z-index: 9999; display: none;`;

        ctx!.drawImage(img, offsetX, offsetY, width, height);
        const dataURL: string = canvas.toDataURL();
        document.body.removeChild(canvas);

        resolve(dataURL);
      };

      img.crossOrigin = 'anonymous';

      if (file.type.startsWith('image/svg+xml')) {
        const reader: FileReader = new FileReader();
        reader.addEventListener('load', () => {
          if (reader.result) img.src = reader.result as string;
        });
        reader.readAsDataURL(file);
      } else {
        img.src = window.URL.createObjectURL(file);
      }
    } else {
      resolve('');
    }
  });
}
