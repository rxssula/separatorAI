import Image from "next/image";
import { FC } from "react";

interface CardProps {
  title: string;
  author: string;
  photo: string;
}

export const Card: FC<CardProps> = ({ photo, author, title }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full pb-[100%]">
        <Image
          className="rounded-2xl object-cover absolute inset-0"
          src={photo}
          alt={author}
          layout="fill"
        />
      </div>
      <p className="text-lg font-medium mt-2 text-center">{title}</p>
      <p className="text-sm text-center text-gray-400">{author}</p>
    </div>
  );
};
