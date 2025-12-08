import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center flex-col h-dvh select-none overflow-hidden mx-3">
      <div className="transition-all duration-300">
        <Link
          href="/lesson"
          className="w-full px-2 py-2.5 bg-green-500 text-white rounded-2xl cursor-pointer uppercase font-semibold tracking-wider flex items-center justify-center"
        >
           Vocabulario
        </Link>
      </div>
    </div>
  );
}
