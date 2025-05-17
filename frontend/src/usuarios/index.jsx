import { Routes, Route } from 'react-router-dom';
import UsuarioView from './UsuarioView';
import UsuarioForm from './UsuarioForm';

const UsuariosRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UsuarioView />} />
      <Route path="/crear" element={<UsuarioForm />} />
      <Route path="/editar/:id" element={<UsuarioForm />} />
    </Routes>
  );
};

export default UsuariosRoutes;
