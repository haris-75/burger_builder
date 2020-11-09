import React from 'react';
import classes from './Order.css'

const order = () => {
    return (
        <div className={classes.Order}>
            <p>Ingrdedients: Salad (<strong>1</strong>) </p>
            <p>Total Price: <strong>167</strong> Rs</p>
        </div>
    );
}

export default order;