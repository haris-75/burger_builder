import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/order.json')
            .then(response => {
                console.log(response.data);
                const fetchedOrders = [];
                for(let key in response.data) {
                    fetchedOrders.push(response.data[key]);
                }
                this.setState({orders: fetchedOrders, loading: true });
                console.log("Orders", this.state.orders);
            })
            .catch(error => console.log(error));
        
        console.log("hello");
        this.setState({loading: false});
    }

    render() {
        let orders = <Spinner />;
        if(this.state.loading) 
            orders=<Spinner />;
        if(this.state.orders){
            orders = this.state.orders.map((order, index) => {
                return <Order 
                            ingredients={order.ingredients} 
                            price={order.price}
                            orderData={order.orderData} 
                            key={index}
                            orderNum={index} 
                        />
            })
        }
        return (
            <div>
            {orders}
            </div>
        )
    }
}

export default Orders