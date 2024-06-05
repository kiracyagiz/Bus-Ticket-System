import React, { useState } from "react";
import { Modal } from "antd";
import PaymentCard from "../Payment/PaymentCard";
import QRCode from "react-qr-code";
import { useRouter } from "next/navigation";

const ReceiptModal = ({ isOpen, setIsOpen, ticketData, formData, handleTicketInfoFormSubmit,id}) => {


  const router = useRouter()

  const handleClose = () => {
    setIsOpen(false);
    router.push("/")

  };

  const [type, setType] = useState(false);



  return (
    <Modal
      title="Receipt"
      visible={isOpen}
      onCancel={handleClose}
      footer={null}
    >
      {/* Receipt content */}
      {!type ? (
        <PaymentCard setType={setType} handleTicketInfoFormSubmit={handleTicketInfoFormSubmit} formData={formData} />
      ) : (
        <div className="flex h-1/3 w-full items-center justify-center ">
          <div className="w-full h-full rounded bg-gray-50 px-6 pt-8 shadow-lg">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="chippz" className="mx-auto w-16 py-4" />
            <div className="flex flex-col justify-center items-center gap-2">
              <h4 className="font-semibold">Business Name</h4>
              <p className="text-xs">Some address goes here</p>
            </div>
            <div className="flex flex-col gap-3 border-b py-6 text-xs">
              <p className="flex justify-between">
                <span className="text-gray-400">Arrival City:</span>
                <span>{ticketData[0].arrivalCity}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Arrival Time:</span>
                <span>{ticketData[0].arrivalTime}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Departure City:</span>
                <span>{ticketData[0].departureCity}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Departure Time</span>
                <span className="text-black">{ticketData[0].departureTime}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Route</span>
                <span className="text-black">{ticketData[0].route}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Price</span>
                <span className="text-black">{ticketData[0].price}</span>
              </p>
          
              <div className=" border-b border border-dashed"></div>
              <div className="py-4 justify-center items-center flex flex-col gap-2">
                <p className="flex gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M11.05 14.95L9.2 16.8c-.39.39-1.01.39-1.41.01-.11-.11-.22-.21-.33-.32a28.414 28.414 0 01-2.79-3.27c-.82-1.14-1.48-2.28-1.96-3.41C2.24 8.67 2 7.58 2 6.54c0-.68.12-1.33.36-1.93.24-.61.62-1.17 1.15-1.67C4.15 2.31 4.85 2 5.59 2c.28 0 .56.06.81.18.26.12.49.3.67.56l2.32 3.27c.18.25.31.48.4.7.09.21.14.42.14.61 0 .24-.07.48-.21.71-.13.23-.32.47-.56.71l-.76.79c-.11.11-.16.24-.16.4 0 .08.01.15.03.23.03.08.06.14.08.2.18.33.49.76.93 1.28.45.52.93 1.05 1.45 1.58.1.1.21.2.31.3.4.39.41 1.03.01 1.43zM21.97 18.33a2.54 2.54 0 01-.25 1.09c-.17.36-.39.7-.68 1.02-.49.54-1.03.93-1.64 1.18-.01 0-.02.01-.03.01-.59.24-1.23.37-1.92.37-1.02 0-2.11-.24-3.26-.73s-2.3-1.15-3.44-1.98c-.39-.29-.78-.58-1.15-.89l3.27-3.27c.28.21.53.37.74.48.05.02.11.05.18.08.08.03.16.04.25.04.17 0 .3-.06.41-.17l.76-.75c.25-.25.49-.44.72-.56.23-.14.46-.21.71-.21.19 0 .39.04.61.13.22.09.45.22.7.39l3.31 2.35c.26.18.44.39.55.64.1.25.16.5.16.78z" fill="#000"></path>
                  </svg> {formData.mail}
                </p>
                <p className="flex gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path fill="#000" d="M11.05 14.95L9.2 16.8c-.39.39-1.01.39-1.41.01-.11-.11-.22-.21-.33-.32a28.414 28.414 0 01-2.79-3.27c-.82-1.14-1.48-2.28-1.96-3.41C2.24 8.67 2 7.58 2 6.54c0-.68.12-1.33.36-1.93.24-.61.62-1.17 1.15-1.67C4.15 2.31 4.85 2 5.59 2c.28 0 .56.06.81.18.26.12.49.3.67.56l2.32 3.27c.18.25.31.48.4.7.09.21.14.42.14.61 0 .24-.07.48-.21.71-.13.23-.32.47-.56.71l-.76.79c-.11.11-.16.24-.16.4 0 .08.01.15.03.23.03.08.06.14.08.2.18.33.49.76.93 1.28.45.52.93 1.05 1.45 1.58.1.1.21.2.31.3.4.39.41 1.03.01 1.43zM21.97 18.33a2.54 2.54 0 01-.25 1.09c-.17.36-.39.7-.68 1.02-.49.54-1.03.93-1.64 1.18-.01 0-.02.01-.03.01-.59.24-1.23.37-1.92.37-1.02 0-2.11-.24-3.26-.73s-2.3-1.15-3.44-1.98c-.39-.29-.78-.58-1.15-.89l3.27-3.27c.28.21.53.37.74.48.05.02.11.05.18.08.08.03.16.04.25.04.17 0 .3-.06.41-.17l.76-.75c.25-.25.49-.44.72-.56.23-.14.46-.21.71-.21.19 0 .39.04.61.13.22.09.45.22.7.39l3.31 2.35c.26.18.44.39.55.64.1.25.16.5.16.78z"></path>
                  </svg> {formData.phoneNumber}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <QRCode size={150} className="m-8" value={`https://665fa4393df41500081c53ba--enchanting-paprenjak-d70bb1.netlify.app/ticketInfo/${id}`} />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ReceiptModal;
