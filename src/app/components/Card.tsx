import React from "react";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "../components/DeleteButton";

export interface CardProps {
  id: string;
  name: string;
  url: string;
  description: string;
  imageURL?: string;
}

const myLoader = ({ src }: { src: string }) => {
  return src;
};

export default function Card({
  id,
  name,
  url,
  description,
  imageURL,
}: CardProps) {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-800">
      {imageURL && (
        <div className="relative h-80">
          <Image
            loader={myLoader}
            src={imageURL}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="w-full"
          />
        </div>
      )}
      <div className="px-4 py-3 flex-grow flex flex-col h-60 text-white">
        <h2 className="font-bold text-lg mb-2 truncate text-center">{name}</h2>
        <p className="text-sm line-clamp-3 flex-grow">{description}</p>
        <div className="mt-4 flex justify-between items-center flex-row gap-1">
          <Link
            href={`/ViewCreator/${id}`}
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 text-xs rounded w-1/3 text-center"
          >
            View
          </Link>
          <Link
            href={`/EditCreator/${id}`}
            className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 text-xs rounded w-1/3 text-center"
          >
            Edit
          </Link>
          <DeleteButton
            id={id}
            className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 text-xs rounded w-1/3 text-center"
          />


        </div>
      </div>
    </div>
  );
}
