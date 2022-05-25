import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Badge } from '../Badge';
import { List } from '../List';
import { Icon, IconName } from '../Icon';
import { Accordion } from './';

export default {
    title: 'Accordion',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Accordion</h1>
                            <p>
                                Accordions display a list of high-level options
                                that can expand/collapse to reveal more
                                information.
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
} as ComponentMeta<typeof Accordion>;

const accordionSummary = (count: number) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <Icon color="green" path={IconName.mdiCheckCircleOutline} />
        <div style={{ margin: '0 12px 0 5px' }}>Notification testing</div>
        <Badge active>{count}</Badge>
    </div>
);

const listItems = [
    {
        summary: accordionSummary(2),
        body: `Body 2 text used here. Bottom bars are sticky sections that
        can be used to highlight a few actions that are out of the
        view to be displayed inside the view. For example, if
        there's a very long form with Save and Cancel buttons at the
        bottom, we can use the bottom bar to show those two buttons
        in the view. We are making these bars to be flexible in
        height and also allowing any component to be`,
        id: '1',
    },
    {
        summary: accordionSummary(12),
        body: `Body 2 text used here. Bottom bars are sticky sections that
        can be used to highlight a few actions that are out of the
        view to be displayed inside the view. For example, if
        there's a very long form with Save and Cancel buttons at the
        bottom, we can use the bottom bar to show those two buttons
        in the view. We are making these bars to be flexible in
        height and also allowing any component to be`,
        id: '2',
    },
];

export const Default: ComponentStory<typeof Accordion> = () => {
    return (
        <>
            <h2>Single Accordion</h2>
            <div style={{ width: '500px' }}>
                <Accordion summary={'Accordion Header'} id="single-accordion">
                    <div>
                        Body 2 text used here. Bottom bars are sticky sections
                        that can be used to highlight a few actions that are out
                        of the view to be displayed inside the view. For
                        example, if there's a very long form with Save and
                        Cancel buttons at the bottom, we can use the bottom bar
                        to show those two buttons in the view. We are making
                        these bars to be flexible in height and also allowing
                        any component to be added inside for now, to understand
                        use cases from the team.{' '}
                    </div>
                </Accordion>
            </div>
            <br />
            <br />
            <h2>Accordion Notifications List Vertical</h2>
            <List
                items={listItems}
                renderItem={(item) => (
                    <Accordion summary={item.summary} id={item.id}>
                        {item.body}
                    </Accordion>
                )}
                header={
                    <div style={{ paddingLeft: '16px' }}>
                        <h2>Header</h2>
                    </div>
                }
                footer={
                    <div style={{ paddingLeft: '16px' }}>
                        <h3>Footer</h3>
                    </div>
                }
                itemStyle={{ padding: '8px 16px' }}
            />
            <br />
            <br />
            <h2>Accordion Notifications List Horizontal</h2>
            <List
                items={listItems}
                renderItem={(item) => (
                    <Accordion summary={item.summary} id={item.id}>
                        {item.body}
                    </Accordion>
                )}
                header={
                    <div style={{ paddingLeft: '16px' }}>
                        <h2>Header</h2>
                    </div>
                }
                footer={
                    <div style={{ paddingLeft: '16px' }}>
                        <h3>Footer</h3>
                    </div>
                }
                layout="horizontal"
                itemStyle={{ padding: '8px' }}
            />
        </>
    );
};
