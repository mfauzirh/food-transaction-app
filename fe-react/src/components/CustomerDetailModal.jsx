/* eslint-disable react/prop-types */
import { Modal, Descriptions } from 'antd';

const CustomerDetailModal = ({ open, onCancel, customer }) => {
  return (
    <Modal
      open={open}
      title="Customer Details"
      footer={null}
      onCancel={onCancel}
    >
      {customer && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Customer Id">{customer.id}</Descriptions.Item>
          <Descriptions.Item label="Name">{customer.name}</Descriptions.Item>
          <Descriptions.Item label="Phone">{customer.phone}</Descriptions.Item>
          <Descriptions.Item label="Address">{customer.address}</Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};

export default CustomerDetailModal;
