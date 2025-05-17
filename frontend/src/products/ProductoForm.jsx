import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useProductos } from '../context/ProductoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes, faBox, faFileAlt, faDollarSign, faArrowLeft, faSpinner, faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const ProductoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createProducto, editProducto, productos, getProductos } = useProductos();
  const [initialValues, setInitialValues] = useState({
    nombre: '',
    descripcion: '',
    precio: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      const loadProducto = async () => {
        // Check if productos are already loaded
        if (productos.length === 0) {
          await getProductos();
        }
        
        const producto = productos.find(p => p.id === parseInt(id));
        if (producto) {
          setInitialValues({
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio
          });
        } else {
          alert('Producto no encontrado');
          navigate('/productos');
        }
      };
      
      loadProducto();
    }
  }, [id, productos, getProductos, navigate, isEditMode]);

  const validationSchema = Yup.object({
    nombre: Yup.string().required('El nombre es requerido'),
    descripcion: Yup.string().required('La descripción es requerida'),
    precio: Yup.number()
      .required('El precio es requerido')
      .positive('El precio debe ser mayor que 0')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsLoading(true);
    try {
      if (isEditMode) {
        await editProducto(id, values);
        alert('Producto actualizado con éxito');
      } else {
        await createProducto(values);
        resetForm();
        alert('Producto creado con éxito');
      }
      navigate('/productos');
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-4">
      {/* Encabezado con backlink y título */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <div className="d-flex align-items-center mb-2">
            <Link to="/productos" className="btn btn-sm btn-outline-secondary me-3">
              <FontAwesomeIcon icon={faArrowLeft} className="me-1" /> Volver
            </Link>
            <h2 className="mb-0 fw-bold text-primary">
              <FontAwesomeIcon icon={faBox} className="me-2" />
              {isEditMode ? 'Editar Producto' : 'Crear Nuevo Producto'}
            </h2>
          </div>
          <p className="text-muted mb-0">{isEditMode ? 'Modifica los datos del producto seleccionado' : 'Completa el formulario para crear un nuevo producto'}</p>
        </div>
      </div>
      
      {/* Formulario con diseño mejorado */}
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="form">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <Field 
                        type="text" 
                        id="nombre" 
                        name="nombre" 
                        placeholder="Ingrese el nombre"
                        className={`form-control ${errors.nombre && touched.nombre ? 'is-invalid' : ''} ${!errors.nombre && touched.nombre ? 'is-valid' : ''}`} 
                      />
                      <label htmlFor="nombre" className="form-label">
                        <FontAwesomeIcon icon={faBox} className="me-2 text-muted" />
                        Nombre
                      </label>
                      <ErrorMessage name="nombre" component="div" className="invalid-feedback" />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <Field 
                        type="number" 
                        id="precio" 
                        name="precio" 
                        step="0.01" 
                        placeholder="Ingrese el precio"
                        className={`form-control ${errors.precio && touched.precio ? 'is-invalid' : ''} ${!errors.precio && touched.precio ? 'is-valid' : ''}`} 
                      />
                      <label htmlFor="precio" className="form-label">
                        <FontAwesomeIcon icon={faDollarSign} className="me-2 text-muted" />
                        Precio
                      </label>
                      <ErrorMessage name="precio" component="div" className="invalid-feedback" />
                    </div>
                  </div>
                  
                  <div className="col-12">
                    <div className="form-floating mb-3">
                      <Field 
                        as="textarea" 
                        id="descripcion" 
                        name="descripcion" 
                        placeholder="Ingrese la descripción"
                        style={{ height: '100px' }}
                        className={`form-control ${errors.descripcion && touched.descripcion ? 'is-invalid' : ''} ${!errors.descripcion && touched.descripcion ? 'is-valid' : ''}`} 
                      />
                      <label htmlFor="descripcion" className="form-label">
                        <FontAwesomeIcon icon={faFileAlt} className="me-2 text-muted" />
                        Descripción
                      </label>
                      <ErrorMessage name="descripcion" component="div" className="invalid-feedback" />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Link 
                    to="/productos" 
                    className="btn btn-outline-secondary d-flex align-items-center"
                  >
                    <FontAwesomeIcon icon={faTimes} className="me-2" />
                    Cancelar
                  </Link>
                  <button 
                    type="submit"
                    className="btn btn-primary d-flex align-items-center"
                    disabled={isSubmitting || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} className="me-2 fa-spin" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faSave} className="me-2" />
                        {isEditMode ? 'Actualizar Producto' : 'Crear Producto'}
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ProductoForm;
