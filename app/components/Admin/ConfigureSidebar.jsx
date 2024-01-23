import React from 'react'

const ConfigureSidebar = ({isOpen,setIsOpen,toggleSuitable,buttons}) => {
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
      };
  return (
    <div
    className={`fixed top-0 right-0 h-full bg-gray-800 text-white p-4 transition-transform transform ${
      isOpen ? "w-1/4" : "translate-x-full"
    }`}
  >
    <button onClick={toggleSidebar} className="text-white focus:outline-none">
      {isOpen ? "Close Sidebar" : "Open Sidebar"}
    </button>
    <div className="flex  flex-col mt-4 justify-center ">
        {buttons.map((dt,i) => (
             <div>
                {dt.suitable ? '' : <p onClick={()=> toggleSuitable(i)}>{dt.title}</p>}
             </div>
        ))}
    </div>
  </div>
  )
}

export default ConfigureSidebar