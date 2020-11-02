import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import './Burger.css';

const Burger = (props) => {
    return(
        <div className = "burger">
            <BurgerIngredients type= "bread-bottom"></BurgerIngredients>
        </div>
    );
}

export default Burger;