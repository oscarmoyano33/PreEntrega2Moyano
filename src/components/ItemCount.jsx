import React, { useState } from 'react';
import './ItemCount.css';

const ItemCount = ({ initial, stock, onAdd }) => {
    const [contador, setContador] = useState(initial);
    const isMaxReached = contador === stock;
    const isMinReached = contador === initial;

    const bajar = () => {
        if (contador > initial) {
            setContador(contador - 1);
        }
    };

    const subir = () => {
        if (contador < stock) {
            setContador(contador + 1);
        }
    };

    return (

        <div>
            <p>{contador}</p>
            <button onClick={bajar} disabled={isMinReached}>-</button>
            <button onClick={subir} disabled={isMaxReached}>+</button>
            <button onClick={() => onAdd(contador)}>Agregar al carrito</button>
        </div>

    );
};

export default ItemCount;
