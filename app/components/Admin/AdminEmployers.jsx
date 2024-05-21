import React, { useState,useEffect } from 'react'
import { getEmployersData } from '@/app/collection'
import { useRouter } from "next/navigation";
import Sidebar from '../Sidebar';
import AddEmployerSideBar from '../Employers/AddEmployerSideBar';
import { useAuth } from '@/app/context/AuthContext';
import { Table } from 'antd';

const AdminEmployers = ({searchParams}) => {

  const route = useRouter();
  const {user} = useAuth()

  const [employeeData,setEmployeeData] = useState();
  const [employeeId,setEmployeeId] = useState('');
  const [hireDate,setHireDate] = useState('');
  const [salary,setSalary] = useState('');
  const [isOpen,setIsOpen] = useState('')
  const [selectedTicket,setSelectedTicket] = useState([]);
  const [triggered,setTriggered] = useState(false);
  const [type,setType] = useState(false)

  const toggleSidebar = (dt) => {
    setIsOpen(!isOpen);
    setSelectedTicket(dt)
  };

  const addEmployerSide = () => {
    setType(!type)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketsData = await getEmployersData(searchParams,user.uid);
        setEmployeeData(ticketsData);
        console.log(ticketsData,'myTicketData')
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchData();
  }, [searchParams,triggered,type]);


  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName"
    },
    {
      title: "Hire Date",
      dataIndex: "hireDate",
      key: "hireDate",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },

  ];


  useEffect(() => {
    route.push(`/admin?componentName=allEmployers&employeeId=${employeeId}&hireDate=${hireDate}&salary=${salary}
    `)
 }, [employeeId,hireDate,salary])
  return (
   <div className='flex flex-row justify-between  items-start gap-x-28'>

<Table
        dataSource={employeeData}
        columns={columns}
        rowKey={(record) => record.key}
        onRow={(record) => ({
          onClick: () => toggleSidebar(record),
        })}
      />

     <div>


<Sidebar thirdData={selectedTicket}  isOpen={isOpen} setIsOpen={setIsOpen} setTriggered={setTriggered} triggered={triggered}/>
<AddEmployerSideBar isOpen={type} setIsOpen={setType}/>
</div>


<button onClick={addEmployerSide}>Add Employer Button</button>

   </div>
  )
}

export default AdminEmployers