"use client";

import { motion } from "framer-motion";

const mockPastAuctions = [
  { id: 1, name: "Retro Synth Pack", finalPrice: 1.2 },
  { id: 2, name: "80s Drum Samples", finalPrice: 0.8 },
  { id: 3, name: "Vaporwave Essentials", finalPrice: 0.6 },
];

export default function PastAuctions() {
  return (
    <motion.div
      className="border-neon-yellow rounded-xl border-2 bg-black border-neutral-700 bg-opacity-50 p-6 shadow-lg"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-neon-yellow neon-text neon-text-yellow mb-4 text-3xl font-bold">
        Past Auctions
      </h2>
      <ul className="space-y-4">
        {mockPastAuctions.map((auction) => (
          <motion.li
            key={auction.id}
            className="rounded-lg bg-black bg-opacity-50 p-4"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-neon-green text-xl font-bold">
              {auction.name}
            </h3>
            <p className="text-neon-blue">
              Final Price: {auction.finalPrice} ETH
            </p>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
