"use client";

import { Heart, Share2 } from "lucide-react";
import React, { useState } from "react";

import MapBox from "@/components/MapBox";
import { useRouter } from "next/navigation";

const BillboardDetailsPage = ({ params }: { params: { id: string } }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const router = useRouter();

  // Mock data for the billboard
  const billboard = {
    title: "See The Change Your Change Makes",
    mainImage: "https://picsum.photos/300/200",
    additionalImages: [
      "https://picsum.photos/300/200",
      "https://picsum.photos/300/200",
      "https://picsum.photos/300/200",
      "https://picsum.photos/300/200",
    ],
    price: 500,
    location: { lat: 19.432608, lng: -99.133208 },
    generalInfo: "This billboard is located in a prime spot with high visibility...",
    reservationCalendar: "Calendar component placeholder",
    successCases: "Previous successful campaigns and testimonials..."
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div
            className="text-2xl font-bold text-rose-600 cursor-pointer"
            onClick={() => router.push("/")}
          >
            Renta de espectaculares logo
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full">Filters</button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full">User Info</button>
          </div>
        </div>
      </header>

      <main className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">{billboard.title}</h1>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <img src={billboard.mainImage} alt="Main Billboard" className="col-span-2 row-span-2 rounded-lg object-cover w-full h-full" />
              {billboard.additionalImages.map((img, index) => (
                <img key={index} src={img} alt={`Additional ${index + 1}`} className="rounded-lg object-cover w-full h-full" />
              ))}
            </div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Billboard Title</h2>
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 text-gray-600">
                  <Share2 size={20} />
                  <span>Share</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600">
                  <Heart size={20} />
                  <span>Save</span>
                </button>
              </div>
            </div>
            <div className="flex gap-4 items-start justify-start max-w-[1400px]">
              <div className="mb-6 w-2/3 h-[400px]">
                <h3 className="text-xl font-semibold mb-2">Map</h3>
                <div id="map" className="h-64 bg-gray-200 rounded-lg">
                  <MapBox />
                </div>
              </div>
              <div className="w-1/3">
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <h3 className="text-xl font-semibold mb-4">Price: ${billboard.price} per day</h3>
                  <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Select Date</label>
                    <input
                      type="date"
                      id="date"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                  <button className="w-full bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700 transition duration-300">
                    Reserve
                  </button>
                  <div className="mt-4">
                    <h4 className="font-semibold">Price Breakdown</h4>
                    <p>Base price: ${billboard.price}</p>
                    <p>Taxes: ${billboard.price * 0.1}</p>
                    <p className="font-semibold">Total: ${billboard.price * 1.1}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="mt-8 space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">General Info</h3>
            <p>{billboard.generalInfo}</p>
          </section>
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Reservation Calendar</h3>
            <div>{billboard.reservationCalendar}</div>
          </section>
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Success Cases</h3>
            <p>{billboard.successCases}</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default BillboardDetailsPage;