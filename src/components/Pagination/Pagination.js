import React from 'react';
import Button from '../Button/Button';

import './Pagination.css';

export default function Pagination({ gotoPage, previousPage, nextPage, pageCount, canPreviousPage, canNextPage, pageIndex, pageOptions, pageSize, setPageSize }) {
    return (
        <div className="pagination">
            <select
                value={pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value))
                }}
            >
                {[5, 10, 15, 20, 25].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
            <Button btnText="First" onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
            <Button btnText="Previous" onClick={() => previousPage()} disabled={!canPreviousPage} />
            <ul className="list-style-none page-number">
                {pageOptions.map(page => {
                    const pageNumber = page + 1;
                    const isCurrentPage = pageIndex + 1 === pageNumber;
                    return (
                        <li className={isCurrentPage ? 'current-page-number' : ''} key={pageNumber}>
                            <Button btnText={pageNumber} onClick={() => gotoPage(page)} />
                        </li>
                    )
                })}
            </ul>
            <Button btnText="Next" onClick={() => nextPage()} disabled={!canNextPage} />
            <Button btnText="Last" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
            <span>
                Page
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>
            </span>
            <span>
                | Go to page:
                <input
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(page)
                    }}
                    style={{ width: '100px' }}
                />
            </span>
        </div>
    )
}
