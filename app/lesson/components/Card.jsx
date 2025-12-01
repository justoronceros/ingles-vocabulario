// app/lesson/components/Card.jsx
import { useState, useRef, useEffect } from "react";

export default function Card({ id, src, text, spanish, audio }) {
  const [clickedCard, setClickedCard] = useState(false);

  const [clickedImage, setClickedImage] = useState(false);
  const [showJelloAnimation, setShowJelloAnimation] = useState(false);
  const [animationImageEnd, setAnimationImageEnd] = useState(true);

  const [clickedText, setClickedText] = useState(false);
  const [animationTextEnd, setAnimationTextEnd] = useState(true);

  const [animationEnd, setAnimationEnd] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showShake, setShowShake] = useState(false);
  const [isImageRevealed, setIsImageRevealed] = useState(false);
  const imageAudioRef = useRef(null);
  const textAudioRef = useRef(null);

  // Efecto para activar la animación de entrada
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      console.log("✅ Animación de entrada activada");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Efecto para activar jello después de 2 segundos
  useEffect(() => {
    if (isLoaded && !clickedImage) {
      const timer = setTimeout(() => {
        setShowJelloAnimation(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
    setShowJelloAnimation(false);
  }, [isLoaded, clickedImage]);

  // Activar shake después de 3 segundos
  useEffect(() => {
    if (isLoaded && !clickedCard) {
      const timer = setTimeout(() => {
        setShowShake(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowShake(false);
    }
  }, [isLoaded, clickedCard]);

  // Cargar el audio
  useEffect(() => {
    if (audio) {
      imageAudioRef.current = new Audio(audio);
      textAudioRef.current = new Audio(audio);
      imageAudioRef.current.preload = "auto";
      textAudioRef.current.preload = "auto";
      return () => {
        imageAudioRef.current = null;
        textAudioRef.current = null;
        cardAudioRef.current = null;
      };
      // return () => {
      //   if (audioRef.current) {
      //     audioRef.current.pause();
      //     audioRef.current = null;
      //   }
      // };
    }
  }, [audio, id]);

  // function playAudio() {
  //   if (audioRef.current) {
  //     audioRef.current.currentTime = 0;
  //     audioRef.current.play().catch(console.error);
  //   }
  // }

  function playImageAudio() {
    const audio = imageAudioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(console.error);
  }

  function playTextAudio() {
    const audio = textAudioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(console.error);
  }

  function handleImageClick() {
    if (!animationImageEnd) return;
    setIsImageRevealed(true);
    setClickedImage(true);
    setAnimationImageEnd(false);
    playImageAudio();
  }

  function handleEnglishClick() {
    if (!animationTextEnd) return;
    setClickedText(true);
    setAnimationTextEnd(false);
    playTextAudio();
  }

  function handleCardClic() {
    setClickedCard(true);
    setAnimationEnd(false);
    playAudio();
  }

  return (
    <div
      className={`
      flex flex-col w-[88%] h-[90%]
      transition-all duration-400 
      ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-24"}
    `}
    >
      {/* ::::::::::::::: Card Container :::::::::::: */}
      <div
        // onClick={handleCardClic}
        onAnimationEnd={() => setAnimationEnd(true)}
        className={`
          flex flex-col grow rounded-2xl border-2 border-b-3 overflow-hidden cursor-pointer transition duration-200 bg-cyan-200 border-cyan-400 w-full
          ${clickedCard && !animationEnd ? "jello-vertical" : ""}
        `}
      >
        {/* ------------ Spanish Text Container ------------ */}
        {/* Spanish Text */}
        <div className="text-xl w-full italic h-[14%] flex justify-center items-end font-medium">
          <p className="text-gray-500 min-w-[85%] text-center rounded-full bg-white/80 px-4 py-1">
            {spanish}
          </p>
        </div>

        {/* -------------- Image Container ------------ */}
        {/* Image con animación jello */}
        <div
          onAnimationEnd={() => setAnimationImageEnd(true)}
          onClick={handleImageClick}
          className="grow p-4 cursor-pointer"
        >
          <img
            src={src}
            alt={text}
            className={`
              w-full h-full object-contain
              ${
                isImageRevealed
                  ? "opacity-100 brightness-100 grayscale-0 contrast-100 "
                  : "brightness-0 grayscale contrast-50 opacity-50"
              }
              ${
                showJelloAnimation && !isImageRevealed
                  ? "animate-jello-pausado"
                  : ""
              }
              ${clickedImage && !animationImageEnd ? "animate-revealed" : ""}
            `}
          />
        </div>

        {/* -------------- English Text ------------ */}
        <div
          onClick={handleEnglishClick}
          className="flex flex-col h-[19%] justify-center items-center text-3xl bg-white/90 rounded-lg p-2"
        >
          <div className="w-full h-[70%] flex justify-center items-center font-semibold relative">
            <div
              className={`
    rounded-full min-w-[37%] h-[45%] absolute transition-opacity duration-300
    ${clickedText ? "opacity-0" : "opacity-100 bg-black/50"}
    ${showShake && !clickedText ? "animate-shake-pausado" : ""}
  `}
            ></div>
            <p
              onAnimationEnd={() => setAnimationTextEnd(true)}
              className={`
    text-cyan-600 text-center transition-opacity
    ${clickedText ? "opacity-100" : "opacity-0"}
    ${clickedText && !animationTextEnd ? "animate-text-revealed" : ""}
  `}
            >
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
