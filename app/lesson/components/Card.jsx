// app/lesson/components/Card.jsx
import { useState, useRef, useEffect } from "react";
import { useLesson } from "../context/LessonContext";

export default function Card({
  id,
  src,
  text,
  spanish,
  audio,
  isExiting = false,
}) {
  // Estados de clics
  const [clickedImage, setClickedImage] = useState(false);
  const [clickedText, setClickedText] = useState(false);

  // Animaciones
  const [showJelloAnimation, setShowJelloAnimation] = useState(false);
  const [showShake, setShowShake] = useState(false);

  // Estados de animación de la tarjeta
  const [animationImageEnd, setAnimationImageEnd] = useState(true);
  const [animationTextEnd, setAnimationTextEnd] = useState(true);

  const [isImageRevealed, setIsImageRevealed] = useState(false);

  // Entrada/salida de la tarjeta
  const [isLoaded, setIsLoaded] = useState(false);

  // Nuevo estado para controlar la transición
  const [isActive, setIsActive] = useState(true);

  // Referencias de audio
  const imageAudioRef = useRef(null);
  const textAudioRef = useRef(null);

  const { setLocalProgress, currentWord, setCanContinue } = useLesson();

  // 🔄 Reiniciar estados al cambiar de tarjeta SOLO cuando no está saliendo
  useEffect(() => {
    if (!isExiting) {
      // Resetear todos los estados de animación y clic
      setClickedImage(false);
      setClickedText(false);
      setIsImageRevealed(false);
      setAnimationImageEnd(true);
      setAnimationTextEnd(true);
      setShowJelloAnimation(false);
      setShowShake(false);
      setCanContinue(false);
      setIsActive(true);

      // Reiniciar animación de entrada
      setIsLoaded(false);
      const loadTimer = setTimeout(() => setIsLoaded(true), 50);
      return () => clearTimeout(loadTimer);
    }
  }, [currentWord.id, isExiting]);

  // 🎭 Jello si no hacen clic en imagen
  useEffect(() => {
    if (isLoaded && !clickedImage && isActive && !isExiting) {
      const timer = setTimeout(() => setShowJelloAnimation(true), 2000);
      return () => clearTimeout(timer);
    }
    setShowJelloAnimation(false);
  }, [isLoaded, clickedImage, isActive, isExiting]);

  // 🎭 Shake si no hacen clic en texto
  useEffect(() => {
    if (isLoaded && !clickedText && isActive && !isExiting) {
      const timer = setTimeout(() => setShowShake(true), 3000);
      return () => clearTimeout(timer);
    }
    setShowShake(false);
  }, [isLoaded, clickedText, isActive, isExiting]);

  // 🔊 Cargar audio (uno para imagen y otro para texto)
  useEffect(() => {
    if (audio && isActive) {
      imageAudioRef.current = new Audio(audio);
      textAudioRef.current = new Audio(audio);

      imageAudioRef.current.preload = "auto";
      textAudioRef.current.preload = "auto";
    }
    return () => {
      if (imageAudioRef.current) {
        imageAudioRef.current.pause();
      }
      if (textAudioRef.current) {
        textAudioRef.current.pause();
      }
    };
  }, [audio, id, isActive]);

  // 📈 Actualizar progreso local
  useEffect(() => {
    if (isActive && !isExiting) {
      if (clickedImage && clickedText) {
        setLocalProgress(100);
      } else {
        setLocalProgress((clickedImage ? 50 : 0) + (clickedText ? 50 : 0));
      }
    }
  }, [clickedImage, clickedText, setLocalProgress, isActive, isExiting]);

  // ▶️ Reproducir audio imagen
  function playImageAudio() {
    if (!imageAudioRef.current || !isActive) return;
    imageAudioRef.current.currentTime = 0;
    imageAudioRef.current.play().catch(console.error);
  }

  // ▶️ Reproducir audio texto
  function playTextAudio() {
    if (!textAudioRef.current || !isActive) return;
    textAudioRef.current.currentTime = 0;
    textAudioRef.current.play().catch(console.error);
  }

  // 🖼️ Click en imagen
  function handleImageClick() {
    if (!animationImageEnd || !isActive || isExiting) return;
    setIsImageRevealed(true);
    setClickedImage(true);
    setAnimationImageEnd(false);
    playImageAudio();
  }

  // 🔤 Click en texto
  function handleEnglishClick() {
    if (!animationTextEnd || !isActive || isExiting) return;
    setClickedText(true);
    setAnimationTextEnd(false);
    playTextAudio();
  }

  // Si está saliendo, deshabilitar interacciones pero mantener el estado visual
  if (isExiting && !isActive) {
    return null;
  }

  return (
    <div
      className={`
        flex flex-col w-full h-full
        transition-all duration-500
        ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-24"}
      `}
    >
      <div
        className={`
          flex flex-col grow rounded-2xl border-2 border-b-3 overflow-hidden 
          cursor-pointer bg-cyan-200 border-cyan-400 w-full
          ${isExiting ? "pointer-events-none" : ""}
        `}
      >
        {/* -------- Spanish -------- */}
        <div className="text-xl w-full italic h-[14%] flex justify-center items-end font-medium">
          <p className="text-gray-500 min-w-[85%] text-center rounded-full bg-white/90 px-4 py-1">
            {spanish}
          </p>
        </div>

        {/* -------- Image -------- */}
        <div
          onAnimationEnd={() => setAnimationImageEnd(true)}
          onClick={handleImageClick}
          className="grow p-6 cursor-pointer"
        >
          <img
            src={src}
            alt={text}
            className={`
              w-full h-full object-contain
              ${
                isImageRevealed || isExiting
                  ? "opacity-100 brightness-100 grayscale-0 contrast-100"
                  : "brightness-0 grayscale contrast-50 opacity-50"
              }
              ${
                showJelloAnimation && !isImageRevealed && !isExiting
                  ? "animate-jello-pausado"
                  : ""
              }
              ${clickedImage && !animationImageEnd ? "animate-revealed" : ""}
            `}
          />
        </div>

        {/* -------- English text -------- */}
        <div
          onClick={handleEnglishClick}
          className="flex flex-col h-[19%] justify-center items-center text-3xl bg-white/90 rounded-lg p-2"
        >
          <div className="w-full h-[70%] flex justify-center items-center font-semibold relative">
            <div
              className={`
                rounded-full min-w-[37%] h-[45%] absolute transition-opacity duration-300
                ${
                  clickedText || isExiting
                    ? "opacity-0"
                    : "opacity-100 bg-black/40"
                }
                ${
                  showShake && !clickedText && !isExiting
                    ? "animate-shake-pausado"
                    : ""
                }
              `}
            ></div>

            <p
              onAnimationEnd={() => setAnimationTextEnd(true)}
              className={`
                text-cyan-600 text-center transition-opacity duration-300
                ${clickedText || isExiting ? "opacity-100" : "opacity-0"}
                ${
                  clickedText && !animationTextEnd
                    ? "animate-text-revealed"
                    : ""
                }
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
