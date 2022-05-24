import React from 'react';
import { Icon, IconName } from '../Icon';
import { Link } from '.';

export default {
    title: 'Link',
    component: Link,
};

export const Default = () => (
    <>
        <h2>Link</h2>

        <Link href="https://www.twitter.com">Twitter</Link>

        <h2>Primary Link Stacked Columnwise</h2>
        <Link
            href="https://www.facebook.com"
            variant="primary"
            style={{ maxWidth: '100px' }}
        >
            <Icon path={IconName.mdiAccount} />
            User Profile
        </Link>
        <h2>Link with default behavior disabled</h2>
        <Link
            href="https://www.facebook.com"
            onClick={(e) => e.preventDefault()}
        >
            <Icon path={IconName.mdiAccount} />
            User Profile
        </Link>
    </>
);
