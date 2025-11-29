"use client";

export const ImageCard = ({ src, clicked, onClick }) => {
  return (
    <div className="h-full flex justify-center items-center">
      <img
        src={src}
        onClick={onClick}
        className={`
        w-full h-[90%] object-cover rounded-2xl shadow-lg
        cursor-pointer transition-all duration-50 active:scale-95
        ${clicked ? "border-cyan-400" : "border-gray-200 grayscale"}
      `}
      />
    </div>
  );
};
