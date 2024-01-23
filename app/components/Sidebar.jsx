"use client";

import React, { useEffect, useState } from "react";
import { TbArmchair } from "react-icons/tb";

const Sidebar = ({ isOpen, setIsOpen, dt,secondDt }) => {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [seats, setSeats] = useState([]);

  useEffect(() => {
    if (dt) {
      dt.map((i) => {
        setSeats(i.seats);
      });
    }
  }, [dt]);

  return (
    <div
      className={`fixed top-0 right-0 h-full  bg-slate-600 text-white p-4 transition-transform transform ${
        isOpen ? " lg:w-1/3" : "translate-x-full"
      }`}
    >
      {dt && (
        <div>
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
          >
            {isOpen ? "Close Sidebar" : "Open Sidebar"}
          </button>
          <div className="flex mt-4 justify-center gap-x-28">
            <ul className="flex flex-col mr-2">
              {seats.slice(0, 10).map((item, i) => (
                <li
                  key={i}
                  className="mb-2 p-2 flex items-center justify-center  w-20 h-14 border-white border-2 text-white"
                  
                ><TbArmchair color={item === 'man' ? 'blue' : item === 'woman' ? 'red' : 'white'} size={30} />
                </li>
              ))}
            </ul>
            <ul className="flex flex-col">
              {seats.slice(10, 20).map((item, i) => (
                <li
                  key={i}
                  className="mb-2 p-2 flex items-center justify-center  w-20 h-14 border-white border-2 text-white"
                ><TbArmchair color={item === 'man' ? 'blue' : item === 'woman' ? 'red' : 'white'} size={30} /></li>
              ))}
            </ul>
          </div>
        </div>
      )}
       {secondDt && 
         <div className="flex flex-col ">
          <button onClick={toggleSidebar} className="mb-4">Close Window</button>
          <label className="mb-2">Route</label>
          <input type="text"  placeholder={secondDt.route} className="text-black p-2"/>
          <label className="my-2">Departure City</label>
          <input type="text"  placeholder={secondDt.departureCity} className="text-black p-2"/>
          <label className="my-2">Departure Time</label>
          <input type="text"  placeholder={secondDt.departureTime} className="text-black p-2"/>
          <label className="my-2">Arrival Time</label>
          <input type="text"  placeholder={secondDt.arrivalTime} className="text-black p-2"/>
          <label className="my-2">Arrival City</label>
          <input type="text"  placeholder={secondDt.arrivalCity} className="text-black p-2"/>
          <label className="my-2">Price</label>
          <input type="text"  placeholder={secondDt.price} className="text-black p-2"/>
          <label className="my-2">Date</label>
          <input type="text"  placeholder={secondDt.rideDate} className="text-black p-2"/>
          <label className="my-2">ID</label>
          <input type="text"  value={secondDt.id} className="text-black p-2" />
         </div>
       }
       
    </div>
  );
};

export default Sidebar;
