import { Modal, Form, Input } from 'antd';
import { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const TransactionEditModal = ({ open, onSubmit, onCancel, initialValues, isEdit }) => {
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
      form.setFieldsValue(initialValues || { qty: 0 });
    }
  }, [open, initialValues]);

  return (
    <Modal
      open={open}
      title={isEdit ? "Edit Transaction" : "Add Transaction"}
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
          name="qty"
          label="Quantity"
          rules={[{ required: true, message: 'Please input the quantity!' }]}
          onChange={(e) => {
            const value = e.target.value;
            form.setFieldsValue({ qty: value ? Number(value) : null });
          }}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TransactionEditModal;
