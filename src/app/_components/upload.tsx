"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]!);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would implement the NFT minting logic
    console.log("Minting NFT with file:", file);
    alert("Yeah this aint working either yet! we on it!")
  };

  return (
    <motion.div
      className="border-neon-blue rounded-xl border-2 border-neutral-700 bg-black bg-opacity-50 p-6 shadow-lg"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-neon-yellow mb-4 text-3xl font-bold">Upload NFT</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="file" className="text-neon-green mb-2 block">
            Choose File
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="text-neon-pink border-neon-blue w-full rounded border bg-black p-2"
          />
        </div>
        <motion.button
          type="submit"
          className="pixel-button w-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Mint NFT
        </motion.button>
      </form>
    </motion.div>
  );
}
