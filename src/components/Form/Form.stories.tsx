import React, { useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Form, { FormSize } from './';
import { CheckBox } from '../CheckBox';
import { TextArea, TextInput, TextInputWidth, TextInputShape } from '../Inputs';
import { PrimaryButton } from '../Button';
import { RadioButtonValue, RadioGroup } from '../RadioButton';
import { Select } from '../Select';
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
        size: {
            options: [
                FormSize.Flex,
                FormSize.Large,
                FormSize.Medium,
                FormSize.Small,
            ],
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
                        <TextInput shape={TextInputShape.Rectangle} />
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
                        <TextInput
                            htmlType={'password'}
                            shape={TextInputShape.Rectangle}
                        />
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
            locale={zhCN}
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
                            <TextInput shape={TextInputShape.Rectangle} />
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
                            <TextArea shape={TextInputShape.Rectangle} />
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

const formArgs: Object = {
    size: FormSize.Medium,
};

Basic.args = {
    ...formArgs,
    disabled: false,
};

Disabled.args = {
    ...formArgs,
};
