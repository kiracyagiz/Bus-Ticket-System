"use client";

import { Button, Card, Col, DatePicker, Row } from 'antd';
import { FaCalendarAlt, FaMapMarkerAlt, FaBusAlt } from 'react-icons/fa';
import { AuthContextProvider } from './context/AuthContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import SearchTicket from './components/Modal/SearchTicket';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
    const functionality = [
        { title: 'Home', link: '/' },
        { title: 'Company', link: '/login' },
        { title: 'Routes', link: '/routes' },
    ];

    const router = useRouter();
    const [user] = useAuthState(auth);

    const imageUrl = 'https://uxwing.com/wp-content/themes/uxwing/download/transportation-automotive/bus-icon.png';
    const secondImageUrl = "https://cdn-cf.cms.flixbus.com/drupal-assets/2021-07/hero-image-kamil-koc.jpeg";

    return (
        <AuthContextProvider>
            <div className="flex flex-col">
                  <header className="bg-blue-400 text-black flex justify-between items-center p-4">
                      <img src={imageUrl} alt="Logo" className="w-10 text-white h-auto" />
                      <nav className="flex space-x-6">
                          {functionality.map((item, index) => (
                              <button
                                  key={index}
                                  onClick={() => router.push(item.link)}
                                  className="hover:text-gray-300"
                              >
                                  {item.title}
                              </button>
                          ))}
                      </nav>
                  </header>
                <div className="relative">
                    <img src={secondImageUrl} alt="Bus on the road" className="w-full  h-[420px] object-cover text-white" />
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-3xl">
    <SearchTicket />
</div>

                </div>
                <main className="flex-1 bg-gray-100 p-10">
                   
                    <div className="grid grid-cols-1 md:grid-cols-2 pt-16 lg:grid-cols-3 gap-6 mb-10">
                        <Card
                            hoverable
                            className="group flex items-center justify-center p-6 bg-white transition duration-300 ease-in-out transform hover:bg-blue-500 hover:shadow-lg"
                            onClick={() => router.push('/search')}
                        >
                            <FaCalendarAlt className="text-4xl mb-2 mx-auto text-blue-500 group-hover:text-white transition duration-300 ease-in-out" />
                            <div className="ml-4 text-center group-hover:text-white transition duration-300 ease-in-out">
                                <h2 className="text-xl font-semibold group-hover:text-white">Choose Date</h2>
                                <p className="text-gray-600 group-hover:text-white">
                                    Select the date you want to travel
                                </p>
                            </div>
                        </Card>
                        <Card
                            hoverable
                            className="group flex items-center justify-center p-6 bg-white transition duration-300 ease-in-out transform hover:bg-blue-500 hover:shadow-lg"
                            onClick={() => router.push('/search')}
                        >
                            <FaMapMarkerAlt className="text-4xl mb-2 mx-auto text-blue-500 group-hover:text-white transition duration-300 ease-in-out" />
                            <div className="ml-4 text-center group-hover:text-white transition duration-300 ease-in-out">
                                <h2 className="text-xl font-semibold group-hover:text-white">Choose Destination</h2>
                                <p className="text-gray-600 group-hover:text-white">
                                    Select your desired destination
                                </p>
                            </div>
                        </Card>
                        <Card
                            hoverable
                            className="group flex items-center justify-center p-6 bg-white transition duration-300 ease-in-out transform hover:bg-blue-500 hover:shadow-lg"
                            onClick={() => router.push('/search')}
                        >
                            <FaBusAlt className="text-4xl mb-2 mx-auto text-blue-500 group-hover:text-white transition duration-300 ease-in-out" />
                            <div className="ml-4 text-center group-hover:text-white transition duration-300 ease-in-out">
                                <h2 className="text-xl font-semibold group-hover:text-white">Bus Details</h2>
                                <p className="text-gray-600 group-hover:text-white">
                                    Get information about bus facilities and schedules
                                </p>
                            </div>
                        </Card>
                    </div>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Card
                                className="group hover:bg-blue-500 hover:shadow-lg transition duration-300 ease-in-out"
                                title={<h2 className="group-hover:text-white">Online Booking</h2>}
                                hoverable
                            >
                                <p className="group-hover:text-white transition duration-300 ease-in-out">
                                    Our online booking system allows you to reserve your tickets from the comfort of your home. Enjoy a hassle-free experience with secure payments 
                                </p>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                className="group hover:bg-blue-500 hover:shadow-lg transition duration-300 ease-in-out"
                                title={<h2 className="group-hover:text-white">Comfortable Journey</h2>}
                                hoverable
                            >
                                <p className="group-hover:text-white transition duration-300 ease-in-out">
                                    Experience a comfortable journey with our well-maintained buses equipped with modern amenities. We prioritize your comfort and safety.
                                </p>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                className="group hover:bg-blue-500 hover:shadow-lg transition duration-300 ease-in-out"
                                title={<h2 className="group-hover:text-white">Customer Support</h2>}
                                hoverable
                            >
                                <p className="group-hover:text-white transition duration-300 ease-in-out">
                                    Our dedicated customer support team is here to assist you 24/7. Contact us for any queries or assistance regarding your travel plans.
                                </p>
                            </Card>
                        </Col>
                    </Row>
                </main>
                <footer className="bg-blue-900 text-white text-center p-4">
                    TicketMaster ©2024 Created by YourCompany
                </footer>
            </div>
        </AuthContextProvider>
    );
};

export default Home;
