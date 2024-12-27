import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ScheduleData } from "../../types";
import HEADER_Text from "./HEADER_Text";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCakeCandles,
  faChampagneGlasses,
  faComments,
  faHeart,
  faMoon,
  faMugHot,
  faUtensils,
  faWineBottle,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  data: ScheduleData;
};

const SCHEDULE_Item: React.FC<Props> = ({ data }) => {
  const iconMap: { [key: string]: IconProp } = {
    faChampagneGlasses: faChampagneGlasses,
    faWineBottle: faWineBottle,
    faUtensils: faUtensils,
    faComments: faComments,
    faHeart: faHeart,
    faCakeCandles: faCakeCandles,
    faMoon: faMoon,
    faMugHot: faMugHot,
  };

  return (
    <div className="flex relative">
      <div className="px-2 h-full flex flex-col gap-1 text-center w-1/3 shrink-0 grow-0 text-blush">
        <p>{data.start}</p>
        <p> - </p>
        <p> {data.end}</p>
      </div>
      <div className="px-2 flex-col gap-1 flex">
        <HEADER_Text
          size="text-2xl"
          color="text-blush"
          additionalClasses="text-start py-0"
        >
          {data.title}
        </HEADER_Text>
        {data.description && (
          <p className="italic text-slate-600"> {data.description} </p>
        )}
        {data.location && (
          <div>
            {data.location.split(",").map((line: string) => {
              return (
                <p key={line} className="italic text-slate-600 text-sm">
                  {line}
                </p>
              );
            })}
          </div>
        )}
      </div>
      {data.icon && (
        <FontAwesomeIcon
          className="absolute -bottom-4 h-20 right-8 text-slate-400/20"
          icon={iconMap[data.icon]}
        />
      )}
    </div>
  );
};

export default SCHEDULE_Item;
