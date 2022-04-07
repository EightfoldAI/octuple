import * as React from 'react';

/**
 * Extends React.CSSProperties so that CSS Variables may be assigned values from components.
 */
export interface CSSVariables extends React.CSSProperties {
    '--primary-color'?: string;
}
