"use client"

import React, { useEffect, useState } from 'react';
import { FaCheckSquare } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';
import { deletBuses, getBusData} from '@/app/collection';
import { Table, Button, Drawer, Input } from 'antd';
import { deleteDoc, updateDoc } from 'firebase/firestore';

const AdminBuses = () => {
  const [busData, setBusData] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleDrawer = (dt) => {
    setIsOpen(!isOpen);
    setSelectedBus(dt);
  };

  const handleSaveChanges = async () => {
    try {
      await updateDoc('buses', selectedBus.id, selectedBus);
      setIsOpen(false);
    } catch (error) {
      console.error('Error updating bus data:', error);
    }
  };
 
  

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
        visible={isOpen}
        width={400}
      >
        {selectedBus && (
          <div>
            <p>Bus Id: {selectedBus.busesId}</p>
            <Input
              value={selectedBus.employeeId}
              onChange={(e) =>
                setSelectedBus({ ...selectedBus, employeeId: e.target.value })
              }
            />
            <Input
              value={selectedBus.numberPlate}
              onChange={(e) =>
                setSelectedBus({ ...selectedBus, numberPlate: e.target.value })
              }
            />
            <Button onClick={handleSaveChanges}>Save Changes</Button>
            <Button onClick={()=> deletBuses(selectedBus.id)}>Delete Bus</Button>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default AdminBuses;
