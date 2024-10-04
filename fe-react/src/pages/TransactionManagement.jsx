import { useEffect, useState } from 'react';
import { Table, Typography, Button, Pagination, Flex } from 'antd';
import { createTransaction, deleteTransaction, fetchTransactionById, fetchTransactions, updateTransaction } from '../services/transactionService';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import TransactionDetailModal from '../components/transaction/TransactionDetailModal';
import TransactionDeleteModal from '../components/transaction/TransactionDeleteModal';
import TransactionEditModal from '../components/transaction/TransactionEditModal';
import TransactionAddModal from '../components/transaction/TransactionAddModal';

const { Title } = Typography;

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);

  useEffect(() => {
    fetchTransactionData();
  }, [page]);

  const fetchTransactionData = async () => {
      try {
          const response = await fetchTransactions(page, pageSize);
          setTransactions(response.data);
          setTotal(response.total);
      } catch (error) {
          console.error("Failed to fetch transaction data:", error);
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
        title: 'Customer Name',
        dataIndex: 'customer',
        key: 'customer',
        render: (customer) => customer.name,
    },
    {
        title: 'Food Name',
        dataIndex: 'food',
        key: 'food',
        render: (food) => food.name,
    },
    {
        title: 'Quantity',
        dataIndex: 'qty',
        key: 'qty',
    },
    {
        title: 'Total Price',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        render: (totalPrice) => `Rp${totalPrice.toLocaleString()}`,
    },
    {
        title: 'Transaction Date',
        dataIndex: 'transactionDate',
        key: 'transactionDate',
        render: (date) => new Date(date).toLocaleString(),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <div>
                <Button type="link" icon={<EyeOutlined />} onClick={() => openDetailModal(record)} />
                <Button type="link" icon={<EditOutlined />} style={{ color: 'orange' }}  onClick={() => openEditModal(record)}/>
                <Button type="link" danger icon={<DeleteOutlined />} onClick={() => openDeleteModal(record)}  />
            </div>
        ),
    },
  ];

  const openDetailModal = async (transaction) => {
    try {
      const response = await fetchTransactionById(transaction.id);
      const data = response.data;
      setSelectedTransaction(data);
      setDetailModalVisible(true);
    } catch (error) {
      console.error("Failed to fetch food data for edit:", error);
    }
  };

  const closeDetailModal = () => {
    setDetailModalVisible(false);
    setSelectedTransaction(null);
  };

  const openDeleteModal = (transaction) => {
    setSelectedTransaction(transaction);
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setSelectedTransaction(null);
  };

  const handleDelete = async () => {
    try {
      const foodId = selectedTransaction.id;
      await deleteTransaction(foodId);
      closeDeleteModal();
      await fetchTransactionData();
    } catch (error) {
      console.error("Failed to delete food:", error);
    }
  };

  const openEditModal = (transaction) => {
    setSelectedTransaction(transaction);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
    setSelectedTransaction(null);
  };

  const handleEdit = async (quantity) => {
    try {
        await updateTransaction(selectedTransaction.id, quantity);
        closeEditModal();
        await fetchTransactionData();
    } catch (error) {
        console.error("Failed to update quantity:", error);
    }
  };

  const openTransactionModal = () => {
    setTransactionModalVisible(true);
  };
  
  const closeTransactionModal = () => {
    setTransactionModalVisible(false);
  };
  
  const handleTransactionSubmit = async (values) => {
    try {
      await createTransaction(values);
      closeTransactionModal();
      await fetchTransactionData();
    } catch (error) {
        console.error("Failed to update quantity:", error);
    }    
  };

  return (
    <div>
        <Flex gap="middle" align='end'>
            <Title level={2} style={{ marginBottom: '16px' }}>
                Transaction Management
            </Title>
            <Button type="primary" style={{ marginBottom: '16px' }} onClick={openTransactionModal}>
                Add Transaction
            </Button>
        </Flex>

        <Table
            dataSource={transactions}
            columns={columns}
            pagination={false}
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

        <TransactionDetailModal
          open={detailModalVisible}
          onCancel={closeDetailModal}
          transactionDetails={selectedTransaction}
        />

      <TransactionDeleteModal
        open={deleteModalVisible}
        onCancel={closeDeleteModal}
        onDelete={handleDelete}
        transactionId={selectedTransaction?.id}
        customerName={selectedTransaction?.customer?.name}
        foodName={selectedTransaction?.food?.name}
      />

      <TransactionEditModal
        open={editModalVisible}
        onSubmit={handleEdit}
        onCancel={closeEditModal}
        initialValues={{ qty: selectedTransaction?.qty }}
        isEdit={true}
      />

    <TransactionAddModal
      open={transactionModalVisible}
      onSubmit={handleTransactionSubmit}
      onCancel={closeTransactionModal}
    />
    </div>
  );
};

export default TransactionManagement;