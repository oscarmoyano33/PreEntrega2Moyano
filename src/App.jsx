import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ItemListContainer from './components/ItemListContainer';
import Footer from './components/Footer/Footer';
import ItemDetailContainer from './components/ItemDetailContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error from './components/Error';
import Cart from './components/Cart';
import CartProvider from './context/CartContext';
import Checkout from './components/Checkout';

const App = () => {



  return (
    <>

      <BrowserRouter>

        <CartProvider>

          <Navbar />

          <Routes>
            <Route path='/' element={<ItemListContainer />} />
            <Route path='/categoria/:categoryId' element={<ItemListContainer />} />
            <Route path='/detalle/:id' element={<ItemDetailContainer />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='*' element={<Error />} />
          </Routes>

          <Footer />

        </CartProvider>

      </BrowserRouter>

    </>
  );
};

export default App;