"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, googleProvider, firestore } from '../firebase';
import { Form, Input, Button, Card, Typography, Alert, Tabs } from 'antd';
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { createCompany } from '../collection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const { Title } = Typography;
const { TabPane } = Tabs;

function getRandomColor() {
  return 'rgb(96, 165, 250)';
}

function Login() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [error, setError] = useState(null);
  const [gradientColor1, setGradientColor1] = useState(getRandomColor());
  const [gradientColor2, setGradientColor2] = useState(getRandomColor());
  const [showSignUpForm, setShowSignUpForm] = useState(false); // State to toggle sign up form visibility

  useEffect(() => {
    if (user) {
      router.push('/admin');
    }
  }, [user]);

  const { register , logIn} = useAuth();


  const handleLoginWithEmailPassword = async (values) => {
    try {
      await signInWithEmailAndPassword(auth,values.email, values.password);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignUp = async (values) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth,values.email, values.password);
      await createCompany(user.uid, values.companyName,values.email,values.image);
    } catch (error) {
      setError(error.message);
    }
  };

 
  const handleTabChange = (key) => {
    if (key === 'google') {
      setShowSignUpForm(true);
    } else {
      setShowSignUpForm(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, ${"white"}, ${gradientColor2})`,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card style={{ width: 400 }}>
        <Title level={2}>Login</Title>
        {error && <Alert message={error} type="error" showIcon closable />}
        <Tabs defaultActiveKey="email" centered onChange={handleTabChange}>
          <TabPane tab={<span><MailOutlined /> Email/Password</span>} key="email">
            <Form
              name="login"
              onFinish={handleLoginWithEmailPassword}
              initialValues={{ remember: true }}
              layout="vertical"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>


              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button className='w-full' htmlType="submit" >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab={<span><MailOutlined className='mr-2' />Register</span>} key="google">
           
          </TabPane>
        </Tabs>
        {showSignUpForm && (
          <>
            <Title level={4} style={{ marginTop: '2rem' }}>Sign Up</Title>
            <Form
              name="signup"
              onFinish={handleSignUp}
              layout="vertical"
            >
              <Form.Item
                label="Company Name"
                name="companyName"
                rules={[{ required: true, message: 'Please enter company name' }]}
              >
                <Input placeholder="Company Name" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item
                label="image"
                name="image"
                rules={[
                  { required: true, message: 'Please input your image!' },
                  { type: 'image', message: 'Please enter a valid image!' },
                ]}
              >
                <Input placeholder="image" />
              </Form.Item>
              <Form.Item>
                <Button className='w-full' htmlType="submit" type="primary">
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Card>
    </div>
  );
}

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;

