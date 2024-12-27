import Link from "next/link";
import HEADER_Text from "./HEADER_Text";

const VENUE_Tile = () => {
  return (
    <div className="h-60 sm:h-96 sm:w-5/6 w-full relative rounded-xl">
      <div className="bg-fill size-full bg-bgBarn bg-cover bg-no-repeat bg-propSmCentral sm:bg-propCentral grayscale rounded-xl"></div>
      <div className="bg-slate-700/50 rounded-xl size-full backdrop-blur-xs absolute top-0 left-0 rounded-xl"></div>
      <HEADER_Text additionalClasses="text-white py-0 absolute bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        VENUE
      </HEADER_Text>

      <a
        href="https://www.google.com/maps?saddr=My+Location&daddr=52.2185375,-1.6897306"
        className="text-white py-0 absolute bottom-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center"
        target="_blank"
      >
        Click here to get directions
      </a>
    </div>
  );
};

export default VENUE_Tile;
