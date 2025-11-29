"use client";
import { useState, useEffect } from "react";
import {TopBar} from "./components/TopBar";
import { ContinueButton } from "./components/ContinueButton";
import Card from "./components/Card";
import {Word} from "./components/Word";
import {ImageCard} from "./components/ImageCard";


const WORD = "dog";
const IMAGE_URL =
  "/1/hello.png";
const WORD_AUDIO = "/1/hello.mp3";
const CONTINUE_AUDIO = "/1/continue.mp3";

export default function Home() {
  const [clickedImage, setClickedImage] = useState(false);
  const [clickedWord, setClickedWord] = useState(false);
  const [audioFinished, setAudioFinished] = useState(false);
  const [playedContinueSound, setPlayedContinueSound] = useState(false);

  // =====================================================
  // 🔊 Función genérica para reproducir audio
  // =====================================================
  function playAudio(src, onEnd) {
    const audio = new Audio(src);
    audio.play();
    if (onEnd) audio.onended = onEnd;
  }

  // --- clic imagen ---
  function handleImageClick() {
    setClickedImage(true);
    playAudio(WORD_AUDIO, () => {
      if (clickedWord) setAudioFinished(true);
    });
  }

  // --- clic palabra ---
  function handleWordClick() {
    setClickedWord(true);
    playAudio(WORD_AUDIO, () => {
      if (clickedImage) setAudioFinished(true);
    });
  }

  // --- condición final ---
  const showContinue = clickedImage && clickedWord && audioFinished;

  // --- sonido del botón Continuar ---
  useEffect(() => {
    if (showContinue && !playedContinueSound) {
      playAudio(CONTINUE_AUDIO);
      setPlayedContinueSound(true);
    }
  }, [showContinue, playedContinueSound]);

  return (
    <div className="flex flex-col h-dvh gap-0 select-none overflow-hidden bg-gray-50">
      {/* -------------- TOP ------------- */}
      <div className="h-[8%]">
        <TopBar />
      </div>

      {/* -------------- MAIN ------------- */}
      <div className="grow flex justify-center items-center">
        <Card
          src={IMAGE_URL}
          text={WORD}
        />
        {/* Image */}
        {/* <div className="h-[80%]">
          <ImageCard
            src={IMAGE_URL}
            clicked={clickedImage}
            onClick={handleImageClick}
          />
        </div> */}
        {/* Word */}
        {/* <div className="h-[20%]">
          <Word
            text={WORD}
            clicked={clickedWord}
            onClick={handleWordClick}
          />
        </div> */}
      </div>

      {/* -------------- FOOTER ------------- */}
      <div className="h-[10%]">
        <ContinueButton show={!showContinue} href="/lesson/word/clip" />
      </div>
    </div>
  );
}
