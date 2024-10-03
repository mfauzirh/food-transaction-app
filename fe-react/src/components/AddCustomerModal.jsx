import { Modal, Form, Input } from 'antd';

// eslint-disable-next-line react/prop-types
const AddCustomerModal = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm(); 

  const handleFinish = async (values) => {
    await onCreate(values);
    form.resetFields();
  };

  return (
    <Modal
      open={open}
      title="Add Customer"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            handleFinish(values);
          })
          .catch(info => {
            console.log('Validation Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter the customer name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ required: true, message: 'Please enter the phone number!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please enter the address!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCustomerModal;