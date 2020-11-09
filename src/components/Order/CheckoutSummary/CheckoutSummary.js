import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css'; 

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Chass aye ke naaye aye!</h1>
            <div className={classes.Burger}>
                <Burger ingredients = {props.ingredients} />
            </div>
            <Button 
                btnType="Danger" 
                clicked={props.canceled}>
                    CANCEL
            </Button>
            <Button 
                btnType="Success" 
                clicked={props.continue}>
                    CONFIRM
            </Button>
        </div>
    );
}

export default checkoutSummary;