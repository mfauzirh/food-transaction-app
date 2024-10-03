import { Button, Typography, Table, Pagination, Flex } from 'antd';
import { createCustomer, fetchCustomers, fetchCustomerById, updateCustomer, deleteCustomer } from '../services/customerService';
import { useEffect, useState } from 'react';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CustomerModal from '../components/CustomerModal';
import CustomerDetailModal from '../components/CustomerDetailModal';
import CustomerDeleteModal from '../components/CustomerDeleteModal';

const { Title } = Typography;

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [customerModal, setCustomerModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [detailModal, setDetailModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

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
          <Button type="link" icon={<EyeOutlined />} onClick={() => openDetailModal(record)} />
          <Button type="link" icon={<EditOutlined />} style={{ color: 'orange' }} onClick={() => openEditModal(record)} />
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => openDeleteModal(record)} />
        </div>
      ),
    },
  ];

  const handleAddCustomer = async (values) => {
    try {
      await createCustomer(values);
      setCustomerModal(false);
      await fetchCustomerData();
    } catch (error) {
      console.error("Failed to create customer:", error);
    }
  };

  const handleEditCustomer = async (values) => {
    try {
      const customerId = currentCustomer.id;
      await updateCustomer(customerId, values);
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

  const handleDeleteCustomer = async () => {
    try {
      const customerId = currentCustomer.id;
      await deleteCustomer(customerId);
      setDeleteModal(false);
      await fetchCustomerData();
    } catch (error) {
      console.error("Failed to delete customer:", error);
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
      const customerData = await fetchCustomerById(customer.id);
      setCurrentCustomer(customerData.data);
    } catch (error) {
      console.error("Failed to fetch customer data for edit:", error);
    }
  };

  const openDetailModal = async (customer) => {
    setDetailModal(true);
    try {
      const customerData = await fetchCustomerById(customer.id);
      setCurrentCustomer(customerData.data);
    } catch (error) {
      console.error("Failed to fetch customer details:", error);
    }
  };

  const openDeleteModal = (customer) => {
    setCurrentCustomer(customer);
    setDeleteModal(true);
  };

  const handleModalClose = () => {
    setCustomerModal(false);
    setCurrentCustomer(null);
  };

  const handleDetailModalClose = () => {
    setDetailModal(false);
    setCurrentCustomer(null);
  };

  const handleDeleteModalClose = () => {
    setDeleteModal(false);
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
        rowKey="id"
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

      <CustomerDetailModal
        open={detailModal}
        onCancel={handleDetailModalClose}
        customer={currentCustomer}
      />

      <CustomerDeleteModal
        open={deleteModal}
        onCancel={handleDeleteModalClose}
        onDelete={handleDeleteCustomer}
        customerName={currentCustomer?.name}
      />
    </div>
  );
};

export default CustomerManagement;
