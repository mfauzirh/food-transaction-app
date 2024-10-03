import { Modal, Form, Input } from 'antd';
import { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const CustomerModal = ({ open, onSubmit, onCancel, initialValues, isEdit }) => {
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
      form.setFieldsValue(initialValues || { name: '', phone: '', address: '' });
    }
  }, [open, initialValues]);

  return (
    <Modal
      open={open}
      title={isEdit ? "Edit Customer" : "Add Customer"}
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
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ required: true, message: 'Please input the phone number!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please input the address!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CustomerModal;
