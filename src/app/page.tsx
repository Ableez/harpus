"use client";

import { motion } from "framer-motion";
import Upload from "./_components/upload";
import Listings from "./_components/listings";
import PastAuctions from "./_components/past-auctions";
import PixelDecorations from "./_components/pixel-decorations";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b md:p-16 p-2">
      <motion.h1
        className="text-neon-pink mb-12 text-center text-6xl font-bold"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        Harpus
      </motion.h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Upload />
        <Listings />
        <PastAuctions />
      </div>
      <PixelDecorations />
    </main>
  );
}
