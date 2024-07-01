import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navbar.css';
import CartWidget from './CartWidget';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to={'/'}>
        <h1>LoGo</h1>
      </Link>
      <ul>
        <li>
          <NavLink to={'/'} className={({ isActive }) => isActive ? "active-link" : undefined}>Inicio</NavLink>
        </li>
        <li>
          <NavLink to={'/categoria/Billeteras'} className={({ isActive }) => isActive ? "active-link" : undefined}>Billetera Hombre</NavLink>
        </li>
        <li>
          <NavLink to={'/categoria/BilleMujer'} className={({ isActive }) => isActive ? "active-link" : undefined}>Billetera Mujer</NavLink>
        </li>
        <li>
          <NavLink to={'/categoria/Portadocumento'} className={({ isActive }) => isActive ? "active-link" : undefined}>Portadocumento</NavLink>
        </li>
        <li>
          <NavLink to={'/categoria/Tarjetero'} className={({ isActive }) => isActive ? "active-link" : undefined}>Tarjetero</NavLink>
        </li>
      </ul>
      <CartWidget />
    </div>
  );
};

export default Navbar;
