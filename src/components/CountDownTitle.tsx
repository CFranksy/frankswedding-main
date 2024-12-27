import { format, formatDistanceToNowStrict } from "date-fns";
import { Bebas_Neue } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Distance } from "./Distance";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });

export default function CountdownTitle() {
  const distanceClassName = twMerge(
    bebasNeue.className,
    "sm:text-[10vw] text-[15vw] text-bold  leading-tight text-gray-200/70"
  );

  return (
    <div className="absolute bottom-20 capitalize left-1/2 w-max -translate-x-1/2 z-[9999]">
      <h1 className={distanceClassName}>
        <Distance /> <span className="sm:text-[5vw] text-[10vw] ">to go</span>
      </h1>
    </div>
  );
}
