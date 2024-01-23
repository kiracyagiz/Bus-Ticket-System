
import { getAllTickets, getFilteredData, getSelectedTicket } from "@/app/collection";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
const AdminTicketsComponent = ({searchParams}) => {

  
  
  
  const route = useRouter();

  const [tickets, setTickets] = useState([]);
  const [selectedTicket,setSelectedTicket] = useState([]);
  const [isOpen,setIsOpen] = useState(false)
  const [selectedCity,setSelectedCity] = useState('');
  const [selectedDate,setSelectedDate] = useState('');
  const [departureTime,setSelectedDepartureTime] = useState('')
  const [departureCity,setSelectedDepartureCity] = useState('')
  const [arrivalTime,setSelectedArrivalTime] = useState('');


  // dmin?componentName=allTickets&arrivalCity=Durres&rideDate=2023-12-25
  useEffect(() => {
     route.push(`/admin?componentName=allTickets&arrivalCity=${selectedCity}&rideDate=${selectedDate}&departureCity=${departureCity}&departureTime=${departureTime}&arrivalTime=${arrivalTime}
     `)
  }, [selectedCity,selectedDate,departureCity,departureTime,arrivalTime])
  
  const toggleSidebar = (dt) => {
    setIsOpen(!isOpen);
    setSelectedTicket(dt)
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketsData = await getFilteredData(searchParams);
        setTickets(ticketsData);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchData();
  }, [searchParams]);



  return (
    <div className="flex  gap-x-8 py-8 ">
    
      <table class="text-left lg:min-w-4/5 bg-white text-sm font-light border-collapse  border-2 border-slate-400">
      <thead class="border-b font-medium dark:border-neutral-500 text-center ">
        <tr >
          <th className="px-6 py-4 ">Route</th>
          <th className="px-6 py-4 ">Departure City</th>
          <th className="px-6 py-4 ">Departure Time</th>
          <th className="px-6 py-4 ">Arrival Time</th>
          <th className="px-6 py-4 ">Arrival City</th>
          <th className="px-6 py-4 ">Price</th>
          <th className="px-6 py-4 ">Date</th>
        </tr>
      </thead>
      <tbody>
        {tickets && tickets.map((dt, i) => (
        <tr className="border-b dark:border-neutral-500 text-center" key={i} onClick={() => toggleSidebar(dt)}>
          <th className="whitespace-nowrap px-6 py-4">{dt.route}</th>
          <th className="whitespace-nowrap px-6 py-4">{dt.departureCity}</th>
          <th className="whitespace-nowrap px-6 py-4">{dt.departureTime}</th>
          <th className="whitespace-nowrap px-6 py-4">{dt.arrivalTime}</th>
          <th  className="whitespace-nowrap px-6 py-4">{dt.arrivalCity} </th>
          <th className="whitespace-nowrap px-6 py-4">{dt.price}</th>
          <th className="whitespace-nowrap px-6 py-4">{dt.rideDate}</th>
        </tr>

      ))
      
      }

       
      </tbody>
    </table>
   
    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} secondDt={selectedTicket}/>
    {/* <Link
     href={{
      pathname: '/admin',
      query: {
        componentName: search,
        arrivalCity: 'Durres',
      }
     }}
    >
     <button>GoFirst</button>
    </Link>

    <Link
     href={{
      pathname: '/admin',
      query: {
        componentName: search,
        arrivalCity: 'Durres',
        rideDate: "2023-12-25",
      }
     }}
    >
     <button>Go</button>
    </Link> */}

    <div className=" bg-white border-slate-400 border-2 w-1/2 min-w-1/2 max-w-1/2 text-center p-4   flex flex-col gap-y-8 h-full  text-black">
    <p>Select Departure City</p>
      <select name="" id="" className="w-full" onChange={(e) => setSelectedDepartureCity(e.target.value)}>
        <option value="">Select Ticket</option>
        <option value="Tirana">Tirana</option>
        <option value="Durres">Durres</option>
      </select>
      
      <p>Select Arrival City</p>
      <select name="" id="" className="w-full" onChange={(e) => setSelectedCity(e.target.value)}>
        <option value="">Select Ticket</option>
        <option value="Tirana">Tirana</option>
        <option value="Durres">Durres</option>
      </select>
   
      <p>Select Ride Date</p>
      <input type="date" onChange={(e)=> setSelectedDate(e.target.value)}/>
      <p className="my-4 ">Select Departure Time</p>
      <select name="" id="" className="w-full" onChange={(e)=> setSelectedDepartureTime(e.target.value)}>
        <option value=''>Not Selected</option>
        <option value="08:00">08:00</option>
        <option value="09:00">09:00</option>
        <option value="10:00">10:00</option>
        <option value="13:00">13:00</option>
        <option value="15:00">15:00</option>
        <option value="18:00">18:00</option>
      </select>

      <p className="my-4 ">Select Arrival Time</p>
      <select name="" id="" className="w-full" onChange={(e)=> setSelectedArrivalTime(e.target.value)}>
        <option value=''>Not Selected</option>
        <option value="09:10">09:10</option>
        <option value="10:10">10:10</option>
        <option value="11:10">11:10</option>
        <option value="14:10">14:10</option>
        <option value="19:10">19:10</option>
      </select>
    </div>
    </div>
  );
};

export default AdminTicketsComponent;
