'use client';

import React, { Component } from 'react';
import { findDOMNode, supportsFindDOMNode } from './findDOMNode';

export interface DomWrapperProps {
  children: React.ReactElement | React.ReactNode;
  renderMarker?: boolean;
}

/**
 * Resolves the DOM node of children that cannot take a direct ref.
 * On React <=18 this delegates to findDOMNode and renders children
 * untouched; on React 19 (findDOMNode removed) it renders a trailing
 * hidden marker and reads previousSibling.
 */
export class DomWrapper extends Component<DomWrapperProps> {
  private markerRef = React.createRef<HTMLSpanElement>();

  getDOMNode(): HTMLElement | null {
    if (supportsFindDOMNode()) {
      return findDOMNode<HTMLElement>(this);
    }
    return (this.markerRef.current?.previousSibling as HTMLElement) ?? null;
  }

  render() {
    const { children, renderMarker = true } = this.props;
    if (supportsFindDOMNode() || !renderMarker) {
      return children;
    }
    return (
      <>
        {children}
        <span ref={this.markerRef} hidden aria-hidden />
      </>
    );
  }
}
