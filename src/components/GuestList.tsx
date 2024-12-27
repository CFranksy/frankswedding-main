import {
  faCheck,
  faCheckCircle,
  faCopy,
  faEdit,
  faMinus,
  faMinusCircle,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Guest } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StateType } from "./ToastPopup";
import { headers } from "next/headers";

type Props = {
  guestList: Guest[];
  type: "attending" | "pending" | "declined";
  setPartyId: (party: Guest) => void;
  setToastDetails: ({ leadGuestName, isSingle }: StateType) => void;
  activateToast: (value: boolean) => void;
};

export const GuestList = ({
  guestList,
  type,
  setPartyId,
  setToastDetails,
  activateToast,
}: Props) => {
  const bgGradient =
    type === "attending"
      ? "bg-gradient-to-r from-green-600 to-green-900"
      : type === "declined"
      ? "bg-gradient-to-r from-red-600 to-red-900"
      : "bg-gradient-to-r from-gray-600 to-gray-700";

  const icon =
    type === "attending"
      ? faCheckCircle
      : type === "declined"
      ? faXmarkCircle
      : faMinusCircle;

  return (
    <div className="flex flex-col gap-1 ">
      <h3
        className={`capitalize ${bgGradient} mx-2 text-2xl py-5 px-4 rounded-lg text-white relative overflow-hidden`}
      >
        {type}
        <FontAwesomeIcon
          icon={icon}
          className="text-slate-200 mix-blend-overlay absolute -bottom-1/2 -right-10  text-[10rem]"
        />
      </h3>
      {guestList.map((party: Guest) => {
        return (
          <div key={party._id} className="pl-10 relative">
            {party.guests.length > 1 && (
              <div className="h-[50%] w-0.5 bg-gray-300 absolute left-2 top-1/2 -translate-y-1/2" />
            )}
            <div className="flex flex-col gap-1">
              {party.guests.map((guest, index) => {
                return (
                  <div
                    className={`${bgGradient} py-4 mr-2 px-2 rounded-lg text-white relative`}
                    key={`${index}_${Math.floor(Math.random() * 100000)}`}
                  >
                    {party.guests.length > 1 && (
                      <div className="h-0.5 w-7 bg-gray-300 absolute -left-8 top-1/2 -translate-y-1/2" />
                    )}
                    {guest.name}
                    {index === 0 && (
                      <div className="flex w-fit gap-10 absolute right-4 top-1/2 -translate-y-1/2">
                        <button
                          type="button"
                          className=""
                          onClick={() => {
                            setToastDetails({
                              leadGuestName: guest.name,
                              isSingle: party.guests.length === 1,
                            });
                            activateToast(true);
                            navigator.clipboard.writeText(
                              `https://blakefrankswedding.co.uk/${party._id}`
                            );
                          }}
                        >
                          <FontAwesomeIcon icon={faCopy} />
                        </button>
                        <button
                          type="button"
                          className=""
                          onClick={() => setPartyId(party)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
