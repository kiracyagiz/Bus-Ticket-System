import { addTicket } from "@/app/collection";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Select, DatePicker, Card, Typography, Row, Col } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const AdminTableComponent = () => {
  const [selectDate, setSelectedDate] = useState(null);
  const [departureCity, setDepartureCity] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  const { user } = useAuth();

  const seats = [
    "Male", "Female", "Male", "Male", " ", "Female", "Male", " ", "Female", " ", " ",
    "Male", " ", " ", " ", " ", " ", " ", " ", ""
  ];

  const newTicketData = {
    route: `${departureCity}-${arrivalCity}`,
    departureCity,
    departureTime,
    arrivalTime,
    arrivalCity,
    price,
    rideDate: selectDate ? selectDate.format('YYYY-MM-DD') : "",
    seats,
    companyId: user.uid,
  };

  const handleSubmit = async () => {
    if (!selectDate || !departureCity || !departureTime || !arrivalCity || !arrivalTime || !price) {
      let errorMessage = "Please fill in the following field(s): ";
      if (!selectDate) errorMessage += "Select Date, ";
      if (!departureCity) errorMessage += "Departure City, ";
      if (!departureTime) errorMessage += "Departure Time, ";
      if (!arrivalCity) errorMessage += "Arrival City, ";
      if (!arrivalTime) errorMessage += "Arrival Time, ";
      if (!price) errorMessage += "Price, ";
      errorMessage = errorMessage.slice(0, -2); // Remove the last comma and space
      toast.error(errorMessage);
      return;
    }

    try {
      await addTicket(newTicketData);
      toast.success('New ticket added successfully');
      setSelectedDate(null);
      setDepartureCity("");
      setDepartureTime("");
      setArrivalCity("");
      setArrivalTime("");
      setPrice("");
    } catch (error) {
      console.error("Error adding ticket:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="py-4 w-screen flex justify-center items-center"
   
      >
        <Card style={{ width: 400 }}>
          <Title level={3} className="text-center mb-2">
            Add New Ticket
          </Title>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Select Date" required>
                  <DatePicker
                    value={selectDate}
                    onChange={setSelectedDate}
                    style={{ width: '100%' }}
                    size="small"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Departure City" required>
                  <Select
                    value={departureCity}
                    onChange={setDepartureCity}
                    placeholder="Select Departure City"
                    style={{ width: '100%' }}
                    size="small"
                  >
                    <Option value="Tirana">Tirana</Option>
                    <Option value="Durres">Durres</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Departure Time" required>
                  <Select
                    value={departureTime}
                    onChange={setDepartureTime}
                    placeholder="Select Departure Time"
                    style={{ width: '100%' }}
                    size="small"
                  >
                    <Option value="09:00">09:00</Option>
                    <Option value="13:00">13:00</Option>
                    <Option value="15:00">15:00</Option>
                    <Option value="18:00">18:00</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Arrival City" required>
                  <Select
                    value={arrivalCity}
                    onChange={setArrivalCity}
                    placeholder="Select Arrival City"
                    style={{ width: '100%' }}
                    size="small"
                  >
                    <Option value="Tirana">Tirana</Option>
                    <Option value="Durres">Durres</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Arrival Time" required>
                  <Select
                    value={arrivalTime}
                    onChange={setArrivalTime}
                    placeholder="Select Arrival Time"
                    style={{ width: '100%' }}
                    size="small"
                  >
                    <Option value="09:10">09:10</Option>
                    <Option value="10:10">10:10</Option>
                    <Option value="14:10">14:10</Option>
                    <Option value="16:10">16:10</Option>
                    <Option value="19:10">19:10</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Price" required>
                  <Select
                    value={price}
                    onChange={setPrice}
                    placeholder="Select Price"
                    style={{ width: '100%' }}
                    size="small"
                  >
                    <Option value="500 Leke">500 Leke</Option>
                    <Option value="550 Leke">550 Leke</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button className="w-full " htmlType="submit" >
                Add Ticket
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default AdminTableComponent;
