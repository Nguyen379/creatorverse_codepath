"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "../../components/DeleteButton";

interface Creator {
  id: string;
  name: string;
  url: string;
  description: string;
  imageURL: string;
}

export default function ViewCreator() {
  const [creator, setCreator] = useState<Creator | null>(null);
  const params = useParams();
  const id = params.id;
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchCreator = async () => {
      if (!id) {
        return;
      }
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching creator:", error);
      } else {
        setCreator(data);
      }
    };

    fetchCreator();
  }, [id, supabase]);

  if (!creator) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg overflow-hidden">
          <div className="md:w-1/2">
            <Image
              src={creator.imageURL}
              alt={creator.name}
              width={800}
              height={800}
              objectFit="cover"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-4xl font-bold mb-4 text-blue-300">
              {creator.name.toUpperCase()}
            </h1>
            <p className="mb-6 text-gray-300 text-lg">{creator.description}</p>
            <a
              href={creator.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-300 hover:text-white text-lg"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
              Visit Social Media
            </a>
          </div>
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            href="/ShowCreators"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded text-lg"
          >
            View all Creators
          </Link>
          <Link
            href={`/EditCreator/${id}`}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded text-lg"
          >
            Edit
          </Link>
          <DeleteButton id={id as string} />
        </div>
      </div>
    </div>
  );
}
