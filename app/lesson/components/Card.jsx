import { useState, useRef, useEffect } from "react";

export default function Card({ id, src, text, spanish, audio }) {
  const [clickedCard, setClickedCard] = useState(false);
  const [animationEnd, setAnimationEnd] = useState(false);
  const audioRef = useRef(null);

  // Cargar el audio - se recarga cuando cambia el ID
  useEffect(() => {
    if (audio) {
      audioRef.current = new Audio(audio);
      audioRef.current.preload = "auto";

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }
  }, [audio, id]); // ← Se recarga cuando cambia el id

  function playAudio() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.log("Error reproduciendo audio:", error);
      });
    }
  }

  function handleCardClic() {
    setClickedCard(true);
    setAnimationEnd(false);
    playAudio();
    // setTimeout(()=>{playAudio()},1000)

    // Aquí podrías usar el id para tracking
    console.log(`Card ${id} clicked: ${text}`);
  }

  return (
    <div className="flex flex-col w-[88%] h-[90%]">
      <div
        onClick={handleCardClic}
        onAnimationEnd={() => setAnimationEnd(true)}
        className={`
          flex flex-col grow rounded-2xl border-2 border-b-3 overflow-hidden cursor-pointer transition duration-200 bg-cyan-200 border-cyan-400
          ${clickedCard ? "" : "  "}
          ${clickedCard && !animationEnd ? "jello-vertical" : ""}
        `}
      >
        <div className="h-[75%] p-4">
          <img
            src={src}
            alt={text}
            className={`w-full h-full object-contain
               ${
                 clickedCard
                   ? ""
                   : "border-gray-300 brightness-0 grayscale contrast-75 opacity-50"
               }
              `}
          />
        </div>

        <div className="flex flex-col grow justify-center items-center text-3xl bg-white/90 rounded-lg pb-2">
          <div className="w-full h-[70%] flex justify-center items-center font-semibold relative">
            <div className="rounded-full min-w-[30%] h-[40%] absolute bg-black/40"></div>
            <p
              className={`
                min-w-[50%] absolute
              ${
                clickedCard
                  ? "text-cyan-600"
                  : "text-gray-500 rounded-full px-4 bg-black/50"
              }`}
            >
              {text}
            </p>
          </div>

          <div className="text-xl w-[90%] italic grow flex justify-center items-center rounded-full  bg-black/4 font-medium">
            <p className="text-gray-500">{spanish}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
