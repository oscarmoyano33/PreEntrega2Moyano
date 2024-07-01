import React from 'react';
import './item.css';
import { Link } from 'react-router-dom';

const Item = ({ producto }) => {
  return (
    <div className="container">
      <h2>{producto.nombre}</h2>
      <img src={producto.img} alt={producto.nombre} />
      <Link to={`/detalle/${producto.id}`}>Ver Detalle</Link>
    </div>
  );
}

export default Item;
