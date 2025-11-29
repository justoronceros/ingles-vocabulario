export const TopBar = () => {
  return (
    <div className="h-full flex gap-2 justify-between mx-2">
      {/* ---------BOTON CERRAR---------- */}
      <div className="flex justify-end h-full">
        <button className="text-gray-400 text-3xl font-bold">✕</button>
      </div>
      {/* ---------BARRA PROGRESO---------- */}
      <div className="flex items-center w-full px-2">
        <div className="w-full h-[30%] bg-black/5 rounded-2xl overflow-hidden">
          <div className="bg-yellow-300 h-full w-[15%] rounded-r-2xl transition-all duration-500">
          </div>
        </div>
      </div>

      {/* <div className="h-[13%] w-[30%] bg-cyan-200 rounded-r-2xl transition-all duration-1000"></div> */}
    </div>
  );
};
