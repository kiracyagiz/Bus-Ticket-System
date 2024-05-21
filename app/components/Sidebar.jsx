"use client"

import React, { useEffect, useState } from "react";
import { TbArmchair } from "react-icons/tb";
import { deleteEmployeeFirebase, deleteTicketFirebase, updateTicketFireBase } from "../collection";
import { useRouter } from "next/navigation";
import { Button, Input, Modal, Select } from "antd";

const { Option } = Select;

const Sidebar = ({ isOpen, setIsOpen, dt, secondDt, thirdData, fourthData, setTriggered, triggered, setSelectedSeat, selectedSeat }) => {
  const route = useRouter();

  const handleSeatClick = (seatId) => {
    if (dt[0].seats[seatId] !== 'Male' && dt[0].seats[seatId] !== 'Female') {
      setSelectedSeat(seatId);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [formData, setFormData] = useState({
    route: "",
    departureCity: "",
    departureTime: "",
    arrivalTime: "",
    arrivalCity: "",
    price: "",
    rideDate: "",
    id: "",
  });

  const [seats, setSeats] = useState([]);

  useEffect(() => {
    if (dt) {
      dt.map((i) => {
        setSeats(i.seats);
      });
    }
  }, [dt]);

  useEffect(() => {
    if (secondDt) {
      setFormData({
        route: secondDt.route,
        departureCity: secondDt.departureCity,
        departureTime: secondDt.departureTime,
        arrivalTime: secondDt.arrivalTime,
        arrivalCity: secondDt.arrivalCity,
        price: secondDt.price,
        rideDate: secondDt.rideDate,
        id: secondDt.id,
      });
    }
  }, [secondDt]);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateTicket = async () => {
    try {
      await updateTicketFireBase(formData.id, formData);
      console.log('Data updated successfully');
      setIsOpen(!isOpen);
      setTriggered(!triggered);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const deleteTicket = async () => {
    try {
      await deleteTicketFirebase(formData.id, formData);
      console.log('Data deleted successfully');
      setIsOpen(!isOpen);
      setTriggered(!triggered);
    } catch (error) {
      console.error('Deleted data:', error);
    }
  };

  const deleteEmployee = async (employeeId) => {
    try {
      await deleteEmployeeFirebase(employeeId);
      console.log('Data deleted successfully');
      setIsOpen(!isOpen);
      setTriggered(!triggered);
    } catch (error) {
      console.error('Deleted data:', error);
    }
  };

  return (
    <Modal
      title={isOpen ? "Close Sidebar" : "Open Sidebar"}
      visible={isOpen}
      onCancel={toggleSidebar}
      footer={null}
      width={400}
    >
      {dt && (
        <div>
          <div className="flex mt-4 justify-center gap-x-28">
            <div className="flex flex-col mr-2">
              {seats.slice(0, 10).map((item, i) => (
                <Button
                  key={i}
                  className={`mb-2 w-20 h-14 ${
                    selectedSeat === i ? 'bg-blue-500' : ''
                  }`}
                  onClick={() => handleSeatClick(i)}
                >
                  <TbArmchair
                    color={
                      item === "Male"
                        ? "blue"
                        : item === "Female"
                          ? "red"
                          : "white"
                    }
                    size={30}
                  />
                </Button>
              ))}
            </div>
            <div className="flex flex-col">
              {seats.slice(10, 20).map((item, i) => (
                <Button
                  key={i}
                  className={`mb-2 w-20 h-14 ${
                    selectedSeat === i + 10 ? 'bg-blue-500' : ''
                  }`}
                  onClick={() => handleSeatClick(i + 10)}
                >
                  <TbArmchair
                    color={
                      item === "Male"
                        ? "blue"
                        : item === "Female"
                          ? "red"
                          : "white"
                    }
                    size={30}
                  />
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
      {secondDt && (
        <div className="flex flex-col ">
          <label className="mb-2">Route</label>
          <Input
            name="route"
            value={formData.route}
            onChange={(e) => handleChange('route', e.target.value)}
            className="mb-2"
          />
          <label className="my-2">Departure City</label>
          <Input
            name="departureCity"
            value={formData.departureCity}
            onChange={(e) => handleChange('departureCity', e.target.value)}
            className="mb-2"
          />
          <label className="my-2">Departure Time</label>
          <Input
            name="departureTime"
            value={formData.departureTime}
            onChange={(e) => handleChange('departureTime', e.target.value)}
            className="mb-2"
          />
          <label className="my-2">Arrival Time</label>
          <Input
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={(e) => handleChange('arrivalTime', e.target.value)}
            className="mb-2"
          />
          <label className="my-2">Arrival City</label>
          <Input
            name="arrivalCity"
            value={formData.arrivalCity}
            onChange={(e) => handleChange('arrivalCity', e.target.value)}
            className="mb-2"
          />
          <label className="my-2">Price</label>
          <Input
            name="price"
            value={formData.price}
            onChange={(e) => handleChange('price', e.target.value)}
            className="mb-2"
          />
          <label className="my-2">Date</label>
          <Input
            name="rideDate"
            value={formData.rideDate}
            onChange={(e) => handleChange('rideDate', e.target.value)}
            className="mb-2"
          />
          <div className="flex justify-center gap-x-8">
            <Button type="primary" onClick={updateTicket}>UPDATE</Button>
            <Button type="danger" onClick={deleteTicket}>DELETE</Button>
          </div>
        </div>
      )}
      {thirdData && (
        <div className="flex flex-col ">
          <label className="mb-2">First Name</label>
          <Input
            value={thirdData.firstName}
            disabled
            className="mb-2"
          />
          <label className="my-2">Hire Date</label>
          <Input
            value={thirdData.hireDate}
            disabled
            className="mb-2"
          />
          <label className="my-2">Salary</label>
          <Input
            value={thirdData.salary}
            disabled
            className="mb-2"
          />
          <div className="flex justify-center gap-x-8">
            <Button type="danger" onClick={() => deleteEmployee(thirdData.employeeId)}>DELETE</Button>
          </div>
        </div>
      )}
      {fourthData && (
        <div className="flex flex-col ">
          <label className="mb-2">Bus ID</label>
          <Input
            value={fourthData.busesId}
            disabled
            className="mb-2"
          />
          <label className="my-2">Employee Id</label>
          <Input
            value={fourthData.employeeId}
            disabled
            className="mb-2"
          />
          <label className="my-2">Number Plate</label>
          <Input
            value={fourthData.numberPlate}
            disabled
            className="mb-2"
          />
          <label className="my-2">Status</label>
          <Input
            value={fourthData.status}
            disabled
            className="mb-2"
          />
        </div>
      )}
    </Modal>
  );
};

export default Sidebar;
