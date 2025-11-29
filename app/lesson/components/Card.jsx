//app/lesson/components/Card.jsx
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
    <div className="flex flex-col w-[88%] h-[86%] ">
      {/* ::::::::::::::: Card Container :::::::::::: */}
      <div
        onClick={handleCardClic}
        onAnimationEnd={() => setAnimationEnd(true)}
        className={`
          flex flex-col grow rounded-2xl border-2 border-b-3 overflow-hidden cursor-pointer transition duration-200 bg-cyan-200 border-cyan-400 w-full
          ${clickedCard ? "" : "  "}
          ${clickedCard && !animationEnd ? "jello-vertical" : ""}
        `}
      >
        {/* ------------ Spanish Text Container ------------ */}
        <div className="text-xl w-full italic h-[14%] flex justify-center items-end font-medium">
          <p className="text-gray-600 min-w-[85%] text-center rounded-full bg-black/5 px-4 py-1">
            {spanish}
          </p>
        </div>
        {/* -------------- Image Container ------------ */}
        <div className="grow p-4">
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

        {/* -------------- Text Container ------------ */}
        <div className="flex flex-col h-[19%] justify-center items-center text-3xl bg-white/90 rounded-xl p-2">
          <div className="w-full h-[70%] flex justify-center items-center font-semibold relative">
            <div
              className={`
              rounded-full min-w-[37%] h-[45%] absolute bg-gray-400
              ${
                clickedCard
                  ? "hidden"
                  : "text-gray-500 rounded-full px-4 bg-black/50"
              }
              `}
            ></div>
            <p
              className={`
                 text-center
              ${
                clickedCard
                  ? "text-cyan-600"
                  : "hidden"
              }`}
            >
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
