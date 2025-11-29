"use client";
import { useState } from "react";

export default function Home() {
  const word = "dog";
  const videoUrl = "/1/dog.mp4"; // video en public/1/dog.mp4

  const [clicked, setClicked] = useState(false);
  const [showButton, setShowButton] = useState(false);

  function playSound() {
    const audio = new Audio("/1/dog.mp3"); // también desde public
    audio.play();
    setClicked(true);
    audio.onended = () => {
      setShowButton(true);
    };
  }

  return (
    <div className="flex flex-col h-dvh select-none overflow-hidden mx-3">
      {/* Parte superior */}
      <div className="h-[8%]"></div>

      <div className="grow">
        {/* VIDEO EN VEZ DE IMAGEN */}
        <div className="h-[80%]">
          <div className="h-full flex justify-center items-center">
              <video
              src={videoUrl}
              controls
              className="w-full h-[50%] object-cover rounded-xl "
             /> 
            {/* <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/DK5W1DG2HLE?si=JAL2v2uxXL3NqM_J&amp;controls=0&amp;start=43"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe> */}
          </div>
        </div>

        {/* Palabra */}
        <div className="h-[20%] flex justify-center items-center">
          <span
            onClick={playSound}
            className={`
              text-2xl p-2 w-full text-center rounded-2xl cursor-pointer
              border-2 border-b-4 active:scale-95 active:border-b-2
              transition-all duration-100

              ${
                clicked
                  ? "border-cyan-400 bg-cyan-50 text-cyan-500"
                  : "border-gray-200 bg-white text-gray-500"
              }
            `}
          >
            {word}
          </span>
        </div>
      </div>

      {/* Parte inferior */}
      <div className="h-[12%] flex items-center justify-center transition-all duration-300">
        {showButton && (
          <button
            className={`w-full px-2 py-2.5 bg-gray-200 text-white rounded-2xl cursor-pointer uppercase font-semibold tracking-wider
              ${
                clicked
                  ? "pointer-events-auto bg-green-500 border-b-4 border-green-600"
                  : "pointer-events-none"
              }
            `}
          >
            Continuar
          </button>
        )}
      </div>
    </div>
  );
}
