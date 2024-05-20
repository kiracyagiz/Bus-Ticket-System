"use client";

import React, { useEffect, useState } from "react";
import { addTicketInformation, getCheckoutTicket, updateSeatData } from "../collection";
import Sidebar from "../components/Sidebar";
import { FaBus ,FaSuitcase } from "react-icons/fa";
import { popularCitizenships,checkoutTypes } from "../references/cities";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Checkout = ({ searchParams }) => {
  const [ticketData, setTicketsData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const router = useRouter();


  const [formData, setFormData] = useState({
    seat: selectedSeat,
    gender: "",
    name: "",
    surname: "",
    citizen: "",
    type: "",
    cardId: "",
    mail: "",
    phoneNumber: ""
  });

  const handleTicketInfoFormSubmit = async (ticketInfoFormData) => {
    try {
      // Update seat data first
      await updateSeatData(
        searchParams.selectedTicket, // Assuming ticketData[0] contains the ticket ID
        selectedSeat, // Use selectedSeat
        formData.gender // Use gender from form data
      );

      // Then, add ticket information
      const newTicketInfoId = await addTicketInformation(ticketInfoFormData);
      console.log(`New ticket information added with ID: ${newTicketInfoId}`);
    } catch (error) {
      console.error("Error adding ticket information:", error);
    }
  };
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      seat: selectedSeat,
    }));
  }, [selectedSeat]);

  const isFormDataComplete = () => {
    return (
      formData.seat &&
      formData.gender &&
      formData.name &&
      formData.surname &&
      formData.citizen &&
      formData.type &&
      formData.cardId &&
      formData.mail &&
      formData.phoneNumber
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    
    console.log(formData,'myformData')
  }, [formData])
  
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketsData = await getCheckoutTicket(searchParams);
        setTicketsData(ticketsData);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchData();
  }, [searchParams]);

  const handleGenderChange = (selectedGender) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: selectedGender,
    }));
  };


  return (
    <div className="flex flex-col   lg:flex-row p-4 lg:p-20 bg-gray-100 w-full h-full">
      <div className="flex flex-col gap-y-8  h-full">

        <div className="   h-1/4 bg-white p-4 border-gray-300 rounded-sm border-2">
          <div className="flex items-center gap-x-4">
            <p className="text-3xl font-semibold text-white bg-gray-800 rounded-md py-1 px-2">
              1
            </p>
            <p className="text-3xl font-semibold text-black">Select Seat</p>
          </div>

          <div className="p-4 border-gray-300 border-2 justify-between mt-2 flex items-center">
            <div className="flex gap-x-8 items-center">
              <FaBus size={30} />
              <div className="flex flex-col">
                <p>Please select your seat</p>
                <p>Price is: 0,00</p>
              </div>
            </div>
            <button
              className="bg-gray-800 text-white font-semibold p-2"
              onClick={() => setIsOpen(true)}
            >
              Pick the seats
            </button>
          </div>
        </div>

        <div className="  h-1/4 bg-white p-4 border-gray-300 rounded-sm border-2">
          <div className="flex items-center gap-x-4">
            <p className="text-3xl font-semibold text-white bg-gray-800 rounded-md py-1 px-2">
              2
            </p>
            <p className="text-3xl font-semibold text-black">
              Visitor Informations
            </p>
          </div>
          <div className="my-4">
            <p>Gender</p>
            <div className="flex items-center ">
              <p className={`cursor-pointer w-20 py-1 text-center border-gray-400 border ${formData.gender == "Female" && 'bg-black text-white'}`}
                          onClick={() => handleGenderChange('Female')}

              >
                Female
              </p>
              <p className={`cursor-pointer w-20 py-1 text-center border-gray-400 border ${formData.gender == "Male" && 'bg-black text-white'}`}
                          onClick={() => handleGenderChange('Male')}

              >
                Male
              </p>
            </div>

            <div className="flex flex-col lg:flex-row lg:flex-wrap gap-4 py-2">
              <input
                required
                type="text"
                name="name"
                placeholder="Name"
                className="lg:w-[45%] bg-white outline-none border-gray-800 border-2 p-2 rounded-lg"
                onChange={handleChange}

              />
              <input
                required
                type="text"
                name="surname"
                placeholder="Surname"
                onChange={handleChange}
                className="lg:w-[45%] bg-white outline-none border-gray-800 border-2 p-2 rounded-lg"
              />
              <select
                className="border-black border-2 p-2 rounded-lg lg:w-[45%] text-lg"
                onChange={(e) => handleSelectChange("citizen", e.target.value)}

              >
                <option selected>Choose a country</option>
                {popularCitizenships.map((city, index) => (
                  <option key={index} >{city}</option>
                ))}
              </select>
              <select
                className="border-black border-2 p-2 rounded-lg lg:w-[45%] text-lg"
                onChange={(e) => handleSelectChange("type", e.target.value)}

              >
                <option selected>Choose a country</option>
                {checkoutTypes.map((city, index) => (
                  <option key={index} >{city}</option>
                ))}
              </select>
              <input
                required
                type="text"
                name="cardId"
                onChange={handleChange}
                placeholder="Citizen ID"
                className="lg:w-[45%] bg-white outline-none border-gray-800 border-2 p-2 rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="  h-1/4 bg-white p-4 border-gray-300 rounded-sm border-2">
          <div className="flex items-center gap-x-4">
            <p className="text-3xl font-semibold text-white bg-gray-800 rounded-md py-1 px-2">
              3
            </p>
            <p className="text-3xl font-semibold text-black">Extras</p>
          </div>

          <div className="p-4 border-gray-300 border-2 justify-between mt-2 flex items-center">
            <div className="flex gap-x-8 items-center">
              <FaSuitcase size={30} />
              <div className="flex flex-col">
                <p className="font-semibold">For 1 person</p>
                <p>1 Hand Suitcase | 7 kg · 42×30×18 cm</p>
                <p>1 Baggage | 80×50×30 cm</p>
              </div>
            </div>
          
          </div>
        </div>


        <div className="  h-1/4 bg-white p-4 border-gray-300 rounded-sm border-2">
          <div className="flex items-center gap-x-4">
            <p className="text-3xl font-semibold text-white bg-gray-800 rounded-md py-1 px-2">
              4
            </p>
            <p className="text-3xl font-semibold text-black">
              Contact
            </p>
          </div>
          <div className="my-4">
          

            <div className="flex flex-col lg:flex-row lg:flex-wrap gap-4 py-2">
              <input
                required
                type="text"
                name="mail"
                onChange={handleChange}
                className="lg:w-[45%] bg-white outline-none border-gray-800 border-2 p-2 rounded-lg"
                placeholder="E-Mail"
              />
              <input
                required
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                onChange={handleChange}
                className="lg:w-[45%] bg-white outline-none border-gray-800 border-2 p-2 rounded-lg"
              />
            
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-1/2 lg:ml-20 my-8 lg:my-0 ">
        <div className=" bg-white border-2 border-gray-300 w-full lg:h-1/6 p-2">
          {ticketData.length > 0 &&
           <div className="flex flex-col gap-y-4">
                <p className="font-semibold">{ticketData[0].rideDate}</p>
                <div className="flex w-full justify-between border-b-2 border-b-black">
                <p className="text-gray-600">{ticketData[0].departureCity}</p>
                <p className="text-gray-600">{ticketData[0].departureTime}</p>
                </div>
                <div className="flex w-full justify-between border-b-2 border-b-black">
                <p className="text-gray-600">{ticketData[0].arrivalCity}</p>
                <p className="text-gray-600">{ticketData[0].arrivalTime}</p>
                </div>

           </div>
          
          }
        </div>
          <div className="flex justify-between  py-2 border-b-2 border-b-gray-600">
            <p>1 Person</p>
            <p className="font-semibold">{ticketData.length > 0 &&
              ticketData[0].price
            }</p>
          </div>
        <button
          className={`${
            isFormDataComplete() ? 'bg-gray-800' : 'bg-gray-500'
          } w-full mt-8 text-white font-semibold p-2`}
          disabled={!isFormDataComplete()}
          onClick={() => handleTicketInfoFormSubmit(formData)}
        >
          Buy
        </button>
      </div>

      

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} dt={ticketData} setSelectedSeat={setSelectedSeat} selectedSeat={selectedSeat}/>
    </div>
  );
};

export default Checkout;
