"use client";

import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NFTFormData {
  kitName: string;
  creator: string;
  collaborators: string[];
  coverImage: File | null;
  startPrice: string;
  highestPrice: string;
  audioFile: File | null;
}

interface CollaboratorProps {
  name: string;
  onRemove: (name: string) => void;
}

const CollaboratorTag = ({ name, onRemove }: CollaboratorProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="flex items-center rounded-full bg-blue-400 px-3 py-1 text-sm text-black"
  >
    {name}
    <button
      type="button"
      onClick={() => onRemove(name)}
      className="ml-2 font-bold text-red-500 transition-colors hover:text-red-700"
      aria-label={`Remove ${name}`}
    >
      ×
    </button>
  </motion.div>
);

const Upload = () => {
  const initialFormData: NFTFormData = {
    kitName: "",
    creator: "",
    collaborators: [],
    coverImage: null,
    startPrice: "",
    highestPrice: "",
    audioFile: null,
  };

  const [formData, setFormData] = useState<NFTFormData>(initialFormData);
  const [newCollaborator, setNewCollaborator] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (
    e: ChangeEvent<HTMLInputElement>,
    type: "audio" | "cover",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [type === "audio" ? "audioFile" : "coverImage"]: file,
      }));
    }
  };

  const addCollaborator = () => {
    if (newCollaborator && !formData.collaborators.includes(newCollaborator)) {
      setFormData((prev) => ({
        ...prev,
        collaborators: [...prev.collaborators, newCollaborator],
      }));
      setNewCollaborator("");
    }
  };

  const removeCollaborator = (collaborator: string) => {
    setFormData((prev) => ({
      ...prev,
      collaborators: prev.collaborators.filter((c) => c !== collaborator),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // TODO: Implement NFT minting logic
      console.log("Form data:", formData);
    } catch (error) {
      console.error("Error minting NFT:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="rounded-xl border-2 border-blue-400 bg-black/50 p-6 shadow-lg"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mb-4 text-3xl font-bold text-yellow-400">Upload NFT</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {formData.audioFile ? (
          <div className="space-y-4">
            <input
              type="text"
              name="kitName"
              placeholder="Kit Name"
              value={formData.kitName}
              onChange={handleInputChange}
              className="w-full rounded border border-blue-400 bg-black p-2 text-pink-500"
              required
            />

            <input
              type="text"
              name="creator"
              placeholder="Creator"
              value={formData.creator}
              onChange={handleInputChange}
              className="w-full rounded border border-blue-400 bg-black p-2 text-pink-500"
              required
            />

            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add Collaborator"
                  value={newCollaborator}
                  onChange={(e) => setNewCollaborator(e.target.value)}
                  className="w-full rounded border border-blue-400 bg-black p-2 text-pink-500"
                />
                <motion.button
                  type="button"
                  onClick={addCollaborator}
                  className="pixel-button whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add
                </motion.button>
              </div>

              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {formData.collaborators.map((collaborator) => (
                    <CollaboratorTag
                      key={collaborator}
                      name={collaborator}
                      onRemove={removeCollaborator}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-green-400">Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "cover")}
                className="w-full rounded border border-blue-400 bg-black p-2 text-pink-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="startPrice"
                placeholder="Start Price (ETH)"
                value={formData.startPrice}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full rounded border border-blue-400 bg-black p-2 text-pink-500"
                required
              />

              <input
                type="number"
                name="highestPrice"
                placeholder="Highest Price (ETH)"
                value={formData.highestPrice}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full rounded border border-blue-400 bg-black p-2 text-pink-500"
                required
              />
            </div>

            <motion.button
              type="submit"
              className="pixel-button w-full disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              {isLoading ? "Minting..." : "Mint NFT"}
            </motion.button>
          </div>
        ) : (
          <div className="space-y-2">
            <label className="block text-green-400">Choose Audio File</label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => handleFileChange(e, "audio")}
              className="w-full rounded border border-blue-400 bg-black p-2 text-pink-500"
              required
            />
          </div>
        )}
      </form>
    </motion.div>
  );
};

export default Upload;
