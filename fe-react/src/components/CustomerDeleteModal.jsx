import { Modal, Button } from 'antd';

// eslint-disable-next-line react/prop-types
const CustomerDeleteModal = ({ open, onCancel, onDelete, customerName }) => {
  return (
    <Modal
      open={open}
      title="Delete Customer"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="delete" type="primary" danger onClick={onDelete}>
          Delete
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete customer with name <strong>{customerName}</strong>?</p>
    </Modal>
  );
};

export default CustomerDeleteModal;
