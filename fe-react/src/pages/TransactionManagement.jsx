import { useEffect, useState } from 'react';
import { Table, Typography, Button, Pagination, Flex } from 'antd';
import { deleteTransaction, fetchTransactionById, fetchTransactions } from '../services/transactionService';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import TransactionDetailModal from '../components/transaction/TransactionDetailModal';
import TransactionDeleteModal from '../components/transaction/TransactionDeleteModal';

const { Title } = Typography;

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);


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
                <Button type="link" icon={<EditOutlined />} style={{ color: 'orange' }}/>
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

  return (
    <div>
        <Flex gap="middle" align='end'>
            <Title level={2} style={{ marginBottom: '16px' }}>
                Transaction Management
            </Title>
            <Button type="primary" style={{ marginBottom: '16px' }}>
                Add Transaction
            </Button>
        </Flex>

        <Table
            dataSource={transactions}
            columns={columns}
            pagination={false}
            rowKey="transaction_id"
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
    </div>
  );
};

export default TransactionManagement;