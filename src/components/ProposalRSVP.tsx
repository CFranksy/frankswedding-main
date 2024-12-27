import Link from "next/link";
import HEADER_Text from "./HEADER_Text";

const ProposalRSVP = () => {
  return (
    <div className="h-60 sm:h-96  sm:w-5/6 w-full relative rounded-xl">
      <div className="bg-fill size-full bg-proposal bg-cover bg-no-repeat bg-propSmCentral sm:bg-propCentral grayscale rounded-xl"></div>
      <div className="bg-slate-700/50 rounded-xl size-full backdrop-blur-xs absolute top-0 left-0 rounded-xl"></div>
      <Link
        href="/rsvp"
        className="absolute bottom-10 text-2xl text-white text-center bg-blush left-1/2 -translate-x-1/2 px-8 py-4 rounded-xl"
      >
        <HEADER_Text size="text-2xl" additionalClasses="py-0">
          RSVP
        </HEADER_Text>
      </Link>
    </div>
  );
};

export default ProposalRSVP;
