import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {

    state = {
        orders: {},
        loading: false
    }

    componentDidMount() {
        axios.get('/order.json')
            .then(response => {
                console.log(response.data);
                this.setState({orders: response.data,loading: true });
                console.log("Orders", this.state.orders);
            })
            .catch(error => console.log(error));
        
        console.log("hello");
        this.setState({loading: false});
    }

    render() {
        let orders=<Spinner />;
        if(!this.state.loading){
            orders = (       
                <div>
                    <Order/>
                    <Order/>
                    <Order/>
                    <Order/>
                    <Order/>
                </div>);
        }
        return (
            <div>
            {orders}
            </div>
        )
    }
}

export default Orders