import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler =(WrappedComponent,axios) => {

    return class extends Component {

        state = {
            error: null
        }

        errorConfirmHandler = () => {
            this.setState({error: null});
        }
    
        componentDidMount()
        {
            this.reqIntercept = axios.interceptors.request.use(request =>{
                this.setState({error: null});
                return request;
            });
            this.resIntercept = axios.interceptors.response.use(response => response,error =>{
                this.setState({error: error});
            });
        }
        componentWillUnmount()
        {
            axios.interceptors.request.eject(this.reqIntercept);
            axios.interceptors.response.eject(this.resIntercept);
        }
        render(){
            return(
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmHandler}>
                            {this.state.error? this.state.error.message: null}
                            </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
    }
}

export default withErrorHandler;