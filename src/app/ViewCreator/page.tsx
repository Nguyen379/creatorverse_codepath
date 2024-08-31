"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

interface Creator {
  id: string;
  name: string;
  url: string;
  description: string;
  imageURL: string;
}

export default function ViewCreator() {
  const [creator, setCreator] = useState<Creator | null>(null);
  const router = useRouter();
  const { id } = router.query;
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchCreator = async () => {
      if (!id) return;
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
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold mb-4">{creator.name}</h1>
      <Image
        src={creator.imageURL}
        alt={creator.name}
        layout="fill"
        objectFit="cover"
        className="rounded-md"
      />
      <p className="text-sm mb-4">{creator.description}</p>
      <a href={creator.url} className="text-blue-500 underline text-sm">
        View on social media
      </a>
    </div>
  );
}
