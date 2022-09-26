import React, { useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Panel, PanelSize } from './';
import { PanelHeader } from './PanelHeader';
import { IconName } from '../Icon';
import { PrimaryButton } from '../Button';

export default {
    title: 'Panel',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Panels</h1>
                            <p>
                                Panels are overlays that contain supplementary
                                content and are used for complex creation, edit,
                                or management experiences. For example, viewing
                                details about an item in a list or editing
                                settings.
                            </p>
                            <h2>Best practices</h2>
                            <h3>Layout</h3>
                            <ul>
                                <li>
                                    Use for self-contained experiences where
                                    someone doesn't need to interact with the
                                    app view to complete the task.
                                </li>
                                <li>
                                    Consider how the panel and its contained
                                    contents will scale across responsive web
                                    breakpoints.
                                </li>
                            </ul>
                            <h3>Header</h3>
                            <ul>
                                <li>
                                    Include a close button in the top-right
                                    corner.
                                </li>
                                <li>Lock the title to the top of the panel.</li>
                                <li>
                                    The header can contain a variety of
                                    components. Components are stacked under the
                                    main title, locked to the top, and push
                                    content down.
                                </li>
                            </ul>
                            <h3>Body</h3>
                            <ul>
                                <li>
                                    The body is a flexible container that can
                                    house a wide variety of components, content,
                                    and formatting.
                                </li>
                                <li>Content can scroll.</li>
                            </ul>
                            <h3>Footer</h3>
                            <ul>
                                <li>
                                    Standard footers include primary and
                                    secondary buttons to confirm or cancel the
                                    changes or task.
                                </li>
                                <li>
                                    Read-only panels may contain a single Close
                                    button.
                                </li>
                                <li>
                                    Lock the footer to the bottom of the panel.
                                </li>
                            </ul>
                            <h2>Content</h2>
                            <h2>Title</h2>
                            <ul>
                                <li>
                                    Titles should explain the panel content in
                                    clear, concise, and specific terms.
                                </li>
                                <li>
                                    Use sentence-style capitalization—only
                                    capitalize the first word.
                                </li>
                                <li>
                                    Don't put a period at the end of the title.
                                </li>
                            </ul>
                            <h2>Button labels</h2>
                            <ul>
                                <li>
                                    Be concise. Limit labels to one or two
                                    words. Usually a single verb is best.
                                    Include a noun if there's any room for
                                    interpretation about what the verb means.
                                    For example, “Save” or “Save settings.”
                                </li>
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
        size: {
            options: [PanelSize.large, PanelSize.medium, PanelSize.small],
            control: { type: 'radio' },
        },
        placement: {
            options: ['top', 'right', 'bottom', 'left'],
            control: { type: 'radio' },
        },
    },
} as ComponentMeta<typeof Panel>;

const Small_Story: ComponentStory<typeof Panel> = (args) => {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <>
            <PrimaryButton
                text={'Open panel'}
                onClick={() => setVisible(true)}
            />
            <Panel
                {...args}
                footer={
                    <div>
                        <PrimaryButton
                            text={'Close'}
                            onClick={() => setVisible(false)}
                        />
                    </div>
                }
                visible={visible}
                onClose={() => setVisible(false)}
            />
        </>
    );
};

export const Small = Small_Story.bind({});

const Medium_Story: ComponentStory<typeof Panel> = (args) => {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <>
            <PrimaryButton
                text={'Open panel'}
                onClick={() => setVisible(true)}
            />
            <Panel
                {...args}
                footer={
                    <div>
                        <PrimaryButton
                            text={'Close'}
                            onClick={() => setVisible(false)}
                        />
                    </div>
                }
                visible={visible}
                onClose={() => setVisible(false)}
            />
        </>
    );
};

export const Medium = Medium_Story.bind({});

const Large_Story: ComponentStory<typeof Panel> = (args) => {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <>
            <PrimaryButton
                text={'Open panel'}
                onClick={() => setVisible(true)}
            />
            <Panel
                {...args}
                footer={
                    <div>
                        <PrimaryButton
                            text={'Close'}
                            onClick={() => setVisible(false)}
                        />
                    </div>
                }
                visible={visible}
                onClose={() => setVisible(false)}
            />
        </>
    );
};

export const Large = Large_Story.bind({});

const Stacked_Story: ComponentStory<typeof Panel> = (args) => {
    const [visible, setVisible] = useState<Record<string, boolean>>({});
    return (
        <>
            <PrimaryButton
                text={'Open panel'}
                onClick={() =>
                    setVisible({
                        simple: true,
                    })
                }
            />
            <Panel
                {...args}
                visible={visible.simple}
                onClose={() => setVisible({})}
            >
                <PrimaryButton
                    text={'Open panel'}
                    onClick={() =>
                        setVisible({
                            ...visible,
                            child: true,
                        })
                    }
                />
                <Panel
                    {...args}
                    visible={visible.child}
                    size={PanelSize.medium}
                    onClose={() =>
                        setVisible({
                            ...visible,
                            child: false,
                        })
                    }
                >
                    <PrimaryButton
                        text={'Open panel'}
                        onClick={() =>
                            setVisible({
                                ...visible,
                                nextChild: true,
                            })
                        }
                    />
                    <Panel
                        {...args}
                        visible={visible.nextChild}
                        size={PanelSize.small}
                        onClose={() =>
                            setVisible({
                                ...visible,
                                nextChild: false,
                            })
                        }
                    />
                </Panel>
            </Panel>
        </>
    );
};

export const Stacked = Stacked_Story.bind({});

const Left_Story: ComponentStory<typeof Panel> = (args) => {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <>
            <PrimaryButton
                text={'Open panel'}
                onClick={() => setVisible(true)}
            />
            <Panel
                {...args}
                footer={
                    <div>
                        <PrimaryButton
                            text={'Close'}
                            onClick={() => setVisible(false)}
                        />
                    </div>
                }
                visible={visible}
                onClose={() => setVisible(false)}
            />
        </>
    );
};

export const Left = Left_Story.bind({});

const Bottom_Story: ComponentStory<typeof Panel> = (args) => {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <>
            <PrimaryButton
                text={'Open panel'}
                onClick={() => setVisible(true)}
            />
            <Panel
                {...args}
                footer={
                    <div>
                        <PrimaryButton
                            text={'Close'}
                            onClick={() => setVisible(false)}
                        />
                    </div>
                }
                visible={visible}
                onClose={() => setVisible(false)}
            />
        </>
    );
};

export const Bottom = Bottom_Story.bind({});

const Top_Story: ComponentStory<typeof Panel> = (args) => {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <>
            <PrimaryButton
                text={'Open panel'}
                onClick={() => setVisible(true)}
            />
            <Panel
                {...args}
                footer={
                    <div>
                        <PrimaryButton
                            text={'Close'}
                            onClick={() => setVisible(false)}
                        />
                    </div>
                }
                visible={visible}
                onClose={() => setVisible(false)}
            />
        </>
    );
};

export const Top = Top_Story.bind({});

const Header_Actions_Story: ComponentStory<typeof Panel> = (args) => {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <>
            <PrimaryButton
                text={'Open panel'}
                onClick={() => setVisible(true)}
            />
            <Panel
                {...args}
                footer={
                    <div>
                        <PrimaryButton
                            text={'Close'}
                            onClick={() => setVisible(false)}
                        />
                    </div>
                }
                visible={visible}
                onClose={() => setVisible(false)}
            />
        </>
    );
};

export const Header_Actions = Header_Actions_Story.bind({});

const Panel_Header_Story: ComponentStory<typeof Panel> = (args) => {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <>
            <PrimaryButton
                text={'Open panel'}
                onClick={() => setVisible(true)}
            />
            <Panel
                {...args}
                footer={
                    <div>
                        <PrimaryButton
                            text={'Close'}
                            onClick={() => setVisible(false)}
                        />
                    </div>
                }
                visible={visible}
                onClose={() => setVisible(false)}
                panelHeader={
                    <PanelHeader
                        actionDefaultButtonProps={{
                            iconProps: {
                                path: IconName.mdiArrowLeftThick,
                                color: 'var(--white-color)',
                            },
                            transparent: true,
                            onClick: () => setVisible(false),
                        }}
                        actionButtonOneProps={{
                            iconProps: {
                                path: IconName.mdiNoodles,
                                color: 'var(--white-color)',
                            },
                            transparent: true,
                            onClick: () => setVisible(false),
                        }}
                        actionButtonTwoProps={{
                            iconProps: {
                                path: IconName.mdiArrowExpand,
                                color: 'var(--white-color)',
                            },
                            transparent: true,
                            onClick: () => setVisible(false),
                        }}
                        onClose={() => setVisible(false)}
                        title={'Header'}
                    />
                }
            />
        </>
    );
};

export const Panel_Header = Panel_Header_Story.bind({});

const panelArgs: Object = {
    size: PanelSize.small,
    visible: false,
    closable: true,
    bodyPadding: true,
    headerPadding: true,
    scrollLock: true,
    children: (
        <>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            finibus, magna eu dignissim posuere, elit metus eleifend diam,
            accumsan bibendum turpis erat in velit. Nulla vel purus sit amet
            massa malesuada molestie id eget ex. Donec in dictum nibh. Quisque
            in felis maximus, facilisis est vel, porttitor lectus. Morbi in
            vulputate augue, eu finibus augue. Morbi ut eros a arcu accumsan
            volutpat. Mauris at sem sit amet massa lobortis rutrum ac hendrerit
            erat. Pellentesque diam leo, bibendum at risus id, molestie
            condimentum odio. Duis ultrices leo nulla, ac ullamcorper urna
            pulvinar sit amet. Integer porta finibus odio, pretium interdum nunc
            ullamcorper id. Vestibulum quis urna sit amet nisi rhoncus dapibus a
            sed nibh. Sed vitae faucibus mi, at rutrum dui. Pellentesque
            consectetur neque vel magna consectetur porttitor. Quisque ultrices
            elit et elementum luctus. Suspendisse tristique elit maximus sodales
            ullamcorper. Duis ut orci nec augue auctor pharetra quis vel velit.
            Sed nulla nisl, tincidunt id nunc sed, hendrerit mollis quam.
            Maecenas rhoncus nisl in nisl faucibus finibus. Vestibulum quis
            blandit diam. Integer justo ipsum, tempus nec rutrum euismod, rutrum
            at magna. In hac habitasse platea dictumst. Maecenas quis leo
            commodo, eleifend ex eu, euismod magna. Nulla fermentum pulvinar
            blandit. Proin elementum neque at interdum varius. Maecenas vel
            augue lacus. Aenean id diam cursus, pellentesque tellus vel,
            eleifend nisl. Nullam lorem lorem, ultricies eu euismod id,
            consectetur et est. Mauris lobortis est nec magna gravida, ac
            pellentesque mauris tincidunt. Nunc ac arcu eu odio cursus molestie.
            Vivamus luctus sollicitudin interdum. Quisque non lacinia tortor. In
            erat neque, faucibus nec velit sed, tristique vehicula quam. Duis
            sit amet varius erat, vel convallis mi. Nullam congue at lorem ut
            tristique. Pellentesque tincidunt dignissim felis tincidunt varius.
            Maecenas molestie tincidunt tellus, in cursus urna efficitur sed.
            Sed volutpat tellus eget elit iaculis placerat. Sed tristique arcu
            id dolor volutpat aliquam. Aliquam pretium convallis ex, ut lacinia
            libero. Curabitur bibendum sed ante sit amet aliquet. Sed pulvinar
            libero quis nulla tempor dapibus. Nullam tristique iaculis
            fermentum. Aenean rutrum eleifend massa fringilla semper. Nunc
            suscipit varius leo, id rutrum justo fermentum vel. Quisque sed
            ipsum velit. Mauris magna sapien, pretium non ligula vel, finibus
            lobortis urna. Cras pretium laoreet eleifend. Morbi ut interdum
            tellus. Ut imperdiet tellus ut quam consectetur consectetur. Quisque
            at dictum turpis. Nulla ut dapibus diam. Mauris eget fringilla
            ligula. Nunc in tortor quis urna finibus ornare. Etiam posuere
            laoreet mollis. Nam accumsan, diam sit amet placerat pharetra,
            sapien velit congue leo, a varius nulla neque vitae arcu. Sed
            laoreet quam at facilisis volutpat. Interdum et malesuada fames ac
            ante ipsum primis in faucibus. Phasellus euismod leo ligula, eu
            finibus purus rhoncus in. Suspendisse in ligula elementum, congue
            est eu, feugiat massa. Duis sem arcu, vulputate id sodales at,
            accumsan eget nibh. Curabitur eu fermentum tellus. Donec ut
            consequat tellus. Nullam ullamcorper volutpat mi, eu dignissim augue
            convallis sed. Praesent id rhoncus felis. Vestibulum placerat sapien
            vel vestibulum vestibulum. Curabitur ultrices orci ut rutrum porta.
            Aliquam erat volutpat. Phasellus vel viverra turpis. Donec
            consectetur ullamcorper erat eget maximus. Maecenas augue massa,
            sodales vitae iaculis eget, consectetur in velit. Sed molestie
            iaculis sem, nec scelerisque tortor sollicitudin id. Quisque
            lobortis varius ipsum, eget scelerisque est mollis a. Pellentesque
            sodales erat orci, in euismod ante vestibulum in. Integer luctus
            laoreet aliquet. Suspendisse non neque velit. Integer rutrum egestas
            erat, a fermentum nisi consectetur sit amet. Nulla placerat pulvinar
            mi sed gravida. Proin cursus nisl ac libero sagittis, tempor
            tincidunt arcu tempus.
        </>
    ),
    placement: 'right',
    title: 'This is a title',
    maskClosable: true,
    zIndex: 1000,
    panelStyle: {},
    headerIcon: IconName.mdiArrowLeftThick,
    closeIcon: IconName.mdiClose,
    overlay: true,
    push: true,
    parent: document.body,
    panelWrapperClassNames: 'my-panel-wrapper-class',
    panelClassNames: 'my-panel-class',
    headerClassNames: 'my-panel-header-class',
    bodyClassNames: 'my-panel-body-class',
    footerClassNames: 'my-panel-footer-class',
    autoFocus: true,
};

Small.args = {
    ...panelArgs,
};

Medium.args = {
    ...panelArgs,
    size: PanelSize.medium,
};

Large.args = {
    ...panelArgs,
    size: PanelSize.large,
};

Stacked.args = {
    ...panelArgs,
    size: PanelSize.large,
};

Left.args = {
    ...panelArgs,
    size: PanelSize.medium,
    placement: 'left',
};

Bottom.args = {
    ...panelArgs,
    size: PanelSize.small,
    placement: 'bottom',
};

Top.args = {
    ...panelArgs,
    size: PanelSize.small,
    placement: 'top',
};

Header_Actions.args = {
    ...panelArgs,
    actionButtonOneProps: {
        iconProps: { path: IconName.mdiCogOutline },
    },
    actionButtonTwoProps: {
        iconProps: {
            path: IconName.mdiHistory,
        },
    },
    actionButtonThreeProps: {
        iconProps: { path: IconName.mdiDatabaseArrowDownOutline },
    },
    headerButtonProps: {
        iconProps: { path: IconName.mdiArrowLeftThick },
    },
    size: PanelSize.medium,
};

Panel_Header.args = {
    ...panelArgs,
    bodyPadding: true,
    headerPadding: false,
    size: PanelSize.medium,
};
