import { getCompany, updateCompany, deleteCompany } from '@/app/collection'; // Assuming you have functions for CRUD operations
import { useAuth } from '@/app/context/AuthContext';
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Spin, message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';

const { confirm } = Modal;

const ProfileComponent = () => {
  const { user, logOut } = useAuth();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true);
      const companyData = await getCompany(user.uid);
      setCompany(companyData);
      setLoading(false);
      form.setFieldsValue(companyData); // Set form values with fetched company data
    };

    fetchCompany();
  }, [user, form]);

  const handleUpdate = async (values) => {
    try {
      await updateCompany(user.uid, values); // Assuming updateCompany function takes user UID and updated values
      message.success('Company details updated successfully');
    } catch (error) {
      console.error('Error updating company details:', error);
      message.error('Failed to update company details');
    }
  };

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete this company?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete();
      },
      onCancel() {
        console.log('Delete cancelled');
      },
    });
  };

  const handleDelete = async () => {
    try {
      await deleteCompany(user.uid); // Assuming deleteCompany function takes user UID
      message.success('Company deleted successfully');
    } catch (error) {
      console.error('Error deleting company:', error);
      message.error('Failed to delete company');
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <h1>Company Profile</h1>
      <Form
        form={form}
        onFinish={handleUpdate}
        layout="vertical"
        initialValues={company}
      >
        <Form.Item
          name="name"
          label="Company Name"
          rules={[{ required: true, message: 'Please enter company name' }]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          name="image"
          label="Image"
          rules={[{ required: true, message: 'Please enter image URL' }]}
        >
                <img src={company && company.image} alt="Company Logo" height={200} width={200} />
        </Form.Item>

        <Form.Item
          name="companyName"
          label="Company Gmail"
          rules={[{ required: true, message: 'Please enter name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
          <Button type="danger" onClick={showDeleteConfirm}>
            Delete
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileComponent;
