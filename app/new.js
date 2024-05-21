const { addDoc, collection} = require("firebase/firestore");
const { db } = require("./firebase");

 const addTicket = async(newTicketData) => { 
    try {
      const collectionRef = collection(db,"busTickets");
      const newTicketRef = await addDoc(collectionRef,newTicketData);
      return newTicketRef.id
      
    } catch (error) {
      console.log("There was an error happened  whil add data to busTickets")
      return null
    }
  }
// Function to generate ticket data for a given day
const generateTicketData = (date) => {
  const departureCities = ["Tirana", "Durres"];
  const arrivalCities = ["Tirana", "Durres"];
  const departureTimes = ["09:00", "13:00", "15:00", "18:00"];
  const arrivalTimes = ["09:10", "10:10", "14:10", "16:10", "19:10"];
  const prices = ["500 Leke", "550 Leke"];

  const tickets = [];

  for (let i = 0; i < 5; i++) {
    const departureCity = departureCities[Math.floor(Math.random() * departureCities.length)];
    const arrivalCity = arrivalCities[Math.floor(Math.random() * arrivalCities.length)];
    const departureTime = departureTimes[Math.floor(Math.random() * departureTimes.length)];
    const arrivalTime = arrivalTimes[Math.floor(Math.random() * arrivalTimes.length)];
    const price = prices[Math.floor(Math.random() * prices.length)];

    const ticketData = {
      route: `${departureCity}-${arrivalCity}`,
      departureCity: departureCity,
      departureTime: departureTime,
      arrivalCity: arrivalCity,
      arrivalTime: arrivalTime,
      price: price,
      rideDate: date,
      seats: ["Male", "Female", "Male", "Male", " ", "Female", "Male", " ", "Female", " ", " ", "Male", " ", " ", " ", " ", " ", " ", " ", ""],
      companyId: "F97itoLiKOUfm39IawL8H6TZUjD2", // Replace this with your actual company ID
    };

    tickets.push(ticketData);
  }

  return tickets;
};

// Function to add tickets for 90 days
const addTicketsFor90Days = async () => {
  const startDate = new Date(); // Start from today
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 90); // End after 90 days

  const ticketPromises = [];

  // Loop through each day
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    const formattedDate = date.toISOString().slice(0, 10); // Format date as YYYY-MM-DD
    const ticketsForDay = generateTicketData(formattedDate);
    
    // Add each ticket for the day
    ticketsForDay.forEach(ticketData => {
      ticketPromises.push(addTicket(ticketData));
    });
  }

  try {
    await Promise.all(ticketPromises);
    console.log("Tickets added successfully for 90 days.");
  } catch (error) {
    console.error("Error adding tickets:", error);
  }
};

// Call the function to add tickets for 90 days
addTicketsFor90Days();
