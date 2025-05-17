import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductos } from '../context/ProductoContext';
import { exportToPdf } from '../utils/ExportToPdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faBoxes, faPlus, faFileExport, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const ProductoView = () => {
  const { productos, loading, error, getProductos, deleteProducto } = useProductos();
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    getProductos();
  }, []);

  const handleDelete = async (id) => {
    if (confirmDelete === id) {
      try {
        await deleteProducto(id);
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

  const handleExportPdf = () => {
    const columns = ['Nombre', 'Descripción', 'Precio'];
    const data = productos.map(producto => [
      producto.nombre,
      producto.descripcion,
      producto.precio
    ]);
    exportToPdf(data, 'Productos', columns);
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
            <FontAwesomeIcon icon={faBoxes} className="me-2" />
            Gestión de Productos
          </h2>
          <p className="text-muted mb-0 mt-1">Administra los productos del sistema</p>
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
            to="/productos/crear" 
            className="btn btn-primary d-flex align-items-center shadow-sm"
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Nuevo Producto
          </Link>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
          {error}
        </div>
      )}

      {productos.length === 0 ? (
        <div className="alert alert-info d-flex align-items-center">
          No hay productos registrados
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-3 py-3">Nombre</th>
                  <th className="py-3">Descripción</th>
                  <th className="py-3">Precio</th>
                  <th className="text-end pe-3 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td className="ps-3 align-middle">
                      <span className="fw-medium">{producto.nombre}</span>
                    </td>
                    <td className="align-middle">{producto.descripcion}</td>
                    <td className="align-middle">${producto.precio.toLocaleString('es-AR')}</td>
                    <td className="text-end pe-3">
                      <div className="btn-group">
                        <Link 
                          to={`/productos/editar/${producto.id}`} 
                          className="btn btn-sm btn-outline-primary d-flex align-items-center"
                        >
                          <FontAwesomeIcon icon={faEdit} className="me-1" />
                          Editar
                        </Link>
                        <button 
                          onClick={() => handleDelete(producto.id)} 
                          className={`btn btn-sm d-flex align-items-center ${confirmDelete === producto.id ? 'btn-danger' : 'btn-outline-danger'}`}
                        >
                          <FontAwesomeIcon icon={faTrash} className="me-1" />
                          {confirmDelete === producto.id ? '¿Seguro?' : 'Eliminar'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer bg-white border-top-0 d-flex justify-content-start align-items-center pt-3">
            <span className="text-muted small">Total: {productos.length} productos</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductoView;
