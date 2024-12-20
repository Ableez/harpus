"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const mockListings = [
  { id: 1, name: "Epic Beats Vol. 1", currentBid: 0.5, timeLeft: 86400 }, // 24 hours in seconds
  { id: 2, name: "Synthwave Dreams", currentBid: 0.3, timeLeft: 43200 }, // 12 hours in seconds
  { id: 3, name: "Drum Kit Deluxe", currentBid: 0.2, timeLeft: 21600 }, // 6 hours in seconds
];

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export default function Listings() {
  const [listings, setListings] = useState(mockListings);

  useEffect(() => {
    const timer = setInterval(() => {
      setListings((prevListings) =>
        prevListings.map((listing) => ({
          ...listing,
          timeLeft: Math.max(0, listing.timeLeft - 1),
        })),
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleBid = (id: number) => {
    // Here you would implement the bidding logic
    console.log("Placing bid on item:", id);
    alert("Yeah this aint working yet! we on it!")
  };

  return (
    <motion.div
      className="rounded-xl border-2 border-green-400 bg-black bg-opacity-50 p-6 shadow-lg"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="neon-text mb-4 text-3xl font-bold text-green-400">
        Current Listings
      </h2>
      <ul className="space-y-4">
        {listings.map((listing) => (
          <motion.li
            key={listing.id}
            className="rounded-lg bg-black bg-opacity-50 p-4"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-bold text-pink-500">{listing.name}</h3>
            <p className="text-yellow-400">
              Current Bid: {listing.currentBid} ETH
            </p>
            <div className="mt-2">
              <div className="flex justify-between text-sm text-blue-400">
                <span>Time Left:</span>
                <span>{formatTime(listing.timeLeft)}</span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-700">
                <motion.div
                  className="h-full bg-blue-400"
                  initial={{ width: `${(listing.timeLeft / 86400) * 100}%` }}
                  animate={{ width: `${(listing.timeLeft / 86400) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            <motion.button
              onClick={() => handleBid(listing.id)}
              className="pixel-button mt-4 w-full"
              whileTap={{ scale: 0.95 }}
            >
              Place Bid
            </motion.button>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
