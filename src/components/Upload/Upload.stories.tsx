import React, { useEffect, useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Upload from '.';
import {
  OcFile,
  UploadFile,
  UploadFileStatus,
  UploadProps,
  UploadSize,
} from './Upload.types';
import Cropper from './Cropper';
import { Modal } from '../Modal';
import { IconName } from '../Icon';
import { snack, SnackbarContainer } from '../Snackbar';
import { Button, ButtonShape, ButtonSize, ButtonVariant } from '../Button';

const { Dropzone } = Upload;

export default {
  title: 'Upload',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Upload</h1>
              <p>
                Use the Upload component to publishing information (text,
                pictures, video, etc.) to a remote server via a web app. Use
                this component to do the following:
              </p>
              <ul>
                <li>To upload one or more files</li>
                <li>To show the process of uploading</li>
                <li>To upload files by dragging and dropping</li>
              </ul>
            </section>
            <section>
              <Stories includePrimary title="" />
            </section>
          </article>
        </main>
      ),
    },
  },
  argTypes: {
    theme: {
      options: [
        'red',
        'redOrange',
        'orange',
        'yellow',
        'yellowGreen',
        'green',
        'blueGreen',
        'blue',
        'blueViolet',
        'violet',
        'violetRed',
        'grey',
      ],
      control: 'select',
    },
  },
} as ComponentMeta<typeof Upload>;

const snackArgs: Object = {
  position: 'top-center',
  closable: false,
  icon: IconName.mdiInformation,
  closeIcon: IconName.mdiClose,
  id: 'mySnackId',
};

const Basic_Story: ComponentStory<typeof Upload> = (args) => {
  const props: UploadProps = {
    ...args,
    name: 'file',
    action: 'https://run.mocky.io/v3/0ef2249d-ccd9-4032-be61-e853a549ef61',
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        snack.servePositive({
          ...snackArgs,
          content: `${info.file.name} file uploaded successfully`,
        });
      } else if (info.file.status === 'error') {
        snack.serveDisruptive({
          ...snackArgs,
          closable: true,
          content: `${info.file.name} file upload failed.`,
        });
      }
    },
  };
  return (
    <>
      <Upload {...props}>
        <Button
          configContextProps={args.configContextProps}
          gradient={args.gradient}
          htmlType={'button'}
          onKeyDown={(event) => {
            if (
              event.key !== 'Tab' ||
              (event.key !== 'Tab' && !event.shiftKey)
            ) {
              event.preventDefault();
            }
          }}
          text={'Select file'}
          theme={args.theme}
          themeContainerId={args.themeContainerId}
          variant={ButtonVariant.Primary}
        />
      </Upload>
      <SnackbarContainer />
    </>
  );
};

const Basic_With_Upload_List_Story: ComponentStory<typeof Upload> = (args) => {
  const props: UploadProps = {
    ...args,
    name: 'file',
    action: 'https://run.mocky.io/v3/0ef2249d-ccd9-4032-be61-e853a549ef61',
    headers: {
      authorization: 'authorization-text',
    },
    listType: 'text',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        snack.servePositive({
          ...snackArgs,
          content: `${info.file.name} file uploaded successfully`,
        });
      } else if (info.file.status === 'error') {
        snack.serveDisruptive({
          ...snackArgs,
          closable: true,
          content: `${info.file.name} file upload failed.`,
        });
      }
    },
    showUploadList: {
      downloadIconButtonType: 'button',
      removeIconButtonType: 'button',
    },
  };
  return (
    <>
      <Upload {...props}>
        <Button
          configContextProps={args.configContextProps}
          gradient={args.gradient}
          htmlType={'button'}
          onKeyDown={(event) => {
            if (
              event.key !== 'Tab' ||
              (event.key !== 'Tab' && !event.shiftKey)
            ) {
              event.preventDefault();
            }
          }}
          text={'Select file'}
          theme={args.theme}
          themeContainerId={args.themeContainerId}
          variant={ButtonVariant.Primary}
        />
      </Upload>
      <SnackbarContainer />
    </>
  );
};

const Drag_and_Drop_Single_Small_Story: ComponentStory<typeof Upload> = (
  args
) => {
  const props: UploadProps = {
    ...args,
    name: 'file',
    maxCount: 1,
    action: 'https://run.mocky.io/v3/0ef2249d-ccd9-4032-be61-e853a549ef61',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        snack.servePositive({
          ...snackArgs,
          content: `${info.file.name} file uploaded successfully`,
        });
      } else if (status === 'error') {
        snack.serveDisruptive({
          ...snackArgs,
          closable: true,
          content: `${info.file.name} file upload failed.`,
        });
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    size: UploadSize.Small,
    showUploadList: {
      removeIconButtonType: 'button',
      replaceButtonType: 'button',
      showRemoveIconButton: true,
      showReplaceButton: true,
    },
  };
  return (
    <>
      <Dropzone {...props} />
      <SnackbarContainer />
    </>
  );
};

const Drag_and_Drop_Multiple_Small_Story: ComponentStory<typeof Upload> = (
  args
) => {
  const props: UploadProps = {
    ...args,
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/0ef2249d-ccd9-4032-be61-e853a549ef61',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        snack.servePositive({
          ...snackArgs,
          content: `${info.file.name} file uploaded successfully`,
        });
      } else if (status === 'error') {
        snack.serveDisruptive({
          ...snackArgs,
          closable: true,
          content: `${info.file.name} file upload failed.`,
        });
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    showUploadList: {
      downloadIconButtonType: 'button',
      removeIconButtonType: 'button',
    },
    size: UploadSize.Small,
  };
  return (
    <>
      <Dropzone {...props} />
      <SnackbarContainer />
    </>
  );
};

const Drag_and_Drop_Single_Medium_Story: ComponentStory<typeof Upload> = (
  args
) => {
  const props: UploadProps = {
    ...args,
    name: 'file',
    maxCount: 1,
    action: 'https://run.mocky.io/v3/0ef2249d-ccd9-4032-be61-e853a549ef61',
    listType: 'picture',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        snack.servePositive({
          ...snackArgs,
          content: `${info.file.name} file uploaded successfully`,
        });
      } else if (status === 'error') {
        snack.serveDisruptive({
          ...snackArgs,
          closable: true,
          content: `${info.file.name} file upload failed.`,
        });
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  return (
    <>
      <Dropzone {...props} />
      <SnackbarContainer />
    </>
  );
};

const Drag_and_Drop_Multiple_Medium_Story: ComponentStory<typeof Upload> = (
  args
) => {
  const props: UploadProps = {
    ...args,
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/0ef2249d-ccd9-4032-be61-e853a549ef61',
    listType: 'picture',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        snack.servePositive({
          ...snackArgs,
          content: `${info.file.name} file uploaded successfully`,
        });
      } else if (status === 'error') {
        snack.serveDisruptive({
          ...snackArgs,
          closable: true,
          content: `${info.file.name} file upload failed.`,
        });
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    showUploadList: {
      downloadIconButtonType: 'button',
      removeIconButtonType: 'button',
    },
  };
  return (
    <>
      <Dropzone {...props} />
      <SnackbarContainer />
    </>
  );
};

const Drag_and_Drop_Single_Large_Story: ComponentStory<typeof Upload> = (
  args
) => {
  const props: UploadProps = {
    ...args,
    name: 'file',
    maxCount: 1,
    action: 'https://run.mocky.io/v3/0ef2249d-ccd9-4032-be61-e853a549ef61',
    listType: 'picture',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        snack.servePositive({
          ...snackArgs,
          content: `${info.file.name} file uploaded successfully`,
        });
      } else if (status === 'error') {
        snack.serveDisruptive({
          ...snackArgs,
          closable: true,
          content: `${info.file.name} file upload failed.`,
        });
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    size: UploadSize.Large,
  };
  return (
    <>
      <Dropzone {...props} />
      <SnackbarContainer />
    </>
  );
};

const Drag_and_Drop_Multiple_Large_Story: ComponentStory<typeof Upload> = (
  args
) => {
  const props: UploadProps = {
    ...args,
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/0ef2249d-ccd9-4032-be61-e853a549ef61',
    listType: 'picture-card',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        snack.servePositive({
          ...snackArgs,
          content: `${info.file.name} file uploaded successfully`,
        });
      } else if (status === 'error') {
        snack.serveDisruptive({
          ...snackArgs,
          closable: true,
          content: `${info.file.name} file upload failed.`,
        });
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    showUploadList: {
      downloadIconButtonType: 'button',
      removeIconButtonType: 'button',
    },
    size: UploadSize.Large,
  };
  return (
    <>
      <Dropzone {...props} />
      <SnackbarContainer />
    </>
  );
};

const Image_List_Story: ComponentStory<typeof Upload> = (args) => {
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [previewTitle, setPreviewTitle] = useState<string>('');
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'octuple.png',
      status: 'done',
      url: 'https://raw.githubusercontent.com/dkilgore-eightfold/static/main/images/Octuple-Logo.png',
    },
    {
      uid: '-2',
      name: 'octuple.png',
      status: 'done',
      url: 'https://raw.githubusercontent.com/dkilgore-eightfold/static/main/images/Octuple-Logo.png',
    },
    {
      uid: '-3',
      name: 'octuple.png',
      status: 'done',
      url: 'https://raw.githubusercontent.com/dkilgore-eightfold/static/main/images/Octuple-Logo.png',
    },
    {
      uid: '-4',
      name: 'octuple.png',
      status: 'done',
      url: 'https://raw.githubusercontent.com/dkilgore-eightfold/static/main/images/Octuple-Logo.png',
    },
    {
      uid: '-xxx',
      percent: 50,
      name: 'octuple.png',
      status: 'uploading',
      url: 'https://raw.githubusercontent.com/dkilgore-eightfold/static/main/images/Octuple-Logo.png',
    },
    {
      uid: '-5',
      name: 'octuple.png',
      status: 'error',
    },
  ]);

  const getBase64 = (file: OcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as OcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    );
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  return (
    <>
      <Upload
        {...args}
        action="https://run.mocky.io/v3/0ef2249d-ccd9-4032-be61-e853a549ef61"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : (
          <Button
            ariaLabel={'Select file'}
            configContextProps={args.configContextProps}
            gradient={args.gradient}
            htmlType={'button'}
            iconProps={{ path: IconName.mdiPlus }}
            onKeyDown={(event) => {
              if (
                event.key !== 'Tab' ||
                (event.key !== 'Tab' && !event.shiftKey)
              ) {
                event.preventDefault();
              }
            }}
            shape={ButtonShape.Round}
            size={ButtonSize.Large}
            style={{ top: '50%', transform: 'translateY(-50%)' }}
            theme={args.theme}
            themeContainerId={args.themeContainerId}
            variant={ButtonVariant.Primary}
          />
        )}
      </Upload>
      <Modal
        body={
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        }
        configContextProps={args.configContextProps}
        gradient={args.gradient}
        header={previewTitle}
        onClose={() => setPreviewOpen(false)}
        theme={args.theme}
        themeContainerId={args.themeContainerId}
        visible={previewOpen}
      />
    </>
  );
};

const Image_Editor_Story: ComponentStory<typeof Upload> = (args) => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'octuple.png',
      status: 'done',
      url: 'https://raw.githubusercontent.com/dkilgore-eightfold/static/main/images/Octuple-Logo.png',
    },
  ]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as OcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <Cropper
      configContextProps={args.configContextProps}
      gradient={args.gradient}
      rotate
      theme={args.theme}
      themeContainerId={args.themeContainerId}
    >
      <Upload
        {...args}
        action={'https://run.mocky.io/v3/0ef2249d-ccd9-4032-be61-e853a549ef61'}
        fileList={fileList}
        listType={'picture-card'}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 5 && (
          <Button
            ariaLabel={'Select file'}
            configContextProps={args.configContextProps}
            gradient={args.gradient}
            htmlType={'button'}
            iconProps={{ path: IconName.mdiPlus }}
            onKeyDown={(event) => {
              if (
                event.key !== 'Tab' ||
                (event.key !== 'Tab' && !event.shiftKey)
              ) {
                event.preventDefault();
              }
            }}
            shape={ButtonShape.Round}
            size={ButtonSize.Large}
            style={{ top: '50%', transform: 'translateY(-50%)' }}
            theme={args.theme}
            themeContainerId={args.themeContainerId}
            variant={ButtonVariant.Primary}
          />
        )}
      </Upload>
    </Cropper>
  );
};

const Basic_Deferred_API_Story: ComponentStory<typeof Upload> = (args) => {
  const [data, setData] = useState<Record<string, unknown>>({});
  const [thumbUrl, setThumbUrl] = useState<string>('');

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps['onChange'] = async (info: any) => {
    if (info.file.status === 'removed') {
      await resetThumbAsync().then(() => {
        setData({
          ...info.file,
          name: info.file.name,
          percent: 0,
          status: 'removed',
          thumbUrl: '',
        });
      });
      return;
    }
    await generateThumbAsync(info.file).then(() => {
      setData({
        ...info.file,
        name: info.file.name,
        percent: 100,
        status: 'done',
        thumbUrl: info.file.preview,
      });
    });
  };

  const getBase64 = (file: OcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const generateThumbAsync = async (file: UploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as OcFile);
    }
    setThumbUrl(file.url || (file.preview as string));
  };

  const resetThumbAsync = async (): Promise<void> => {
    setThumbUrl('');
  };

  const props: UploadProps = {
    ...args,
    customRequest() {
      return true;
    },
    data: data,
    fileList: fileList,
    listType: 'picture',
    maxCount: 1,
    name: 'file',
    onChange: onChange,
  };

  useEffect(() => {
    if (data.status === 'done') {
      setFileList([
        {
          ...data,
          uid: data.uid as string,
          name: data.name as string,
          status: data.status as UploadFileStatus,
          thumbUrl: data.thumbUrl as string,
        },
      ]);
      snack.servePositive({
        ...snackArgs,
        content: `${data.name} file uploaded successfully`,
      });
    } else if (data.status === 'removed') {
      const resetData = async () => {
        setFileList([]);
        setData({});
      };
      resetData().catch(console.error);
    }
  }, [data]);

  return (
    <>
      <Dropzone {...props} />
      <SnackbarContainer />
    </>
  );
};

const Cropper_Story: ComponentStory<typeof Cropper> = (args) => {
  const [image, setImage] = useState<string>('');

  const handleImageUpload = (file: OcFile) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Cropper
      {...args}
      onModalOk={(file) => console.log('Cropped file:', file)}
      onUploadFail={(error) => console.error('Upload failed:', error)}
    >
      <Upload
        action="https://run.mocky.io/v3/0ef2249d-ccd9-4032-be61-e853a549ef61"
        beforeUpload={handleImageUpload}
      >
        <Button
          text="Select file"
          variant={ButtonVariant.Primary}
          iconProps={{ path: IconName.mdiUpload }}
        />
      </Upload>
    </Cropper>
  );
};

export const Basic = Basic_Story.bind({});
export const Basic_With_Upload_List = Basic_With_Upload_List_Story.bind({});
export const Drag_and_Drop_Single_Small = Drag_and_Drop_Single_Small_Story.bind(
  {}
);
export const Drag_and_Drop_Multiple_Small =
  Drag_and_Drop_Multiple_Small_Story.bind({});
export const Drag_and_Drop_Single_Medium =
  Drag_and_Drop_Single_Medium_Story.bind({});
export const Drag_and_Drop_Multiple_Medium =
  Drag_and_Drop_Multiple_Medium_Story.bind({});
export const Drag_and_Drop_Single_Large = Drag_and_Drop_Single_Large_Story.bind(
  {}
);
export const Drag_and_Drop_Multiple_Large =
  Drag_and_Drop_Multiple_Large_Story.bind({});
export const Image_List = Image_List_Story.bind({});
export const Image_Editor = Image_Editor_Story.bind({});
export const Basic_Deferred_API = Basic_Deferred_API_Story.bind({});
export const Basic_With_Cropper = Cropper_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Basic',
  'Basic_With_Upload_List',
  'Drag_and_Drop_Single_Small',
  'Drag_and_Drop_Multiple_Small',
  'Drag_and_Drop_Single_Medium',
  'Drag_and_Drop_Multiple_Medium',
  'Drag_and_Drop_Single_Large',
  'Drag_and_Drop_Multiple_Large',
  'Image_List',
  'Image_Editor',
  'Basic_Deferred_API',
  'Basic_With_Cropper',
];

const uploadArgs: Object = {
  disabled: false,
  configContextProps: {
    noDisabledContext: false,
    noGradientContext: false,
    noThemeContext: false,
  },
  theme: '',
  themeContainerId: 'my-upload-theme-container',
  gradient: false,
};

Basic.args = {
  ...uploadArgs,
};

Basic_With_Upload_List.args = {
  ...uploadArgs,
};

Drag_and_Drop_Single_Small.args = {
  ...uploadArgs,
  fullWidth: false,
};

Drag_and_Drop_Multiple_Small.args = {
  ...uploadArgs,
  fullWidth: false,
};

Drag_and_Drop_Single_Medium.args = {
  ...uploadArgs,
  fullWidth: false,
};

Drag_and_Drop_Multiple_Medium.args = {
  ...uploadArgs,
  fullWidth: false,
};

Drag_and_Drop_Single_Large.args = {
  ...uploadArgs,
};

Drag_and_Drop_Multiple_Large.args = {
  ...uploadArgs,
};

Image_List.args = {
  ...uploadArgs,
};

Image_Editor.args = {
  ...uploadArgs,
};

Basic_Deferred_API.args = {
  ...uploadArgs,
  fullWidth: false,
};

Basic_With_Cropper.args = {
  aspect: 1,
  rotate: true,
  zoom: true,
  shape: 'round',
  theme: 'blue',
  themeContainerId: 'cropper-theme-container',
};
