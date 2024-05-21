"use client"

import { cities } from '@/app/references/cities'
import React, { useState } from 'react'
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import { Button } from 'antd';


export default function SearchTicket() {
    const [selectedDate, setSelectedDate] = useState("");
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [information,setInformattion] = useState('');
  return (
    <div className="flex justify-center items-center h-screen pb-8">
      <div className=" flex w-full  gap-x-20 bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="mb-4 ">
            <label htmlFor="date" className="text-sm  text-gray-600 block mb-1">
              <FaCalendarAlt className="inline-block mr-2" /> Select Date
            </label>
            <input
              type="date"
              id="date"
              className="border border-gray-300 rounded-md p-2 w-full"
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="departureCity"
              className="text-sm text-gray-600 block mb-1"
            >
              <FaMapMarkerAlt className="inline-block mr-2" /> Departure City
            </label>
            <select
              id="departureCity"
              className="border border-gray-300 rounded-md p-2 w-full"
              onChange={(e) => setDepartureCity(e.target.value)}
            >
              <option disabled selected>
                Choose a city
              </option>
              {cities.map((city, index) => (
                <option key={index}>{city}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="arrivalCity"
              className="text-sm text-gray-600 block mb-1"
            >
              <FaMapMarkerAlt className="inline-block mr-2" /> Arrival City
            </label>
            <select
              id="arrivalCity"
              className="border border-gray-300 rounded-md p-2 w-full"
              onChange={(e) => setArrivalCity(e.target.value)}
            >
              <option disabled selected>
                Choose a city
              </option>
              {cities.map((city, index) => (
                <option key={index}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        <Link
          href={{
            pathname: "/search",
            query: {
              departureCity: departureCity,
              arrivalCity: arrivalCity,
              rideDate: selectedDate,
            },
          }}
        >
          <p className="mt-6 text-sm whitespace-nowrap  bg-blue-500 text-white px-4 py-2 rounded-md flex hover:bg-blue-600">
            Find Ticket
          </p>
        </Link>

      
      
      </div>
    </div>
  )
}
