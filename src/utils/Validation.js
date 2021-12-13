import React from 'react'

const Validation = ({errorText}) => {
    return (
        <>
            {errorText ? <span className="text-red-600">{errorText}</span> : null}
        </>
    )
}

export default Validation;
