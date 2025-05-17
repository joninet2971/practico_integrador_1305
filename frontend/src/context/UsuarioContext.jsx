import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { exportToPdf } from '../utils/ExportToPdf';

const API_ENDPOINT = 'http://localhost:4000/usuarios';

const UsuarioContext = createContext();

export const useUsuarios = () => {
  const context = useContext(UsuarioContext);
  return context;
};

export const UsuarioProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUsuarios = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINT);
      setUsuarios(response.data);
      return response.data;
    } catch (err) {
      setError('Error al obtener los usuarios: ' + err.message);
      console.error('Error al obtener los usuarios:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createUsuario = async (usuario) => {
    try {
      setLoading(true);
      const response = await axios.post(API_ENDPOINT, usuario);
      if (response.data.mensaje === 'Ya existe ese email') {
        setError('Ya existe un usuario con ese email');
        throw new Error('Ya existe un usuario con ese email');
      }
      if (response.data.usuario) {
        setUsuarios([...usuarios, response.data.usuario]);
      }
      return response.data;
    } catch (err) {
      setError('Error al crear el usuario: ' + err.message);
      console.error('Error al crear el usuario:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editUsuario = async (id, updatedUsuario) => {
    try {
      setLoading(true);
      const response = await axios.put(`${API_ENDPOINT}/${id}`, updatedUsuario);
      
      if (response.data.mensaje === 'Usuario actualizado correctamente') {
        setUsuarios(usuarios.map(usuario => 
          usuario.id === parseInt(id) ? response.data.usuario : usuario
        ));
      }
      
      return response.data.usuario;
    } catch (err) {
      setError('Error al editar el usuario: ' + err.message);
      console.error('Error al editar el usuario:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUsuario = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`${API_ENDPOINT}/${id}`);
      
      if (response.data.mensaje === 'Usuario eliminado correctamente') {
        setUsuarios(usuarios.filter(usuario => usuario.id !== parseInt(id)));
      }
      return true;
    } catch (err) {
      setError('Error al eliminar el usuario: ' + err.message);
      console.error('Error al eliminar el usuario:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    usuarios,
    setUsuarios,
    loading,
    error,
    getUsuarios,
    createUsuario,
    editUsuario,
    deleteUsuario
  };

  return (
    <UsuarioContext.Provider value={value}>
      {children}
    </UsuarioContext.Provider>
  );
};

export default UsuarioContext;
