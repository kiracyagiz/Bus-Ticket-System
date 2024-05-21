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

  const handleRandomTickets = async () => {
    const startDate = new Date(); // Start from today
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 90); // End after 90 days

    const ticketPromises = [];

    // Loop through each day
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const formattedDate = date.toISOString().slice(0, 10); // Format date as YYYY-MM-DD
      const ticketsForDay = generateRandomTickets(formattedDate);
      
      // Add each ticket for the day
      ticketsForDay.forEach(ticketData => {
        ticketPromises.push(addTicket(ticketData));
      });
    }

    try {
      await Promise.all(ticketPromises);
      toast.success("Random tickets added successfully for 90 days.");
    } catch (error) {
      console.error("Error adding random tickets:", error);
      toast.error("Error adding random tickets.");
    }
  };

  const generateRandomTickets = (date) => {
    const departureCities = ["Tirana", "Durres"];
    const arrivalCities = ["Tirana", "Durres"];
    const departureTimes = ["09:00", "13:00", "15:00", "18:00"];
    const arrivalTimes = ["09:10", "10:10", "14:10", "16:10", "19:10"];
    const prices = ["500 Leke", "550 Leke"];

    const tickets = [];

    for (let i = 0; i < 5; i++) {
      const departureCity = departureCities[Math.floor(Math.random() * departureCities.length)];
      const arrivalCity = arrivalCities[Math.floor(Math.random() * arrivalCities.length)];
      const departureTime = departureTimes[Math.floor(Math.random() * departureTimes.length)];
      const arrivalTime = arrivalTimes[Math.floor(Math.random() * arrivalTimes.length)];
      const price = prices[Math.floor(Math.random() * prices.length)];

      const ticketData = {
        route: `${departureCity}-${arrivalCity}`,
        departureCity: departureCity,
        departureTime: departureTime,
        arrivalCity: arrivalCity,
        arrivalTime: arrivalTime,
        price: price,
        rideDate: date,
        seats: seats,
        companyId: user.uid,
      };

      tickets.push(ticketData);
    }

    return tickets;
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
            {/* Other input fields */}
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              onClick={handleSubmit}
            >
              Add Ticket
            </button>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
              onClick={handleRandomTickets}
            >
              Add Random Tickets
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTableComponent;
