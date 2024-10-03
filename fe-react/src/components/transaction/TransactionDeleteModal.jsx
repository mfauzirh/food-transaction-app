import { Modal, Button } from 'antd';

// eslint-disable-next-line react/prop-types
const TransactionDeleteModal = ({ open, onCancel, onDelete, transactionId, customerName, foodName }) => {
  return (
    <Modal
      open={open}
      title="Delete Transaction"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="delete" type="primary" danger onClick={() => onDelete(transactionId)}>
          Delete
        </Button>,
      ]}
    >
      <p>
        Are you sure you want to delete the transaction with ID <strong>{transactionId}</strong> for 
        customer <strong>{customerName}</strong> and food <strong>{foodName}</strong>?
      </p>
    </Modal>
  );
};

export default TransactionDeleteModal;
