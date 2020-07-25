import React from "react";
import { useTable, useFilters, useSortBy, usePagination, useGlobalFilter } from "react-table";

import FilterInput from '../Input/Input';
import Pagination from '../Pagination/Pagination';
import NoDataFound from '../NoDataFound/NoDataFound';

import './Table.css';

export default function Table({ columns, data, skipReset, updateMyData }) {

    // Used the state and functions returned from useTable to build UI 
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        canPreviousPage,
        setGlobalFilter,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        page,
        setPageSize,
        state: {
            pageIndex,
            pageSize,
            globalFilter
        },
    } = useTable(
        {
            columns,
            data,
            autoResetPage: !skipReset,
            updateMyData
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    // Rendering the UI for table
    return (
        <>
            <div className="table-header">
                <Pagination
                    gotoPage={gotoPage}
                    previousPage={previousPage}
                    nextPage={nextPage}
                    pageCount={pageCount}
                    canPreviousPage={canPreviousPage}
                    canNextPage={canNextPage}
                    pageIndex={pageIndex}
                    pageOptions={pageOptions}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                />
                <FilterInput
                    value={globalFilter || ""}
                    handleFilterChange={(e) => setGlobalFilter(e.target.value || undefined)}
                />
            </div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className={
                                        column.isSorted
                                            ? column.isSortedDesc
                                                ? "sort-desc"
                                                : "sort-asc"
                                            : ""
                                    }

                                >
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                {page.length >= 1 ?
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody> :
                    <NoDataFound />
                }
            </table>
        </>
    );
}