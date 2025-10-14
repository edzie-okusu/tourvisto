import {type ActionFunctionArgs, data} from "react-router";
import {parseMarkdownToJson} from "~/lib/utils";
import {GoogleGenerativeAI} from "@google/generative-ai";
// import {admin} from "~/firebase/admin";
import {doc, serverTimestamp, setDoc} from "@firebase/firestore";
import {db} from "~/firebase/client";

const saveTripToFirestore = async (tripData: any, userId: string, ) => {
    const tripWithUser = {
        ...tripData,
        userId,
        createdAt:serverTimestamp(),
    };
    // const tripRef = await db.collection("trips").add(tripWithUser);
    const tripRef = await setDoc(doc(db, 'trips', userId), tripWithUser, {merge: true})
    return tripRef;
}

export const action = async ({request}: ActionFunctionArgs) => {
    const {
        country,
        numberOfDays,
        travelStyle,
        interests,
        budget,
        groupType,
        userId,
    } = await request.json();

    //npm install @google/generative-ai

    // @ts-ignore
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const unsplashApiKey = process.env.UNSPLASH_ACCESS_KEY!;

    try {
        const prompt = `Generate a ${numberOfDays}-day travel itinerary for ${country} based on the following user information:
    Budget: '${budget}'
    Interests: '${interests}'
    TravelStyle: '${travelStyle}'
    GroupType: '${groupType}'
    Return the itinerary and lowest estimated price in a clean, non-markdown JSON format with the following structure:
    {
    "name": "A descriptive title for the trip",
    "description": "A brief description of the trip and its highlights not exceeding 100 words",
    "estimatedPrice": "Lowest average price for the trip in USD, e.g.$price",
    "duration": ${numberOfDays},
    "budget": "${budget}",
    "travelStyle": "${travelStyle}",
    "country": "${country}",
    "interests": ${interests},
    "groupType": "${groupType}",
    "bestTimeToVisit": [
      '🌸 Season (from month to month): reason to visit',
      '☀️ Season (from month to month): reason to visit',
      '🍁 Season (from month to month): reason to visit',
      '❄️ Season (from month to month): reason to visit'
    ],
    "weatherInfo": [
      '☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
      '🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
      '🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
      '❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)'
    ],
    "location": {
      "city": "name of the city or region",
      "coordinates": [latitude, longitude],
      "openStreetMap": "link to open street map"
    },
    "itinerary": [
    {
      "day": 1,
      "location": "City/Region Name",
      "activities": [
        {"time": "Morning", "description": "🏰 Visit the local historic castle and enjoy a scenic walk"},
        {"time": "Afternoon", "description": "🖼️ Explore a famous art museum with a guided tour"},
        {"time": "Evening", "description": "🍷 Dine at a rooftop restaurant with local wine"}
      ]
    },
    ...
    ]
    }`;

        const textResult = await genAI.getGenerativeModel({model: 'gemini-2.0-flash'}).generateContent([prompt]);
        const trip = parseMarkdownToJson(textResult.response.text())
        // const imageResponse = await fetch(
        //     `https://api.unsplash.com/search/photos?query=${country} ${interests}&client_id=${unsplashApiKey}`
        // )

        // const imageUrls = (await imageResponse.json()).results.slice(0,3).map((result:any)=> result.url?.regular || null)

        //     create trip in db
        const tripId = await saveTripToFirestore(trip, userId);
        return data(tripId);


    } catch (e) {
        console.error('An error occurred generating travel plan:', e);
    }

}