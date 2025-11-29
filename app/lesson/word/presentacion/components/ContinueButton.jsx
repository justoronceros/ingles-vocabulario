"use client";
import Link from "next/link";

export const ContinueButton = ({ show, href }) =>{
  return (
    <div className="h-full transition-all duration-300 flex items-center">
      <Link
        href={show ? href : "#"}
        className={`
          w-full h-full flex items-center justify-center
          text-gray-100 text-lg uppercase font-bold tracking-wider
          transition-all duration-100
          ${
            show
              ? "bg-[#45AB4E]  active:translate-y-2 pointer-events-auto"
              : "bg-gray-50 text-transparent pointer-events-none"
          }
        `}
      >
        Continuar
      </Link>
    </div>
  );
}
