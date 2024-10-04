import { Menu, Layout } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Header } = Layout;

const AppNavbar = () => {
  const location = useLocation();

  const getActiveKey = () => {
    switch (location.pathname) {
      case '/customers':
        return '1';
      case '/foods':
        return '2';
      case '/transactions':
        return '3';
      default:
        return '1';
    }
  };

  const items = new Array(3).fill(null).map((_, index) => ({
    key: index + 1,
    label: (
      <Link to={index === 0 ? "/customers" : index === 1 ? "/foods" : "/transactions"}>
        {index === 0 ? "Customer Management" : index === 1 ? "Food Management" : "Transaction Management"}
      </Link>
    ),
  }));

  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <img src='https://placehold.co/80x40' alt="Logo" style={{ marginRight: '16px' }} />
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[getActiveKey()]}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  );
};

export default AppNavbar;
