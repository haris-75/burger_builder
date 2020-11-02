import React, {Component} from 'react';
import Burger from '../../Components/Burger/Burger';
import Aux from '../../HOC/aux'

class BurgerBuilder extends Component{
    render()
    {
        return(<Aux>
            <div>
                BurgerBuilder
            </div>
            <div>
                Builder Controls
            </div>
            <Burger></Burger>
        </Aux>); 
    }
}

export default BurgerBuilder;