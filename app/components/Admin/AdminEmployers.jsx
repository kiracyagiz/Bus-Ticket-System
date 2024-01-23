import React, { useState,useEffect } from 'react'
import { getEmployersData } from '@/app/collection'
import { useRouter } from "next/navigation";

const AdminEmployers = ({searchParams}) => {

  const route = useRouter();

  const [employeeData,setEmployeeData] = useState();
  const [employeeId,setEmployeeId] = useState('');
  const [hireDate,setHireDate] = useState('');
  const [salary,setSalary] = useState('');


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketsData = await getEmployersData(searchParams);
        setEmployeeData(ticketsData);
        console.log(ticketsData,'myTicketData')
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchData();
  }, [searchParams]);


  useEffect(() => {
    route.push(`/admin?componentName=allEmployers&employeeId=${employeeId}&hireDate=${hireDate}&salary=${salary}
    `)
 }, [employeeId,hireDate,salary])
  return (
    <div>
        <table class="text-left lg:min-w-4/5 bg-white text-sm font-light border-collapse  border-2 border-slate-400">
      <thead class="border-b font-medium dark:border-neutral-500 text-center ">
        <tr >
          <th className="px-6 py-4 ">EmployeeId</th>
          <th className="px-6 py-4 ">Hire Date</th>
          <th className="px-6 py-4 ">Salary</th>

        </tr>
      </thead>
      <tbody>
        {employeeData && employeeData.map((dt, i) => (
        <tr className="border-b dark:border-neutral-500 text-center" key={i} >
          <th className="whitespace-nowrap px-6 py-4">{dt.employeeId}</th>
          <th className="whitespace-nowrap px-6 py-4">{dt.hireDate}</th>
          <th className="whitespace-nowrap px-6 py-4">{dt.salary}</th>

        </tr>

      ))
      
      }

       
      </tbody>
    </table>
    </div>
  )
}

export default AdminEmployers