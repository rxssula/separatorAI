import Image from "next/image";

export const Card = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full pb-[100%]">
        <Image
          className="rounded-2xl object-cover absolute inset-0"
          src="/images/kairosh.jpg"
          alt="kairosh"
          layout="fill"
        />
      </div>
      <p className="text-lg font-medium mt-2 text-center">Eh, qаrındаs</p>
      <p className="text-sm text-center text-gray-400">Qayrat Nurtas</p>
    </div>
  );
};
