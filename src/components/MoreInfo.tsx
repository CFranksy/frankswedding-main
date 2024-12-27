import HEADER_Text from "./HEADER_Text";
import ProposalRSVP from "./ProposalRSVP";
import Schedule from "./Schedule";
import VENUE_Tile from "./VENUE_Tile";

type MoreInfoType = {
  [key: string]: string;
};

export default function MoreInfo() {
  return (
    <div className=" w-dvw flex sm:flex-row flex-col justify-start py-4 gap-2">
      <div className="sm:w-1/2 h-full flex flex-col sm:items-start justify-start items-center">
        <HEADER_Text>Schedule</HEADER_Text>
        <h3>These times will be confirmed nearer the day with our wedding co-ordinator</h3>
        <Schedule />
      </div>
      <div className="sm:h-screen sm:w-1/2 w-full gap-4  p-4 flex flex-col sm:py-4 justify-center items-center sm:sticky top-0">
        <VENUE_Tile />
        <ProposalRSVP />
      </div>
    </div>
  );
}
