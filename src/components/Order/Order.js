import React from 'react';
import classes from './Order.css'

const order = (props) => {

    let ingredients = [];
    for(let key in props.ingredients) {
        let ingredient = <span 
                key={key} 
                style={{textTransform: 'capitalize',
                        border:'1px solid #ccc',
                        padding:'2px',
                        margin:'4px',
                        textAlign:'center',
                        backgroundColor:'#CDD2D1'}}> 
                {key} (<strong>{props.ingredients[key]}</strong>) 
                </span>;
        ingredients.push(ingredient);
    }

     let orderData = [];
     for(let key in props.orderData)
    {
        let Data= <span key={key}> {props.orderData[key]} </span>;
        orderData.push(Data);
    }

    return (
        <div className={classes.Order}>

            <p style={{textAlign: 'center'}}>
                <strong>Order No: {props.orderNum+1}</strong>
            </p>

            <p>
                <strong>INGREDIENTS:</strong> {ingredients}
            </p>

            <p>
                <span><strong>NAME:</strong> {orderData[3]} </span>
                <span><strong>EMAIL:</strong> {orderData[2]}</span> 
            </p>

            <p>
                <span><strong>ADDRESS:</strong> {orderData[4]}{orderData[5]}{orderData[0]}</span>    
            </p>

            <p>
                <span style={{textTransform: 'capitalize'}} ><strong>DELIVERY_METHOD:</strong> {orderData[1]}</span>
            </p>

            <p>
                Total Price: <strong>{props.price} Rupees</strong>
            </p>
        </div>
    );
}

export default order;