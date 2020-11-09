import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from 'axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postal_code: '',
            city: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {   
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: this.state.name,
                address: this.state.address, 
                email: 'haris@example.com'
            },
            deliveryMethod: 'fastest'
        }
        console.log(this.props.ingredients);
        console.log(order);
        axios.post('/order.json', order)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
            console.log("response=>data", response.data);
        })
        .catch(error => {
            console.log(error);
            this.setState({loading: false});
        });
    }

    render(){
        let form = (<form>
                    <input type="text" name="name" placeholder="Your Name"/>
                    <input type="text" name="email" placeholder="Your Email"/>
                    <input type="text" name="street" placeholder="Your Street Number"/>
                    <input type="text" name="postal_code" placeholder="Postal Code of Your Area"/>  
                    <input type="text" name="city" placeholder="Your City"/>
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>  
                </form>);
        if(this.state.loading)
            form = <Spinner/>
        return(
            <div className={classes.ContactData}>
                <h1>Dass o mennu kaun aey tou</h1>
                {form}
            </div>
        );
    }
}
export default ContactData;