import React from 'react';
import ReactDOM from 'react-dom';

/**
 *
 * @param node Utility to return if a node is a DOM node. Else will return by `findDOMNode`
 * @returns node
 */
export const findDOMNode = <T = Element | Text>(
    node: React.ReactInstance | HTMLElement
): T => {
    if (node instanceof HTMLElement) {
        return node as unknown as T;
    }
    return ReactDOM.findDOMNode(node) as unknown as T;
};
