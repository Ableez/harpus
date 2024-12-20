"use client";

import { motion } from "framer-motion";

const PixelShape = ({ className }: { className: string }) => (
  <motion.div
    className={`h-4 w-4 ${className}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
  />
);

export default function PixelDecorations() {
  return (
    <>
      <PixelShape className="bg-neon-pink absolute left-4 top-4" />
      <PixelShape className="bg-neon-blue absolute right-4 top-4" />
      <PixelShape className="bg-neon-green absolute bottom-4 left-4" />
      <PixelShape className="bg-neon-yellow absolute bottom-4 right-4" />
    </>
  );
}
