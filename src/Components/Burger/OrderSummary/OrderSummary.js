import React from 'react';
import Aux from  '../../../HOC/aux';
import classes from './OrderSummary.css';

const orderSummary  = (props) => {

    const ingredientsSummary = Object.keys(props.ingredients)
        .map((igKey) => {
        return(<li> <span> {igKey}: </span> {props.ingredients[igKey]} </li>);
        })

    return(
        <Aux>
            <h1>Order Apka</h1>
            <p>Ye to bara nice BURGER hai</p>
            <p>Ye to bara mazay ka BURGER hai</p>
            <ul>
                {ingredientsSummary}
            </ul>
        </Aux>
    );
}

export default orderSummary;
