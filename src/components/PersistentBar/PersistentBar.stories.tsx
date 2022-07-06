import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PersistentBar, PersistentBarType } from './';
import { IconName } from '../Icon';
import { PaginationLayoutOptions } from '../Pagination';
import { ButtonType } from '../Button';

export default {
    title: 'Persistent Bar',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Persistent Bar</h1>
                            <p>
                                Persistent bars are sticky sections that can be
                                used to highlight a few actions that are out of
                                the view to be displayed inside the view. For
                                example, if there’s a very long form with Save
                                and Cancel buttons at the bottom, we can use the
                                bottom bar to show those two buttons in the
                                view. We are making these bars to be flexible in
                                height and also allowing any component to be
                                added inside for now, to understand use cases
                                from the team.
                            </p>
                            <p>
                                The placement of the buttons can be left,
                                center, or right. UX designers can decide on
                                what type of buttons they should use depending
                                on the product and design goals they are trying
                                to achieve.
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
} as ComponentMeta<typeof PersistentBar>;

const Bottom_Bar_With_Text_Story: ComponentStory<typeof PersistentBar> = (
    args
) => <PersistentBar {...args} />;

export const BottomBarWithText = Bottom_Bar_With_Text_Story.bind({});

const Bottom_Bar_Secondary_Buttons_Story: ComponentStory<
    typeof PersistentBar
> = (args) => <PersistentBar {...args} />;

export const BottomBarSecondaryButtons =
    Bottom_Bar_Secondary_Buttons_Story.bind({});

const Bottom_Bar_Buttons_On_Left_Story: ComponentStory<typeof PersistentBar> = (
    args
) => <PersistentBar {...args} />;

export const BottomBarButtonsOnLeft = Bottom_Bar_Buttons_On_Left_Story.bind({});

const Top_Bar_Buttons_Story: ComponentStory<typeof PersistentBar> = (args) => (
    <PersistentBar {...args} />
);

export const TopBarButtons = Top_Bar_Buttons_Story.bind({});

const Top_Bar_With_Text_Story: ComponentStory<typeof PersistentBar> = (
    args
) => <PersistentBar {...args} />;

export const TopBarWithText = Top_Bar_With_Text_Story.bind({});

const Top_Bar_Pagination_Story: ComponentStory<typeof PersistentBar> = (
    args
) => <PersistentBar {...args} />;

export const TopBarPagination = Top_Bar_Pagination_Story.bind({});

const paginationArgs: Object = {
    classNames: 'my-pagination-class',
    currentPage: 1,
    dots: false,
    goToText: 'Go to',
    layout: [
        PaginationLayoutOptions.Previous,
        PaginationLayoutOptions.Pager,
        PaginationLayoutOptions.Next,
    ],
    nextIconButtonAriaLabel: 'Next',
    pageSize: 10,
    pageSizeButtonAriaLabel: 'Selected page size',
    pageSizes: [10, 20, 30, 40, 50, 100],
    pageSizeText: 'page',
    previousIconButtonAriaLabel: 'Previous',
    quickNextIconButtonAriaLabel: 'Next 5',
    quickPreviousIconButtonAriaLabel: 'Previous 5',
    totalText: 'Total',
    'data-test-id': 'myPaginationTestId',
};

const persistentBarArgs: Object = {
    closable: true,
    style: {},
    classNames: 'my-persistent-bar-class',
    closeButtonProps: {
        ariaLabel: 'Close',
        classNames: 'my-close-btn-class',
        'data-test-id': 'my-close-btn-test-id',
        id: 'myCloseButton',
    },
    closeIcon: IconName.mdiClose,
    role: 'presentation',
    type: PersistentBarType.bottomBarWithText,
    paginationTotal: 150,
};

BottomBarWithText.args = {
    ...persistentBarArgs,
    actionButtonOneProps: {
        ariaLabel: 'Primary',
        classNames: 'my-primary-btn-class',
        'data-test-id': 'my-primary-btn-test-id',
        iconProps: null,
        id: 'myPrimaryButton',
        text: 'Primary',
    },
    actionButtonTwoProps: {
        ariaLabel: 'Default',
        classNames: 'my-default-btn-class',
        'data-test-id': 'my-default-btn-test-id',
        iconProps: null,
        id: 'myDefaultButton',
        text: 'Default',
    },
    content: 'Body2 is used for supporting text.',
    title: 'Header 4 as Title:',
    type: PersistentBarType.bottomBarWithText,
};

BottomBarSecondaryButtons.args = {
    ...persistentBarArgs,
    actionButtonOneProps: {
        ariaLabel: 'Default',
        classNames: 'my-default-btn-class',
        'data-test-id': 'my-default-btn-test-id',
        iconProps: null,
        id: 'myDefaultButton',
        text: 'Default',
    },
    actionButtonTwoProps: {
        ariaLabel: 'Default',
        classNames: 'my-default-btn-class',
        'data-test-id': 'my-default-btn-test-id',
        iconProps: null,
        id: 'myDefaultButton',
        text: 'Default',
    },
    actionButtonThreeProps: {
        ariaLabel: 'Default',
        classNames: 'my-default-btn-class',
        'data-test-id': 'my-default-btn-test-id',
        iconProps: null,
        id: 'myDefaultButton',
        text: 'Default',
    },
    type: PersistentBarType.bottomBarSecondaryButtons,
};

BottomBarButtonsOnLeft.args = {
    ...persistentBarArgs,
    actionButtonOneProps: {
        ariaLabel: 'Default',
        classNames: 'my-default-btn-class',
        'data-test-id': 'my-default-btn-test-id',
        iconProps: null,
        id: 'myDefaultButton',
        text: 'Default',
    },
    actionButtonTwoProps: {
        ariaLabel: 'Default',
        classNames: 'my-default-btn-class',
        'data-test-id': 'my-default-btn-test-id',
        iconProps: null,
        id: 'myDefaultButton',
        text: 'Default',
    },
    actionButtonThreeProps: {
        ariaLabel: 'Primary',
        classNames: 'my-primary-btn-class',
        'data-test-id': 'my-primary-btn-test-id',
        iconProps: null,
        id: 'myPrimaryButton',
        text: 'Primary',
    },
    type: PersistentBarType.bottomBarButtonsOnLeft,
};

TopBarButtons.args = {
    ...persistentBarArgs,
    buttonMenuProps: [
        {
            ariaLabel: 'Save Icon Button',
            iconProps: { path: IconName.mdiBookmark },
            id: 'myBookmarkButton',
            text: null,
            type: ButtonType.Secondary,
        },
        {
            ariaLabel: 'Secondary',
            classNames: 'my-primary-btn-class',
            'data-test-id': 'my-primary-btn-test-id',
            iconProps: null,
            id: 'myPrimaryButton',
            text: 'Secondary',
            type: ButtonType.Secondary,
        },
        {
            ariaLabel: 'Secondary',
            classNames: 'my-primary-btn-class',
            'data-test-id': 'my-primary-btn-test-id',
            iconProps: null,
            id: 'myPrimaryButton',
            text: 'Secondary',
            type: ButtonType.Secondary,
        },
        {
            ariaLabel: 'Secondary',
            classNames: 'my-primary-btn-class',
            'data-test-id': 'my-primary-btn-test-id',
            iconProps: null,
            id: 'myPrimaryButton',
            text: 'Secondary',
            type: ButtonType.Secondary,
        },
        {
            ariaLabel: 'Secondary',
            classNames: 'my-primary-btn-class',
            'data-test-id': 'my-primary-btn-test-id',
            iconProps: null,
            id: 'myPrimaryButton',
            text: 'Secondary',
            type: ButtonType.Secondary,
        },
        {
            ariaLabel: 'Secondary',
            classNames: 'my-primary-btn-class',
            'data-test-id': 'my-primary-btn-test-id',
            iconProps: null,
            id: 'myPrimaryButton',
            text: 'Secondary',
            type: ButtonType.Secondary,
        },
        {
            ariaLabel: 'Save Icon Button',
            iconProps: { path: IconName.mdiDotsVertical },
            id: 'myMenuButton',
            text: null,
            type: ButtonType.Secondary,
        },
    ],
    type: PersistentBarType.topBarButtons,
};

TopBarWithText.args = {
    ...persistentBarArgs,
    type: PersistentBarType.topBarWithText,
    content: 'Body2 is used for supporting text.',
    title: 'Header 4 as Title:',
};

TopBarPagination.args = {
    ...persistentBarArgs,
    type: PersistentBarType.topBarPagination,
    paginationArgs,
};
