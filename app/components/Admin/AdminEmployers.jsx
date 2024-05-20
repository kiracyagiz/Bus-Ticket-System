import React, { useState,useEffect } from 'react'
import { getEmployersData } from '@/app/collection'
import { useRouter } from "next/navigation";
import Sidebar from '../Sidebar';
import AddEmployerSideBar from '../Employers/AddEmployerSideBar';
import { useAuth } from '@/app/context/AuthContext';

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




  useEffect(() => {
    route.push(`/admin?componentName=allEmployers&employeeId=${employeeId}&hireDate=${hireDate}&salary=${salary}
    `)
 }, [employeeId,hireDate,salary])
  return (
   <div className='flex flex-row justify-between  items-start gap-x-28'>

     <div>

<table class="text-left lg:min-w-4/5 bg-white text-sm font-light border-collapse  border-2 border-slate-400">
<thead class="border-b font-medium dark:border-neutral-500  ">
<tr >
  <th className="px-6 py-4 ">First Name</th>
  <th className="px-6 py-4 ">Hire Date</th>
  <th className="px-6 py-4 ">Salary</th>

</tr>
</thead>
<tbody>
{employeeData && employeeData.map((dt, i) => (
<tr className="border-b dark:border-neutral-500 text-center" key={i}  onClick={() => toggleSidebar(dt)}>
  <th className="whitespace-nowrap px-6 py-4">{dt.firstName}</th>
  <th className="whitespace-nowrap px-6 py-4">{dt.hireDate}</th>
  <th className="whitespace-nowrap px-6 py-4">{dt.salary}</th>

</tr>

))

}


</tbody>
</table>
<Sidebar thirdData={selectedTicket}  isOpen={isOpen} setIsOpen={setIsOpen} setTriggered={setTriggered} triggered={triggered}/>
<AddEmployerSideBar isOpen={type} setIsOpen={setType}/>
</div>


<button onClick={addEmployerSide}>Add Employer Button</button>

   </div>
  )
}

export default AdminEmployers