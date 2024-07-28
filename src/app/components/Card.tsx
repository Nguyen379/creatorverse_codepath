import Image from "next/image";
import Link from "next/link";

interface CardProps {
  id: string;
  name: string;
  url: string;
  description: string;
  imageURL?: string;
}

export default function Card({
  id,
  name,
  url,
  description,
  imageURL,
}: CardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-5">
        {imageURL && (
          <div className="mb-4">
            <Image
              src={imageURL}
              alt={name}
              width={100}
              height={100}
              className="rounded-full mx-auto"
            />
          </div>
        )}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 transition duration-300"
          >
            Visit Channel
          </Link>
          <Link
            href={`/creators/${id}`}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
