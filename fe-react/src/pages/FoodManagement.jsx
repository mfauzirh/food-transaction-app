import { useEffect, useState } from 'react';
import { Table, Typography, Button, Pagination, Flex } from 'antd';
import { fetchFoods } from '../services/foodService';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';


const { Title } = Typography;

const FoodManagement = () => {
  const [foods, setFoods] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  useEffect(() => {
    fetchFoodData();
  }, [page]);

  const fetchFoodData = async () => {
    try {
      const response = await fetchFoods(page, pageSize);
      setFoods(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error("Failed to fetch food data:", error);
    }
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      render: (_, __, index) => index + 1 + (page - 1) * pageSize,
    },
    {
      title: 'Name',
      dataIndex: 'food_name',
      key: 'food_name',
    },
    {
      title: 'Price',
      dataIndex: 'food_price',
      key: 'food_price',
      render: (price) => `Rp${price.toLocaleString()}`,
    },
    {
      title: 'Stock',
      dataIndex: 'food_stock',
      key: 'food_stock',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div>
          <Button type="link" icon={<EyeOutlined />} />
          <Button type="link" icon={<EditOutlined />} style={{ color: 'orange' }} />
          <Button type="link" danger icon={<DeleteOutlined />} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Flex gap="middle" align='end'>
        <Title level={2} style={{ marginBottom: '16px' }}>
          Food Management
        </Title>
        <Button type="primary" style={{ marginBottom: '16px' }}>
          Add Food
        </Button>
      </Flex>

      <Table 
        dataSource={foods} 
        columns={columns} 
        pagination={false} 
        scroll={{ x: 'max-content' }}
        rowKey="food_id"
      />

      <Flex justify='center'>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={total}
          onChange={(page) => setPage(page)}
          style={{ marginTop: '16px', textAlign: 'right' }}
        />
      </Flex>
    </div>
  );
};

export default FoodManagement;