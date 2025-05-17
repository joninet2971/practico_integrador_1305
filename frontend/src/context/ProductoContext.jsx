import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { exportToPdf } from '../utils/ExportToPdf';

const API_ENDPOINT = 'http://localhost:4000/productos';

const ProductoContext = createContext();

export const useProductos = () => {
  const context = useContext(ProductoContext);
  return context;
};

export const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProductos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINT);
      setProductos(response.data);
      return response.data;
    } catch (err) {
      setError('Error al obtener los productos: ' + err.message);
      console.error('Error al obtener los productos:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createProducto = async (producto) => {
    try {
      setLoading(true);
      const response = await axios.post(API_ENDPOINT, producto);
      if (response.data.mensaje === 'Ya existe ese nombre') {
        setError('Ya existe un producto con ese nombre');
        throw new Error('Ya existe un producto con ese nombre');
      }
      if (response.data.producto) {
        setProductos([...productos, response.data.producto]);
      }
      return response.data;
    } catch (err) {
      setError('Error al crear el producto: ' + err.message);
      console.error('Error al crear el producto:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editProducto = async (id, updatedProducto) => {
    try {
      setLoading(true);
      const response = await axios.put(`${API_ENDPOINT}/${id}`, updatedProducto);
      
      if (response.data.mensaje === 'Producto actualizado correctamente') {
        setProductos(productos.map(producto => 
          producto.id === parseInt(id) ? response.data.producto : producto
        ));
      }
      
      return response.data.producto;
    } catch (err) {
      setError('Error al editar el producto: ' + err.message);
      console.error('Error al editar el producto:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProducto = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`${API_ENDPOINT}/${id}`);
      
      if (response.data.mensaje === 'producto eliminado correctamente') {
        setProductos(productos.filter(producto => producto.id !== parseInt(id)));
      }
      return true;
    } catch (err) {
      setError('Error al eliminar el producto: ' + err.message);
      console.error('Error al eliminar el producto:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    productos,
    setProductos,
    loading,
    error,
    getProductos,
    createProducto,
    editProducto,
    deleteProducto
  };

  return (
    <ProductoContext.Provider value={value}>
      {children}
    </ProductoContext.Provider>
  );
};

export default ProductoContext;
