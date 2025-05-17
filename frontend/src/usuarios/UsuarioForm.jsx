import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useUsuarios } from '../context/UsuarioContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes, faUser, faEnvelope, faIdCard, faBirthdayCake, faArrowLeft, faSpinner, faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const initialForm = {
  nombre: '',
  email: '',
  usuario: '',
  edad: ''
};

const UsuarioForm = () => {
  const [formData, setFormData] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [touched, setTouched] = useState({});
  const { createUsuario, editUsuario, usuarios, getUsuarios, loading, error } = useUsuarios();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      if (usuarios.length === 0) {
        getUsuarios();
      } else {
        const usuario = usuarios.find(u => u.id === parseInt(id));
        if (usuario) {
          setFormData(usuario);
        } else {
          navigate('/usuarios');
        }
      }
    }
  }, [id, usuarios, getUsuarios, navigate, isEditing]);

  const validate = () => {
    const errors = {};
    
    if (!formData.nombre.trim()) errors.nombre = 'El nombre es requerido';
    if (!formData.email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'El email no es válido';
    }
    
    if (!formData.usuario.trim()) errors.usuario = 'El usuario es requerido';
    
    if (!formData.edad) {
      errors.edad = 'La edad es requerida';
    } else if (isNaN(formData.edad) || parseInt(formData.edad) <= 0) {
      errors.edad = 'La edad debe ser un número positivo';
    }
    
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(''); 
    
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    try {
      // Convertir edad a número
      const usuarioData = {
        ...formData,
        edad: parseInt(formData.edad)
      };
      
      if (isEditing) {
        await editUsuario(id, usuarioData);
        setSuccessMessage('¡Usuario editado correctamente!'); 
      } else {
        await createUsuario(usuarioData);
        setSuccessMessage('¡Usuario creado correctamente!');
      }
      
      // En lugar de redireccionar inmediatamente, mostramos el mensaje de éxito
      // y establecemos un temporizador para redireccionar después de 2 segundos
      setTimeout(() => {
        navigate('/usuarios');
      }, 2000);
      
    } catch (err) {
      console.error('Error al guardar usuario:', err);
    }
  };

  return (
    <div className="mb-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <div className="d-flex align-items-center mb-2">
            <Link to="/usuarios" className="btn btn-sm btn-outline-secondary me-3">
              <FontAwesomeIcon icon={faArrowLeft} className="me-1" /> Volver
            </Link>
            <h2 className="mb-0 fw-bold text-primary">
              <FontAwesomeIcon icon={isEditing ? faUser : faUser} className="me-2" />
              {isEditing ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
            </h2>
          </div>
          <p className="text-muted mb-0">{isEditing ? 'Modifica los datos del usuario seleccionado' : 'Completa el formulario para crear un nuevo usuario'}</p>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="alert alert-success d-flex align-items-center" role="alert">
          <FontAwesomeIcon icon={faCheck} className="me-2" />
          {successMessage}
        </div>
      )}
      
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className={`form-control ${touched.nombre && formErrors.nombre ? 'is-invalid' : ''} ${touched.nombre && !formErrors.nombre ? 'is-valid' : ''}`}
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ingrese el nombre"
                  />
                  <label htmlFor="nombre" className="form-label">
                    <FontAwesomeIcon icon={faUser} className="me-2 text-muted" />
                    Nombre
                  </label>
                  {touched.nombre && formErrors.nombre && (
                    <div className="invalid-feedback">{formErrors.nombre}</div>
                  )}
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className={`form-control ${touched.email && formErrors.email ? 'is-invalid' : ''} ${touched.email && !formErrors.email ? 'is-valid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ingrese el email"
                  />
                  <label htmlFor="email" className="form-label">
                    <FontAwesomeIcon icon={faEnvelope} className="me-2 text-muted" />
                    Email
                  </label>
                  {touched.email && formErrors.email && (
                    <div className="invalid-feedback">{formErrors.email}</div>
                  )}
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className={`form-control ${touched.usuario && formErrors.usuario ? 'is-invalid' : ''} ${touched.usuario && !formErrors.usuario ? 'is-valid' : ''}`}
                    id="usuario"
                    name="usuario"
                    value={formData.usuario}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ingrese el nombre de usuario"
                  />
                  <label htmlFor="usuario" className="form-label">
                    <FontAwesomeIcon icon={faIdCard} className="me-2 text-muted" />
                    Nombre de Usuario
                  </label>
                  {touched.usuario && formErrors.usuario && (
                    <div className="invalid-feedback">{formErrors.usuario}</div>
                  )}
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className={`form-control ${touched.edad && formErrors.edad ? 'is-invalid' : ''} ${touched.edad && !formErrors.edad ? 'is-valid' : ''}`}
                    id="edad"
                    name="edad"
                    value={formData.edad}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ingrese la edad"
                  />
                  <label htmlFor="edad" className="form-label">
                    <FontAwesomeIcon icon={faBirthdayCake} className="me-2 text-muted" />
                    Edad
                  </label>
                  {touched.edad && formErrors.edad && (
                    <div className="invalid-feedback">{formErrors.edad}</div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="d-flex justify-content-end gap-2 mt-4">
              <Link 
                to="/usuarios" 
                className="btn btn-outline-secondary d-flex align-items-center"
              >
                <FontAwesomeIcon icon={faTimes} className="me-2" />
                Cancelar
              </Link>
              <button 
                type="submit" 
                className="btn btn-primary d-flex align-items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="me-2 fa-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faSave} className="me-2" />
                    {isEditing ? 'Actualizar Usuario' : 'Crear Usuario'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UsuarioForm;
