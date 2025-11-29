"use client";

export const Word = ({ text, clicked, onClick }) => {
  return (
    <div className=" flex justify-center items-center">
      <span
        onClick={onClick}
        className={`
        text-2xl p-2 w-full text-center rounded-2xl cursor-pointer border-2 border-b-5 active:scale-95 active:border-b-2 transition-all duration-50
        ${
          clicked
            ? "border-cyan-400 bg-cyan-50 text-cyan-600"
            : "border-gray-200 bg-white text-gray-500"
        }
      `}
      >
        {text}
      </span>
    </div>
  );
};
