"use client";

import { Button, Card, Col, DatePicker, Row, Layout, Menu } from 'antd';
import { FaCalendarAlt, FaMapMarkerAlt, FaBusAlt } from 'react-icons/fa';
import { AuthContextProvider } from './context/AuthContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import SearchTicket from './components/Modal/SearchTicket';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

const { Header, Content, Footer } = Layout;

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
            <Layout>
                <Header className="bg-blue-400 flex items-center justify-between">
                    <div className="logo">
                        <img src={imageUrl} alt="Logo" className="w-10 h-auto" />
                    </div>
                    <Menu theme="dark" mode="horizontal" className="bg-blue-400">
                        {functionality.map((item, index) => (
                            <Menu.Item key={index} onClick={() => router.push(item.link)}>
                                {item.title}
                            </Menu.Item>
                        ))}
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div className="site-layout-content">
                        <div className="relative">
                            <img src={secondImageUrl} alt="Bus on the road" className="w-full h-[420px] object-cover" />
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-3xl">
                                <SearchTicket />
                            </div>
                        </div>
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
                    </div>
                </Content>
                <Footer className="text-center">TicketMaster ©2024 Created by Yagiz Kirac</Footer>
            </Layout>
        </AuthContextProvider>
    );
};

export default Home;
