import { Routes, Route, Navigate } from 'react-router-dom';
import CustomerManagement from '../pages/CustomerManagement';
import Layout from '../components/Layout';
import FoodManagement from '../pages/FoodManagement';
import TransactionManagement from '../pages/TransactionManagement';

const AppRoutes = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Navigate to="/customers" replace />} />
      <Route path="/customers" element={<CustomerManagement />} />
      <Route path="/foods" element={<FoodManagement />} />
      <Route path="/transactions" element={<TransactionManagement />} />
    </Routes>
  </Layout>
);

export default AppRoutes;
