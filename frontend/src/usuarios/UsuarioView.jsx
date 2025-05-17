import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUsuarios } from '../context/UsuarioContext';
import { exportToPdf } from '../utils/ExportToPdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUserPlus, faExclamationTriangle, faUserCheck, faFileExport } from '@fortawesome/free-solid-svg-icons';

const UsuarioView = () => {
  const { usuarios, loading, error, getUsuarios, deleteUsuario } = useUsuarios();
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    getUsuarios();
  }, []);  // Quitamos getUsuarios de las dependencias para evitar bucle infinito
  
  const handleExportPdf = () => {
    const columns = ['ID', 'Nombre', 'Email', 'Usuario', 'Edad'];
    const data = usuarios.map(usuario => [
      usuario.id,
      usuario.nombre,
      usuario.email,
      usuario.usuario,
      usuario.edad
    ]);
    exportToPdf(data, 'Usuarios', columns);
  };

  const handleDelete = async (id) => {
    if (confirmDelete === id) {
      try {
        await deleteUsuario(id);
        setConfirmDelete(null);
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    } else {
      setConfirmDelete(id);
      setTimeout(() => {
        setConfirmDelete(null);
      }, 3000);
    }
  };
  


  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{height: '300px'}}>
      <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );
  
  return (
    <div className="mb-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h2 className="mb-0 fw-bold text-primary">
            <FontAwesomeIcon icon={faUserCheck} className="me-2" />
            Gestión de Usuarios
          </h2>
          <p className="text-muted mb-0 mt-1">Administra los usuarios del sistema</p>
        </div>
        
        <div className="d-flex gap-2 flex-wrap">
          <button 
            onClick={handleExportPdf} 
            className="btn btn-success d-flex align-items-center shadow-sm"
          >
            <FontAwesomeIcon icon={faFileExport} className="me-2" />
            Exportar a PDF
          </button>
          
          <Link 
            to="/usuarios/crear" 
            className="btn btn-primary d-flex align-items-center shadow-sm"
          >
            <FontAwesomeIcon icon={faUserPlus} className="me-2" />
            Nuevo Usuario
          </Link>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
          {error}
        </div>
      )}

      {usuarios.length === 0 ? (
        <div className="alert alert-info d-flex align-items-center">
          No hay usuarios registrados
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-3 py-3">ID</th>
                  <th className="py-3">Nombre</th>
                  <th className="py-3">Email</th>
                  <th className="py-3">Usuario</th>
                  <th className="py-3">Edad</th>
                  <th className="text-end pe-3 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td className="ps-3 align-middle">{usuario.id}</td>
                    <td className="align-middle">
                      <span className="fw-medium">{usuario.nombre}</span>
                    </td>
                    <td className="align-middle">{usuario.email}</td>
                    <td className="align-middle">{usuario.usuario}</td>
                    <td className="align-middle">{usuario.edad}</td>
                    <td className="text-end pe-3">
                      <div className="btn-group">
                        <Link 
                          to={`/usuarios/editar/${usuario.id}`}
                          className="btn btn-sm btn-outline-primary d-flex align-items-center"
                        >
                          <FontAwesomeIcon icon={faEdit} className="me-1" />
                          Editar
                        </Link>
                        <button 
                          className={`btn btn-sm d-flex align-items-center ${confirmDelete === usuario.id ? 'btn-danger' : 'btn-outline-danger'}`}
                          onClick={() => handleDelete(usuario.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} className="me-1" />
                          {confirmDelete === usuario.id ? '¿Seguro?' : 'Eliminar'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer bg-white border-top-0 d-flex justify-content-start align-items-center pt-3">
            <span className="text-muted small">Total: {usuarios.length} usuarios</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsuarioView;
