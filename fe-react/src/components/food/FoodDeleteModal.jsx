import { Modal, Button } from 'antd';

// eslint-disable-next-line react/prop-types
const FoodDeleteModal = ({ open, onCancel, onDelete, foodName }) => {
  return (
    <Modal
      open={open}
      title="Delete Food"
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
      <p>Are you sure you want to delete the food item with name <strong>{foodName}</strong>?</p>
    </Modal>
  );
};

export default FoodDeleteModal;
