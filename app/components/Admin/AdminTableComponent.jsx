import { addTicket } from "@/app/collection";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
const AdminTableComponent = () => {
  const [selectDate, setSelectedDate] = useState();
  const [departureCity,setDepartureCity] = useState();
  const[departureTime,setDepartureTime] = useState();
  const [arrivalCity,setArrivalCity] = useState();
  const [arrivalTime,setArrivalTime] = useState();
  const [price,setPrice] = useState();
  const router = useRouter();
  const newTicketData = {
    route: departureCity + "-" + arrivalCity,
    departureCity: departureCity,
    departureTime: departureTime,
    arrivalTime: arrivalTime,
    arrivalCity: arrivalCity,
    price: price,
    rideDate: selectDate
  }



    const fetchData = async (newItem) => {
      try {
        await addTicket(newItem);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };



  
  return (
    <div className="flex  flex-col justify-center ">
      <input
        type="date"
        className="p-4"
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <select
        class="bg-gray-50 border my-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => setDepartureCity(e.target.value)}
      >
        <option selected>Departure City</option>
        <option >Tirana </option>
        <option >Durres</option>
      </select>

      <select
        class="bg-gray-50 border my-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onClick={(e)=> setDepartureTime(e.target.value)}
      >
        <option selected>Departure Time</option>
        <option>09:00 </option>
        <option>09:00 </option>
        <option >13:00</option>
        <option >15:00</option>
        <option >18:00</option>

      </select>

      <select
        class="bg-gray-50 border my-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      
      onClick={(e) => setArrivalCity(e.target.value)}
      >
        <option selected>Arrival City</option>
        <option >Tirana </option>
        <option >Durres</option>
      </select>

      <select
        class="bg-gray-50 border my-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      
       onClick={(e) => setArrivalTime(e.target.value)}
      >
        <option selected>Arrival Time</option>
        <option>09:10 </option>
        <option >10:10</option>
        <option >14:10</option>
        <option >16:10</option>
        <option >19:10</option>
      </select> 

      <select
        class="bg-gray-50 border my-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      
      
       onClick={(e) => setPrice(e.target.value)}
      >
        <option selected>Price</option>
        <option>500 Leke</option>
        <option >550 Leke</option>

      </select>
      <button className="bg-blue-400 p-4" onClick={() => fetchData(newTicketData)}>SEND THE DATAAA</button>
    </div>
  );
};

export default AdminTableComponent;
