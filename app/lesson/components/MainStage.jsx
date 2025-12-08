import { Card } from "./card/Card";
import { ContinueButton } from "./bottonbar/ContinueButton";

export const MainStage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="h-[90%] flex justify-center items-center w-full">
        <Card />
      </div>
      <div className="w-full grow">
        <ContinueButton />
      </div>
    </div>
  );
};
