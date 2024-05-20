import { addTicket } from "@/app/collection";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminTableComponent = () => {
  const [selectDate, setSelectedDate] = useState("");
  const [departureCity, setDepartureCity] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  const { user } = useAuth();

  const seats = [
    "Male",
    "Female",
    "Male",
    "Male",
    " ",
    "Female",
    "Male",
    " ",
    "Female",
    " ",
    " ",
    "Male",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    "",
  ];

  const newTicketData = {
    route: departureCity + "-" + arrivalCity,
    departureCity: departureCity,
    departureTime: departureTime,
    arrivalTime: arrivalTime,
    arrivalCity: arrivalCity,
    price: price,
    rideDate: selectDate,
    seats: seats,
    companyId: user.uid,
  };

  const handleSubmit = async () => {
    if (!selectDate || !departureCity || !departureTime || !arrivalCity || !arrivalTime || !price) {
      let errorMessage = "Please fill in the following field(s): ";
      if (!selectDate) errorMessage += "Select Date, ";
      if (!departureCity) errorMessage += "Departure City, ";
      if (!departureTime) errorMessage += "Departure Time, ";
      if (!arrivalCity) errorMessage += "Arrival City, ";
      if (!arrivalTime) errorMessage += "Arrival Time, ";
      if (!price) errorMessage += "Price, ";
      errorMessage = errorMessage.slice(0, -2); // Remove the last comma and space
      toast.error(errorMessage); 
      return;
    }

    try {
      await addTicket(newTicketData);
      toast.success('New ticket added successfully');
      setSelectedDate("");
      setDepartureCity("");
      setDepartureTime("");
      setArrivalCity("");
      setArrivalTime("");
      setPrice("");
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen w-screen flex mx-auto justify-center items-center bg-gray-100">
        <div className="p-8 w-3/4 bg-white rounded shadow-lg ">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Add New Ticket
          </h2>
          <div className="space-y-4 flex flex-col gap-8">
            <input
              type="date"
              value={selectDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              placeholder="Select Date"
              className="input-field border rounded-md px-4 py-2 border-black appearance-none"
            />
            <select
              value={departureCity}
              onChange={(e) => setDepartureCity(e.target.value)}
              className="input-field border rounded-md px-4 py-2 border-black appearance-none"
            >
              <option value="">Departure City</option>
              <option value="Tirana">Tirana</option>
              <option value="Durres">Durres</option>
            </select>
            <select
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              className="input-field border rounded-md px-4 py-2 border-black appearance-none"
            >
              <option value="">Departure Time</option>
              <option value="09:00">09:00</option>
              <option value="13:00">13:00</option>
              <option value="15:00">15:00</option>
              <option value="18:00">18:00</option>
            </select>
            <select
              value={arrivalCity}
              onChange={(e) => setArrivalCity(e.target.value)}
              className="input-field border rounded-md px-4 py-2 border-black appearance-none"
            >
              <option value="">Arrival City</option>
              <option value="Tirana">Tirana</option>
              <option value="Durres">Durres</option>
            </select>
            <select
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
              className="input-field border rounded-md px-4 py-2 border-black appearance-none"
            >
              <option value="">Arrival Time</option>
              <option value="09:10">09:10</option>
              <option value="10:10">10:10</option>
              <option value="14:10">14:10</option>
              <option value="16:10">16:10</option>
              <option value="19:10">19:10</option>
            </select>
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input-field border rounded-md px-4 py-2 border-black appearance-none"
            >
              <option value="">Price</option>
              <option value="500 Leke">500 Leke</option>
              <option value="550 Leke">550 Leke</option>
            </select>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              onClick={handleSubmit}
            >
              Add Ticket
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTableComponent;
