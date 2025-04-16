import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel Address, Price, hotel image url,geo coordinates,rating,descriptions and suggest itinery with placeName,Place Details,Place Image Url,Geo Coordinates, ticket Pricing,Time t travel each of the location for 3days with each day plan with best time to visit in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: 'Here\'s a breakdown of the thought process to generate the Las Vegas travel plan:\n\n1.  **Deconstruct the Request:**\n\n    *   **Location:** Las Vegas, Nevada, USA.\n    *   **Duration:** 3 Days.\n    *   **Traveler Type:** Couple.\n    *   **Budget:** Cheap/Budget-conscious.\n    *   **Deliverables:**\n        *   Hotel Options List (JSON format):\n            *   HotelName\n            *   Hotel Address\n            *   Price (Indication of budget-friendliness, not exact real-time price)\n            *   Hotel Image URL\n            *   Geo Coordinates (Latitude, Longitude)\n            *   Rating (e.g., star or user rating)\n            *   Description (Brief, highlighting value/budget aspects)\n        *   3-Day Itinerary (JSON format):\n            *   Organized by Day (Day 1, Day 2, Day 3).\n            *   For each day, a list of activities/places.\n            *   For each place/activity:\n                *   placeName\n                *   Place Details (Description, what to do)\n                *   Place Image URL\n                *   Geo Coordinates (Latitude, Longitude)\n                *   Ticket Pricing (Indication: Free, Low Cost, Variable, or specific if known and stable)\n                *   Time to Travel (Estimated travel time *between* locations, or duration *at* location if more relevant)\n                *   Best Time to Visit (Specific time of day, e.g., evening, morning)\n    *   **Format:** JSON.\n\n2.  **Initial Brainstorming & Strategy (Budget Focus):**\n\n    *   **Budget Lodging:** Las Vegas has extremes. Budget means looking *off-Strip* or at older/less glamorous *Strip* properties. Downtown (Fremont Street) often offers better value than the main Strip. Hostels aren\'t typically the Vegas vibe for couples, so focus on budget hotels. Need to find hotels known for lower prices, maybe slightly dated but clean.\n    *   **Budget Activities:** Vegas *can* be expensive, but many core experiences are free or low-cost:\n        *   Walking the Strip (free).\n        *   Watching the Bellagio Fountains (free).\n        *   Volcano at the Mirage (free - *check if still operational*).\n        *   Fremont Street Experience (free light show).\n        *   Window shopping in high-end malls (free).\n        *   Exploring themed hotels (Venetian, Bellagio Conservatory, etc. - free).\n        *   People-watching (free).\n        *   Maybe one affordable show or attraction.\n        *   Consider happy hours for cheaper drinks/food.\n        *   Buffets (can be budget-friendly *sometimes*, especially lunch or off-peak).\n        *   Downtown Container Park (free entry, unique vibe).\n    *   **Budget Food:** Avoid high-end restaurants. Look for food courts, casual eateries, happy hour deals, maybe bring some snacks/drinks from a store. Consider buffets for value if planned well.\n    *   **Budget Transportation:** Walking is key for nearby Strip locations. The Deuce (bus) or Monorail can be cost-effective for longer Strip distances compared to taxis/rideshares *if* used frequently enough for a pass. Rideshares are convenient but add up. Walking between Downtown and Strip is generally too far.\n    *   **Itinerary Structure:** Logical flow is important. Group nearby activities together each day to minimize travel time/cost. Balance free activities with maybe one paid item per day (or spread them out). Include downtime.\n    *   **Timing:** Evenings are prime time for the Strip\'s lights and shows (Bellagio Fountains, Fremont Street). Daytime can be for exploring hotel interiors, pools (if accessible/affordable), or specific attractions. Vegas is hot, so indoor activities are good midday.\n\n3.  **Data Gathering & Selection (Simulated):**\n\n    *   **Hotels:**\n        *   Search for "budget hotels Las Vegas", "cheap hotels Fremont Street", "off-Strip hotels Las Vegas".\n        *   Filter for options known for value: Excalibur, Luxor (older Strip), Circus Circus (very budget, family-oriented but cheap), hotels Downtown (Golden Nugget - sometimes pricier, El Cortez, The D, Four Queens), maybe some off-Strip options like Ellis Island or Tuscany Suites.\n        *   *Self-Correction:* Need specific addresses, plausible price ranges (e.g., "$", "$$"), representative ratings (e.g., 3-4 stars), brief descriptions emphasizing value, and find sample image URLs and approximate coordinates (using Google Maps). Let\'s pick a few diverse options (Strip, Downtown, Off-Strip).\n            *   *Example Selection:* Excalibur (Strip, budget end), The LINQ (Mid-Strip, often good deals), El Cortez (Downtown, classic value), Tuscany Suites (Off-Strip, quieter, suites).\n    *   **Activities:**\n        *   List core free attractions: Bellagio Fountains, Mirage Volcano (*Update: Check status - looks like it\'s gone/going away, maybe replace with something else like Conservatory*), Welcome to Fabulous Las Vegas Sign, Fremont Street Experience, exploring themed hotels (Venetian canals, Bellagio Conservatory).\n        *   List low-cost options: High Roller Observation Wheel (can find deals), Neon Museum (unique, historical), Mob Museum (interesting), maybe a specific affordable show or happy hour spot.\n        *   Find details: Descriptions, approximate locations (coords), sample image URLs, price estimates (Free, $, $$), best times.\n        *   *Self-Correction:* Need to ensure variety and logical grouping. Mix indoor/outdoor.\n            *   *Day 1:* Arrival, check-in, explore South/Mid-Strip (Welcome Sign, Bellagio Fountains, explore nearby hotels). Evening: Fountains again, maybe a cheap dinner.\n            *   *Day 2:* Explore North Strip/Mid-Strip (Venetian, LINQ Promenade, maybe High Roller if budget allows). Evening: Fremont Street Experience (requires travel - bus/rideshare).\n            *   *Day 3:* Maybe a specific museum (Neon/Mob) or explore a different area. Check-out. Add flexibility for relaxing or revisiting favorites.\n\n4.  **Structuring the JSON:**\n\n    *   Create the main JSON object `{}`.\n    *   Add the `hotelOptions` key with an array `[]` as its value.\n    *   Inside the array, create JSON objects `{}` for each hotel, populating the required fields (HotelName, Hotel Address, Price, hotel image url, geo coordinates {lat, lon}, rating, description). Use placeholder prices like "$ - Budget" or "$$ - Moderate".\n    *   Add the `itinerary` key with an object `{}` as its value.\n    *   Inside the `itinerary` object, add keys `Day 1`, `Day 2`, `Day 3`. Each key will have an array `[]` as its value.\n    *   Inside each day\'s array, create JSON objects `{}` for each activity/place.\n    *   Populate each activity object with the required fields (placeName, Place Details, Place Image Url, Geo Coordinates {lat, lon}, ticket Pricing, Time t travel, Best Time to Visit).\n        *   For `Time t travel`: Clarify if it\'s travel *to* the location or duration *at* the location. Use estimates like "15-20 mins walk" or "Allow 1-2 hours".\n        *   For `ticket Pricing`: Use terms like "Free", "Low Cost (~$20-30)", "Variable", "Check Website".\n        *   For `Best Time to Visit`: "Evening", "Daytime", "Anytime", "After Dark".\n\n5.  **Refining and Reviewing:**\n\n    *   **Budget Check:** Does the itinerary rely heavily on expensive activities? Are the hotel options genuinely budget-friendly? Is transportation cost factored in implicitly (walking focus, suggesting bus)? Yes, the focus is on free sights and walking, with Downtown requiring separate travel.\n    *   **Couple Focus:** Are the activities suitable for a couple? Walking the Strip, fountains, Fremont Street, themed hotels, maybe the High Roller – yes, generally appealing.\n    *   **Feasibility:** Is the 3-day schedule realistic? Does it cram too much in? Does it account for travel time between locations (especially Strip to Downtown)? Looks reasonable, not overly packed.\n    *   **JSON Validity:** Check brackets `{}`, square brackets `[]`, commas `,`, quotes `""`. Ensure keys and values match the requested structure. Use an online JSON validator if unsure.\n    *   **Data Accuracy (Simulated):** Are the coordinates roughly correct? Are the descriptions accurate? Are image URLs representative? (Use placeholder images or search for relevant ones). Are price indications reasonable? *Self-correction: Initially forgot image URLs for places, added them.* *Self-correction: Made sure geo-coordinates have `lat` and `lon` keys.* *Self-correction: Added a note about checking the Mirage Volcano\'s status.* *Self-correction: Added the "Welcome to Las Vegas" sign as a classic photo op.*\n    *   **Clarity:** Is the language clear? Are descriptions helpful? Added details like "wear comfortable shoes" implicitly through the walking-heavy plan.\n\n6.  **Final Output Generation:** Assemble the refined data into the final JSON structure. Add a brief introductory sentence before the JSON block.',
        },
        {
          text: '```json\n{\n  "tripDetails": {\n    "location": "Las Vegas, Nevada, USA",\n    "duration": "3 Days",\n    "travelerType": "Couple",\n    "budget": "Cheap / Budget-Conscious"\n  },\n  "hotelOptions": [\n    {\n      "HotelName": "Excalibur Hotel & Casino",\n      "Hotel Address": "3850 S Las Vegas Blvd, Las Vegas, NV 89109, USA",\n      "Price": "$ - Budget",\n      "hotel_image_url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/d7/b1/6f/exterior.jpg?w=1200&h=-1&s=1",\n      "geo_coordinates": {\n        "lat": 36.1045,\n        "lon": -115.1743\n      },\n      "rating": "3.0 Stars",\n      "description": "Iconic castle-themed hotel on the South Strip. Offers basic, affordable rooms and good access to the Strip tram. Known for its value."\n    },\n    {\n      "HotelName": "The LINQ Hotel + Experience",\n      "Hotel Address": "3535 S Las Vegas Blvd, Las Vegas, NV 89109, USA",\n      "Price": "$$ - Budget/Moderate",\n      "hotel_image_url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/c3/5c/5a/the-linq-hotel-experience.jpg?w=1200&h=-1&s=1",\n      "geo_coordinates": {\n        "lat": 36.1175,\n        "lon": -115.1706\n      },\n      "rating": "3.5 Stars",\n      "description": "Centrally located on the Strip with modern, compact rooms. Often has competitive pricing and provides easy access to the LINQ Promenade and High Roller."\n    },\n    {\n      "HotelName": "El Cortez Hotel & Casino",\n      "Hotel Address": "600 E Fremont St, Las Vegas, NV 89101, USA",\n      "Price": "$ - Budget",\n      "hotel_image_url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/f3/53/1b/el-cortez-hotel-casino.jpg?w=1200&h=-1&s=1",\n      "geo_coordinates": {\n        "lat": 36.1689,\n        "lon": -115.1369\n      },\n      "rating": "3.5 Stars",\n      "description": "Historic, adults-only (21+) hotel in Downtown Las Vegas (Fremont Street). Known for its classic Vegas vibe, low table minimums, and excellent value rooms."\n    },\n    {\n      "HotelName": "Tuscany Suites & Casino",\n      "Hotel Address": "255 E Flamingo Rd, Las Vegas, NV 89169, USA",\n      "Price": "$$ - Budget/Moderate",\n      "hotel_image_url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/1e/84/e5/tuscany-suites-casino.jpg?w=1200&h=-1&s=1",\n      "geo_coordinates": {\n        "lat": 36.1158,\n        "lon": -115.1616\n      },\n      "rating": "3.5 Stars",\n      "description": "Located just off the Strip (short walk). Offers spacious suite-style rooms at competitive prices, often quieter than Strip hotels. Good value for size."\n    },\n    {\n      "HotelName": "Flamingo Las Vegas Hotel & Casino",\n      "Hotel Address": "3555 S Las Vegas Blvd, Las Vegas, NV 89109, USA",\n      "Price": "$$ - Budget/Moderate",\n      "hotel_image_url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/86/f1/fa/exterior.jpg?w=1100&h=-1&s=1",\n      "geo_coordinates": {\n        "lat": 36.1164,\n        "lon": -115.1713\n      },\n      "rating": "3.5 Stars",\n      "description": "Classic Vegas hotel with a prime center-Strip location. Rooms can vary, but often has budget-friendly options (\'GO\' rooms are more updated). Features a wildlife habitat."\n    }\n  ],\n  "itinerary": {\n    "Day 1": [\n      {\n        "placeName": "Arrival & Hotel Check-in",\n        "Place Details": "Arrive in Las Vegas (LAS airport), take a shuttle or rideshare to your chosen budget hotel. Check in and leave your luggage.",\n        "Place Image Url": "https://images.pexels.com/photos/2029731/pexels-photo-2029731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",\n        "Geo Coordinates": {\n          "lat": 36.1146,\n          "lon": -115.1728\n        },\n        "ticket Pricing": "Transportation cost varies (Shuttle ~$15pp, Rideshare ~$20-40 depending on location/time)",\n        "Time t travel": "30-60 minutes from Airport to Hotel",\n        "Best Time to Visit": "Afternoon (standard check-in time)"\n      },\n      {\n        "placeName": "Walk the South/Mid Strip",\n        "Place Details": "Start exploring! Walk north from your hotel (or south if staying mid-strip). See the exteriors of iconic hotels like Luxor, Excalibur, New York-New York, MGM Grand. Wear comfortable shoes!",\n        "Place Image Url": "https://images.pexels.com/photos/1837730/pexels-photo-1837730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",\n        "Geo Coordinates": {\n          "lat": 36.1070,\n          "lon": -115.1740\n        },\n        "ticket Pricing": "Free",\n        "Time t travel": "Allow 2-3 hours (walking)",\n        "Best Time to Visit": "Late Afternoon / Early Evening"\n      },\n      {\n        "placeName": "Bellagio Fountains Show",\n        "Place Details": "Witness the famous free water show synchronized to music in front of the Bellagio Hotel. A must-see Vegas spectacle.",\n        "Place Image Url": "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",\n        "Geo Coordinates": {\n          "lat": 36.1126,\n          "lon": -115.1740\n        },\n        "ticket Pricing": "Free",\n        "Time t travel": "Show lasts a few minutes, runs frequently (check schedule, typically every 30 mins afternoon/early evening, every 15 mins later evening)",\n        "Best Time to Visit": "Evening / After Dark"\n      },\n      {\n        "placeName": "Bellagio Conservatory & Botanical Gardens",\n        "Place Details": "Step inside the Bellagio to see the stunning seasonal displays in the Conservatory. Elaborate floral arrangements change throughout the year. Free to wander.",\n        "Place Image Url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/87/85/9a/bellagio-conservatory.jpg?w=1200&h=-1&s=1",\n        "Geo Coordinates": {\n          "lat": 36.1131,\n          "lon": -115.1749\n        },\n        "ticket Pricing": "Free",\n        "Time t travel": "Allow 30-45 minutes",\n        "Best Time to Visit": "Anytime, but nice break from heat/cold"\n      },\n      {\n        "placeName": "Budget Dinner",\n        "Place Details": "Find an affordable dinner option. Consider food courts (e.g., inside Planet Hollywood, MGM Grand), Ocean One Bar & Grille (Miracle Mile Shops - known for lunch deals, check dinner), or casual spots like In-N-Out Burger.",\n        "Place Image Url": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",\n        "Geo Coordinates": {\n          "lat": 36.1106,\n          "lon": -115.1746\n        },\n        "ticket Pricing": "$10-20 per person",\n        "Time t travel": "Allow 1 hour",\n        "Best Time to Visit": "Evening"\n      }\n    ],\n    "Day 2": [\n      {\n        "placeName": "Explore Mid/North Strip Hotels",\n        "Place Details": "Walk north towards The Venetian/Palazzo. Explore the Grand Canal Shoppes, see the gondolas (riding costs extra, watching is free). Visit the Forum Shops at Caesars Palace. Enjoy the themed environments.",\n        "Place Image Url": "https://images.pexels.com/photos/161315/venice-gondola-canals-italy-161315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",\n        "Geo Coordinates": {\n          "lat": 36.1245,\n          "lon": -115.1721\n        },\n        "ticket Pricing": "Free (unless you shop or ride gondola)",\n        "Time t travel": "Allow 2-4 hours (walking, exploring)",\n        "Best Time to Visit": "Daytime (good for escaping heat)"\n      },\n      {\n        "placeName": "Flamingo Wildlife Habitat",\n        "Place Details": "A tranquil oasis at the Flamingo Hotel featuring Chilean flamingos, pelicans, ducks, turtles, and fish. A nice, free escape from the casino bustle.",\n        "Place Image Url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/5a/6a/b0/flamingo-wildlife-habitat.jpg?w=1200&h=-1&s=1",\n        "Geo Coordinates": {\n          "lat": 36.1170,\n          "lon": -115.1708\n        },\n        "ticket Pricing": "Free",\n        "Time t travel": "Allow 30-45 minutes",\n        "Best Time to Visit": "Daytime"\n      },\n       {\n        "placeName": "Welcome to Fabulous Las Vegas Sign",\n        "Place Details": "Take a bus (Deuce) or rideshare south to the iconic \'Welcome to Fabulous Las Vegas\' sign for a classic photo opportunity. There\'s usually a line, but it moves.",\n        "Place Image Url": "https://images.pexels.com/photos/3221162/pexels-photo-3221162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",\n        "Geo Coordinates": {\n          "lat": 36.0820,\n          "lon": -115.1728\n        },\n        "ticket Pricing": "Free (transport cost extra - Bus ~$6 for 2hr pass / ~$8 for 24hr pass)",\n        "Time t travel": "20-30 min bus/rideshare from mid-strip; Allow 30-60 mins total including wait/photos",\n        "Best Time to Visit": "Morning (better light, potentially shorter line) or anytime"\n      },\n      {\n        "placeName": "Travel to Downtown Las Vegas (Fremont Street)",\n        "Place Details": "Take the Deuce bus or a rideshare from the Strip to Downtown Las Vegas. This is a different, more vintage Vegas experience.",\n        "Place Image Url": "https://images.pexels.com/photos/7613056/pexels-photo-7613056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",\n        "Geo Coordinates": {\n          "lat": 36.1700,\n          "lon": -115.1400\n        },\n        "ticket Pricing": "Bus fare (~$6-8 for pass) or Rideshare (~$15-25)",\n        "Time t travel": "30-45 minutes depending on traffic/method",\n        "Best Time to Visit": "Late Afternoon / Early Evening"\n      },\n      {\n        "placeName": "Fremont Street Experience",\n        "Place Details": "Walk under the massive Viva Vision canopy. Enjoy street performers, cheaper drinks, vintage casinos, and the free light shows that run periodically throughout the evening.",\n        "Place Image Url": "https://images.pexels.com/photos/14149696/pexels-photo-14149696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",\n        "Geo Coordinates": {\n          "lat": 36.1706,\n          "lon": -115.1411\n        },\n        "ticket Pricing": "Free (light show & atmosphere)",\n        "Time t travel": "Allow 2-3 hours",\n        "Best Time to Visit": "Evening / After Dark (for light shows)"\n      },\n      {\n        "placeName": "Budget Dinner Downtown",\n        "Place Details": "Downtown offers many classic, cheap eats. Consider Siegel\'s 1941 at El Cortez, Pizza Rock, or various casual spots along Fremont East.",\n        "Place Image Url": "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",\n        "Geo Coordinates": {\n          "lat": 36.1695,\n          "lon": -115.1380\n        },\n        "ticket Pricing": "$10-25 per person",\n        "Time t travel": "Allow 1 hour",\n        "Best Time to Visit": "Evening"\n      }\n    ],\n    "Day 3": [\n      {\n        "placeName": "Optional: Neon Museum (Budget Splurge)",\n        "Place Details": "Consider visiting the Neon Museum, an outdoor collection of historic Las Vegas signs. It\'s unique and photogenic. *Requires booking tickets in advance.* This might stretch a very tight budget.",\n        "Place Image Url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/cb/fa/1d/neon-museum-boneyard.jpg?w=1200&h=-1&s=1",\n        "Geo Coordinates": {\n          "lat": 36.1809,\n          "lon": -115.1348\n        },\n        "ticket Pricing": "Moderate (~$20-30+ pp, check website for current pricing and booking)",\n        "Time t travel": "Requires rideshare/bus (~15 mins from Downtown); Allow 1.5-2 hours including travel",\n        "Best Time to Visit": "Morning or Evening (for night tour - often more expensive)"\n      },\n      {\n        "placeName": "Optional: Explore a Different Hotel/Area",\n        "Place Details": "Depending on your interests and remaining time, revisit a favorite spot, explore a hotel you missed (e.g., Mandalay Bay Shark Reef - paid, or just walk through Paris Las Vegas), or relax by the pool if accessible/affordable.",\n        "Place Image Url": "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",\n        "Geo Coordinates": {\n          "lat": 36.1121,\n          "lon": -115.1721\n        },\n        "ticket Pricing": "Varies (Free to walk, specific attractions cost extra)",\n        "Time t travel": "Varies",\n        "Best Time to Visit": "Morning / Early Afternoon"\n      },\n        {\n        "placeName": "Window Shopping & People Watching",\n        "Place Details": "Spend some time strolling through high-end shopping areas like the Crystals Shops or the Miracle Mile Shops at Planet Hollywood. It costs nothing to look and people-watching is prime Vegas entertainment.",\n        "Place Image Url": "https://images.pexels.com/photos/1119079/pexels-photo-1119079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",\n        "Geo Coordinates": {\n          "lat": 36.1080,\n          "lon": -115.1740\n        },\n        "ticket Pricing": "Free",\n        "Time t travel": "Allow 1-2 hours",\n        "Best Time to Visit": "Anytime"\n      },\n      {\n        "placeName": "Affordable Lunch / Souvenir Hunt",\n        "Place Details": "Grab a final cheap lunch (food court, deli, happy hour deal if timed right). Look for budget-friendly souvenirs in stores like Bonanza Gift Shop (world\'s largest) or shops away from the main casino floors.",\n        "Place Image Url": "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",\n        "Geo Coordinates": {\n          "lat": 36.1320,\n          "lon": -115.1619\n        },\n        "ticket Pricing": "$10-20 per person for lunch",\n        "Time t travel": "Allow 1-2 hours",\n        "Best Time to Visit": "Lunchtime / Afternoon"\n      },\n      {\n        "placeName": "Check-out & Departure",\n        "Place Details": "Check out from your hotel (confirm check-out time). Head back to the airport (LAS) via shuttle or rideshare.",\n        "Place Image Url": "https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",\n        "Geo Coordinates": {\n          "lat": 36.0851,\n          "lon": -115.1511\n        },\n        "ticket Pricing": "Transportation cost varies",\n        "Time t travel": "Allow ample time (at least 2-3 hours before flight)",\n        "Best Time to Visit": "Afternoon/Evening depending on flight"\n      }\n    ]\n  },\n  "budgetNotes": [\n    "This plan focuses on free activities like walking the Strip, watching fountain shows, exploring themed hotels, and the Fremont Street Experience.",\n    "Food costs are minimized by suggesting food courts, casual eateries, and potentially happy hours. Consider buying snacks/drinks at a convenience store (like CVS/Walgreens on the Strip) to save money.",\n    "Transportation relies heavily on walking. The Deuce bus is recommended for longer distances (Strip to Downtown, Welcome Sign). Rideshares are an option but increase costs.",\n    "Accommodation suggestions are known budget options. Prices fluctuate greatly depending on dates (weekends/holidays/events are much pricier). Book in advance and check for resort fees (most Vegas hotels charge these daily).",\n    "Paid attractions like shows, major rides (High Roller), or museums are mostly listed as optional to keep the core budget low.",\n    "Bring refillable water bottles - stay hydrated, especially when walking."\n  ]\n}\n```',
        },
      ],
    },
  ],
});

