import { useState, useEffect } from 'react';
import ItemList from './ItemList';
import './itemList.css';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';


const ItemListContainer = () => {

  const [productos, setProductos] = useState([]);

  const { categoryId } = useParams()

  useEffect(() => {

    //GENERAMOS EL FILTRADO DE LOS PRODUCTOS
    const misProductos =
      categoryId ?
        query(collection(db, "itemcar"), where("categoria", "==", categoryId))
        :
        collection(db, "itemcar")

    //GENERAMOS LOS DOCUMENTOS SOLICITADOS
    getDocs(misProductos)
      .then((res) => {
        const nuevosProductos = res.docs.map((doc) => {
          const data = doc.data()
          return { id: doc.id, ...data }
        })
        setProductos(nuevosProductos)
      })
    // .catch((error) => console.log(error))

  }, [categoryId])


  return (
    <div className='itemcontainer'>

      {productos.length == 0 ? (<h1>CARGANDO..</h1>) : (<ItemList productos={productos} />)}

    </div>
  )

}

export default ItemListContainer