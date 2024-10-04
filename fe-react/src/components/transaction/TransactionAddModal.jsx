/* eslint-disable react/prop-types */
import { Modal, Form, Select, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import { fetchCustomers as fetchCustomersService } from '../../services/customerService';
import { fetchFoods as fetchFoodsService } from '../../services/foodService';

const TransactionAddModal = ({ open, onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const [customers, setCustomers] = useState([]);
  const [foods, setFoods] = useState([]);

  const fetchCustomersData = async (search) => {
    try {
      const response = await fetchCustomersService(1, 10, search);
      const customerOptions = response.data.map(customer => ({
        value: customer.id,
        label: `${customer.id} | ${customer.name}`,
      }));
      setCustomers(customerOptions);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    }
  };

  const fetchFoodsData = async (search) => {
    try {
      const response = await fetchFoodsService(1, 10, search);
      const foodOptions = response.data.map(food => ({
        value: food.id,
        label: `${food.id} | ${food.name}`,
      }));
      setFoods(foodOptions);
    } catch (error) {
      console.error("Failed to fetch foods:", error);
    }
  };

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields(); // Reset fields after submission
  };

  const handleCancel = () => {
    form.resetFields(); // Reset fields on cancel
    onCancel();
  };

  useEffect(() => {
    if (open) {
      fetchCustomersData(); // Fetch customers when modal opens
      fetchFoodsData(); // Fetch foods when modal opens
      form.setFieldsValue({ customerId: null, foodId: null, qty: 1 }); // Set initial values
    }
  }, [open]); // Dependency on 'open'

  return (
    <Modal
      open={open}
      title="Create Transaction"
      okText="Submit"
      onCancel={handleCancel}
      onOk={form.submit}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ customerId: null, foodId: null, qty: 1 }} // Set initial values for the form
      >
        <Form.Item
          name="customerId"
          label="Customer"
          rules={[{ required: true, message: 'Please select a customer!' }]}
        >
          <Select
            showSearch
            onSearch={fetchCustomersData} // Fetch customers on search
            placeholder="Search Customer"
            filterOption={false}
            options={[
              ...customers,
              { value: 'noData', label: 'No Data', disabled: true },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="foodId"
          label="Food"
          rules={[{ required: true, message: 'Please select a food!' }]}
        >
          <Select
            showSearch
            onSearch={fetchFoodsData}
            placeholder="Search Food"
            filterOption={false}
            options={[
              ...foods,
              { value: 'noData', label: 'No Data', disabled: true },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="qty"
          label="Quantity"
          rules={[
            { required: true, message: 'Please enter a quantity!' },
            {
              validator: (_, value) => {
                if (value && value > 0) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Quantity must be a positive number!'));
              },
            },
          ]}
        >
          <InputNumber 
            min={1}
            placeholder="Enter quantity"
            style={{ width: '100%' }} 
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TransactionAddModal;
