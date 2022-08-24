import React, { useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Form from './';
import { CheckBox } from '../CheckBox';
import { TextArea, TextInput, TextInputWidth, TextInputShape } from '../Inputs';
import { DefaultButton, PrimaryButton, SecondaryButton } from '../Button';
import { RadioButtonValue, RadioGroup } from '../RadioButton';
import { Select, SelectOption } from '../Select';
import DatePicker from '../DateTimePicker/DatePicker';
import { Stack } from '../Stack';
import enUS from '../Locale/en_US';
import zhCN from '../Locale/zh_CN';
import { ConfigProvider } from '../ConfigProvider';

const { RangePicker } = DatePicker;

export default {
    title: 'Form',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Form</h1>
                            <p>
                                A Form component with data scope management.
                                Including data collection, verification, and
                                styles.
                            </p>
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
        shape: {
            options: ['rectangle', 'pill', 'underline'],
            control: { type: 'inline-radio' },
        },
        size: {
            options: ['flex', 'large', 'medium', 'small'],
            control: { type: 'radio' },
        },
    },
} as ComponentMeta<typeof Form>;

const Basic_Story: ComponentStory<typeof Form> = (args) => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <ConfigProvider
            themeOptions={{ name: 'blue' }}
            locale={zhCN}
            children={
                <Form
                    {...args}
                    name="basic"
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 10 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, warningOnly: true }]}
                        tooltip={<span>A Tooltip!</span>}
                    >
                        <TextInput />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Password is required.',
                            },
                        ]}
                    >
                        <TextInput htmlType={'password'} />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 2, span: 10 }}
                    >
                        <CheckBox label={'Remember me'} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 2, span: 10 }}>
                        <PrimaryButton htmlType="submit" text={'Submit'} />
                    </Form.Item>
                </Form>
            }
        />
    );
};

const Disabled_Story: ComponentStory<typeof Form> = (args) => {
    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
    const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
        setComponentDisabled(disabled);
    };
    const [selected, setSelected] = useState<RadioButtonValue>('apple');

    const radioChangeGroupHandler = (
        e?: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setSelected(e.target.value);
    };
    return (
        <ConfigProvider
            themeOptions={{ name: 'blue' }}
            locale={enUS}
            children={
                <Stack direction={'vertical'} gap={'l'} fullWidth>
                    <CheckBox
                        checked={componentDisabled}
                        label={'Form disabled'}
                        onChange={(e) => setComponentDisabled(e.target.checked)}
                    />
                    <Form
                        {...args}
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 9 }}
                        layout="horizontal"
                        onValuesChange={onFormLayoutChange}
                        disabled={componentDisabled}
                        requiredMark={'optional'}
                    >
                        <Form.Item label="CheckBox" valuePropName="checked">
                            <CheckBox label={'Checkbox'} />
                        </Form.Item>
                        <Form.Item label="Radio">
                            <RadioGroup
                                value={selected}
                                onChange={radioChangeGroupHandler}
                                items={[
                                    {
                                        label: 'Apple',
                                        name: 'group1',
                                        value: 'apple',
                                    },
                                    {
                                        label: 'Pear',
                                        name: 'group1',
                                        value: 'pear',
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Input"
                            name="input"
                            rules={[{ required: true }]}
                        >
                            <TextInput />
                        </Form.Item>
                        <Form.Item label="Select">
                            <Select
                                textInputProps={{
                                    inputWidth: TextInputWidth.fitContent,
                                }}
                                options={[
                                    {
                                        text: 'Demo',
                                        value: 'demo',
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label="DatePicker">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item label="RangePicker">
                            <RangePicker />
                        </Form.Item>
                        <Form.Item label="TextArea">
                            <TextArea />
                        </Form.Item>
                        <Form.Item label="Switch" valuePropName="checked">
                            <CheckBox toggle />
                        </Form.Item>
                        <Form.Item label="Button">
                            <PrimaryButton htmlType="submit" text={'Submit'} />
                        </Form.Item>
                    </Form>
                </Stack>
            }
        />
    );
};

const Methods_Story: ComponentStory<typeof Form> = (args) => {
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 10 },
    };
    const tailLayout = {
        wrapperCol: { offset: 2, span: 10 },
    };

    const onGenderChange = (options: SelectOption[]) => {
        switch (options.length) {
            case 0:
                form.setFieldsValue({ note: 'Hi, man!' });
                return;
            case 1:
                form.setFieldsValue({ note: 'Hi, lady!' });
                return;
            case 2:
                form.setFieldsValue({ note: 'Hi there!' });
        }
    };

    const onFinish = (values: any) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    const onFill = () => {
        form.setFieldsValue({
            note: 'Hello world!',
            gender: 'male',
        });
    };

    return (
        <ConfigProvider
            themeOptions={{ name: 'blue' }}
            locale={enUS}
            children={
                <Stack fullWidth>
                    <Form
                        {...args}
                        {...layout}
                        form={form}
                        name="control-hooks"
                        onFinish={onFinish}
                        style={{
                            width: '100%',
                        }}
                    >
                        <Form.Item
                            name="note"
                            label="Note"
                            rules={[{ required: true }]}
                        >
                            <TextInput inputWidth={TextInputWidth.fill} />
                        </Form.Item>
                        <Form.Item
                            name="gender"
                            label="Gender"
                            rules={[{ required: true }]}
                        >
                            <Select
                                clearable
                                onOptionsChange={onGenderChange}
                                options={[
                                    {
                                        text: 'male',
                                        value: 'male',
                                    },
                                    {
                                        text: 'female',
                                        value: 'female',
                                    },
                                    {
                                        text: 'other',
                                        value: 'other',
                                    },
                                ]}
                                placeholder={
                                    'Select an option to change input text above'
                                }
                                textInputProps={{
                                    inputWidth: TextInputWidth.fill,
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) =>
                                prevValues.gender !== currentValues.gender
                            }
                        >
                            {({ getFieldValue }) =>
                                getFieldValue('gender') === 'other' ? (
                                    <Form.Item
                                        name="customizeGender"
                                        label="Customize Gender"
                                        rules={[{ required: true }]}
                                    >
                                        <TextInput
                                            inputWidth={TextInputWidth.fill}
                                        />
                                    </Form.Item>
                                ) : null
                            }
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Stack direction={'horizontal'} gap={'m'} fullWidth>
                                <PrimaryButton
                                    htmlType="submit"
                                    text={'Submit'}
                                />
                                <SecondaryButton
                                    htmlType="button"
                                    onClick={onReset}
                                    text={'Reset'}
                                />
                                <DefaultButton
                                    onClick={onFill}
                                    text={'Fill form'}
                                />
                            </Stack>
                        </Form.Item>
                    </Form>
                </Stack>
            }
        />
    );
};

const Size_Story: ComponentStory<typeof Form> = (args) => {
    const [selected, setSelected] = useState<RadioButtonValue>('apple');

    const radioChangeGroupHandler = (
        e?: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setSelected(e.target.value);
    };
    return (
        <ConfigProvider
            themeOptions={{ name: 'blue' }}
            locale={enUS}
            children={
                <Stack direction={'vertical'} gap={'l'} fullWidth>
                    <Form
                        {...args}
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 9 }}
                        layout="horizontal"
                        requiredMark={'optional'}
                    >
                        <Form.Item label="CheckBox" valuePropName="checked">
                            <CheckBox label={'Checkbox'} />
                        </Form.Item>
                        <Form.Item label="Radio">
                            <RadioGroup
                                value={selected}
                                onChange={radioChangeGroupHandler}
                                items={[
                                    {
                                        label: 'Apple',
                                        name: 'group1',
                                        value: 'apple',
                                    },
                                    {
                                        label: 'Pear',
                                        name: 'group1',
                                        value: 'pear',
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Input"
                            name="input"
                            rules={[{ required: true }]}
                        >
                            <TextInput />
                        </Form.Item>
                        <Form.Item label="Select">
                            <Select
                                textInputProps={{
                                    inputWidth: TextInputWidth.fitContent,
                                }}
                                options={[
                                    {
                                        text: 'Demo',
                                        value: 'demo',
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label="DatePicker">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item label="RangePicker">
                            <RangePicker />
                        </Form.Item>
                        <Form.Item label="TextArea">
                            <TextArea />
                        </Form.Item>
                        <Form.Item label="Switch" valuePropName="checked">
                            <CheckBox toggle />
                        </Form.Item>
                        <Form.Item label="Button">
                            <PrimaryButton htmlType="submit" text={'Submit'} />
                        </Form.Item>
                    </Form>
                </Stack>
            }
        />
    );
};

const Shape_Story: ComponentStory<typeof Form> = (args) => {
    const [selected, setSelected] = useState<RadioButtonValue>('apple');

    const radioChangeGroupHandler = (
        e?: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setSelected(e.target.value);
    };
    return (
        <ConfigProvider
            themeOptions={{ name: 'blue' }}
            locale={enUS}
            children={
                <Stack direction={'vertical'} gap={'l'} fullWidth>
                    <Form
                        {...args}
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 9 }}
                        layout="horizontal"
                        requiredMark={'optional'}
                    >
                        <Form.Item label="CheckBox" valuePropName="checked">
                            <CheckBox label={'Checkbox'} />
                        </Form.Item>
                        <Form.Item label="Radio">
                            <RadioGroup
                                value={selected}
                                onChange={radioChangeGroupHandler}
                                items={[
                                    {
                                        label: 'Apple',
                                        name: 'group1',
                                        value: 'apple',
                                    },
                                    {
                                        label: 'Pear',
                                        name: 'group1',
                                        value: 'pear',
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Input"
                            name="input"
                            rules={[{ required: true }]}
                        >
                            <TextInput />
                        </Form.Item>
                        <Form.Item label="Select">
                            <Select
                                textInputProps={{
                                    inputWidth: TextInputWidth.fitContent,
                                }}
                                options={[
                                    {
                                        text: 'Demo',
                                        value: 'demo',
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label="DatePicker">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item label="RangePicker">
                            <RangePicker />
                        </Form.Item>
                        <Form.Item label="TextArea">
                            <TextArea />
                        </Form.Item>
                        <Form.Item label="Switch" valuePropName="checked">
                            <CheckBox toggle />
                        </Form.Item>
                        <Form.Item label="Button">
                            <PrimaryButton htmlType="submit" text={'Submit'} />
                        </Form.Item>
                    </Form>
                </Stack>
            }
        />
    );
};

export const Basic = Basic_Story.bind({});
export const Disabled = Disabled_Story.bind({});
export const Methods = Methods_Story.bind({});
export const Size = Size_Story.bind({});
export const Shape = Shape_Story.bind({});

const formArgs: Object = {
    shape: 'rectangle',
    size: 'medium',
    disabled: false,
};

Basic.args = {
    ...formArgs,
};

Disabled.args = {
    ...formArgs,
};

Methods.args = {
    ...formArgs,
};

Size.args = {
    ...formArgs,
};

Shape.args = {
    ...formArgs,
};
