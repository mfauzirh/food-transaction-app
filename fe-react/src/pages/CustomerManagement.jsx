import { Button, Typography, Table, Pagination, Flex } from 'antd';
import { createCustomer, fetchCustomers, fetchCustomerById } from '../services/customerService';
import { useEffect, useState } from 'react';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CustomerModal from '../components/CustomerModal';

const { Title } = Typography;

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [customerModal, setCustomerModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);

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
          <Button type="link" icon={<EyeOutlined />} />
          <Button type="link" icon={<EditOutlined />} style={{ color: 'orange' }} onClick={() => openEditModal(record)} />
          <Button type="link" danger icon={<DeleteOutlined />} />
        </div>
      ),
    },
  ];

  const handleAddCustomer = async (values) => {
    console.log("Add customer:", values);
    try {
      await createCustomer(values);
      setCustomerModal(false);
      await fetchCustomerData();
    } catch (error) {
      console.error("Failed to create customer:", error);
    }
  };

  const handleEditCustomer = async (values) => {
    console.log("Edit customer:", values);
    try {
      // Call API to update customer
      // await updateCustomer(currentCustomer.customer_id, values); // Uncomment this line and implement the API call
      setCustomerModal(false);
      await fetchCustomerData();
    } catch (error) {
      console.error("Failed to update customer:", error);
    }
  };

  const handleSubmit = (values) => {
    if (isEdit) {
      handleEditCustomer(values);
    } else {
      handleAddCustomer(values);
    }
  };

  const openAddModal = () => {
    setIsEdit(false);
    setCurrentCustomer(null);
    setCustomerModal(true);
  };

  const openEditModal = async (customer) => {
    setIsEdit(true);
    setCustomerModal(true);
    try {
      const customerData = await fetchCustomerById(customer.customer_id);
      setCurrentCustomer(customerData.data);
    } catch (error) {
      console.error("Failed to fetch customer data for edit:", error);
    }
  };

  const handleModalClose = () => {
    setCustomerModal(false);
    setCurrentCustomer(null);
  };

  return (
    <div>
      <Flex gap="middle" align='end'>
        <Title level={2} style={{ marginBottom: '16px' }}>
          Customer Management
        </Title>
        <Button type="primary" style={{ marginBottom: '16px' }} onClick={openAddModal}>
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

      <CustomerModal
        open={customerModal}
        onSubmit={handleSubmit}
        onCancel={handleModalClose}
        initialValues={currentCustomer}
        isEdit={isEdit}
      />
    </div>
  );
};

export default CustomerManagement;
