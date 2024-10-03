import { Routes, Route } from 'react-router-dom';
import CustomerManagement from '../pages/CustomerManagement';
import Layout from '../components/Layout';

const AppRoutes = () => (
  <Layout>
    <Routes>
      <Route path="/customers" element={<CustomerManagement />} />
      {/* Add other routes here */}
    </Routes>
  </Layout>
);

export default AppRoutes;
