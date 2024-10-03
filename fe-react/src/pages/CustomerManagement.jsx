import { Button, Typography, Table, Pagination, Flex } from 'antd';
import { createCustomer, fetchCustomers } from '../services/customerService';
import { useEffect, useState } from 'react';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddCustomerModal from '../components/AddCustomerModal';

const { Title } = Typography;

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [addModalVisible, setAddModalVisible] = useState(false);

  useEffect(() => {
    fetchCustomerData();
  }, [page]);

  const fetchCustomerData = async () => {
    try {
      const response = await fetchCustomers(page, pageSize);
      setCustomers(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error("Failed to fetch customer data:", error);
    }
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      render: (_, __, index) => index + 1 + (page - 1) * pageSize,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div>
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleDetail(record.customer_id)} />
          <Button type="link" icon={<EditOutlined />} style={{ color: 'orange' }} onClick={() => handleEdit(record.customer_id)} />
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.customer_id)} />
        </div>
      ),
    },
  ];

  const handleAddCustomer = async (values) => {
    try {
      await createCustomer(values);
      setAddModalVisible(false);
      await fetchCustomerData();
    } catch (error) {
      console.error("Failed to fetch customer data:", error);
    }
  }

  const handleDetail = (id) => {
    console.log("Detail clicked for customer ID:", id);
    // Trigger modal for details (to be implemented later)
  };

  const handleEdit = (id) => {
    console.log("Edit clicked for customer ID:", id);
    // Trigger modal for editing (to be implemented later)
  };

  const handleDelete = (id) => {
    console.log("Delete clicked for customer ID:", id);
    // Trigger modal for deletion confirmation (to be implemented later)
  };

  return (
    <div>
      <Flex gap="middle" align='end'>
        <Title level={2} style={{ marginBottom: '16px' }}>
          Customer Management
        </Title>
        <Button type="primary" style={{ marginBottom: '16px' }} onClick={() => setAddModalVisible(true)}>
          Add Customer
        </Button>
      </Flex>

      <Table 
        dataSource={customers} 
        columns={columns} 
        pagination={false} 
        scroll={{ x: 'max-content' }}
        rowKey="customer_id"
      />

      <Flex justify='center'>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={total}
          onChange={(page) => setPage(page)}
          style={{ marginTop: '16px', textAlign: 'right' }}
        />
      </Flex>

      <AddCustomerModal
        open={addModalVisible}
        onCreate={handleAddCustomer}
        onCancel={() => setAddModalVisible(false)}
      />
    </div>
  );
}

export default CustomerManagement;