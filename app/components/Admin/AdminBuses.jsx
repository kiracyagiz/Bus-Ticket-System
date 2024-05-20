"use client"

import React, { useEffect, useState } from 'react';
import { FaCheckSquare } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';
import { getBusData } from '@/app/collection';
import ExcelJS from 'exceljs';
import saveAs from 'file-saver';
import Sidebar from '../Sidebar';

const AdminBuses = () => {
  const [busData, setBusData] = useState();
  const [selectedBus, setSelectedBus] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = (dt) => {
    setIsOpen(!isOpen);
    setSelectedBus(dt);
  };

  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Bus Data');

    // Add headers
    worksheet.addRow(['Bus Id', 'Employee Id', 'Number Plate', 'Status']);

    // Add data
    busData.forEach((dt) => {
      worksheet.addRow([dt.busesId, dt.employeeId, dt.numberPlate, dt.status]);
    });

    // Save the workbook
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer]), 'bus_data.xlsx');
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const busesData = await getBusData();
        setBusData(busesData);
      } catch (error) {
        console.error('Error fetching buses data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex gap-x-8 py-8'>
      <button onClick={exportToExcel}>Export to Excel</button>
      <table className='text-left lg:min-w-4/5 bg-white text-sm font-light border-collapse border-2 border-slate-400'>
        <thead className='border-b font-medium dark:border-neutral-500 text-center'>
          <tr>
            <th className='px-6 py-4'>Bus Id</th>
            <th className='px-6 py-4'>Employee Id</th>
            <th className='px-6 py-4'>Number Plate</th>
            <th className='px-6 py-4'>Status</th>
          </tr>
        </thead>
        <tbody>
          {busData &&
            busData.map((dt, i) => (
              <tr
                className='border-b dark:border-neutral-500 text-center'
                key={i}
                onClick={() => toggleSidebar(dt)}
              >
                <th className='whitespace-nowrap px-6 py-4'>{dt.busesId}</th>
                <th className='whitespace-nowrap px-6 py-4'>{dt.employeeId}</th>
                <th className='whitespace-nowrap px-6 py-4'>{dt.numberPlate}</th>
                <th className='whitespace-nowrap px-6 py-4'>
                  {dt.status === 'active' ? (
                    <FaCheckSquare size={30} color='green' />
                  ) : (
                    <ImCancelCircle size={30} color='red' />
                  )}
                </th>
              </tr>
            ))}
        </tbody>
      </table>
      <Sidebar fourthData={selectedBus} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default AdminBuses;
