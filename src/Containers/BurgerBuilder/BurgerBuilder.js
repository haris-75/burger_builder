import React, {Component} from 'react';
import Burger from '../../Components/Burger/Burger';
import Aux from '../../HOC/aux';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';

class BurgerBuilder extends Component{

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        INGREDIENT_PRICES: {       
            salad: 20,
            bacon: 20,
            cheese: 30,
            meat: 50
        },
        totalPrice: 30,
        purchasable: false,
        purchasing: false
    }

    updatePurchase = (ingredients) => {        
        const newIngredients = {
            ...this.state.ingredients
        };

        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {return sum + el;},0);
        this.setState(
            {purchasable: sum>=0}
        )
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const newIngredients = {
            ...this.state.ingredients
        };
        newIngredients[type] = newCount;
        const addedPrice = this.state.INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + addedPrice;
        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice
        });
        this.updatePurchase(newIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount - 1;
        const newIngredients = {
            ...this.state.ingredients
        };
        newIngredients[type] = newCount;
        const addedPrice = this.state.INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice - addedPrice;
        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice
        });
        this.updatePurchase(newIngredients);        
    }

    purchasingHandler = () =>{
        this.setState({purchasing:true});
    }

    render()
    {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo)
        {
            disabledInfo[key] = disabledInfo[key] <=0
        }

        return(
        <Aux>
            <Modal show = {this.state.purchasing}>
                <OrderSummary ingredients = {this.state.ingredients}></OrderSummary>
            </Modal>
            <Burger ingredients = {this.state.ingredients}></Burger>
            <div>
                BurgerBuilder
            </div>
            <BuildControls 
                ingredientAdded = {this.addIngredientHandler}
                ingredientRemoved = {this.removeIngredientHandler}
                disabledInfo = {disabledInfo}
                price = {this.state.totalPrice}
                purchasable = {this.state.purchasable}
                order = {this.purchasingHandler}
                >
            </BuildControls>
        </Aux>); 
    }
}

export default BurgerBuilder;