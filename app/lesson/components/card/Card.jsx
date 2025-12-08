//* app/lesson/components/card/Card.jsx

import { Image } from "./Image";
import {Word} from "./Word";
import {Spanish} from "./Spanish";

export const Card = () => {
  return (
    <div className="border-2 border-b-4 border-cyan-400 flex flex-col w-[88%] h-[80%] rounded-2xl overflow-hidden">
      <div className="grow">
        <Image />
      </div>

      <div className="h-[24%] flex flex-col bg-white">
        <div className="h-[60%] flex justify-center items-end">
          <Word />
        </div>

        <div className="flex justify-center items-center grow">
          <Spanish />
        </div>
      </div>
    </div>
  );
}
