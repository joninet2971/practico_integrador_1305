import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { ProductoProvider } from './context/ProductoContext';
import { UsuarioProvider } from './context/UsuarioContext';
import ProductsRoutes from './products';
import UsuariosRoutes from './usuarios';
import { useState } from 'react';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBoxes, faHome } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [activeTab, setActiveTab] = useState(window.location.pathname);

  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column bg-light">
        <header className="py-3 bg-gradient shadow-sm" style={{ background: 'linear-gradient(to right, #2c3e50, #4ca1af)' }}>
          <div className="container">
            <h1 className="text-white m-0 fs-3 fw-bold">Sistema de Gestión</h1>
          </div>
        </header>

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
          <div className="container">
            <button 
              className="navbar-toggler border-0" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item mx-1">
                  <Link 
                    className={`nav-link px-3 py-2 rounded ${activeTab.includes('/usuarios') ? 'active bg-primary text-white' : ''}`}
                    to="/usuarios"
                    onClick={() => setActiveTab('/usuarios')}
                  >
                    <FontAwesomeIcon icon={faUsers} className="me-2" />
                    Usuarios
                  </Link>
                </li>
                <li className="nav-item mx-1">
                  <Link 
                    className={`nav-link px-3 py-2 rounded ${activeTab.includes('/productos') ? 'active bg-primary text-white' : ''}`}
                    to="/productos"
                    onClick={() => setActiveTab('/productos')}
                  >
                    <FontAwesomeIcon icon={faBoxes} className="me-2" />
                    Productos
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container flex-grow-1 py-4">
          <div className="bg-white shadow rounded p-4">

            <Routes>
              <Route path="/" element={<Navigate to="/productos" replace />} />
              
              <Route 
                path="/usuarios/*" 
                element={
                  <UsuarioProvider>
                    <UsuariosRoutes />
                  </UsuarioProvider>
                } 
              />
              
              <Route 
                path="/productos/*" 
                element={
                  <ProductoProvider>
                    <ProductsRoutes />
                  </ProductoProvider>
                } 
              />
            </Routes>
          </div>
        </div>

        <footer className="py-3 bg-dark text-white text-center">
          <div className="container">
            <p className="mb-0">© {new Date().getFullYear()} Sistema de Gestión. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
