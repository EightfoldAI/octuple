import React, { FC, useEffect, useRef, useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Form from './';
import type { FormInstance } from './';
import { CheckBox } from '../CheckBox';
import { TextArea, TextInput, TextInputWidth } from '../Inputs';
import {
    ButtonShape,
    DefaultButton,
    NeutralButton,
    PrimaryButton,
    SecondaryButton,
} from '../Button';
import { RadioButtonValue, RadioGroup } from '../RadioButton';
import { Select, SelectOption } from '../Select';
import DatePicker from '../DateTimePicker/DatePicker';
import { Stack } from '../Stack';
import enUS from '../Locale/en_US';
import zhCN from '../Locale/zh_CN';
import { ConfigProvider, Shape, Size } from '../ConfigProvider';
import { Slider } from '../Slider';
import { snack, SnackbarContainer } from '../Snackbar';
import { Icon, IconName } from '../Icon';
import { Link } from '../Link';
import { Modal, ModalSize } from '../Modal';
import { Avatar } from '../Avatar';

const { RangePicker, TimePicker } = DatePicker;

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
        layout: {
            options: ['horizontal', 'vertical', 'inline'],
            control: { type: 'inline-radio' },
        },
        shape: {
            options: [Shape.Rectangle, Shape.Pill, Shape.Underline],
            control: { type: 'inline-radio' },
        },
        size: {
            options: [Size.Flex, Size.Large, Size.Medium, Size.Small],
            control: { type: 'radio' },
        },
    },
} as ComponentMeta<typeof Form>;

const Basic_Story: ComponentStory<typeof Form> = (args) => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failure:', errorInfo);
    };
    return (
        <ConfigProvider
            themeOptions={{ name: 'blue' }}
            locale={enUS}
            children={
                <Form
                    {...args}
                    layout={'horizontal'}
                    name={'basic'}
                    labelCol={{ span: 1 }}
                    wrapperCol={{ span: 11 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete={'off'}
                >
                    <Form.Item
                        label={'Username'}
                        name={'username'}
                        rules={[{ required: true }]}
                        tooltip={<span>A Tooltip!</span>}
                    >
                        <TextInput />
                    </Form.Item>
                    <Form.Item
                        label={'Password'}
                        name={'password'}
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
                        name={'remember'}
                        valuePropName={'checked'}
                        wrapperCol={{ offset: 1, span: 11 }}
                    >
                        <CheckBox label={'Remember me'} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 1, span: 11 }}>
                        <PrimaryButton htmlType={'submit'} text={'Submit'} />
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
                        layout={'horizontal'}
                        onValuesChange={onFormLayoutChange}
                        disabled={componentDisabled}
                    >
                        <Form.Item label={'CheckBox'} valuePropName={'checked'}>
                            <CheckBox label={'Checkbox'} />
                        </Form.Item>
                        <Form.Item label={'Radio'}>
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
                        <Form.Item noStyle label={'Slider'} name={'slider'}>
                            <Slider step={1} max={100} min={1} value={50} />
                        </Form.Item>
                        <Form.Item
                            label={'Input'}
                            name={'input'}
                            rules={[{ required: true }]}
                        >
                            <TextInput />
                        </Form.Item>
                        <Form.Item label={'Select'}>
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
                        <Form.Item label={'DatePicker'}>
                            <DatePicker />
                        </Form.Item>
                        <Form.Item label={'RangePicker'}>
                            <RangePicker />
                        </Form.Item>
                        <Form.Item label={'TextArea'}>
                            <TextArea />
                        </Form.Item>
                        <Form.Item label={'Switch'} valuePropName={'checked'}>
                            <CheckBox toggle />
                        </Form.Item>
                        <Form.Item label={'Button'}>
                            <PrimaryButton
                                htmlType={'submit'}
                                text={'Submit'}
                            />
                        </Form.Item>
                    </Form>
                </Stack>
            }
        />
    );
};

const Methods_Story: ComponentStory<typeof Form> = (args) => {
    const [form] = Form.useForm();
    const [selected, setSelected] = useState<string>();
    const layout = {
        labelCol: { span: 1 },
        wrapperCol: { span: 11 },
    };
    const actionsLayout = {
        wrapperCol: { offset: 1, span: 11 },
    };
    const defaultOptions: SelectOption[] = [
        {
            text: 'Foo',
            value: 'foo',
        },
        {
            text: 'Bar',
            value: 'bar',
        },
        {
            text: 'Other',
            value: 'other',
        },
    ];

    const onSelectChange = (options: SelectOption[]) => {
        if (!options) {
            return onReset();
        }
        switch (options[0]) {
            case 'foo' as unknown as SelectOption:
                form.setFieldListValues({
                    note: 'Hello, Foo!',
                    selectValue: 'foo',
                });
                setSelected('foo');
                return;
            case 'bar' as unknown as SelectOption:
                form.setFieldListValues({
                    note: 'Hello, Bar!',
                    selectValue: 'bar',
                });
                setSelected('bar');
                return;
            case 'other' as unknown as SelectOption:
                form.setFieldListValues({
                    note: 'Hello, Other!',
                    selectValue: 'other',
                });
                setSelected('other');
                return;
        }
    };

    const onFinish = (values: any) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
        setSelected('');
    };

    const onFill = () => {
        form.resetFields();
        form.setFieldListValues({
            note: 'Hello, Foo!',
            selectValue: 'foo',
        });
        setSelected('foo');
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
                        name={'control-hooks'}
                        onFinish={onFinish}
                        style={{
                            width: '100%',
                        }}
                    >
                        <Form.Item
                            name={'note'}
                            label={'Note'}
                            rules={[{ required: true }]}
                        >
                            <TextInput inputWidth={TextInputWidth.fill} />
                        </Form.Item>
                        <Form.Item
                            name={'selectValue'}
                            label={'Select'}
                            rules={[{ required: true }]}
                        >
                            <Select
                                clearable
                                defaultValue={selected}
                                onClear={onReset}
                                onOptionsChange={onSelectChange}
                                options={defaultOptions}
                                placeholder={
                                    'Select an option to change the input text.'
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
                                getFieldValue('selectValue') === 'other' ? (
                                    <Form.Item
                                        name={'customizeSelect'}
                                        label={'Customize Select'}
                                        rules={[{ required: true }]}
                                    >
                                        <TextInput
                                            inputWidth={TextInputWidth.fill}
                                        />
                                    </Form.Item>
                                ) : null
                            }
                        </Form.Item>
                        <Form.Item {...actionsLayout}>
                            <Stack direction={'horizontal'} gap={'m'} fullWidth>
                                <PrimaryButton
                                    htmlType={'submit'}
                                    text={'Submit'}
                                />
                                <SecondaryButton
                                    htmlType={'button'}
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

const Form_Story: ComponentStory<typeof Form> = (args) => {
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
                        layout={'horizontal'}
                    >
                        <Form.Item label={'CheckBox'} valuePropName={'checked'}>
                            <CheckBox label={'Checkbox'} />
                        </Form.Item>
                        <Form.Item label={'Radio'}>
                            <RadioGroup
                                value={selected}
                                onChange={radioChangeGroupHandler}
                                items={[
                                    {
                                        label: 'Apple',
                                        name: 'group2',
                                        value: 'apple',
                                    },
                                    {
                                        label: 'Pear',
                                        name: 'group2',
                                        value: 'pear',
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label={'Input'}
                            name={'input'}
                            rules={[{ required: true }]}
                        >
                            <TextInput />
                        </Form.Item>
                        <Form.Item label={'Select'}>
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
                        <Form.Item label={'DatePicker'}>
                            <DatePicker />
                        </Form.Item>
                        <Form.Item label={'RangePicker'}>
                            <RangePicker />
                        </Form.Item>
                        <Form.Item label={'TextArea'}>
                            <TextArea />
                        </Form.Item>
                        <Form.Item label={'Switch'} valuePropName={'checked'}>
                            <CheckBox toggle />
                        </Form.Item>
                        <Form.Item label={'Button'}>
                            <PrimaryButton
                                htmlType={'submit'}
                                text={'Submit'}
                            />
                        </Form.Item>
                    </Form>
                </Stack>
            }
        />
    );
};

const Layout_Story: ComponentStory<typeof Form> = (args) => {
    return (
        <ConfigProvider
            themeOptions={{ name: 'blue' }}
            locale={enUS}
            children={
                <Form {...args}>
                    <Form.Item label={'Field A'} required>
                        <TextInput placeholder={'Placeholder A'} />
                    </Form.Item>
                    <Form.Item label={'Field B'}>
                        <TextInput placeholder={'Placeholder B'} />
                    </Form.Item>
                    <Form.Item>
                        <PrimaryButton text={'Submit'} />
                    </Form.Item>
                </Form>
            }
        />
    );
};

const Label_Wrap_Story: ComponentStory<typeof Form> = (args) => {
    return (
        <ConfigProvider
            themeOptions={{ name: 'blue' }}
            locale={enUS}
            children={
                <Form
                    {...args}
                    labelCol={{ flex: '120px' }}
                    wrapperCol={{ flex: 1 }}
                >
                    <Form.Item label={'Supercalifragilisticexpialidocious'}>
                        <TextInput placeholder={'Placeholder'} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 1 }}>
                        <PrimaryButton text={'Submit'} />
                    </Form.Item>
                </Form>
            }
        />
    );
};

const Non_Blocking_Story: ComponentStory<typeof Form> = (args) => {
    const [form] = Form.useForm();

    const onFinish = () => {
        snack.servePositive({
            closable: true,
            content: 'Submit success!',
        });
    };

    const onFinishFailed = () => {
        snack.serveDisruptive({
            closable: true,
            content: 'Submit failed!',
        });
    };

    const onFill = () => {
        form.setFieldListValues({
            url: 'https://eightfold.ai/',
        });
    };

    return (
        <ConfigProvider
            themeOptions={{ name: 'blue' }}
            locale={enUS}
            children={
                <>
                    <Form
                        {...args}
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete={'off'}
                    >
                        <Form.Item
                            name={'url'}
                            label={'URL'}
                            rules={[
                                { required: true },
                                { type: 'url', warningOnly: true },
                                { type: 'string', min: 6 },
                            ]}
                        >
                            <TextInput placeholder={'Placeholder'} />
                        </Form.Item>
                        <Form.Item>
                            <Stack direction={'horizontal'} gap={'m'}>
                                <PrimaryButton
                                    htmlType={'submit'}
                                    text={'Submit'}
                                />
                                <SecondaryButton
                                    htmlType={'button'}
                                    onClick={onFill}
                                    text={'Fill'}
                                />
                            </Stack>
                        </Form.Item>
                    </Form>
                    <SnackbarContainer />
                </>
            }
        />
    );
};

const Watch_Hooks_Story: ComponentStory<typeof Form> = () => {
    const [form] = Form.useForm<{ foo: string; bar: number }>();
    const fooValue = Form.useWatch('foo', form);

    return (
        <ConfigProvider
            themeOptions={{ name: 'blue' }}
            locale={enUS}
            children={
                <Stack direction={'vertical'} gap={'l'}>
                    <Form form={form} layout="vertical" autoComplete="off">
                        <Form.Item
                            name={'foo'}
                            label={'Foo (Watching to trigger rerender)'}
                        >
                            <TextInput />
                        </Form.Item>
                        <Form.Item name={'bar'} label={'Bar (Not Watching)'}>
                            <TextInput htmlType={'number'} />
                        </Form.Item>
                    </Form>
                    <pre>Foo: {fooValue}</pre>
                </Stack>
            }
        />
    );
};

const Dynamic_Form_Item_Story: ComponentStory<typeof Form> = (args) => {
    const formItemLayout = {
        labelCol: {
            xs: { span: 12 },
            sm: { span: 2 },
        },
        wrapperCol: {
            xs: { span: 12 },
            sm: { span: 10 },
        },
    };
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: { span: 12, offset: 0 },
            sm: { span: 10, offset: 2 },
        },
    };

    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
    };

    return (
        <ConfigProvider
            themeOptions={{ name: 'blue' }}
            locale={enUS}
            children={
                <Form
                    {...args}
                    name={'dynamic-form'}
                    {...formItemLayoutWithOutLabel}
                    onFinish={onFinish}
                >
                    <Form.List
                        name={'names'}
                        rules={[
                            {
                                validator: async (_, names) => {
                                    if (!names || names.length < 2) {
                                        return Promise.reject(
                                            new Error('At least 2 profiles')
                                        );
                                    } else {
                                        return Promise.resolve;
                                    }
                                },
                            },
                        ]}
                    >
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        {...(index === 0
                                            ? formItemLayout
                                            : formItemLayoutWithOutLabel)}
                                        label={index === 0 ? 'Profiles' : ''}
                                        required={false}
                                        key={field.key}
                                    >
                                        <Stack
                                            direction={'horizontal'}
                                            gap={'m'}
                                        >
                                            <Form.Item
                                                {...field}
                                                validateTrigger={[
                                                    'onChange',
                                                    'onBlur',
                                                ]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        whitespace: true,
                                                        message:
                                                            'Please input the profile name or delete this field.',
                                                    },
                                                ]}
                                                noStyle
                                            >
                                                <TextInput placeholder="profile name" />
                                            </Form.Item>
                                            {fields.length > 1 ? (
                                                <PrimaryButton
                                                    iconProps={{
                                                        path: IconName.mdiMinusCircleOutline,
                                                    }}
                                                    shape={ButtonShape.Round}
                                                    classNames={
                                                        'dynamic-delete-button'
                                                    }
                                                    onClick={() =>
                                                        remove(field.name)
                                                    }
                                                    style={{
                                                        display: 'inline-block',
                                                        margin: '0 8px',
                                                        verticalAlign: 'bottom',
                                                    }}
                                                />
                                            ) : null}
                                        </Stack>
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <PrimaryButton
                                        iconProps={{
                                            path: IconName.mdiPlusCircleOutline,
                                        }}
                                        onClick={() => add()}
                                        style={{ display: 'block' }}
                                        text={'Add field'}
                                        htmlType={'button'}
                                    />
                                    <PrimaryButton
                                        iconProps={{
                                            path: IconName.mdiPlusCircleOutline,
                                        }}
                                        onClick={() => {
                                            add('The head item', 0);
                                        }}
                                        style={{
                                            display: 'block',
                                            marginTop: '20px',
                                        }}
                                        text={'Add field at head'}
                                        htmlType={'button'}
                                    />
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item>
                        <PrimaryButton htmlType={'submit'} text={'Submit'} />
                    </Form.Item>
                </Form>
            }
        />
    );
};

const Dynamic_Form_Nest_Items_Story: ComponentStory<typeof Form> = (args) => {
    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
    };

    return (
        <ConfigProvider
            themeOptions={{ name: 'blue' }}
            locale={enUS}
            children={
                <Form
                    {...args}
                    name="dynamic-form-nest-items"
                    onFinish={onFinish}
                    autoComplete={'off'}
                >
                    <Form.List name="users">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Stack
                                        key={key}
                                        style={{
                                            display: 'flex',
                                            marginBottom: 8,
                                        }}
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'first']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Missing first name',
                                                },
                                            ]}
                                        >
                                            <TextInput
                                                placeholder={'First Name'}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'last']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Missing last name',
                                                },
                                            ]}
                                        >
                                            <TextInput
                                                placeholder={'Last Name'}
                                            />
                                        </Form.Item>
                                        <PrimaryButton
                                            iconProps={{
                                                path: IconName.mdiMinusCircleOutline,
                                            }}
                                            onClick={() => remove(name)}
                                            shape={ButtonShape.Round}
                                            htmlType={'button'}
                                        />
                                    </Stack>
                                ))}
                                <Form.Item>
                                    <PrimaryButton
                                        iconProps={{
                                            path: IconName.mdiPlusCircleOutline,
                                        }}
                                        onClick={() => add()}
                                        text={'Add field'}
                                        htmlType={'button'}
                                    />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item>
                        <PrimaryButton htmlType={'submit'} text={'Submit'} />
                    </Form.Item>
                </Form>
            }
        />
    );
};

const Complex_Dynamic_Form_Items_Story: ComponentStory<typeof Form> = (
    args
) => {
    const [form] = Form.useForm();

    const areaOptions: SelectOption[] = [
        {
            selected: true,
            text: 'Seattle',
            value: 'Seattle',
        },
        {
            text: 'Manhattan',
            value: 'Manhattan',
        },
    ];

    const seattleOptions: SelectOption[] = [
        {
            text: 'Space Needle',
            value: 'Space Needle',
        },
        {
            text: 'Golden Gardens',
            value: 'Golden Gardens',
        },
    ];

    const manhattanOptions: SelectOption[] = [
        {
            text: 'Empire State Building',
            value: 'Empire State Building',
        },
        {
            text: 'Central Park',
            value: 'Central Park',
        },
    ];

    const sights = {
        Seattle: seattleOptions,
        Manhattan: manhattanOptions,
    };

    type SightsKeys = keyof typeof sights;

    const onSelectAreaChange = (options: SelectOption[]) => {
        form.setFieldListValues({ sights: [] });
        options.forEach((area) => {
            form.setFieldListValues({ area: area });
        });
    };

    const onSelectSitesChange = (options: SelectOption[], _key: number) => {
        const fields = form.getFieldListValues();
        const { sight, sights } = fields;
        options.forEach((option) => {
            const sightByFieldName = `${_key}${option}`;
            Object.assign(sightByFieldName, { sight: option });
            form.setFieldListValues({ sight });
            Object.assign(sights[_key], { sight: option });
            form.setFieldListValues({ sights });
            form.validateFields();
        });
        console.log(form.getFieldListValues());
    };

    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
    };

    return (
        <ConfigProvider
            themeOptions={{ name: 'blue' }}
            locale={enUS}
            children={
                <Form
                    {...args}
                    form={form}
                    name={'complex-dynamic-form-item'}
                    onFinish={onFinish}
                    autoComplete={'off'}
                >
                    <Form.Item
                        name={'area'}
                        label={'Area'}
                        rules={[{ required: true, message: 'Missing area' }]}
                    >
                        <Select
                            options={areaOptions}
                            onOptionsChange={onSelectAreaChange}
                        />
                    </Form.Item>
                    <Form.List name={'sights'}>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field) => (
                                    <Stack key={field.key}>
                                        <Form.Item
                                            noStyle
                                            shouldUpdate={(
                                                prevValues,
                                                curValues
                                            ) =>
                                                prevValues.area !==
                                                    curValues.area ||
                                                prevValues.sights !==
                                                    curValues.sights
                                            }
                                        >
                                            {() => (
                                                <Form.Item
                                                    {...field}
                                                    label={'Sight'}
                                                    name={[field.name, 'sight']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Missing sight',
                                                        },
                                                    ]}
                                                >
                                                    <Select
                                                        disabled={
                                                            !form.getFieldValue(
                                                                'area'
                                                            )
                                                        }
                                                        onOptionsChange={(
                                                            o
                                                        ) => {
                                                            onSelectSitesChange(
                                                                o,
                                                                field.name
                                                            );
                                                        }}
                                                        options={(
                                                            sights[
                                                                form.getFieldValue(
                                                                    'area'
                                                                ) as SightsKeys
                                                            ] || []
                                                        ).map((sight) => ({
                                                            text: sight.text,
                                                            value: sight.value,
                                                        }))}
                                                    />
                                                </Form.Item>
                                            )}
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            initialValue={'0'}
                                            label={'Price'}
                                            name={[field.name, 'price']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing price',
                                                },
                                            ]}
                                        >
                                            <TextInput />
                                        </Form.Item>
                                        <PrimaryButton
                                            iconProps={{
                                                path: IconName.mdiMinusCircleOutline,
                                            }}
                                            onClick={() => remove(field.name)}
                                            shape={ButtonShape.Round}
                                        />
                                    </Stack>
                                ))}

                                <Form.Item>
                                    <PrimaryButton
                                        iconProps={{
                                            path: IconName.mdiPlusCircleOutline,
                                        }}
                                        onClick={() => add()}
                                        text={'Add sights'}
                                        htmlType={'button'}
                                    />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item>
                        <PrimaryButton htmlType={'submit'} text={'Submit'} />
                    </Form.Item>
                </Form>
            }
        />
    );
};

const Nest_Story: ComponentStory<typeof Form> = (args) => {
    const layout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 8 },
    };

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    /* eslint-enable no-template-curly-in-string */

    const onFinish = (values: any) => {
        console.log(values);
    };

    return (
        <ConfigProvider
            themeOptions={{ name: 'blue' }}
            locale={enUS}
            children={
                <Form
                    {...args}
                    {...layout}
                    name={'nest-messages'}
                    onFinish={onFinish}
                    scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name={['user', 'name']}
                        label={'Name'}
                        rules={[{ required: true }]}
                    >
                        <TextInput />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'email']}
                        label={'Email'}
                        rules={[{ type: 'email' }]}
                    >
                        <TextInput />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'age']}
                        label={'Age'}
                        rules={[{ type: 'number', min: 0, max: 99 }]}
                    >
                        <TextInput numbersOnly />
                    </Form.Item>
                    <Form.Item name={['user', 'website']} label={'Website'}>
                        <TextInput />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'introduction']}
                        label={'Introduction'}
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <PrimaryButton htmlType={'submit'} text={'Submit'} />
                    </Form.Item>
                </Form>
            }
        />
    );
};

const Complex_Form_Control_Story: ComponentStory<typeof Form> = (args) => {
    const [form] = Form.useForm();
    const defaultOptions: SelectOption[] = [
        {
            text: 'Seattle',
            value: 'Seattle',
        },
        {
            text: 'Manhattan',
            value: 'Manhattan',
        },
    ];

    const onSelectCityChange = (options: SelectOption[]) => {
        options.forEach((option) => {
            form.setFieldListValues({ address: { city: option } });
            form.validateFields();
        });
        console.log(form.getFieldListValues());
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <ConfigProvider
            themeOptions={{ name: 'blue' }}
            locale={enUS}
            children={
                <Form
                    {...args}
                    form={form}
                    name={'complex-form'}
                    onFinish={onFinish}
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 10 }}
                >
                    <Form.Item label={'Username'}>
                        <Stack direction={'horizontal'} gap={'m'}>
                            <Form.Item
                                name={'username'}
                                noStyle
                                rules={[
                                    {
                                        required: true,
                                        message: 'Username is required',
                                    },
                                ]}
                            >
                                <TextInput
                                    inputWidth={TextInputWidth.fitContent}
                                    placeholder={'Name'}
                                />
                            </Form.Item>
                            <Link variant={'primary'} href={'#'}>
                                Need Help?
                            </Link>
                        </Stack>
                    </Form.Item>
                    <Form.Item label={'Address'}>
                        <Stack direction={'horizontal'}>
                            <Form.Item
                                name={['address', 'city']}
                                noStyle
                                rules={[
                                    {
                                        required: true,
                                        message: 'City is required',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder={'Select city'}
                                    inputWidth={TextInputWidth.fill}
                                    onOptionsChange={onSelectCityChange}
                                    options={defaultOptions}
                                />
                            </Form.Item>
                            <Form.Item
                                name={['address', 'street']}
                                noStyle
                                rules={[
                                    {
                                        required: true,
                                        message: 'Street is required',
                                    },
                                ]}
                            >
                                <TextInput placeholder={'Input street'} />
                            </Form.Item>
                        </Stack>
                    </Form.Item>
                    <Form.Item label="Date of Birth">
                        <Stack direction={'horizontal'} gap={'xxs'}>
                            <Form.Item
                                name={'year'}
                                rules={[{ required: true }]}
                                style={{
                                    marginLeft: -8,
                                }}
                            >
                                <TextInput placeholder={'Year'} />
                            </Form.Item>
                            <Form.Item
                                name="month"
                                rules={[{ required: true }]}
                            >
                                <TextInput placeholder={'Month'} />
                            </Form.Item>
                        </Stack>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4 }} colon={false}>
                        <PrimaryButton htmlType={'submit'} text={'Submit'} />
                    </Form.Item>
                </Form>
            }
        />
    );
};

type Currency = 'rmb' | 'dollar';

interface PriceValue {
    number?: number;
    currency?: Currency;
}

interface PriceInputProps {
    value?: PriceValue;
    onChange?: (value: PriceValue) => void;
}

const PriceInput: FC<PriceInputProps> = ({ value = {}, onChange }) => {
    const [number, setNumber] = useState(0);
    const [currency, setCurrency] = useState<Currency>('rmb');

    const defaultOptions: SelectOption[] = [
        {
            text: 'RMB',
            value: 'rmb',
        },
        {
            text: 'Dollar',
            value: 'dollar',
        },
    ];

    const triggerChange = (changedValue: {
        number?: number;
        currency?: Currency;
    }) => {
        onChange?.({ number, currency, ...value, ...changedValue });
    };

    const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newNumber = parseInt(e.target.value || '0', 10);
        if (Number.isNaN(number)) {
            return;
        }
        if (!('number' in value)) {
            setNumber(newNumber);
        }
        triggerChange({ number: newNumber });
    };

    const onCurrencyChange = (options: SelectOption[]) => {
        options.forEach((option) => {
            setCurrency(option as unknown as Currency);
            triggerChange({ currency: option as unknown as Currency });
        });
    };

    return (
        <Stack direction={'horizontal'} gap={'s'} fullWidth>
            <TextInput
                numbersOnly
                value={value.number || number}
                onChange={onNumberChange}
                style={{ width: 100 }}
            />
            <Select
                defaultValue={value.currency || currency}
                inputWidth={TextInputWidth.fitContent}
                style={{ margin: '0 8px' }}
                options={defaultOptions}
                onOptionsChange={onCurrencyChange}
            />
        </Stack>
    );
};

const Custom_Form_Controls_Story: ComponentStory<typeof Form> = (args) => {
    const checkPrice = (_: any, value: { number: number }) => {
        if (value.number > 0) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Price must be greater than zero!'));
    };

    const onFinish = (values: any) => {
        console.log('Received values from form: ', values);
    };

    return (
        <ConfigProvider
            themeOptions={{ name: 'blue' }}
            locale={enUS}
            children={
                <Form
                    {...args}
                    name={'custom-form-controls'}
                    layout={'inline'}
                    onFinish={onFinish}
                    initialValues={{
                        price: {
                            number: 0,
                            currency: 'rmb',
                        },
                    }}
                >
                    <Form.Item
                        name={'price'}
                        label={'Price'}
                        rules={[{ validator: checkPrice }]}
                    >
                        <PriceInput />
                    </Form.Item>
                    <Form.Item>
                        <PrimaryButton htmlType={'submit'} text={'Submit'} />
                    </Form.Item>
                </Form>
            }
        />
    );
};

interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}

interface CustomizedFormProps {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
}

const CustomizedForm: React.FC<CustomizedFormProps> = ({
    onChange,
    fields,
}) => (
    <Form
        name={'global-state'}
        layout={'inline'}
        fields={fields}
        onFieldsChange={(_, allFields) => {
            onChange(allFields);
        }}
    >
        <Form.Item
            name={'username'}
            label={'Username'}
            rules={[{ required: true, message: 'Username is required!' }]}
        >
            <TextInput />
        </Form.Item>
    </Form>
);

const Store_Form_Data_Story: ComponentStory<typeof Form> = () => {
    const [fields, setFields] = useState<FieldData[]>([
        { name: ['username'], value: 'Octuple' },
    ]);

    return (
        <ConfigProvider
            themeOptions={{ name: 'blue' }}
            locale={enUS}
            children={
                <>
                    <CustomizedForm
                        fields={fields}
                        onChange={(newFields) => {
                            setFields(newFields);
                        }}
                    />
                    <pre>{JSON.stringify(fields, null, 2)}</pre>
                </>
            }
        />
    );
};

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 10 },
};
const tailLayout = {
    wrapperCol: { offset: 2, span: 10 },
};

interface UserType {
    name: string;
    age: string;
}

interface ModalFormProps {
    visible: boolean;
    onCancel: () => void;
}

const useResetFormOnCloseModal = ({
    form,
    visible,
}: {
    form: FormInstance;
    visible: boolean;
}) => {
    const prevVisibleRef = useRef<boolean>();
    useEffect(() => {
        prevVisibleRef.current = visible;
    }, [visible]);
    const prevVisible = prevVisibleRef.current;

    useEffect(() => {
        if (!visible && prevVisible) {
            form.resetFields();
        }
    }, [form, prevVisible, visible]);
};

const ModalForm: React.FC<ModalFormProps> = ({ visible, onCancel }) => {
    const [form] = Form.useForm();

    useResetFormOnCloseModal({
        form,
        visible,
    });

    const onOk = () => {
        form.submit();
    };

    return (
        <Modal
            header={'Form Instance'}
            visible={visible}
            onClose={onCancel}
            actions={
                <>
                    <NeutralButton text={'Cancel'} onClick={onCancel} />
                    <PrimaryButton text={'ok'} onClick={onOk} />
                </>
            }
            body={
                <Form form={form} layout={'horizontal'} name={'userForm'}>
                    <Form.Item
                        name={'name'}
                        label={'Name'}
                        rules={[{ required: true }]}
                    >
                        <TextInput />
                    </Form.Item>
                    <Form.Item
                        name={'age'}
                        label={'Age'}
                        rules={[{ required: true }]}
                    >
                        <TextInput numbersOnly />
                    </Form.Item>
                </Form>
            }
        />
    );
};

const Control_Between_Forms_Story: ComponentStory<typeof Form> = () => {
    const [visible, setVisible] = useState(false);

    const showUserModal = () => {
        setVisible(true);
    };

    const hideUserModal = () => {
        setVisible(false);
    };

    const onFinish = (values: any) => {
        console.log('Finish:', values);
    };

    return (
        <ConfigProvider
            themeOptions={{ name: 'blue' }}
            locale={enUS}
            children={
                <Form.Provider
                    onFormFinish={(name, { values, forms }) => {
                        if (name === 'userForm') {
                            const { basicForm } = forms;
                            const users =
                                basicForm.getFieldValue('users') || [];
                            basicForm.setFieldListValues({
                                users: [...users, values],
                            });
                            setVisible(false);
                        }
                    }}
                >
                    <Form {...layout} name={'basicForm'} onFinish={onFinish}>
                        <Form.Item
                            name={'group'}
                            label={'Group Name'}
                            rules={[{ required: true }]}
                        >
                            <TextInput />
                        </Form.Item>
                        <Form.Item
                            label={'Profiles'}
                            shouldUpdate={(prevValues, curValues) =>
                                prevValues.users !== curValues.users
                            }
                        >
                            {({ getFieldValue }) => {
                                const users: UserType[] =
                                    getFieldValue('users') || [];
                                return users.length ? (
                                    <ul style={{ listStyle: 'none' }}>
                                        {users.map((user, index) => (
                                            <li key={index}>
                                                <Stack
                                                    direction={'horizontal'}
                                                    gap={'xs'}
                                                    style={{ marginBottom: 8 }}
                                                >
                                                    <Avatar
                                                        fontSize={'18px'}
                                                        iconProps={{
                                                            path: IconName.mdiAccount,
                                                        }}
                                                        size={'40px'}
                                                        style={{
                                                            backgroundColor:
                                                                'var(--accent-color-40)',
                                                        }}
                                                        type={'round'}
                                                    />
                                                    <span
                                                        style={{
                                                            lineHeight: '40px',
                                                        }}
                                                    >
                                                        {user.name} - {user.age}
                                                    </span>
                                                </Stack>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <Stack
                                        direction={'horizontal'}
                                        gap={'s'}
                                        fullWidth
                                    >
                                        <Icon path={IconName.mdiAccount} />
                                        <span>
                                            {' '}
                                            Click on thew 'Add profile' button
                                            to add a profile.
                                        </span>
                                    </Stack>
                                );
                            }}
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <PrimaryButton
                                htmlType={'submit'}
                                text={'Submit'}
                            />
                            <DefaultButton
                                htmlType={'button'}
                                style={{ margin: '0 8px' }}
                                onClick={showUserModal}
                                text={'Add user'}
                            />
                        </Form.Item>
                    </Form>
                    <ModalForm visible={visible} onCancel={hideUserModal} />
                </Form.Provider>
            }
        />
    );
};

interface Values {
    reason: string;
    modifier: string;
}

interface CollectionCreateFormProps {
    visible: boolean;
    onDecline: (values: Values) => void;
    onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    visible,
    onDecline,
    onCancel,
}) => {
    const [form] = Form.useForm();
    const [selectedReason, setSelectedReason] =
        useState<RadioButtonValue>('Radio1');

    const onClickDecline = () => {
        form.validateFields()
            .then((values) => {
                form.resetFields();
                onDecline(values);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const radioChangeGroupHandler = (
        e?: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setSelectedReason(e.target.value);
        console.log(e.target.value);
    };

    return (
        <Modal
            visible={visible}
            header="Reason for declining"
            size={ModalSize.small}
            onClose={onCancel}
            width={440}
            height={selectedReason === 'Radio4' ? 528 : 336}
            actions={
                <>
                    <NeutralButton text={'Cancel'} onClick={onCancel} />
                    <PrimaryButton
                        text={'Decline'}
                        disruptive
                        onClick={onClickDecline}
                    />
                </>
            }
            body={
                <Form
                    form={form}
                    layout={'vertical'}
                    name={'form-in-modal'}
                    initialValues={{ modifier: 'Radio1' }}
                >
                    <Form.Item name="modifier">
                        <RadioGroup
                            value={selectedReason}
                            items={[
                                {
                                    ariaLabel:
                                        'Not interested in the position anymore',
                                    id: 'group3-0',
                                    label: 'Not interested in the position anymore',
                                    name: 'group3',
                                    value: 'Radio1',
                                },
                                {
                                    ariaLabel: 'This slot does not work for me',
                                    id: 'group3-1',
                                    label: 'This slot does not work for me',
                                    name: 'group3',
                                    value: 'Radio2',
                                },
                                {
                                    ariaLabel: 'Accepted another offer',
                                    id: 'group3-2',
                                    label: 'Accepted another offer',
                                    name: 'group3',
                                    value: 'Radio3',
                                },
                                {
                                    ariaLabel: 'Other reason',
                                    id: 'group3-3',
                                    label: 'Other reason',
                                    name: 'group3',
                                    value: 'Radio4',
                                },
                            ]}
                            onChange={radioChangeGroupHandler}
                        />
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) =>
                            prevValues.modifier !== currentValues.modifier
                        }
                    >
                        {({ getFieldValue }) =>
                            getFieldValue('modifier') === 'Radio4' ? (
                                <Form.Item
                                    name={'reason'}
                                    rules={[{ required: true }]}
                                >
                                    <TextArea
                                        inputWidth={TextInputWidth.fill}
                                    />
                                </Form.Item>
                            ) : null
                        }
                    </Form.Item>
                </Form>
            }
        />
    );
};

const Form_In_Modal_Story: ComponentStory<typeof Form> = () => {
    const [visible, setVisible] = useState(false);

    const onDecline = (values: any) => {
        console.log('Received values of form: ', values);
        setVisible(false);
    };

    return (
        <ConfigProvider
            themeOptions={{ name: 'blue' }}
            locale={enUS}
            children={
                <>
                    <SecondaryButton
                        disruptive
                        onClick={() => {
                            setVisible(true);
                        }}
                        text={'Decline'}
                    />
                    <CollectionCreateForm
                        visible={visible}
                        onDecline={onDecline}
                        onCancel={() => {
                            setVisible(false);
                        }}
                    />
                </>
            }
        />
    );
};

const Dates_and_Times_Story: ComponentStory<typeof Form> = (args) => {
    const formItemLayout = {
        labelCol: {
            xs: { span: 12 },
            sm: { span: 2 },
        },
        wrapperCol: {
            xs: { span: 12 },
            sm: { span: 10 },
        },
    };
    const config = {
        rules: [
            {
                type: 'object' as const,
                required: true,
                message: 'Please select time.',
            },
        ],
    };
    const rangeConfig = {
        rules: [
            {
                type: 'array' as const,
                required: true,
                message: 'Please select time.',
            },
        ],
    };

    const onFinish = (fieldsValue: any) => {
        // Should format date value before submit.
        const rangeValue = fieldsValue['range-picker'];
        const rangeTimeValue = fieldsValue['range-time-picker'];
        const values = {
            ...fieldsValue,
            'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
            'date-time-picker': fieldsValue['date-time-picker'].format(
                'YYYY-MM-DD HH:mm:ss'
            ),
            'month-picker': fieldsValue['month-picker'].format('YYYY-MM'),
            'range-picker': [
                rangeValue[0].format('YYYY-MM-DD'),
                rangeValue[1].format('YYYY-MM-DD'),
            ],
            'range-time-picker': [
                rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
                rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
            ],
            'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
        };
        console.log('Received values of form: ', values);
    };

    return (
        <ConfigProvider
            themeOptions={{ name: 'blue' }}
            locale={enUS}
            children={
                <Form
                    {...args}
                    name={'dates-and-times'}
                    {...formItemLayout}
                    onFinish={onFinish}
                    scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
                >
                    <Form.Item name={'date-picker'} label={'Date'} {...config}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        name={'date-time-picker'}
                        label={'Date - show time'}
                        {...config}
                    >
                        <DatePicker showTime format={'YYYY-MM-DD HH:mm:ss'} />
                    </Form.Item>
                    <Form.Item
                        name={'month-picker'}
                        label={'Month'}
                        {...config}
                    >
                        <DatePicker picker="month" />
                    </Form.Item>
                    <Form.Item
                        name={'range-picker'}
                        label={'Range'}
                        {...rangeConfig}
                    >
                        <RangePicker />
                    </Form.Item>
                    <Form.Item
                        name={'range-time-picker'}
                        label={'Range - show time'}
                        {...rangeConfig}
                    >
                        <RangePicker showTime format={'YYYY-MM-DD HH:mm:ss'} />
                    </Form.Item>
                    <Form.Item name={'time-picker'} label={'Time'} {...config}>
                        <TimePicker />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            xs: { span: 12, offset: 0 },
                            sm: { span: 10, offset: 2 },
                        }}
                    >
                        <PrimaryButton htmlType={'submit'} text={'Submit'} />
                    </Form.Item>
                </Form>
            }
        />
    );
};

const Manual_Form_Data_Story: ComponentStory<typeof Form> = (args) => {
    type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus'];

    const validatePrimeNumber = (
        number: number
    ): {
        validateStatus: ValidateStatus;
        errorMsg: string | null;
    } => {
        if (number === 11) {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
        return {
            validateStatus: 'error',
            errorMsg: 'The prime between 8 and 12 is 11!',
        };
    };

    const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 10 },
    };

    const [number, setNumber] = useState<{
        intValue: number;
        validateStatus?: ValidateStatus;
        errorMsg?: string | null;
    }>({
        intValue: 11,
    });

    const tips =
        'A prime is a natural number greater than 1 that has no positive divisors other than 1 and itself.';

    const onNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const intValue: number = parseInt(value, 10);
        setNumber({
            ...validatePrimeNumber(intValue),
            intValue,
        });
    };

    return (
        <ConfigProvider
            themeOptions={{ name: 'blue' }}
            locale={enUS}
            children={
                <Form {...args}>
                    <Form.Item
                        {...formItemLayout}
                        label={'Prime between 8 and 12'}
                        validateStatus={number.validateStatus}
                        help={number.errorMsg || tips}
                    >
                        <TextInput
                            numbersOnly
                            minlength={8}
                            maxlength={12}
                            value={number.intValue}
                            onChange={onNumberChange}
                        />
                    </Form.Item>
                </Form>
            }
        />
    );
};

const Custom_Validation_Story: ComponentStory<typeof Form> = (args) => {
    const formItemLayout = {
        labelCol: {
            xs: { span: 12 },
            sm: { span: 2 },
        },
        wrapperCol: {
            xs: { span: 12 },
            sm: { span: 4 },
        },
    };

    return (
        <ConfigProvider
            themeOptions={{ name: 'blue' }}
            locale={enUS}
            children={
                <Form {...args} {...formItemLayout}>
                    <Form.Item
                        label={'Fail'}
                        validateStatus={'error'}
                        help={'Should be alphanumeric'}
                    >
                        <TextInput
                            placeholder={'unavailable choice'}
                            id={'error'}
                        />
                    </Form.Item>
                    <Form.Item label={'Warning'} validateStatus={'warning'}>
                        <TextInput placeholder={'Warning'} id={'warning'} />
                    </Form.Item>
                    <Form.Item
                        label={'Validating'}
                        hasFeedback
                        validateStatus={'validating'}
                        help={'The information is being validated...'}
                    >
                        <TextInput
                            placeholder={'Content is being validated'}
                            id={'validating'}
                        />
                    </Form.Item>
                    <Form.Item
                        label={'Success'}
                        hasFeedback
                        validateStatus={'success'}
                    >
                        <TextInput placeholder={'Content'} id={'success'} />
                    </Form.Item>
                    <Form.Item
                        label={'Warning'}
                        hasFeedback
                        validateStatus={'warning'}
                    >
                        <TextInput placeholder={'Warning'} id={'warning2'} />
                    </Form.Item>
                    <Form.Item
                        label={'Fail'}
                        hasFeedback
                        validateStatus={'error'}
                        help={'Should be alphanumeric'}
                    >
                        <TextInput placeholder={'No choice'} id={'error2'} />
                    </Form.Item>
                    <Form.Item
                        label={'Success'}
                        hasFeedback
                        validateStatus={'success'}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        label={'Warning'}
                        hasFeedback
                        validateStatus={'warning'}
                    >
                        <TimePicker />
                    </Form.Item>
                    <Form.Item
                        label={'Error'}
                        hasFeedback
                        validateStatus={'error'}
                    >
                        <RangePicker />
                    </Form.Item>
                    <Form.Item
                        label={'Error'}
                        hasFeedback
                        validateStatus={'error'}
                    >
                        <Select
                            placeholder={'Select'}
                            clearable
                            options={[
                                {
                                    text: 'Option 1',
                                    value: '1',
                                },
                                {
                                    text: 'Option 2',
                                    value: '2',
                                },
                                {
                                    text: 'Option 3',
                                    value: '3',
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label={'Success'}
                        hasFeedback
                        validateStatus={'success'}
                    >
                        <TextInput numbersOnly />
                    </Form.Item>
                    <Form.Item
                        label={'Success'}
                        hasFeedback
                        validateStatus={'success'}
                    >
                        <TextInput clearable placeholder={'Clearable'} />
                    </Form.Item>
                    <Form.Item
                        label={'Warning'}
                        hasFeedback
                        validateStatus={'warning'}
                    >
                        <TextInput
                            htmlType={'password'}
                            placeholder={'Password'}
                        />
                    </Form.Item>
                    <Form.Item
                        label={'Error'}
                        hasFeedback
                        validateStatus={'error'}
                    >
                        <TextInput
                            htmlType={'password'}
                            clearable
                            inputWidth={TextInputWidth.fill}
                            placeholder={'Password and clearable'}
                        />
                    </Form.Item>
                    <Form.Item
                        label={'Fail'}
                        validateStatus={'error'}
                        hasFeedback
                        help={'Should have something'}
                    >
                        <TextArea />
                    </Form.Item>
                </Form>
            }
        />
    );
};

const Dynamic_Rules_Story: ComponentStory<typeof Form> = (args) => {
    const [form] = Form.useForm();
    const [checkNick, setCheckNick] = useState(false);

    const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 10 },
    };

    const formTailLayout = {
        labelCol: { span: 1 },
        wrapperCol: { span: 10, offset: 2 },
    };

    useEffect(() => {
        form.validateFields(['nickname']);
    }, [checkNick, form]);

    const onCheckboxChange = (e: { target: { checked: boolean } }) => {
        setCheckNick(e.target.checked);
    };

    const onCheck = async () => {
        try {
            const values = await form.validateFields();
            console.log('Success:', values);
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };

    return (
        <ConfigProvider
            themeOptions={{ name: 'blue' }}
            locale={enUS}
            children={
                <Form {...args} form={form} name={'dynamic-rule'}>
                    <Form.Item
                        {...formItemLayout}
                        name={'username'}
                        label={'Name'}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name',
                            },
                        ]}
                    >
                        <TextInput
                            inputWidth={TextInputWidth.fill}
                            placeholder={'Please input your name'}
                        />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        name={'nickname'}
                        label={'Nickname'}
                        rules={[
                            {
                                required: checkNick,
                                message: 'Please input your nickname',
                            },
                        ]}
                    >
                        <TextInput
                            inputWidth={TextInputWidth.fill}
                            placeholder={'Please input your nickname'}
                        />
                    </Form.Item>
                    <Form.Item {...formTailLayout}>
                        <CheckBox
                            checked={checkNick}
                            onChange={onCheckboxChange}
                            label={'Nickname is required'}
                        />
                    </Form.Item>
                    <Form.Item {...formTailLayout}>
                        <PrimaryButton onClick={onCheck} text={'Check'} />
                    </Form.Item>
                </Form>
            }
        />
    );
};

export const Basic = Basic_Story.bind({});
export const Disabled = Disabled_Story.bind({});
export const Methods = Methods_Story.bind({});
export const Flex = Form_Story.bind({});
export const Large = Form_Story.bind({});
export const Medium = Form_Story.bind({});
export const Small = Form_Story.bind({});
export const Rectangle = Form_Story.bind({});
export const Pill = Form_Story.bind({});
export const Underline = Form_Story.bind({});
export const Horizontal = Layout_Story.bind({});
export const Vertical = Layout_Story.bind({});
export const Inline = Layout_Story.bind({});
export const Label_Wrap = Label_Wrap_Story.bind({});
export const Required = Layout_Story.bind({});
export const Required_Hidden = Layout_Story.bind({});
export const Optional = Layout_Story.bind({});
export const Non_Blocking = Non_Blocking_Story.bind({});
export const Watch_Hooks = Watch_Hooks_Story.bind({});
export const Dynamic_Form_Item = Dynamic_Form_Item_Story.bind({});
export const Dynamic_Form_Nest_Items = Dynamic_Form_Nest_Items_Story.bind({});
export const Complex_Dynamic_Form_Items = Complex_Dynamic_Form_Items_Story.bind(
    {}
);
export const Nest = Nest_Story.bind({});
export const Complex_Form_Control = Complex_Form_Control_Story.bind({});
export const Custom_Form_Controls = Custom_Form_Controls_Story.bind({});
export const Store_Form_Data = Store_Form_Data_Story.bind({});
export const Control_Between_Forms = Control_Between_Forms_Story.bind({});
export const Form_In_Modal = Form_In_Modal_Story.bind({});
export const Dates_and_Times = Dates_and_Times_Story.bind({});
export const Manual_Form_Data = Manual_Form_Data_Story.bind({});
export const Custom_Validation = Custom_Validation_Story.bind({});
export const Dynamic_Rules = Dynamic_Rules_Story.bind({});

const formArgs: Object = {
    disabled: false,
    labelAlign: 'left',
    labelWrap: false,
    layout: 'horizontal',
    shape: Shape.Rectangle,
    size: Size.Medium,
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

Flex.args = {
    ...formArgs,
    size: Size.Flex,
};

Large.args = {
    ...formArgs,
    size: Size.Large,
};

Medium.args = {
    ...formArgs,
    size: Size.Medium,
};

Small.args = {
    ...formArgs,
    size: Size.Small,
};

Rectangle.args = {
    ...formArgs,
    shape: Shape.Rectangle,
};

Pill.args = {
    ...formArgs,
    shape: Shape.Pill,
};

Underline.args = {
    ...formArgs,
    shape: Shape.Underline,
};

Horizontal.args = {
    ...formArgs,
    layout: 'horizontal',
};

Vertical.args = {
    ...formArgs,
    layout: 'vertical',
};

Inline.args = {
    ...formArgs,
    layout: 'inline',
};

Label_Wrap.args = {
    ...formArgs,
    colon: false,
    labelWrap: true,
    labelAlign: 'left',
};

Required.args = {
    ...formArgs,
};

Optional.args = {
    ...formArgs,
    requiredMark: 'optional',
};

Required_Hidden.args = {
    ...formArgs,
    requiredMark: false,
};

Non_Blocking.args = {
    ...formArgs,
    layout: 'vertical',
};

Watch_Hooks.args = {
    ...formArgs,
};

Dynamic_Form_Item.args = {
    ...formArgs,
};

Dynamic_Form_Nest_Items.args = {
    ...formArgs,
};

Complex_Dynamic_Form_Items.args = {
    ...formArgs,
};

Nest.args = {
    ...formArgs,
};

Complex_Form_Control.args = {
    ...formArgs,
};

Custom_Form_Controls.args = {
    ...formArgs,
};

Dates_and_Times.args = {
    ...formArgs,
};

Manual_Form_Data.args = {
    ...formArgs,
};

Custom_Validation.args = {
    ...formArgs,
};

Dynamic_Rules.args = {
    ...formArgs,
};
