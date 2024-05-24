"use client"

import { useEffect, useState } from "react";
import { getSelectedTicket } from "../collection";
import { DatePicker } from "antd";
import moment from "moment";
import TicketWidget from "../components/Ticket/TicketWidget";

export default function Search({ searchParams }) {
  const [tickets, setTickets] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketsData = await getSelectedTicket({
          ...searchParams,
          date: selectedDate.format("YYYY-MM-DD"),
        });
        setTickets(ticketsData);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchData();
  }, [searchParams, selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const dateOptions = [];
  for (let i = -5; i <= 5; i++) {
    const date = i < 0 ? moment().subtract(Math.abs(i), "days") : moment().add(i, "days");
    dateOptions.push(date);
  }

  return (
    <div className="flex flex-col gap-y-4 bg-gray-400 text-center justify-center items-center">
      <div className="flex gap-x-2 items-center">
        <span>Select Date:</span>
        <DatePicker
          className="border rounded-md p-1"
          value={selectedDate}
          onChange={(date) => handleDateChange(date)}
        />
      </div>

      {tickets.length > 0 ? (
        tickets.map((ticket, index) => (
          <TicketWidget key={index} ticket={ticket} />
        ))
      ) : (
        <div>Data Not Found</div>
      )}
    </div>
  );
}
