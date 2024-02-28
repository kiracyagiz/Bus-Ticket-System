
import React from 'react'
import { useState } from 'react'
import ConfigureSidebar from './ConfigureSidebar'
import { IoIosCloseCircleOutline } from "react-icons/io";
import Link from 'next/link';

const AdminDefaultComponent = () => {

  const defaultButtons = [
    {
      "title": "All Tickets",
       "suitable": true,
       "link": "allTickets"
    },
    {
      "title": "Add Tickets",
      "suitable": true,
      "link": "table"
    },
     {
      "title": "Monthly Tickets",
      "suitable": true,
      "link": "monthlyTickets"
     },
     {
       "title": "Employers",
       "suitable": true,
       "link": "allEmployers"
     },
     {
       "title": "Buses",
       "suitable": true,
       "link": "allBuses"
     },
     
  ]

  const [buttons,setButtons] = useState(defaultButtons)
  const [isOpen,setIsOpen] = useState(false)

  const toggleSuitable = (index) => {
    const updatedButtons = [...buttons]
    updatedButtons[index].suitable = !updatedButtons[index].suitable
    setButtons(updatedButtons)
  }
  
  return (
    <div className='flex flex-col relative pt-14 pl-28 justify-center  items-center'>
        <ConfigureSidebar isOpen={isOpen} setIsOpen={setIsOpen} buttons={buttons} toggleSuitable={toggleSuitable}/>


        <div className='flex flex-wrap w-2/4   gap-4 justify-center items-center'>
        {buttons.map((dt,i)=> (
          <div className='w-48 h-28' key={i}>
          {dt.suitable && 
            <Link
            href={isOpen ? 
            ''
            : 
            {
              pathname: '/admin',
              query: {
                componentName: dt.link,
              }
            }
            }
            >
            <div className='relative w-48 h-28 flex flex-col justify-center items-center cursor-pointer border-black border-2' >
              <div className={isOpen ? 'absolute top-0 right-0' : 'hidden '} onClick={() => toggleSuitable(i)}>
                <IoIosCloseCircleOutline size={20}/>
              </div>
              {dt.title}
            </div>
            </Link>
          }
        </div>
        ))}
        </div>


      <button className='p-4' onClick={() => setIsOpen(true)}>Configuration</button>

    </div>
  )
}

export default AdminDefaultComponent