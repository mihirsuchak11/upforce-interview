import React, { useRef, useMemo, useState, useEffect } from "react";
import axios from "axios";

import TableUi from "./TableUi";

const Chip = ({ item, value, index }) => <span className="column-item"><span className="column-title">{Object.keys(item)[index].toUpperCase()}: </span><span>{value}</span></span>

function Table() {
    const columns = useMemo(
        () => [
            {
                Header: "TV Show",
                columns: [
                    {
                        Header: "Id",
                        accessor: "id",
                        minWidth: 100,
                    },
                    {
                        Header: "Name",
                        accessor: "name",
                        minWidth: 300,
                    },
                    {
                        Header: "Cargo",
                        accessor: "cargo",
                        Cell: Row => {
                            return (Row.value.map((item, i) => (
                                <span className="column-item-wrapper" key={i}>
                                    <Chip item={item} value={item.type} index={0} />
                                    <Chip item={item} value={item.description} index={1} />
                                    <Chip item={item} value={item.volume} index={2} />
                                </span>
                            )))
                        },
                        minWidth: 300,
                    },
                    {
                        Header: "Mode",
                        accessor: "mode",
                        minWidth: 100,
                    },
                    {
                        Header: "Type",
                        accessor: "type",
                        minWidth: 100,
                    },
                    {
                        Header: "Destination",
                        accessor: "destination",
                        minWidth: 300,
                    },
                    {
                        Header: "Origin",
                        accessor: "origin",
                        minWidth: 150,
                    },
                    {
                        Header: "Services",
                        accessor: "services",
                        Cell: Row => {
                            return (Row.value.map((item, i) => (
                                <span className="column-item-wrapper" key={i}>
                                    <Chip item={item} value={item.type} index={0} />
                                    {item.value &&
                                        <Chip item={item} value={item.value} index={1} />
                                    }
                                </span>
                            )))
                        },
                        minWidth: 150,
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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        axios("http://localhost:3001/shipments")
            .then(res => {
                setData(res.data);
                setLoading(false)
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
            {/* Here we can add ui for loading */}
            {loading ? <p>Loading...</p> :
                <TableUi
                    columns={columns}
                    data={data}
                    updateMyData={updateMyData}
                    skipReset={skipResetRef.current}
                />
            }
        </div>
    )
}

export default Table;