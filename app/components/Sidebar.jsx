"use client";

import React, { useEffect, useState } from "react";
import { TbArmchair } from "react-icons/tb";
import { deleteTicketFirebase, updateTicketFireBase } from "../collection";
import { useRouter } from "next/navigation";

const Sidebar = ({ isOpen, setIsOpen, dt, secondDt, thirdData,fourthData }) => {

  const route = useRouter();


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  const updateTicket = async (ticketId) => {
    try {
      await updateTicketFireBase(ticketId,formData);
      console.log('Data updated successfully');
     
      setIsOpen(!isOpen)

    } catch (error) {
      console.error('Error updating data:', error);

    }
  };

  const deleteTicket = async (ticketId) => {
    try {
      await deleteTicketFirebase(ticketId,formData);
      console.log('Data deleted successfully');
      setIsOpen(!isOpen)

    } catch (error) {
      console.error('Deleted data:', error);

    }
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
    secondDt && setFormData({
      route: secondDt.route,
      departureCity: secondDt.departureCity,
      departureTime: secondDt.departureTime,
      arrivalTime: secondDt.arrivalTime,
      arrivalCity: secondDt.arrivalCity,
      price: secondDt.price,
      rideDate: secondDt.rideDate,
      id: secondDt.id,
    });
  }, [secondDt]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div
      className={`fixed top-0 right-0  h-full bg-slate-600 text-white p-4 transition-transform transform ${
        isOpen ? " lg:w-1/3" : "translate-x-full"
      }`}
    >
      {dt && (
        <div>
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
          >
            {isOpen ? "Close Sidebar" : "Open Sidebar"}
          </button>
          <div className="flex mt-4 justify-center gap-x-28">
            <ul className="flex flex-col mr-2">
              {seats.slice(0, 10).map((item, i) => (
                <li
                  key={i}
                  className="mb-2 p-2 flex items-center justify-center  w-20 h-14 border-white border-2 text-white"
                >
                  <TbArmchair
                    color={
                      item === "man"
                        ? "blue"
                        : item === "woman"
                        ? "red"
                        : "white"
                    }
                    size={30}
                  />
                </li>
              ))}
            </ul>
            <ul className="flex flex-col">
              {seats.slice(10, 20).map((item, i) => (
                <li
                  key={i}
                  className="mb-2 p-2 flex items-center justify-center  w-20 h-14 border-white border-2 text-white"
                >
                  <TbArmchair
                    color={
                      item === "man"
                        ? "blue"
                        : item === "woman"
                        ? "red"
                        : "white"
                    }
                    size={30}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {secondDt && (
        <div className="flex flex-col ">
          <button onClick={toggleSidebar} className="mb-4">
            Close Window
          </button>
          <label className="mb-2">Route</label>
          <input
            type="text"
            name="route"
            value={formData.route}
            onChange={handleChange}
            className="text-black p-2"
          />

          <label className="my-2">Departure City</label>
          <input
            type="text"
            name="departureCity"
            value={formData.departureCity}
            onChange={handleChange}
            className="text-black p-2"
          />
          <label className="my-2">Departure Time</label>
          <input
            type="text"
            name="departureTime"
            value={formData.departureTime}
            className="text-black p-2"
            onChange={handleChange}
          />
          <label className="my-2">Arrival Time</label>
          <input
            type="text"
            name="arrivalTime"
            value={formData.arrivalTime}
            className="text-black p-2"
            onChange={handleChange}
          />
          <label className="my-2">Arrival City</label>
          <input
            type="text"
            name="arrivalCity"
            value={formData.arrivalCity}
            className="text-black p-2"
            onChange={handleChange}
          />
          <label className="my-2">Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            className="text-black p-2"
            onChange={handleChange}
          />
          <label className="my-2">Date</label>
          <input
            type="text"
            name="rideDate"
            value={formData.rideDate}
            className="text-black p-2"
            onChange={handleChange}
          />
          <label className="my-2">ID</label>
          <input type="text" value={secondDt.id} className="text-black p-2" />
          <div className="flex justify-center gap-x-8">
            
          <button className="p-3 px-16 bg-green-400 mt-1" onClick={()=> updateTicket(formData.id)}>UPDATE</button>
          
          <button className="p-3 px-16 bg-red-800 mt-1" onClick={() => deleteTicket(formData.id)}>DELETE</button>
          </div>
        </div>
      )}
      {thirdData && (
        <div className="flex flex-col ">
          <button onClick={toggleSidebar} className="mb-4">
            Close Window
          </button>
          <label className="mb-2">Employee ID</label>
          <input
            type="text"
            placeholder={thirdData.employeeId}
            className="text-black p-2"
          />
          <label className="my-2">Hire Date</label>
          <input
            type="text"
            placeholder={thirdData.hireDate}
            className="text-black p-2"
          />
          <label className="my-2">Salary</label>
          <input
            type="text"
            placeholder={thirdData.salary}
            className="text-black p-2"
          />
        </div>
      )}

      {fourthData && (
        <div className="flex flex-col ">
          <button onClick={toggleSidebar} className="mb-4">
            Close Window
          </button>
          <label className="mb-2">Bus ID</label>
          <input
            type="text"
            placeholder={fourthData.busesId}
            className="text-black p-2"
          />
          <label className="my-2">Employee Id</label>
          <input
            type="text"
            placeholder={fourthData.employeeId}
            className="text-black p-2"
          />
          <label className="my-2">Number Plate</label>
          <input
            type="text"
            placeholder={fourthData.numberPlate}
            className="text-black p-2"
          />
            <label className="my-2">Status</label>
          <input
            type="text"
            placeholder={fourthData.status}
            className="text-black p-2"
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
