import React from 'react';
import './Button.css';

export default function Button({ onClick, disabled, btnText }) {
    return (
        <button className="button" onClick={() => onClick()} disabled={disabled}>
            {btnText}
        </button>
    )
}
