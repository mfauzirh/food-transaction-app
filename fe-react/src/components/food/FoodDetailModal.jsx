/* eslint-disable react/prop-types */
import { Modal, Descriptions } from 'antd';

const FoodDetailModal = ({ open, onCancel, foodDetails }) => {
  return (
    <Modal
      open={open}
      title="Food Details"
      footer={null}
      onCancel={onCancel}
    >
      {foodDetails && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="ID">{foodDetails.id}</Descriptions.Item>
          <Descriptions.Item label="Name">{foodDetails.name}</Descriptions.Item>
          <Descriptions.Item label="Price">Rp{foodDetails.price.toLocaleString()}</Descriptions.Item>
          <Descriptions.Item label="Stock">{foodDetails.stock}</Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};

export default FoodDetailModal;
