import React, { useState, useEffect } from 'react'
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const ItemDetailContainer = () => {

  const [producto, setProducto] = useState([]);

  const { id } = useParams()

  useEffect(() => {

    //GENERAMOS EL LLAMADO AL DOCUMENTO DETERMINADO
    const nuevoDoc = doc(db, "itemcar", id)

    //HACEMOS EL LLAMADO AL DOCUMENTO Y LO RENDERIZAMOS EN PANTALLA
    getDoc(nuevoDoc)
      .then(res => {
        const data = res.data()
        const nuevoProducto = { id: res.id, ...data }
        setProducto(nuevoProducto)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <div>
      <ItemDetail producto={producto} />
    </div>
  )
}

export default ItemDetailContainer
