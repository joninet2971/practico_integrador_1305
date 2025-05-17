import { Routes, Route } from 'react-router-dom';
import ProductoView from './ProductoView';
import ProductoForm from './ProductoForm';

const ProductosRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductoView />} />
      <Route path="/crear" element={<ProductoForm />} />
      <Route path="/editar/:id" element={<ProductoForm />} />
    </Routes>
  );
};

export default ProductosRoutes;
