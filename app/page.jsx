"use client";

import { useEffect, useState } from "react";
import { cities } from "./references/cities";

// Assuming you have the necessary icons from a library like React Icons
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { AuthContextProvider } from "./context/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import SearchTicket from "./components/Modal/SearchTicket";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Home = () => {

  
  const functionality = [
    {
      title: 'Home',
      link: '/'
    },
    {
      title: 'Company',
      link: '/login'
    },
    {
      title: 'Routes',
      link: '/routes'
    },

  ]

  const router = useRouter()

  const [user] = useAuthState(auth);

  const imageUrl = 'https://t3.ftcdn.net/jpg/05/71/69/10/360_F_571691018_GxAIRdpQ1wk38db2lYkWQEhxqalnBsL3.jpg'

  console.log(user,'useri')
  return (
    <AuthContextProvider>
     <div className="flex flex-row justify-between items-center px-10">
     <img src={imageUrl} width={150} height={70}/> 
     <div className="flex flex-row gap-x-3">
     { 
      functionality.map((dt,i) => (
        <button key={i} onClick={() => router.push(dt.link) }>{dt.title}</button>
      ))
     }
     </div>
     </div>
    <SearchTicket/>
    </AuthContextProvider>
  );
};

export default Home;
