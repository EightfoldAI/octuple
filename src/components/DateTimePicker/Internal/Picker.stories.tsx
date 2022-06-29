import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import type { Moment } from 'moment';
import moment from 'moment';
import momentGenerateConfig from './Generate/moment';
import enUS from './Locale/en_US';
import Picker from './Picker';

export default {
    title: 'Picker',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Picker</h1>
                            <p>TBD.</p>
                        </section>
                        <section>
                            <Stories includePrimary title="" />
                        </section>
                    </article>
                </main>
            ),
        },
    },
    argTypes: {},
} as ComponentMeta<typeof Picker>;

const defaultValue = moment('2022-06-28 12:00:00');

const Picker_Story: ComponentStory<typeof Picker> = (args) => {
    const [value, setValue] = React.useState<Moment | null>(defaultValue);
    const weekRef = React.useRef<Picker<Moment>>(null);

    const _args = args;

    const onSelect = (newValue: Moment) => {
        console.log('Select:', newValue);
    };

    const onChange = (newValue: Moment | null, formatString?: string) => {
        console.log('Change:', newValue, formatString);
        setValue(newValue);
    };

    const sharedProps = {
        generateConfig: momentGenerateConfig,
        value,
        onSelect,
        onChange,
    };

    const keyDown = (e: { keyCode: number }, preventDefault: () => void) => {
        if (e.keyCode === 13) preventDefault();
    };
    return (
        <div>
            <h1>
                Value: {value ? value.format('YYYY-MM-DD HH:mm:ss') : 'null'}
            </h1>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div style={{ margin: '0 8px' }}>
                    <h3>Basic</h3>
                    <Picker<Moment>
                        {...sharedProps}
                        locale={enUS}
                        tabIndex={0}
                    />
                    <Picker<Moment> {...sharedProps} locale={enUS} />
                </div>
                <div style={{ margin: '0 8px' }}>
                    <h3>Uncontrolled</h3>
                    <Picker<Moment>
                        generateConfig={momentGenerateConfig}
                        locale={enUS}
                        allowClear
                        showToday
                        renderExtraFooter={() => 'extra'}
                    />
                </div>
                <div style={{ margin: '0 8px' }}>
                    <h3>Datetime</h3>
                    <Picker<Moment>
                        {...sharedProps}
                        locale={enUS}
                        defaultPickerValue={defaultValue
                            .clone()
                            .subtract(1, 'month')}
                        showTime={{
                            showSecond: false,
                            defaultValue: moment('11:28:39', 'HH:mm:ss'),
                        }}
                        showToday
                        disabledTime={(date) => {
                            if (date && date.isSame(defaultValue, 'date')) {
                                return {
                                    disabledHours: () => [1, 3, 5, 7, 9, 11],
                                };
                            }
                            return {};
                        }}
                    />
                </div>
                <div style={{ margin: '0 8px' }}>
                    <h3>Uncontrolled Datetime</h3>
                    <Picker<Moment>
                        format="YYYY-MM-DD HH:mm:ss"
                        generateConfig={momentGenerateConfig}
                        locale={enUS}
                        showTime
                    />
                </div>
                <div style={{ margin: '0 8px' }}>
                    <h3>Week</h3>
                    <Picker<Moment>
                        {...sharedProps}
                        locale={enUS}
                        allowClear
                        picker="week"
                        renderExtraFooter={() => 'I am footer!!!'}
                        ref={weekRef}
                    />

                    <button
                        type="button"
                        onClick={() => {
                            if (weekRef.current) {
                                weekRef.current.focus();
                            }
                        }}
                    >
                        Focus
                    </button>
                </div>
                <div style={{ margin: '0 8px' }}>
                    <h3>Week</h3>
                    <Picker<Moment>
                        generateConfig={momentGenerateConfig}
                        locale={enUS}
                        picker="week"
                    />
                </div>
                <div style={{ margin: '0 8px' }}>
                    <h3>Quarter</h3>
                    <Picker<Moment>
                        generateConfig={momentGenerateConfig}
                        locale={enUS}
                        picker="quarter"
                    />
                </div>
                <div style={{ margin: '0 8px' }}>
                    <h3>Time</h3>
                    <Picker<Moment>
                        {...sharedProps}
                        locale={enUS}
                        picker="time"
                    />
                </div>
                <div style={{ margin: '0 8px' }}>
                    <h3>Time 12</h3>
                    <Picker<Moment>
                        {...sharedProps}
                        locale={enUS}
                        picker="time"
                        use12Hours
                    />
                </div>
                <div style={{ margin: '0 8px' }}>
                    <h3>Year</h3>
                    <Picker<Moment>
                        {...sharedProps}
                        locale={enUS}
                        picker="year"
                    />
                </div>
                <div style={{ margin: '0 8px' }}>
                    <h3>Keyboard navigation (Tab key) disabled</h3>
                    <Picker<Moment>
                        {...sharedProps}
                        locale={enUS}
                        tabIndex={-1}
                    />
                </div>
                <div style={{ margin: '0 8px' }}>
                    <h3>Keyboard event with prevent default behaviors</h3>
                    <Picker<Moment>
                        {...sharedProps}
                        locale={enUS}
                        onKeyDown={keyDown}
                    />
                </div>
            </div>
        </div>
    );
};

export const Basic = Picker_Story.bind({});

const pickerArgs: Object = {};

Basic.args = {
    ...pickerArgs,
};
