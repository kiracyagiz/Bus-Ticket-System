"use client";

import { db } from "./firebase";
import {
  getDocs,
  query,
  collection,
  where,
  DocumentData,
  addDoc
} from "firebase/firestore";

export const getTicket = async () => {
  try {
    const collectionRef = collection(db, "busTickets");
    const querySnapshot = await getDocs(collectionRef);

    const ticketDataArray = [];
    querySnapshot.forEach((doc) => {
      const ticketData = doc.data();
      ticketDataArray.push(ticketData);
    });

    return ticketDataArray;
  } catch (error) {
    console.error("Belgeler alınamadı:", error);
    return null; // veya istediğiniz bir değer
  }
};

export const getSelectedTicket = async (searchParams) => {
  try {
       
  

    const collectionRef = collection(db, "busTickets");
    const q = query(
      collectionRef,
      where(searchParams.departureCity && "departureCity", "==", searchParams.departureCity),
      where(searchParams.arrivalCity && "arrivalCity", "==", searchParams.arrivalCity),
      where(searchParams.rideDate && "rideDate", "==", searchParams.rideDate)
    );
    const querySnapshot = await getDocs(q);

    const ticketDataArray = [];
    querySnapshot.forEach((doc) => {
      const ticketData = doc.data();
      const ticketWithId = { ...ticketData, id: doc.id };
      ticketDataArray.push(ticketWithId);
    });
    return ticketDataArray;
  } catch (error) {
    console.error("Belgeler alınamadı:", error);
    return null;
  }
};


export const getEmployersData = async(searchParams) => {
  try {
    const employeeId = searchParams.get('employeeId');
    const hireDate = searchParams.get('hireDate');
    const salary = searchParams.get('salary');

    const collectionRef = collection(db,'employee');

    let q = collectionRef;

    if(employeeId && employeeId.length > 0 ){
      q = query(q,where('employeeId','==',employeeId))
    }
    if(hireDate && hireDate.length > 0 )
    {
      q = query(q,where('hireDate','==',hireDate))
    }
    if(salary && salary.length > 0){
      q = query(q,where('salary','==',salary))
    }
    const querySnapshot = await getDocs(q);

    const employeeData = [];
    querySnapshot.forEach((doc) => {
      const employeData = doc.data();
      const ticketWithId = { ...employeData, id: doc.id };
      employeeData.push(ticketWithId);
    });
    return employeeData;
  } catch (error) {
    console.error("Belgeler alınamadı:", error);
    return null;
  }
}


export const getFilteredData = async (searchParams) => {
  try {
       const arrivalCity = searchParams.get('arrivalCity')
       const departureCity = searchParams.get('departureCity')
       const departureTime = searchParams.get('departureTime')
       const rideDate = searchParams.get('rideDate')
       const arrivalTime = searchParams.get('arrivalTime');
      //  console.log(departureCity,'myDepartureCity')
       const collectionRef = collection(db, "busTickets");
       let q = collectionRef;
   
       if (arrivalCity && arrivalCity.length > 0) {
        q = query(q, where("arrivalCity", "==", arrivalCity));
      } 
      if(arrivalTime && arrivalTime.length > 0){
        q = query(q,where('arrivalTime','==',arrivalTime));
      }
  
      if (departureCity && departureCity.length > 0) {
        q = query(q, where("departureCity", "==", departureCity));
      }
      if (departureTime) {
        q = query(q, where("departureTime", "==", departureTime));
      } 
      if (rideDate && rideDate.length > 0) {
        q = query(q, where("rideDate", "==", rideDate));
      } 
     
    const querySnapshot = await getDocs(q);

    const ticketDataArray = [];
    querySnapshot.forEach((doc) => {
      const ticketData = doc.data();
      const ticketWithId = { ...ticketData, id: doc.id };
      ticketDataArray.push(ticketWithId);
    });
    return ticketDataArray;
  } catch (error) {
    console.error("Belgeler alınamadı:", error);
    return null;
  }
};


export const getCheckoutTicket = async (searchParams) => {
  try {
    const collectionRef = collection(db, "busTickets");
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);

    const ticketDataArray = [];
    querySnapshot.forEach((doc) => {
      const ticketData = doc.data();
      if (doc.id == searchParams.selectedTicket) {
        ticketDataArray.push(ticketData);
      }
    });
    return ticketDataArray;
  } catch (error) {
    console.error("Belgeler alınamadı:", error);
    return null;
  }
};

export const getAllTickets = async () => {
    try {
      const collectionRef = collection(db, "busTickets");
      const q = query(collectionRef);
      const querySnapshot = await getDocs(q);
  
      const ticketDataArray = [];
      querySnapshot.forEach((doc) => {
        const ticketData = doc.data();
        const ticketWithId = { ...ticketData, id: doc.id };
        ticketDataArray.push(ticketWithId);
      });
      return ticketDataArray;
    } catch (error) {
      console.error("Belgeler alınamadı:", error);
      return null;
    }
  };

  export const addTicket = async(newTicketData) => {
    try {
      const collectionRef = collection(db,"busTickets");
      const newTicketRef = await addDoc(collectionRef,newTicketData);
      return newTicketRef.id
      
    } catch (error) {
      console.log("There was an error happened  whil add data to busTickets")
      return null
    }
  }


  