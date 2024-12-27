import { Dancing_Script } from "next/font/google";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  size?: string;
  bold?: boolean;
  color?: string;
  additionalClasses?: string;
};

const dancingScript = Dancing_Script({ weight: "400", subsets: ["latin"] });

const HEADER_Text: React.FC<Props> = ({
  children,
  size = "text-5xl",
  bold = false,
  color,
  additionalClasses,
}) => {
  const classNames = twMerge(
    dancingScript.className,
    "w-full text-center py-6",
    size,
    bold && "font-bold",
    color,
    additionalClasses
  );

  return <h1 className={classNames}> {children} </h1>;
};

export default HEADER_Text;
