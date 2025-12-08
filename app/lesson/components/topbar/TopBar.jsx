//* app/lesson/components/topbar/TopBar.jsx

export const TopBar = () => {

  return (
    <div className="h-full flex gap-2 justify-between mx-2">
      <div className="flex justify-end h-full">
        <button className="text-gray-400 text-3xl font-bold">✕</button>
      </div>

      <div className="flex items-center w-full px-2">
        <div className="w-full h-[30%] bg-black/5 rounded-2xl overflow-hidden">
          <div
            className="bg-yellow-400 h-full rounded-r-2xl transition-all duration-500"
            style={{ width: `0%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

