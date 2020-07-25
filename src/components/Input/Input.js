import React from 'react';

import './Input.css';

function FilterInput({ handleFilterChange, value }) {
    return (
        <input placeholder="Search here..." type="text" value={value} onChange={handleFilterChange} />
    )
}

export default FilterInput;
