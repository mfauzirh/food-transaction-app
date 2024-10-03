import { Layout as AntLayout } from 'antd';
import AppNavBar from './NavBar';
import AppFooter from './Footer';

const { Content } = AntLayout;

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => (
  <AntLayout style={{ minHeight: '100vh'}}>
    <AppNavBar/>
    <Content style={{ padding: '0 50px', marginTop: '16px' }}>
      <div className="site-layout-content">{children}</div>
    </Content>
    <AppFooter/>
  </AntLayout>
);

export default Layout;
