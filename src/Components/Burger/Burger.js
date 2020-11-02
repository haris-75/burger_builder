import React from 'react';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import classes from './Burger.css';

const Burger = (props) => {

    let transformIngredients = Object.keys(props.ingredients)
        .map(
            ingredientsKey => {
                return[...Array(props.ingredients[ingredientsKey])].map(
                    (_,index) => {
                        return(
                        <BurgerIngredients key = {ingredientsKey + index} type = {ingredientsKey}></BurgerIngredients>);
                    }
                )
            }
        )
        .reduce((arr, el) => { return arr.concat(el);}, []);

    if(transformIngredients.length === 0){
            transformIngredients = <p>Please start adding Ingredients</p>;
        }
    return(
        <div className = {classes.Burger}>
            <BurgerIngredients type= "bread-top"></BurgerIngredients>
            {transformIngredients}
            <BurgerIngredients type= "bread-bottom"></BurgerIngredients>
        </div>
    );
}

export default Burger;