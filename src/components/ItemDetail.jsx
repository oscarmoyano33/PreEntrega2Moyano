import React, { useState, useContext } from 'react';
import ItemCount from './ItemCount';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './ItemDetail.css';

const ItemDetail = ({ producto }) => {
    const [cart, setCart] = useState(false);
    const { agregarCarrito } = useContext(CartContext);

    const onAdd = (count) => {
        setCart(true);
        agregarCarrito(producto, count);
    };

    return (
        <div className="item-detail-container">
            <div className="item-detail-content">
                <img src={producto.img} alt={producto.nombre} className="item-image" />
                <div className="item-info">
                    <h1>{producto.nombre}</h1>
                    <h3>Precio: ${producto.precio}</h3>
                    <h3>Stock: {producto.stock}</h3>
                    <p> {producto.description}</p>

                    {producto.stock === 0 ? (
                        <h2>EL PRODUCTO NO TIENE STOCK</h2>
                    ) : (
                        cart ? (
                            <Link to={'/cart'}>Ir al carrito</Link>
                        ) : (
                            <ItemCount initial={1} stock={producto.stock} onAdd={onAdd} />
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;
