import React from 'react';
import Aux from '../../HOC/aux';
import './Layout.css';

const layout = (props) => {

    return( 
        <Aux>
            <div> Toolbars, Sidedrawer, Backdrop </div>
            <main className = "Content">
                {props.children}
            </main>
        </Aux>);
}

export default layout;