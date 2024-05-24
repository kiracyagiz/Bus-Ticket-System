"use client"

import React, { useEffect, useState } from 'react';
import { AuthContextProvider, useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, googleProvider } from '../firebase';
import { Form, Input, Button, Card, Typography, Alert, Space, Tabs } from 'antd';
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';

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

  useEffect(() => {
    if (user) {
      router.push('/admin');
    }
  }, [user]);

  const { logIn } = useAuth();

  const loginWithEmailPassword = async (values) => {
    try {
      await logIn(values.email, values.password);
      router.push('/admin');
    } catch (error) {
      setError(error.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
      router.push('/admin');
    } catch (error) {
      setError(error.message);
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
        <Tabs defaultActiveKey="email" centered>
          <TabPane tab={<span><MailOutlined /> Email/Password</span>} key="email">
            <Form
              name="login"
              onFinish={loginWithEmailPassword}
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
          <TabPane tab={<span><GoogleOutlined /> Google</span>} key="google">
            <Button className='w-full' icon={<GoogleOutlined />} >
              Login with Google
            </Button>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}

const LoginPage = () => {
  return (
    <AuthContextProvider>
      <Login />
    </AuthContextProvider>
  );
};

export default LoginPage;
