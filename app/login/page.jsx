"use client";

import React, { useEffect, useState } from 'react';
import { AuthContextProvider, useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function Login() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/admin');
    }
    
    
  }, []);

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const { logIn } = useAuth();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      await logIn(data.email, data.password);
      router.push('/admin');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="email"
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <button onClick={loginHandler}>LOGIN</button>
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
