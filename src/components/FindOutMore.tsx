import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FindOutMore() {
  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center text-gray-200/70 z-[9999]">
      <div className="animate-bounce flex flex-col justify-center items-center">
        <FontAwesomeIcon icon={faChevronDown} className="size-6" />
        <FontAwesomeIcon icon={faChevronDown} className="size-8 -mt-5" />
      </div>
      <h3>Scroll for more</h3>
    </div>
  );
}
