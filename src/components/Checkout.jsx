import React, { useContext, useState, useRef } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import { CartContext } from '../context/CartContext';
import './checkout.css';

const Checkout = () => {
  const { cart, totalCarrito, vaciarCarrito } = useContext(CartContext);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmacion, setEmailConfirmacion] = useState("");
  const [error, setError] = useState("");
  const [ordenId, setOrdenId] = useState("");

  const formRef = useRef(null);

  const scrollToBottom = () => {
    formRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  const manejadorFormulario = (event) => {
    event.preventDefault();

    if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
      setError("Completar los campos requeridos");
      scrollToBottom();
      return;
    }

    if (email !== emailConfirmacion) {
      setError("Los campos del email no coinciden");
      scrollToBottom();
      return;
    }

    const orden = {
      items: cart.map((producto) => ({
        id: producto.producto.id,
        nombre: producto.producto.nombre,
        cantidad: producto.cantidad
      })),
      total: totalCarrito(),
      fecha: new Date(),
      nombre,
      apellido,
      telefono,
      email
    };

    Promise.all(
      orden.items.map(async (productoOrden) => {
        const productoRef = doc(db, "itemcar", productoOrden.id);
        const productoDoc = await getDoc(productoRef);
        const stockActual = productoDoc.data().stock;

        await updateDoc(productoRef, {
          stock: stockActual - productoOrden.cantidad
        });
      })
    )
      .then(() => {
        addDoc(collection(db, "ordenes"), orden)
          .then((docRef) => {
            setError("");
            setOrdenId(docRef.id);
            vaciarCarrito();
            scrollToBottom();
          })
          .catch((error) => {
            console.log(error);
            setError("Se produjo un error al crear la orden");
            scrollToBottom();
          });
      })
      .catch((error) => {
        console.log(error);
        setError("No se puede actualizar el stock");
        scrollToBottom();
      });
  };

  return (
    <div className="container">
      <h1>Ingresa tus datos</h1>

      <form ref={formRef} onSubmit={manejadorFormulario} className="form">
        {cart.map((producto) => (
          <div key={producto.producto.id} className="producto">
            <p>
              {producto.producto.nombre} x {producto.cantidad}
            </p>
            <hr />
          </div>
        ))}

        <div className="form-group">
          <label htmlFor="Nombre">Nombre</label>
          <input name="Nombre" type='text' onChange={(e) => setNombre(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="Apellido">Apellido</label>
          <input name="Apellido" type='text' onChange={(e) => setApellido(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="Telefono">Teléfono</label>
          <input name="Telefono" type='text' onChange={(e) => setTelefono(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="Email">Email</label>
          <input name="Email" type='email' onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="EmailConfirmacion">Email Confirmacion</label>
          <input name="EmailConfirmacion" type='email' onChange={(e) => setEmailConfirmacion(e.target.value)} />
        </div>

        <button type='submit' className="button">Completar compra</button>

        {error && <p className="error">{error}</p>}

        {ordenId && (
          <strong className="success"><br />
            ¡Gracias por tu compra!<br /><br />
            Tu número de orden es: {ordenId}
          </strong>
        )}
      </form>
    </div>
  );
};

export default Checkout;

