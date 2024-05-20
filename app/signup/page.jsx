'use client'

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase';
import { signUpAndCreateCompany } from '@/firebase/firebaseFUnc';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [companyName, setCompanyName] = useState('');

  const handleSignUp = async () => {
    try {
      await signUpAndCreateCompany(email, password, companyName);
      // Redirect user or show success message
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Kayıt Ol</h2>
      {error && <p>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text" // Change type to "text"
        placeholder="CompanyName"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <button onClick={handleSignUp}>Kayıt Ol</button>
    </div>
  );
};

export default SignUp;
