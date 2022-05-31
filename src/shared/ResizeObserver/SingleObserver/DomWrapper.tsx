import React, { Component } from 'react';

export interface DomWrapperProps {
    children: React.ReactElement;
}

/**
 * Fallback to findDOMNode if origin ref do not provide any dom element
 */
export default class DomWrapper extends Component<DomWrapperProps> {
    render() {
        return this.props.children;
    }
}
