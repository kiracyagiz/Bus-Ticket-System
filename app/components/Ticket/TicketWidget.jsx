import Head from 'next/head';
import { FaBus } from 'react-icons/fa';

const TicketWidget = () => {
    return (
        <>
            <div className="p-10">
                <div className="max-w-full  bg-white flex flex-col rounded overflow-hidden shadow-lg">
                    <div className="flex flex-row items-baseline flex-nowrap bg-gray-100 p-2">
                        <FaBus className="mt-2 mr-1" size={20} />
                        <h1 className="ml-2 uppercase font-bold text-gray-500">departure</h1>
                        <p className="ml-2 font-normal text-gray-500">Wednesday 18 Aug</p>
                    </div>
                    <div className="mt-2 flex justify-start bg-white p-2">
                        <div className="flex mx-2 ml-6 h8 px-2 flex-row items-baseline rounded-full bg-gray-100 p-1">
                            <FaBus className="mr-1" size={12} />
                            <p className="font-normal text-sm ml-1 text-gray-500">Standard</p>
                        </div>
                    </div>
                    <div className="mt-2 flex sm:flex-row mx-6 sm:justify-between flex-wrap ">
                        <div className="flex flex-row place-items-center p-2">
                            <FaBus className="mr-2" size={20} />
                            <div className="flex flex-col ml-2">
                                <p className="text-xs text-gray-500 font-bold">Greyhound</p>
                                <p className="text-xs text-gray-500">Route: XYZ to ABC</p>
                                <div className="text-xs text-gray-500">2*23kg</div>
                            </div>
                        </div>
                        <div className="flex flex-col p-2">
                            <p className="font-bold">18:25</p>
                            <p className="text-gray-500"><span className="font-bold">XYZ</span> Departure Point</p>
                            <p className="text-gray-500">City, Country</p>
                        </div>
                        <div className="flex flex-col flex-wrap p-2">
                            <p className="font-bold">19:25</p>
                            <p className="text-gray-500"><span className="font-bold">ABC</span> Arrival Point</p>
                            <p className="text-gray-500">City, Country</p>
                        </div>
                    </div>
                    <div className="mt-4 bg-gray-100 flex flex-row flex-wrap md:flex-nowrap justify-between items-baseline">
                        <div className="flex mx-6 py-4 flex-row flex-wrap">
                            <FaBus className="w-12 h-10 p-2 mx-2 self-center bg-gray-400 rounded-full fill-current text-white" />
                            <div className="text-sm mx-2 flex flex-col">
                                <p className="">Standard Ticket</p>
                                <p className="font-bold">$404.73</p>
                                <p className="text-xs text-gray-500">Price per adult</p>
                            </div>
                             <button className="w-32 h-11 rounded flex border-solid border bg-white mx-2 justify-center place-items-center"><div className="">Book</div></button>
                        </div>
                        <div className="md:border-l-2 mx-6 md:border-dotted flex flex-row py-4 mr-6 flex-wrap">
                            <FaBus className="w-12 h-10 p-2 mx-2 self-center bg-green-800 rounded-full fill-current text-white" />
                            <div className="text-sm mx-2 flex flex-col">
                                <p>Flexible Ticket</p>
                                <p className="font-bold">$605.43</p>
                                <p className="text-xs text-gray-500">Price per adult</p>
                            </div>
                            <button className="w-32 h-11 rounded flex border-solid border text-white bg-green-800 mx-2 justify-center place-items-center"><div className="">Book</div></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TicketWidget;
