import React from 'react';
import { SearchBox, TextInputShape } from '../index';

export default {
    title: 'Search Box',
    component: SearchBox,
};

export const Search = () => (
    <>
        <p>Search Box (Rectangle)</p>
        <SearchBox label="With label" />
        <p>Search Box (Pill)</p>
        <SearchBox label="With label" shape={TextInputShape.Pill} />
    </>
);
