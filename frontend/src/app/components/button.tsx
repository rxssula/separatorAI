import Link from "next/link";

export const Button = () => {
  return (
    <Link href="/upload">
      <button className="text-white text-sm px-4 py-2 rounded-full border-solid border-2 border-[#AAA9A9]">
        Try Demo
      </button>
    </Link>
  );
};
