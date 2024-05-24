'use client'

import React, { useEffect, useState } from 'react';
import { FaCheckSquare } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';
import { getBusData } from '@/app/collection';
import ExcelJS from 'exceljs';
import saveAs from 'file-saver';
import { Table, Button, Space, Drawer } from 'antd';

const AdminBuses = () => {
  const [busData, setBusData] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (dt) => {
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

  const columns = [
    {
      title: 'Bus Id',
      dataIndex: 'busesId',
      key: 'busesId',
    },
    {
      title: 'Employee Id',
      dataIndex: 'employeeId',
      key: 'employeeId',
    },
    {
      title: 'Number Plate',
      dataIndex: 'numberPlate',
      key: 'numberPlate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) =>
        status === 'active' ? (
          <FaCheckSquare size={20} color="green" />
        ) : (
          <ImCancelCircle size={20} color="red" />
        ),
    },
  ];

  return (
    <div className="flex flex-col gap-y-4 py-8">
      <div className="flex justify-start mb-4">
        <Button type="primary" onClick={exportToExcel}>
          Export to Excel
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={busData}
        rowKey={(record) => record.busesId}
        onRow={(record) => ({
          onClick: () => toggleDrawer(record),
        })}
        pagination={{ pageSize: 10 }}
        style={{ minWidth: '80%' }}
      />
      <Drawer
        title="Bus Details"
        placement="right"
        onClose={() => setIsOpen(false)}
        open={isOpen}
        width={400}
      >
        <p>Bus Id: {selectedBus?.busesId}</p>
        <p>Employee Id: {selectedBus?.employeeId}</p>
        <p>Number Plate: {selectedBus?.numberPlate}</p>
        <p>Status: {selectedBus?.status}</p>
      </Drawer>
    </div>
  );
};

export default AdminBuses;
