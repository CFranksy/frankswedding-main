import { useEffect, useState } from "react";

export type StateType = {
  leadGuestName: string;
  isSingle: boolean;
};

type Props = StateType & {
  activateToast: (value: boolean) => void;
  isToastActive: boolean;
};

export const ToastPopup = ({
  leadGuestName,
  isSingle,
  activateToast,
  isToastActive,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isToastActive) {
      setIsVisible(true); // Start the animation when isToastActive is true

      const timer = setTimeout(() => {
        setIsVisible(false); // Fade out the toast after 10 seconds
        setTimeout(() => {
          activateToast(false); // Deactivate toast after it fades out
        }, 500); // Wait for fade-out duration
      }, 1000); // Duration for which toast remains visible

      return () => clearTimeout(timer); // Cleanup if component unmounts
    }
  }, [isToastActive, activateToast]);

  if (!isToastActive) return null;

  return (
    <div
      className={`absolute bottom-4 left-1/2 -translate-x-1/2 bg-white border-violet-900 border-2 rounded-full px-6 py-4 transition-all duration-500 ease-in-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      URL copied for {leadGuestName}
      {!isSingle ? "'s Group" : ""}
    </div>
  );
};
