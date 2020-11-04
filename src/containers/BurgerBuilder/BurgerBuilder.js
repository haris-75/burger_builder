import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 15,
    cheese: 35,
    meat: 80,
    bacon: 40
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: null,
        totalPrice: 30,
        purchasable: false,
        purchasing: false, 
        loading: false,
        error: null
    }

    componentDidMount(){
        axios.get('/ingrdedients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => this.setState({error: error}));
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }

    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true});
        const order = {   
            ingredients: this.state.ingredients,
            price: this.state.price,
            customer: {
                name: 'Haris',
                address: {
                    city: 'Lahore',
                    zipcode: 54000,
                    Country: 'Pakistan',
                }, 
                email: 'haris@example.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/order.json', order)
        .then(response => {
            this.setState({loading: false, purchasing: false});
        })
        //.catch(error => {console.log(error);
        this.setState({loading: false, purchasing: false});
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        let burger = this.state.error? <p> {this.state.error.message} </p> : <Spinner/>
        if(this.state.ingredients)
        { 
            burger = (<Aux>
                           <Burger ingredients={this.state.ingredients} />
                            <BuildControls
                                ingredientAdded={this.addIngredientHandler}
                                ingredientRemoved={this.removeIngredientHandler}
                                disabled={disabledInfo}
                                purchasable={this.state.purchasable}
                                ordered={this.purchaseHandler}
                                price={this.state.totalPrice} />    
                    </Aux>);
            orderSummary =     <OrderSummary 
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price = {this.state.totalPrice} />;
        }
         if(this.state.loading)
         { orderSummary = <Spinner/>;}

        // {salad: true, meat: false, ...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);