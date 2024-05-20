"use client"

import { cities } from '@/app/references/cities'
import React, { useState } from 'react'
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";


export default function SearchTicket() {
    const [selectedDate, setSelectedDate] = useState("");
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [information,setInformattion] = useState('');
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-6">Find Your Bus Ticket</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="mb-4">
            <label htmlFor="date" className="text-sm text-gray-600 block mb-1">
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
          <p className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md inline-block hover:bg-blue-600">
            Find Ticket
          </p>
        </Link>

        <div className="flex flex-col py-2">
          <label
            htmlFor="textInput"
            className="mb-2 text-gray-600 font-semibold"
          >
            Check your bus information with your ticket id:
          </label>
          <input
            type="text"
            id="textInput"
            onChange={(e)=> setInformattion(e.target.value)}
            name="textInput"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Type here..."
          />
        </div>
        <Link
         href={`/ticketInfo/${information}`}
        >
        <button
          className=
          "bg-blue-400 mt-8 text-white font-semibold p-2"
        >
          Find Information About Your Booking Ticket
        </button>
        </Link>
      
      </div>
    </div>
  )
}
