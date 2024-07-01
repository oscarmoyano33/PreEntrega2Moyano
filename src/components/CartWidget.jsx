import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import cartImage from '/assets/img/carro24.jpg';
import './CartWidget.css';

const CartWidget = () => {
    const { cantidadCarrito } = useContext(CartContext);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/cart" style={{ display: 'flex', alignItems: 'center' }}>
                <img src={cartImage} alt="Cart" className="carro-image" />
                {cantidadCarrito() > 0 && <p style={{ marginLeft: '5px' }}>{cantidadCarrito()}</p>}
            </Link>
        </div>
    );
};

export default CartWidget;
