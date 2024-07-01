import React from 'react';

const CartItem = ({ producto, eliminarItem }) => {

    return (
        <div>
            <h3>{producto.producto.nombre}</h3>

            <img src={producto.producto.img} alt={producto.producto.nombre} />
            <p>Cantidad: {producto.cantidad}</p>
            <p>Valor unitario: ${producto.producto.precio * producto.cantidad}</p>
            <button onClick={() => eliminarItem(producto.producto.id)}>Eliminar producto</button>
        </div>
    );
};

export default CartItem;