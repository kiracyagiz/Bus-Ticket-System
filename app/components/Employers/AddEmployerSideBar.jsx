'use client';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { Drawer, Form, Input, Button, DatePicker, Typography } from 'antd';
import { ToastContainer, toast } from 'react-toastify';

const { Title } = Typography;

const AddEmployerSideBar = ({ isOpen, setIsOpen }) => {
  const [hireDate, setHireDate] = useState(null);
  const [salary, setSalary] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState(""); 

  const { user } = useAuth();

  const handleHireDateChange = (date) => {
    if (date) {
      const formattedDate = date.format('YYYY-MM-DD');
      setHireDate(formattedDate);
    } else {
      setHireDate(null);
    }
  };

  const handleSalaryChange = (e) => {
    setSalary(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleAddEmployee = async () => {

    if (!hireDate) {
      toast.error('Please fill in the Hire Date.');
      return;
    }
    if (!salary) {
      toast.error('Please fill in the Salary.');
      return;
    }
    if (!firstName) {
      toast.error('Please fill in the First Name.');
      return;
    }
    if (!lastName) {
      toast.error('Please fill in the Last Name.');
      return;
    }
  
    try {
      const employeeId = uuidv4();
      await addDoc(collection(db, 'employee'), {
        employeeId: employeeId, 
        hireDate: hireDate,
        salary: salary,
        firstName: firstName,
        lastName: lastName,
        companyId: user.uid
      });
      console.log("Employee added with ID: ", employeeId);
      toast.success('New employee added successfully');

      setHireDate("");
      setSalary("");
      setFirstName("");
      setLastName("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding employee: ", error);
    }
  };

  return (
   <>
   <ToastContainer/>
    <Drawer
      title="Add New Employee"
      placement="right"
      closable={true}
      onClose={() => setIsOpen(false)}
      open={isOpen}
      width={400}
    >
      <Form layout="vertical" onFinish={handleAddEmployee}>
        <Form.Item label="Hire Date" required>
          <DatePicker 
            onChange={handleHireDateChange} 
            style={{ width: '100%' }} 
          />
        </Form.Item>
        <Form.Item label="Salary" required>
          <Input 
            type="number" 
            value={salary}
            onChange={handleSalaryChange}
            style={{ width: '100%' }} 
            placeholder='5000'
          />
        </Form.Item>
        <Form.Item label="First Name" required>
          <Input 
            value={firstName}
            onChange={handleFirstNameChange}
            style={{ width: '100%' }} 
            placeholder='Yagiz'
          />
        </Form.Item>
        <Form.Item label="Last Name" required>
          <Input 
            value={lastName}
            onChange={handleLastNameChange}
            style={{ width: '100%' }}
            placeholder='Kirac'
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" style={{ width: '100%' }}>
            Add Employee
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
    </>
  );
};

export default AddEmployerSideBar;
