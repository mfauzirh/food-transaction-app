import { useEffect, useState } from 'react';
import { Table, Typography, Button, Pagination, Flex } from 'antd';
import { fetchFoods, fetchFoodById, createFood, updateFood, deleteFood } from '../services/foodService';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import FoodDetailModal from '../components/food/FoodDetailModal';
import FoodDeleteModal from '../components/food/FoodDeleteModal';
import FoodModal from '../components/food/FoodModal';

const { Title } = Typography;

const FoodManagement = () => {
  const [foods, setFoods] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [foodModal, setFoodModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `Rp${price.toLocaleString()}`,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div>
          <Button type="link" icon={<EyeOutlined />} onClick={() => openDetailModal(record)} />
          <Button type="link" icon={<EditOutlined />} style={{ color: 'orange' }} onClick={() => openEditModal(record)} />
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => openDeleteModal(record)} />
        </div>
      ),
    },
  ];

  const handleAddFood = async (values) => {
    try {
      await createFood(values);
      setFoodModal(false);
      await fetchFoodData();
    } catch (error) {
      console.error("Failed to create food:", error);
    }
  };

  const handleEditFood = async (values) => {
    try {
      const foodId = selectedFood.id;
      await updateFood(foodId, values);
      setFoodModal(false);
      await fetchFoodData();
    } catch (error) {
      console.error("Failed to update food:", error);
    }
  };

  const handleSubmit = (values) => {
    if (isEdit) {
      handleEditFood(values);
    } else {
      handleAddFood(values);
    }
  };

  const openAddModal = () => {
    setIsEdit(false);
    setSelectedFood(null);
    setFoodModal(true);
  };

  const openEditModal = async (food) => {
    setIsEdit(true);
    setFoodModal(true);
    try {
      const foodData = await fetchFoodById(food.id);
      setSelectedFood(foodData.data);
    } catch (error) {
      console.error("Failed to fetch food data for edit:", error);
    }
  };

  const handleModalClose = () => {
    setFoodModal(false);
    setSelectedFood(null);
  };

  const openDetailModal = (food) => {
    setSelectedFood(food);
    setDetailModalVisible(true);
  };

  const closeDetailModal = () => {
    setDetailModalVisible(false);
    setSelectedFood(null);
  };

  const openDeleteModal = (food) => {
    setSelectedFood(food);
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setSelectedFood(null);
  };

  const handleDelete = async () => {
    try {
      const foodId = selectedFood.id;
      await deleteFood(foodId);
      closeDeleteModal();
      await fetchFoodData();
    } catch (error) {
      console.error("Failed to delete food:", error);
    }
  };

  return (
    <div>
      <Flex gap="middle" align='end'>
        <Title level={2} style={{ marginBottom: '16px' }}>
          Food Management
        </Title>
        <Button type="primary" style={{ marginBottom: '16px' }} onClick={openAddModal}>
          Add Food
        </Button>
      </Flex>

      <Table 
        dataSource={foods} 
        columns={columns} 
        pagination={false} 
        scroll={{ x: 'max-content' }}
        rowKey="id"
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

      <FoodModal
        open={foodModal}
        onSubmit={handleSubmit}
        onCancel={handleModalClose}
        initialValues={selectedFood}
        isEdit={isEdit}
      />

      <FoodDetailModal
        open={detailModalVisible}
        onCancel={closeDetailModal}
        foodDetails={selectedFood}
      />

      <FoodDeleteModal
        open={deleteModalVisible}
        onCancel={closeDeleteModal}
        onDelete={handleDelete}
        foodName={selectedFood ? selectedFood.name : ''}
      />
    </div>
  );
};

export default FoodManagement;