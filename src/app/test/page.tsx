"use client";

import { Car, DollarSign, Filter, MapPin, Users, X } from "lucide-react";
import React, { useState } from "react";

const BillboardMarketplace = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredBillboard, setHoveredBillboard] = useState(null);
  const [filters, setFilters] = useState({
    state: "",
    priceRange: "",
    allowPolitical: false,
    type: "",
  });

  const billboards = [
    { id: 1, title: "Downtown Billboard", description: "Prime location", price: 500, lat: 19.432608, lng: -99.133208 },
    { id: 2, title: "Highway Billboard", description: "High visibility", price: 750, lat: 19.390519, lng: -99.305383 },
    { id: 3, title: "Mall Entrance Billboard", description: "Heavy foot traffic", price: 600, lat: 19.503565, lng: -99.203117 },
    { id: 4, title: "Airport Billboard", description: "International exposure", price: 1000, lat: 19.436308, lng: -99.072097 },
    { id: 5, title: "Suburb Billboard", description: "Family-friendly area", price: 400, lat: 19.358849, lng: -99.263058 },
    { id: 6, title: "Sports Stadium Billboard", description: "Sports fans", price: 800, lat: 19.302329, lng: -99.203117 },
    { id: 7, title: "University Billboard", description: "Young audience", price: 700, lat: 19.324053, lng: -99.182863 },
    { id: 8, title: "Hospital Billboard", description: "Healthcare professionals", price: 600, lat: 19.358849, lng: -99.263},
    { id: 9, title: "Park Billboard", description: "Nature lovers", price: 500, lat: 19.390519, lng: -99.305383 },
    { id: 10, title: "Beach Billboard", description: "Tourists", price: 900, lat: 19.436308, lng: -99.072097 },
    { id: 11, title: "Cinema Billboard", description: "Moviegoers", price: 600, lat: 19.503565, lng: -99.203117 },
    { id: 12, title: "Restaurant Billboard", description: "Foodies", price: 500, lat: 19.432608, lng: -99.133208 },
    { id: 13, title: "Hotel Billboard", description: "Travelers", price: 700, lat: 19.358849, lng: -99.263058 },
    { id: 14, title: "Gym Billboard", description: "Fitness enthusiasts", price: 600, lat: 19.302329, lng: -99.203117 },
    { id: 15, title: "Bar Billboard", description: "Nightlife", price: 500, lat: 19.324053, lng: -99.182863 },
    { id: 16, title: "Museum Billboard", description: "Culture lovers", price: 600, lat: 19.390519, lng: -99.305383 },
    { id: 17, title: "Library Billboard", description: "Bookworms", price: 500, lat: 19.436308, lng: -99.072097 },
    { id: 18, title: "School Billboard", description: "Students", price: 400, lat: 19.503565, lng: -99.203117 },
    { id: 19, title: "Church Billboard", description: "Religious community", price: 300, lat: 19.432608, lng: -99.133208 },
    { id: 20, title: "Police Station Billboard", description: "Safety", price: 400, lat: 19.358849, lng: -99.263058 },
    // Add more billboard data as needed
  ];

  const FilterSection = () => (
    <div className={`absolute top-16 left-0 right-0 bg-white p-4 shadow-md transition-all duration-300 ${showFilters ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="State"
          className="flex-1 p-2 border rounded"
          onChange={(e) => setFilters({ ...filters, state: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price range"
          className="flex-1 p-2 border rounded"
          onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            id="allowPolitical"
            className="mr-2"
            onChange={(e) => setFilters({ ...filters, allowPolitical: e.target.checked })}
          />
          <label htmlFor="allowPolitical">Allow political?</label>
        </div>
        <select
          className="flex-1 p-2 border rounded"
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="">Select type</option>
          <option value="underSomething">Under something</option>
          <option value="wall">Wall</option>
          <option value="aboveStuff">Above stuff</option>
        </select>
      </div>
    </div>
  );

  const BillboardCard = ({ billboard }) => (
    <div
      className="bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setHoveredBillboard(billboard.id)}
      onMouseLeave={() => setHoveredBillboard(null)}
    >
      <img src={`https://source.unsplash.com/random/400x200?billboard&${billboard.id}`} alt="Billboard" className="w-full h-48 object-cover rounded-t-lg" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{billboard.title}</h3>
        <p className="text-gray-600 mb-2">{billboard.description}</p>
        <p className="text-rose-600 font-semibold">${billboard.price} per day</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-rose-600">BillboardMarket</div>
            <div className="flex items-center space-x-4">
              <button
                className={`px-4 py-2 rounded-full ${showFilters ? "bg-gray-200" : "bg-rose-600 text-white"}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? <X size={20} /> : <Filter size={20} />}
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full">User Info</button>
            </div>
          </div>
        </div>
      </header>

      <FilterSection />

      <main className="flex gap-8 mx-auto px-4 py-8">
        <div className="w-1/2 overflow-y-auto">
          <div className="grid grid-cols-3 gap-6">
            {billboards.map((billboard) => (
              <BillboardCard key={billboard.id} billboard={billboard} />
            ))}
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md grow">
          <h2 className="text-lg font-semibold mb-4">Map</h2>
          <div id="map" className="h-[calc(100vh-300px)] rounded-md">
            {/* Mapbox will be initialized here */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BillboardMarketplace;