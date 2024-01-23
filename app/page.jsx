"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cities } from "./references/cities";
export default function Home() {
  const [selectedDate, setSelectedDate] = useState("");
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex justify-center mt-56  gap-x-4">
        <input type="date" className="border-black border-2 p-3 text-lg" onChange={(e) => setSelectedDate(e.target.value)} />

        <select
          id="countries"
          className="border-black border-2 p-3 text-lg"
          onChange={(e) => setDepartureCity(e.target.value)}
        >
          <option selected>Choose a city</option>
          {cities.map((city, index) => (
            <option key={index}>{city}</option>
          ))}
        </select>

        <select
          id="countries"
          className="border-black border-2 p-3 text-lg"
          onChange={(e) => setArrivalCity(e.target.value)}
        >
          <option selected>Choose a city</option>
          {cities.map((city, index) => (
            <option key={index}>{city}</option>
          ))}
        </select>
      </div>

      <Link
      className="mt-56 ml-8"
        href={{
          pathname: "/search",
          query: {
            departureCity: departureCity,
            arrivalCity: arrivalCity,
            rideDate: selectedDate,
          },
        }}
      >
        Go to Other Page
      </Link>
    </div>
  );
}
