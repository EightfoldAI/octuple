import React from 'react';
import { Pagination, PaginationLayoutOptions } from './index';

export default {
    title: 'Pagination',
    component: Pagination,
};

export const Paging = () => {
    return (
        <>
            <h1>Basic</h1>
            <div>
                <p>When you have few pages</p>
                <Pagination total={50} />
            </div>
            <div>
                <p>When you have more than 7 pages</p>
                <Pagination total={1000} />
            </div>
            <h1>Dots</h1>
            <div>
                <Pagination dots total={50} />
            </div>
            <h1>Total Item Count</h1>
            <div>
                <Pagination
                    layout={[
                        PaginationLayoutOptions.Total,
                        PaginationLayoutOptions.Previous,
                        PaginationLayoutOptions.Pager,
                        PaginationLayoutOptions.Next,
                    ]}
                    total={1000}
                />
            </div>
            <h1>Change Page Size</h1>
            <div>
                <Pagination
                    layout={[
                        PaginationLayoutOptions.Sizes,
                        PaginationLayoutOptions.Previous,
                        PaginationLayoutOptions.Pager,
                        PaginationLayoutOptions.Next,
                    ]}
                    pageSizes={[100, 200, 300, 400]}
                    pageSize={1000}
                    total={1000}
                />
            </div>
            <h1>Jump To</h1>
            <div>
                <Pagination
                    currentPage={5}
                    layout={[
                        PaginationLayoutOptions.Previous,
                        PaginationLayoutOptions.Pager,
                        PaginationLayoutOptions.Next,
                        PaginationLayoutOptions.Jumper,
                    ]}
                    pageSize={100}
                    total={1000}
                />
            </div>
            <h1>All Combined</h1>
            <div>
                <Pagination
                    currentPage={4}
                    layout={[
                        PaginationLayoutOptions.Total,
                        PaginationLayoutOptions.Sizes,
                        PaginationLayoutOptions.Previous,
                        PaginationLayoutOptions.Pager,
                        PaginationLayoutOptions.Next,
                        PaginationLayoutOptions.Jumper,
                    ]}
                    pageSize={100}
                    pageSizes={[100, 200, 300, 400]}
                    total={400}
                />
            </div>
        </>
    );
};
