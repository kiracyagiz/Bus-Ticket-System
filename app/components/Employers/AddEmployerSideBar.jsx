'use client'

import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library

const AddEmployerSideBar = ({ isOpen, setIsOpen }) => {
  const [hireDate, setHireDate] = useState("");
  const [salary, setSalary] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState(""); 

  const { user } = useAuth();

  const handleHireDateChange = (e) => {
    // Convert the timestamp to a Date object
    const timestamp = e.target.value;
    const date = new Date(timestamp);
    // Format the date as "YYYY-MM-DD" for input type "date"
    const formattedDate = date.toISOString().split('T')[0];
    // Set the formatted date to the state
    setHireDate(formattedDate);
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
    try {
      // Generate a random UUID for employeeId
      const employeeId = uuidv4();
      
      // Add employee data to Firestore collection
      const docRef = await addDoc(collection(db, 'employee'), {
        employeeId: employeeId, 
        hireDate: hireDate,
        salary: salary,
        firstName: firstName,
        lastName: lastName,
        companyId: user.uid
      });
      console.log("Employee added with ID: ", docRef.id);

      // Clear input fields after adding employee
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
    <div
      className={`fixed top-0 right-0  h-full bg-slate-600 text-white p-4 transition-transform transform ${
        isOpen ? " lg:w-1/3" : "translate-x-full"
      }`}
    >
      <button onClick={() => setIsOpen(false)}>Close Window</button>
      <div className="mt-4">
        <label htmlFor="hireDate" className="block mb-2">
          Hire Date:
        </label>
        <input
          type="date"
          id="hireDate"
          value={hireDate}
          onChange={handleHireDateChange}
          className="border border-gray-400 px-2 py-1 rounded text-black"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="salary" className="block mb-2">
          Salary:
        </label>
        <input
          type="number"
          id="salary"
          value={salary}
          onChange={handleSalaryChange}
          className="border border-gray-400 px-2 py-1 rounded text-black" 
        />
      </div>
      <div className="mt-4">
        <label htmlFor="firstName" className="block mb-2">
          First Name:
        </label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
          className="border border-gray-400 px-2 py-1 rounded text-black"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="lastName" className="block mb-2">
          Last Name:
        </label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={handleLastNameChange}
          className="border  border-gray-400 px-2 py-1 rounded text-black"
        />
      </div>
      <button onClick={handleAddEmployee} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add Employee
      </button>
    </div>
  );
};

export default AddEmployerSideBar;

