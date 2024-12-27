import { Dancing_Script, Poppins } from "next/font/google";

import { twMerge } from "tailwind-merge";

const dancingScript = Dancing_Script({ weight: "400", subsets: ["latin"] });
const poppings = Poppins({ weight: "400", subsets: ["latin"] });

export default function NameTitle() {
  const classNames = twMerge(
    "sm:text-[10rem] text-center w-full text-white flex flex-col leading-[8.5rem] items-center py-6",
    poppings.className,
    "text-6xl"
  );

  const splitLine = twMerge("text-4xl text-lightBlush");

  const subText = twMerge(
    dancingScript.className,
    "sm:text-6xl text-lightBlush capitalize sm:pt-14 pt-4 text-3xl"
  );

  return (
    <div className={classNames}>
      <h2 className="flex flex-col sm:block">
        CHRIS
        <span className={splitLine}>&</span>
        EMILY
      </h2>

      <span className={subText}>are getting married!</span>
    </div>
  );
}
