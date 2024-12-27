"use client";

import { useCallback, useEffect, useState } from "react";
import { Distance } from "@/components/Distance";
import { GET_Guests } from "@/functions/guests";
import { Guest, GuestItem } from "../../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircleCheck,
  faCircleMinus,
  faCircleXmark,
  faEdit,
  faPlus,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { NEW_EDIT_Guest } from "@/components/NEW_EDIT_Guest";
import { formatDistanceToNowStrict, format } from "date-fns";
import { GuestList } from "@/components/GuestList";
import { ToastPopup } from "@/components/ToastPopup";

const LoggedIn = () => {
  const [guestList, setGuestList] = useState<(Guest | null)[]>([]);
  const [updateList, setUpdateList] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const [toastDetails, setToastDetails] = useState({
    leadGuestName: "Jamie",
    isSingle: false,
  });

  const [isToastActive, activateToast] = useState(false);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const data = await GET_Guests();
        if (data) setGuestList(data);
        console.log("Fetched guests:", data);
      } catch (error) {
        console.error("Error fetching guests:", error);
      }
    };

    fetchGuests();
  }, [updateList]);

  const formatted = formatDistanceToNowStrict(
    format("03/07/2025", "dd/MM/yyyy"),
    {
      unit: "day",
    }
  );

  const setPartyId = (party: Guest) => {
    setIsOpen(true);
    setSelectedUser(party);
  };

  const AttendingList = useCallback(() => {
    const attendingList = guestList.filter(
      (party) => party?.attending === "true"
    );

    return (
      <GuestList
        guestList={(attendingList || []) as Guest[]}
        type="attending"
        setPartyId={setPartyId}
        setToastDetails={setToastDetails}
        activateToast={activateToast}
      />
    );
  }, [guestList]);

  const PendingList = useCallback(() => {
    const attendingList = guestList.filter(
      (party) => party?.attending === "pending"
    );

    return (
      <GuestList
        guestList={(attendingList || []) as Guest[]}
        type="pending"
        setPartyId={setPartyId}
        setToastDetails={setToastDetails}
        activateToast={activateToast}
      />
    );
  }, [guestList]);

  const DeclinedList = useCallback(() => {
    const attendingList = guestList.filter(
      (party) => party?.attending === "false"
    );

    return (
      <GuestList
        guestList={(attendingList || []) as Guest[]}
        type="declined"
        setPartyId={setPartyId}
        setToastDetails={setToastDetails}
        activateToast={activateToast}
      />
    );
  }, [guestList]);

  return (
    <section className="h-dvh w-screen flex flex-col gap-4 relative">
      <div className="w-full bg-gradient-to-r from-purple-600 to-violet-900 rounded-b-2xl py-2 text-center text-4xl text-white font-bold py-4 flex flex-col gap-2">
        <p>
          {formatted} <span className="text-sm">to go</span>
        </p>
        <span className="text-sm">
          {guestList.reduce((number, party) => {
            return (number += party?.guests?.length || 0);
          }, 0)}{" "}
          Invited
        </span>
      </div>
      <div className="overflow-auto h-full pb-4 flex flex-col gap-1">
        <AttendingList />
        <PendingList />
        <DeclinedList />
      </div>

      <NEW_EDIT_Guest
        open={isOpen}
        setUpdateList={setUpdateList}
        setIsOpen={setIsOpen}
        initialData={selectedUser}
      />
      <button
        type="button"
        className="absolute top-2 right-0 text-5xl rounded-tl-full p-5 text-white"
        onClick={() => {
          setIsOpen(true);
          setSelectedUser({});
        }}
      >
        <FontAwesomeIcon icon={faPlusCircle} />
      </button>
      <ToastPopup
        {...toastDetails}
        isToastActive={isToastActive}
        activateToast={activateToast}
      />
    </section>
  );
};

export default LoggedIn;
