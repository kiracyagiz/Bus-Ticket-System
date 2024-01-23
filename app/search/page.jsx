"use client";
import { useEffect, useState } from "react";
import { getSelectedTicket } from "../collection";
import Link from "next/link";
export default function Search({ searchParams }) {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketsData = await getSelectedTicket(searchParams);
        setTickets(ticketsData);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-y-4 text-center justify-center items-center">
       {tickets.map((dt,i)=> (
        <div className="border p-4 m-4 w-1/2 shadow-md rounded-md">
        <h2 className="text-xl font-bold mb-2">{dt.route}</h2>
        <p>
          <span className="font-semibold">Departure:</span> {dt.departureCity} at {dt.departureTime}
        </p>
        <p>
          <span className="font-semibold">Arrival:</span> {dt.arrivalCity} at {dt.arrivalTime}
        </p>
        <p><span className="font-semibold">Date:</span> {dt.rideDate}</p>
        <p><span className="font-semibold">Price:</span> {dt.price}</p>
        <p>{dt.id}</p>
         <Link
           href={{
            pathname : '/checkout',
            query: {
                selectedTicket : dt.id
            }
           }}
         >
         <button
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md"
        >
          Select
        </button>
         </Link>
      </div>
       ))}
    </div>
  );
}
