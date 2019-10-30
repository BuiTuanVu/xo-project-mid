import React from 'react';




const Square = function (props) {
    const { value, onClick, winner } = props;

    const squareClass = `square ${winner}`
    return (

        <button type="button" className={squareClass} data-pro={value} onClick={onClick}>{value}</button>

    );

}
export default Square;