import React from 'react';
import { detectFlexGapSupported } from '../shared/utilities';

export default () => {
    const [flexible, setFlexible] = React.useState(false);
    React.useEffect(() => {
        setFlexible(detectFlexGapSupported());
    }, []);

    return flexible;
};
