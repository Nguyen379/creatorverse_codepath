import Image from "next/image";
import Link from "next/link";

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
    <div className="relative bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-lg overflow-hidden h-64 w-48">
      {imageURL && (
        <Image
          loader={myLoader}
          src={imageURL}
          alt={name}
          layout="fill"
          style={{ objectFit: "cover" }}
          className="opacity-30"
        />
      )}
      <div className="absolute top-2 left-2 text-4xl font-bold text-white">
        {id}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-3">
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-yellow-300 transition duration-300"
        >
          <h2 className="text-lg font-bold mb-1">{name}</h2>
        </Link>
        <p className="text-gray-300 text-xs">{description}</p>
      </div>
    </div>
  );
}
