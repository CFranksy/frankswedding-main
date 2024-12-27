import { twMerge } from "tailwind-merge";
import NameTitle from "./NameTitle";

export default function Banner() {
  const bannerClasses = twMerge(
    " absolute left-1/2 -translate-x-1/2 bg-blush w-full top-20 z-[9999]"
  );

  return (
    <div className={bannerClasses}>
      <NameTitle />
    </div>
  );
}
