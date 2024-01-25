"use client"


import { getTicketInformationById } from '@/app/collection';
import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react';

const TicketId = () => {
  const [ticketInfoData, setTicketInfoData] = useState([]);
  const [id, setId] = useState('');
  const pathSegments = window.location.pathname.split('/');
  const extractedId = pathSegments[pathSegments.length - 1];
  useEffect(() => {


    if (extractedId.length > 0) {
      setId(extractedId);
    }
  }, [extractedId]);

  useEffect(() => {
    const fetchTicketInfoData = async () => {
      if (id.length > 0) {
        const data = await getTicketInformationById(id);
        setTicketInfoData(data);

      }
    };

    fetchTicketInfoData();
  }, [id,data,extractedId]);

  return (
    <div className="min-h-screen flex items-center justify-center">
    <div className="bg-white p-8 rounded shadow-md w-80">
      <h1 className="text-2xl font-bold mb-4">Ticket Information</h1>
      <ul className="list-none p-0 m-0">
        <li className="mb-2">
          <strong>Name:</strong> {ticketInfoData.name}
        </li>
        <li className="mb-2">
          <strong>Surname:</strong> {ticketInfoData.surname}
        </li>
        <li className="mb-2">
          <strong>Gender:</strong> {ticketInfoData.gender}
        </li>
        <li className="mb-2">
          <strong>Citizen:</strong> {ticketInfoData.citizen}
        </li>
        <li className="mb-2">
          <strong>Type:</strong> {ticketInfoData.type}
        </li>
        <li className="mb-2">
          <strong>Card ID:</strong> {ticketInfoData.cardId}
        </li>
        <li className="mb-2">
          <strong>Mail:</strong> {ticketInfoData.mail}
        </li>
        <li className="mb-2">
          <strong>Phone Number:</strong> {ticketInfoData.phoneNumber}
        </li>
        <li className="mb-2">
          <strong>Seat:</strong> {ticketInfoData.seat}
        </li>
      </ul>
    </div>
  </div>
  );
};

export default TicketId;
