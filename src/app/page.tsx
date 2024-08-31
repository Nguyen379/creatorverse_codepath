"use client";

import Image from "next/image";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Creator {
  id: string;
  name: string;
  url: string;
  description: string;
  imageURL: string;
}

export default function Home() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase.from("creators").select("*");

      if (error) {
        console.error("Error fetching creators:", error);
      } else {
        setCreators(data);
      }
      setLoading(false);
    };

    fetchCreators();
  }, [supabase]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly">
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
          src="/next.svg"
          alt="Next.js Logo"
          width={360}
          height={90}
          priority
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {creators.slice(0, 5).map((creator) => (
          <Card key={creator.id} {...creator} />
        ))}
      </div>

      <div className="mb-32 flex justify-between items-center lg:mb-0 lg:w-full lg:max-w-5xl">
        <a
          href="https://github.com/Nguyen379/creatorverse_codepath"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-1 text-xl font-semibold">
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="mb-4 max-w-[30ch] text-sm opacity-50">
            Read more about my project
          </p>
        </a>

        <a
          href="https://github.com/Nguyen379"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-1 text-xl font-semibold">
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="mb-4 max-w-[30ch] text-balance text-sm opacity-50">
            Check out my other projects
          </p>
        </a>
      </div>
    </main>
  );
}
