//* app/lesson/components/bottonbar/ContinueButton.jsx

export const ContinueButton = () => {
  const canContinue = false; // Lógica para determinar si se puede continuar

  return (
    <button
      className={`
        w-full h-full flex items-center justify-center
        text-gray-50 text-lg uppercase font-bold tracking-wider transition-all duration-100
        ${
          canContinue
            ? "bg-[#57CC02] active:translate-y-1"
            : "bg-gray-400 opacity-50 pointer-events-none"
        }
      `}
    >
      Continuar
    </button>
  );
};
