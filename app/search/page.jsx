'use client'

import { useEffect, useState } from "react";
import { getSelectedTicket } from "../collection";
import { Card, DatePicker, Timeline } from "antd";
import moment from "moment";
import TicketWidget from "../components/Ticket/TicketWidget";

export default function Search({ searchParams }) {
  const [tickets, setTickets] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedIdx, setSelectedIdx] = useState(null);

  // Set selectedDate to searchParams.rideDate when component mounts
  useEffect(() => {
    if (searchParams.rideDate) {
      setSelectedDate(moment(searchParams.rideDate));
    }
  }, [searchParams]);

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
        // Optionally, set an error state here and handle it in your UI
      }
    };

    fetchData();
  }, [searchParams, selectedDate]); // Update when selectedDate changes

  const handleDateChange = (date, index) => {
    setSelectedDate(date); // Set selected date to the clicked date object
    setSelectedIdx(index); // Set selected index for background color
  };

  return (
    <div className="flex flex-col gap-y-4 text-center justify-center items-center">
      <div className="flex space-x-4">
      {[...Array(5)].map((_, index) => {
  const currentDate = moment(tickets && tickets[0] && tickets[0].rideDate).subtract(2, "days").add(index, "days");
  const isSelected = currentDate.isSame(selectedDate, 'day'); // Check if currentDate is the selected date
  return (
    <div
      key={index}
      onClick={() => handleDateChange(currentDate, index)}
      className={`cursor-pointer rounded-md p-2 ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
    >
      {currentDate.format("MMM DD")}
    </div>
  );
})}

      </div>
   
      {tickets && tickets.length > 0 ? (
        tickets.map((ticket) => (
          <TicketWidget key={ticket.id} ticket={ticket} />
        ))
      ) : (
        <div>Data Not Found</div>
      )}
    </div>
  );
}
