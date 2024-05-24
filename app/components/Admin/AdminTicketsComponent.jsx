import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { useAuth } from "@/app/context/AuthContext";
import ExcelJS from "exceljs";
import saveAs from "file-saver";
import { getFilteredData } from "@/app/collection";
import { Table, Button, Select, DatePicker } from "antd";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const { Option } = Select;

const AdminTicketsComponent = ({ searchParams }) => {
  const { user } = useAuth();
  const route = useRouter();

  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [departureTime, setSelectedDepartureTime] = useState("");
  const [departureCity, setSelectedDepartureCity] = useState("");
  const [arrivalTime, setSelectedArrivalTime] = useState("");
  const [triggered, setTriggered] = useState(false);

  const toggleSidebar = (dt) => {
    setIsOpen(!isOpen);
    setSelectedTicket(dt);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketsData = await getFilteredData(searchParams, user.uid);
        setTickets(ticketsData);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchData();
  }, [searchParams, triggered]);

  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Ticket Data");

    worksheet.addRow([
      "Route",
      "Departure City",
      "Departure Time",
      "Arrival Time",
      "Arrival City",
      "Price",
      "Date",
    ]);

    tickets.forEach((ticket) => {
      worksheet.addRow([
        ticket.route,
        ticket.departureCity,
        ticket.departureTime,
        ticket.arrivalTime,
        ticket.arrivalCity,
        ticket.price,
        ticket.rideDate,
      ]);
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer]), "ticket_data.xlsx");
    });
  };

  useEffect(() => {
    route.push(
      `/admin?componentName=allTickets&arrivalCity=${selectedCity}&rideDate=${selectedDate}&departureCity=${departureCity}&departureTime=${departureTime}&arrivalTime=${arrivalTime}`
    );
  }, [selectedCity, selectedDate, departureCity, departureTime, arrivalTime]);

  const columns = [
    {
      title: "Route",
      dataIndex: "route",
      key: "route",
    },
    {
      title: "Departure City",
      dataIndex: "departureCity",
      key: "departureCity",
    },
    {
      title: "Departure Time",
      dataIndex: "departureTime",
      key: "departureTime",
    },
    {
      title: "Arrival Time",
      dataIndex: "arrivalTime",
      key: "arrivalTime",
    },
    {
      title: "Arrival City",
      dataIndex: "arrivalCity",
      key: "arrivalCity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Date",
      dataIndex: "rideDate",
      key: "rideDate",
    },
  ];

  return (
    <div className="flex gap-x-8 py-8 ">
            <ToastContainer />
      <Button onClick={exportToExcel}>Export</Button>
      <Table
        dataSource={tickets}
        columns={columns}
        rowKey={(record) => record.key}
        onRow={(record) => ({
          onClick: () => toggleSidebar(record),
        })}
      />
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        secondDt={selectedTicket}
        setTriggered={setTriggered}
        triggered={triggered}
        toast={toast}
      />

      <div className=" bg-white border-slate-400 border-2 w-1/2 min-w-1/2 max-w-1/2 text-center p-4 flex flex-col gap-y-8 h-full text-black">
        <p>Select Departure City</p>
        <Select
          defaultValue=""
          style={{ width: "100%" }}
          onChange={(value) => setSelectedDepartureCity(value)}
        >
          <Option value="">Select Ticket</Option>
          <Option value="Tirana">Tirana</Option>
          <Option value="Durres">Durres</Option>
        </Select>

        <p>Select Arrival City</p>
        <Select
          defaultValue=""
          style={{ width: "100%" }}
          onChange={(value) => setSelectedCity(value)}
        >
          <Option value="">Select Ticket</Option>
          <Option value="Tirana">Tirana</Option>
          <Option value="Durres">Durres</Option>
        </Select>

        <p>Select Ride Date</p>
        <DatePicker onChange={(date, dateString) => setSelectedDate(dateString)} />

        <p className="my-4">Select Departure Time</p>
        <Select
          defaultValue=""
          style={{ width: "100%" }}
          onChange={(value) => setSelectedDepartureTime(value)}
        >
          <Option value="">Not Selected</Option>
          <Option value="08:00">08:00</Option>
          <Option value="09:00">09:00</Option>
          <Option value="10:00">10:00</Option>
          <Option value="13:00">13:00</Option>
          <Option value="15:00">15:00</Option>
          <Option value="18:00">18:00</Option>
        </Select>

        <p className="my-4">Select Arrival Time</p>
        <Select
          defaultValue=""
          style={{ width: "100%" }}
          onChange={(value) => setSelectedArrivalTime(value)}
        >
          <Option value="">Not Selected</Option>
          <Option value="09:10">09:10</Option>
          <Option value="10:10">10:10</Option>
          <Option value="11:10">11:10</Option>
          <Option value="14:10">14:10</Option>
          <Option value="19:10">19:10</Option>
        </Select>
      </div>

      <label
        htmlFor="tw-modal"
        className="pointer-events-none invisible fixed inset-0 flex cursor-pointer items-center justify-center overflow-hidden  overscroll-contain bg-slate-700/30 opacity-0 transition-all duration-200 ease-in-out peer-checked:visible peer"
      ></label>
    </div>
  );
};

export default AdminTicketsComponent;
