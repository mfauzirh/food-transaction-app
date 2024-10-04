import { Modal, Form, Input } from 'antd';
import { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const FoodModal = ({ open, onSubmit, onCancel, initialValues, isEdit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues || { name: '', price: '', stock: '' });
    }
  }, [open, initialValues]);

  return (
    <Modal
      open={open}
      title={isEdit ? "Edit Food" : "Add Food"}
      okText={isEdit ? "Update" : "Create"}
      onCancel={handleCancel}
      onOk={form.submit}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input the food name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please input the price!' }]}
          onChange={(e) => {
            const value = e.target.value;
            form.setFieldsValue({ price: value ? Number(value) : null });
          }}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="stock"
          label="Stock"
          rules={[{ required: true, message: 'Please input the food stock!' }]}
          onChange={(e) => {
            const value = e.target.value;
            form.setFieldsValue({ stock: value ? Number(value) : null });
          }}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FoodModal;
