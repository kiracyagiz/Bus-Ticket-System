import Head from 'next/head';
import Link from 'next/link';
import { FaBus } from 'react-icons/fa';

const TicketWidget = ({ticket}) => {
    return (
        <>
            <div className="p-10 w-2/3">
                <div className="max-w-full  bg-white flex flex-col rounded overflow-hidden shadow-lg">
                    <div className="flex flex-row items-baseline flex-nowrap bg-gray-100 p-2">
                        <FaBus className="mt-2 mr-1" size={20} />
                        <h1 className="ml-2 uppercase font-bold text-gray-500">departure</h1>
                        <p className="ml-2 font-normal text-gray-500">{ticket.rideDate}</p>
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
                                <p className="text-xs text-gray-500">{ticket.route}</p>
                                <div className="text-xs text-gray-500">2*23kg</div>
                            </div>
                        </div>
                        <div className="flex flex-col p-2">
                            <p className="font-bold">{ticket.departureTime}</p>
                            <p className="text-gray-500"><span className="font-bold">{ticket.departureCity}</span> Departure Point</p>
                        </div>
                        <div className="flex flex-col flex-wrap p-2">
                            <p className="font-bold">{ticket.arrivalTime}</p>
                            <p className="text-gray-500"><span className="font-bold">{ticket.arrivalCity}</span> Arrival Point</p>
                            <p className="text-gray-500">City, Country</p>
                        </div>
                    </div>
                    <div className="mt-4 bg-gray-100 flex   justify-between items-baseline">
                     
                        <div className="md:border-l-2 mx-6 md:border-dotted  flex flex-row justify-between w-full py-4 mr-6 ">
                            <FaBus className="w-12 h-10 p-2 mx-2 self-center  bg-green-800 rounded-full fill-current text-white" />
                            <div className="text-sm mx-2 flex  flex-col">
                                <p>Flexible Ticket</p>
                                <p className="font-bold">${ticket.price}</p>
                                <p className="text-xs text-gray-500">Price per adult</p>
                            </div>
                            <Link
                             href={{
            pathname : '/checkout',
            query: {
                selectedTicket : ticket.id
            }
           }}
                            >
                            <button className="w-32 h-11 rounded flex border-solid border text-white bg-green-800 mx-2 justify-center place-items-center"><div className="">Book</div></button>

                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TicketWidget;
