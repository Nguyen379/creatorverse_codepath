"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Creator {
  name: string;
  url: string;
  description: string;
  imageURL: string;
}

export default function EditCreator(): JSX.Element {
  const [creator, setCreator] = useState<Creator>({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const { data, error } = await supabase
          .from("creators")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        if (data) {
          setCreator(data);
        }
      } catch (error) {
        console.error("Error fetching creator:", error);
        setError("Failed to fetch creator data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCreator();
  }, [id, supabase]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCreator((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const { data, error } = await supabase
        .from("creators")
        .update(creator)
        .eq("id", id)
        .select();

      if (error) throw error;

      if (data) {
        console.log("Creator updated successfully:", data);
        router.push("/ShowCreators");
      }
    } catch (error) {
      console.error("Error updating creator:", error);
      setError("Failed to update creator. Please try again.");
    }
  };

  const handleDiscard = () => {
    router.back(); // Go back to the previous page without saving
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Edit Creator
      </h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={creator.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Jimmy Fallon"
          />
        </div>
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Social Media
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={creator.url}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. https://www.instagram.com/jimmyfa"
          />
        </div>
        <div>
          <label
            htmlFor="imageURL"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Image URL
          </label>
          <input
            type="url"
            id="imageURL"
            name="imageURL"
            value={creator.imageURL}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. https://www.usatoday.com/gcdn/pre"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={creator.description}
            onChange={handleChange}
            required
            rows={11}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. James Thomas Fallon is an American stand-up comedian..."
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleDiscard}
            className="w-1/2 mr-2 px-4 py-3 bg-red-500 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-lg"
          >
            Discard
          </button>
          <button
            type="submit"
            className="w-1/2 ml-2 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 text-lg"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
