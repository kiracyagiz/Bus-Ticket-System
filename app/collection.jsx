"use client";

import { db } from "./firebase";
import {
  getDocs,
  query,
  collection,
  where,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  deleteDoc
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


  export const updateTicketFireBase = async (ticketId, newData) => {
    try {
      const collectionRef = collection(db, 'busTickets');
      const docRef = doc(collectionRef, ticketId);
  
      const documentSnapshot = await getDoc(docRef);
  
      if (documentSnapshot.exists()) {
        await updateDoc(docRef, newData);
        console.log('Data updated successfully');
      } else {
        console.log('Document not found');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  

  export const deleteTicketFirebase = async (ticketId) => {
    try {
      const collectionRef = collection(db, 'busTickets');
      const docRef = doc(collectionRef, ticketId);
  
      const documentSnapshot = await getDoc(docRef);
  
      if (documentSnapshot.exists()) {
        await deleteDoc(docRef);
        console.log('Document deleted successfully');
      } else {
        console.log('Document not found');
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };


  export const getBusData = async () => {
    try {
      const collectionRef = collection(db, "buses");
      const querySnapshot = await getDocs(collectionRef);
  
      const busDataAray = [];
      querySnapshot.forEach((doc) => {
        const busData = doc.data();
        busDataAray.push(busData);
      });
  
      return busDataAray;
    } catch (error) {
      console.error("Belgeler alınamadı:", error);
      return null; 
    }
  };

  export const deleteEmployeeFirebase = async (employeeId) => {
    try {
      const collectionRef = collection(db, 'employee');
      const q = query(collectionRef, where('employeeId', '==', employeeId));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach(async (employeeDoc) => {
        const docRef = doc(collectionRef, employeeDoc.id);
        await deleteDoc(docRef);
  
        await updateBusesWithEmployeeId(employeeId, 'not-selected');
      });
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };


  
  const updateBusesWithEmployeeId = async (employeeId, newEmployeeId) => {
    try {
      const busesCollectionRef = collection(db, 'buses');
      const q = query(busesCollectionRef, where('employeeId', '==', employeeId));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach(async (busDoc) => {
        const busData = busDoc.data();
        const busDocRef = doc(busesCollectionRef, busDoc.id);
  
        await updateDoc(busDocRef, { employeeId: newEmployeeId });
      });
  
      console.log('Buses collection updated successfully');
    } catch (error) {
      console.error('Error updating buses collection:', error);
    }
  };

  export const addTicketInformation = async (newTicketInfoData) => {
    try {
      const collectionRef = collection(db, "ticketInformation");
  
      const newTicketInfoRef = await addDoc(collectionRef, newTicketInfoData);
  
      return newTicketInfoRef.id;
    } catch (error) {
      console.error("Error adding ticket information:", error);
      return null;
    }
  };

  export const getTicketInformationById = async (ticketInfoId) => {
    try {
      const ticketInfoDocRef = doc(db, "ticketInformation", ticketInfoId);
      const ticketInfoDocSnapshot = await getDoc(ticketInfoDocRef);
  
      if (ticketInfoDocSnapshot.exists()) {
        const ticketInfoData = ticketInfoDocSnapshot.data();
        return ticketInfoData;
      } else {
        console.log(`Ticket information with ID ${ticketInfoId} not found`);
        return null;
      }
    } catch (error) {
      console.error("Error retrieving ticket information:", error);
      return null;
    }
  };