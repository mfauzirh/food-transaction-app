/* eslint-disable react/prop-types */
import { Modal, Descriptions } from 'antd';

const TransactionDetailModal = ({ open, onCancel, transactionDetails }) => {
  return (
    <Modal
      open={open}
      title="Transaction Details"
      footer={null}
      onCancel={onCancel}
    >
      {transactionDetails && (
        <>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Transaction ID">{transactionDetails.id}</Descriptions.Item>
            <Descriptions.Item label="Quantity">{transactionDetails.qty}</Descriptions.Item>
            <Descriptions.Item label="Total Price">Rp{transactionDetails.totalPrice.toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="Transaction Date">{new Date(transactionDetails.transactionDate).toLocaleString()}</Descriptions.Item>
          </Descriptions>

          <Descriptions bordered column={1} title="Customer Details" style={{ marginTop: '16px' }}>
            <Descriptions.Item label="ID">{transactionDetails.customer.id}</Descriptions.Item>
            <Descriptions.Item label="Name">{transactionDetails.customer.name}</Descriptions.Item>
            <Descriptions.Item label="Phone">{transactionDetails.customer.phone}</Descriptions.Item>
            <Descriptions.Item label="Address">{transactionDetails.customer.address}</Descriptions.Item>
          </Descriptions>

          <Descriptions bordered column={1} title="Food Details" style={{ marginTop: '16px' }}>
            <Descriptions.Item label="ID">{transactionDetails.food.id}</Descriptions.Item>
            <Descriptions.Item label="Name">{transactionDetails.food.name}</Descriptions.Item>
            <Descriptions.Item label="Price">Rp{transactionDetails.food.price.toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="Stock">{transactionDetails.food.stock}</Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Modal>
  );
};

export default TransactionDetailModal;