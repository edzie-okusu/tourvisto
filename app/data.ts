  // const dashboardStats = {
  //   totalUsers: 1237,
  //   usersJoined: { currentMonth: 218, lastMonth: 176 },
  //   totalTrips: 118,
  //   tripsCreated: { currentMonth: 6, lastMonth: 2 },
  //   userRole: { total: 62, currentMonth: 63, lastMonth: 78 },
  // };

  //   const allTrips = [{
  //     id: 1,
  //     name: "Tropical Rewind",
  //     imageUrls: ["/assets/images/sample1.jpg"],
  //     itinerary: [{ location: "Thailand" }],
  //     tags: ["Adventure", "Culture"],
  //     travelStyle: "Solo",
  //     estimatedPrice: "$1,000",
  //   },
  //   {
  //     id: 2,
  //     name: "French Reverie",
  //     imageUrls: ["/assets/images/sample2.jpg"],
  //     itinerary: [{ location: "Paris" }],
  //     tags: ["Relaxation", "Culinary"],
  //     travelStyle: "Family",
  //     estimatedPrice: "$2,000",
  //   },
  //   {
  //     id: 3,
  //     name: "Zen Break",
  //     imageUrls: ["/assets/images/sample3.jpg"],
  //     itinerary: [{ location: "Japan" }],
  //     tags: ["Shopping", "Luxury"],
  //     travelStyle: "Couple",
  //     estimatedPrice: "$3,000",
  //   },
  //   {
  //     id: 4,
  //     name: "Adventure in Westeros",
  //     imageUrls: ["/assets/images/sample4.jpg"],
  //     itinerary: [{ location: "Croatia" }],
  //     tags: ["Historical", "Culture"],
  //     travelStyle: "Friends",
  //     estimatedPrice: "$4,000",
  //   },
  //   ];

  //   const users = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     email: "john.doe@example.com",
  //     imageUrl: "/assets/images/david.webp",
  //     dateJoined: formatDate("2025-01-01"),
  //     itineraryCreated: 10,
  //     status: "user",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     email: "jane.smith@example.com",
  //     imageUrl: "/assets/images/david.webp",
  //     dateJoined: formatDate("2025-01-02"),
  //     itineraryCreated: 4,
  //     status: "user",
  //   },
  //   {
  //     id: 3,
  //     name: "John Smith",
  //     email: "john.smith@example.com",
  //     imageUrl: "/assets/images/david.webp",
  //     dateJoined: formatDate("2025-01-03"),
  //     itineraryCreated: 8,
  //     status: "admin",
  //   },
  // ];

  // const prompt = `Generate a ${numberOfDays}-day travel itinerary for ${country} based on the following user information:
  //   Budget: '${budget}'
  //   Interests: '${interests}'
  //   TravelStyle: '${travelStyle}'
  //   GroupType: '${groupType}'
  //   Return the itinerary and lowest estimated price in a clean, non-markdown JSON format with the following structure:
  //   {
  //   "name": "A descriptive title for the trip",
  //   "description": "A brief description of the trip and its highlights not exceeding 100 words",
  //   "estimatedPrice": "Lowest average price for the trip in USD, e.g.$price",
  //   "duration": ${numberOfDays},
  //   "budget": "${budget}",
  //   "travelStyle": "${travelStyle}",
  //   "country": "${country}",
  //   "interests": ${interests},
  //   "groupType": "${groupType}",
  //   "bestTimeToVisit": [
  //     '🌸 Season (from month to month): reason to visit',
  //     '☀️ Season (from month to month): reason to visit',
  //     '🍁 Season (from month to month): reason to visit',
  //     '❄️ Season (from month to month): reason to visit'
  //   ],
  //   "weatherInfo": [
  //     '☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
  //     '🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
  //     '🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
  //     '❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)'
  //   ],
  //   "location": {
  //     "city": "name of the city or region",
  //     "coordinates": [latitude, longitude],
  //     "openStreetMap": "link to open street map"
  //   },
  //   "itinerary": [
  //   {
  //     "day": 1,
  //     "location": "City/Region Name",
  //     "activities": [
  //       {"time": "Morning", "description": "🏰 Visit the local historic castle and enjoy a scenic walk"},
  //       {"time": "Afternoon", "description": "🖼️ Explore a famous art museum with a guided tour"},
  //       {"time": "Evening", "description": "🍷 Dine at a rooftop restaurant with local wine"}
  //     ]
  //   },
  //   ...
  //   ]
  //   }`;