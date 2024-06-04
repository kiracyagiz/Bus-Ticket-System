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
  deleteDoc,
  setDoc
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



export const getCompany = async (uid) => {
  try {
    const companyDocRef = doc(db, "companies", uid);
    const companyDocSnapshot = await getDoc(companyDocRef);

    if (companyDocSnapshot.exists()) {
      return companyDocSnapshot.data();
    } else {
      console.error("Company does not exist");
      return null; // or any other value you prefer
    }
  } catch (error) {
    console.error("Error getting company:", error);
    return null; // or any other value you prefer
  }
};
export const createCompany = async (uid, companyName,email,image) => {
  try {
    const companyDocRef = doc(db, "companies", uid);
    await setDoc(companyDocRef, { name: companyName , companyName: email,image: image});
    console.log("Company created successfully");
    return true;
  } catch (error) {
    console.error("Error creating company:", error);
    return false;
  }
};


export const updateCompany = async (uid, updatedData) => {
  try {
    const companyDocRef = doc(db, "companies", uid);
    await updateDoc(companyDocRef, updatedData);
    return true; // Return true if update is successful
  } catch (error) {
    console.error("Error updating company:", error);
    throw error; // Throw error if update fails
  }
};

export const deleteCompany = async (uid) => {
  try {
    const companyDocRef = doc(db, "companies", uid);
    await deleteDoc(companyDocRef);
    return true; // Return true if deletion is successful
  } catch (error) {
    console.error("Error deleting company:", error);
    throw error; // Throw error if deletion fails
  }
};

export const deletBuses = async (uid) => {
  try {
    const companyDocRef = doc(db, "buses", uid);
    await deleteDoc(companyDocRef);
    return true; // Return true if deletion is successful
  } catch (error) {
    console.error("Error deleting company:", error);
    throw error; // Throw error if deletion fails
  }
};

export const getSelectedTicket = async (searchParams) => {
  try {
       
  
    console.log(searchParams,"searchparams")

    const collectionRef = collection(db, "busTickets");
    const q = query(
      collectionRef,
      where(searchParams.departureCity && "departureCity", "==", searchParams.departureCity),
      where(searchParams.arrivalCity && "arrivalCity", "==", searchParams.arrivalCity),
      where(searchParams.rideDate && "rideDate", "==", searchParams.date   )
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


export const getEmployersData = async (searchParams, uid) => {
  try {
    const employeeId = searchParams.get('employeeId');
    const hireDate = searchParams.get('hireDate');
    const salary = searchParams.get('salary');

    const collectionRef = collection(db, 'employee');

    let q = collectionRef;

    if (employeeId && employeeId.length > 0) {
      q = query(q, where('employeeId', '==', employeeId));
    }
    if (hireDate && hireDate.length > 0) {
      q = query(q, where('hireDate', '==', hireDate));
    }
    if (salary && salary.length > 0) {
      q = query(q, where('salary', '==', salary));
    }

    const querySnapshot = await getDocs(q);

    const employeeData = [];
    querySnapshot.forEach((doc) => {
      const employeData = doc.data();
      // Check if the companyId matches the provided UID
      if (employeData.companyId === uid) {
        const ticketWithId = { ...employeData, id: doc.id };
        employeeData.push(ticketWithId);
      }
    });
    return employeeData;
  } catch (error) {
    console.error("Belgeler alınamadı:", error);
    return null;
  }
};



export const getFilteredData = async (searchParams, uid) => {
  try {
    const arrivalCity = searchParams.get('arrivalCity');
    const departureCity = searchParams.get('departureCity');
    const departureTime = searchParams.get('departureTime');
    const rideDate = searchParams.get('rideDate');
    const arrivalTime = searchParams.get('arrivalTime');
    
    const collectionRef = collection(db, "busTickets");
    let q = collectionRef;

    if (arrivalCity && arrivalCity.length > 0) {
      q = query(q, where("arrivalCity", "==", arrivalCity));
    } 
    if (arrivalTime && arrivalTime.length > 0) {
      q = query(q, where('arrivalTime', '==', arrivalTime));
    }
    if (departureCity && departureCity.length > 0) {
      q = query(q, where("departureCity", "==", departureCity));
    }
    if (departureTime && departureTime.length > 0) {
      q = query(q, where("departureTime", "==", departureTime));
    } 
    if (rideDate && rideDate.length > 0) {
      q = query(q, where("rideDate", "==", rideDate));
    } 
    
    const querySnapshot = await getDocs(q);

    const ticketDataArray = [];
    querySnapshot.forEach((doc) => {
      const ticketData = doc.data();
      // Check if the companyId matches the provided UID
      if (ticketData.companyId === uid) {
        const ticketWithId = { ...ticketData, id: doc.id };
        ticketDataArray.push(ticketWithId);
      }
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


export const updateSeatData = async (ticketId, seatIndex, gender) => {
  try {
    const ticketRef = doc(db, "busTickets", ticketId);
    const ticketSnapshot = await getDoc(ticketRef);
    if (ticketSnapshot.exists()) {
      const ticketData = ticketSnapshot.data();
      if (ticketData && ticketData.seats && seatIndex >= 0 && seatIndex < ticketData.seats.length) {
        const updatedSeats = [...ticketData.seats]; // Copy the existing seats array
        updatedSeats[seatIndex] = gender; // Update the selected seat with the gender
        await setDoc(ticketRef, { seats: updatedSeats }, { merge: true });
        console.log(`Seat data updated for ticket with ID ${ticketId}`);
      } else {
        console.error("Invalid ticket data or seat index out of range.");
      }
    } else {
      console.error("Ticket document not found.");
    }
  } catch (error) {
    console.error("Error updating seat data:", error);
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


  export const getCompanies = async () => {
    try {
      const collectionRef = collection(db, "companies");
      const q = query(collectionRef);
      const querySnapshot = await getDocs(q);
  
      const companyDataArray = [];
      querySnapshot.forEach((doc) => {
        const companyData = doc.data();
        const companyWithId = { ...companyData, id: doc.id };
        companyDataArray.push(companyWithId);
      });
      return companyDataArray;
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

    console.log(newTicketInfoData,"aaaa")
    try {
      const collectionRef = collection(db, "ticketInformation");
  
      const newTicketInfoRef = await addDoc(collectionRef, newTicketInfoData);
  
      return newTicketInfoData;
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