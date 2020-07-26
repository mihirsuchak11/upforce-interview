import React, { useRef, useMemo, useState, useEffect } from "react";
import axios from "axios";

import TableUi from "./TableUi";

function Table() {
    const columns = useMemo(
        () => [
            {
                Header: "TV Show",
                columns: [
                    {
                        Header: "Id",
                        accessor: "id"
                    },
                    {
                        Header: "Name",
                        accessor: "name"
                    },
                    {
                        Header: "Mode",
                        accessor: "mode"
                    },
                    {
                        Header: "Type",
                        accessor: "type"
                    },
                    {
                        Header: "Destination",
                        accessor: "destination"
                    },
                    {
                        Header: "Origin",
                        accessor: "origin"
                    },
                    {
                        Header: "Total",
                        accessor: "total"
                    },
                    {
                        Header: "Status",
                        accessor: "status"
                    },
                    {
                        Header: "UserId",
                        accessor: "userId"
                    },
                ],
            },
        ],
        []
    );

    const [data, setData] = useState([]);
    const [originalData] = useState(data);

    useEffect(() => {
        axios("http://localhost:3001/shipments")
            .then(res => {
                setData(res.data);
            }).catch(error => {
                console.log(error)
            })
    }, [])

    const skipResetRef = useRef(false)

    const updateMyData = (rowIndex, columnId, value) => {
        skipResetRef.current = true
        setData(old =>
            old.map((row, index) => {
                if(index === rowIndex) {
                    return {
                        ...row,
                        [columnId]: value,
                    }
                }
                return row
            })
        )
    }

    useEffect(() => {
        skipResetRef.current = false
    }, [data])

    return (
        <div className="table-wrapper">
            <TableUi
                columns={columns}
                data={data}
                updateMyData={updateMyData}
                skipReset={skipResetRef.current}
            />
        </div>
    )
}

export default Table;