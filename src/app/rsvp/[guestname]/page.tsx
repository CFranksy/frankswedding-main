"use client";

import {
  SpotifyList,
  SpotifyLookup,
  TrimedTrack,
} from "@/components/SpotifyLookup";
import { GET_SpecificGuest, UPDATE_Guests } from "@/functions/guests";
import { Dancing_Script } from "next/font/google";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  useFieldArray,
} from "react-hook-form";
import Confetti from "react-confetti";
import {
  GuestPage_Checkbox,
  GuestPage_Input,
  GuestPage_Text,
} from "@/components/Inputs";

const dancingScript = Dancing_Script({ weight: "400", subsets: ["latin"] });

const guestBasic = {
  name: "",
  type: "plusOne",
  allergies: "",
  allergyDetails: "",
};

type GuestsDetails = {
  [key: string]: String | Boolean;
  name: String;
  type: String;
  allergies: String;
  allergyDetails: String;
};

export type FormFields = {
  guests: GuestsDetails[];
  attending: String;
  allowedPlusOne: "true" | "false" | "pending";
  songs: TrimedTrack[] | [];
};

const GuestPage = () => {
  const params = useParams();
  const router = useRouter();
  const [isSubmitted, setSubmitted] = useState(false);
  const { guestname } = params;

  const storageKey = `FRANKS_BLAKE_WEDDING_${guestname}`;

  const getUserfromLocalStorage =
    typeof window !== "undefined" && window?.localStorage.getItem(storageKey)
      ? JSON.parse(window?.localStorage.getItem(storageKey) || "")
      : null;

  const defaultValues: FormFields = {
    guests: [],
    attending: "pending",
    allowedPlusOne: "false",
    songs: [],
  };

  const [guestDetails, setDetails] = useState<FormFields>(
    getUserfromLocalStorage || defaultValues
  );

  const methods = useForm<FormFields>({
    defaultValues: guestDetails || { guests: [] },
  });

  const { register, watch, reset, setValue, handleSubmit, control } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "guests",
  });

  useEffect(() => {
    const getGuestDetails = async () => {
      const guest = await GET_SpecificGuest("", guestname as string);
      if (guest) {
        setDetails(guest);
        reset(guest);
      } else {
        router.push("/");
      }
    };

    getGuestDetails();
  }, []);

  useEffect(() => {
    register("songs", { maxLength: 3 });
    setValue("songs", []);
  }, []);

  const songs = watch("songs");
  const isComing = watch("attending") === "true";
  const isPendingAttendance = watch("attending") === "pending";

  const submitForm: SubmitHandler<FormFields> = async (data) => {
    try {
      await UPDATE_Guests(data);
      setSubmitted(true);
      window.localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout; // Type for the timer variable

    if (isSubmitted) {
      setSubmitted(true);
      timer = setTimeout(() => {
        setSubmitted(false);
      }, 8000);
    }

    // Cleanup function to clear the timeout if isSubmitted changes
    return () => {
      clearTimeout(timer);
    };
  }, [isSubmitted]);

  return (
    <section className="bg-blush h-dvh w-screen grid place-items-center">
      {isSubmitted && <Confetti tweenDuration={8000} />}
      <div className="bg-white h-5/6 sm:w-2/5 w-5/6 shadow-lg shadow-slate-900 rounded-lg flex flex-col gap-5 items-center overflow-auto py-4">
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-5 w-full px-4 text-center text-blush"
            onSubmit={handleSubmit(submitForm)}
          >
            <h1>
              <span className={`${dancingScript.className} text-3xl`}>
                Congrats
              </span>
              , You&apos;re invited!
            </h1>
            <p>Now the important question..are you coming to our big day?</p>
            <GuestPage_Checkbox name="attending" required />
            <div className="w-full flex flex-col border-t border-slate-300 divide-y divide-slate-600" />
            {isComing && (
              <>
                {fields.map((guest, index) => {
                  const hasAllergies =
                    watch(`guests.${index}.allergies`) === "true";

                  return (
                    <div
                      key={index}
                      className="flex flex-col gap-5 border-b border-slate-400 py-6"
                    >
                      <GuestPage_Input
                        name={`guests.${index}.name`}
                        label="Name"
                        disabled={guest.type === "original"}
                        required
                      />

                      <GuestPage_Checkbox
                        name={`guests.${index}.allergies`}
                        label="Have you got any allergies?"
                        required
                      />
                      {hasAllergies && (
                        <GuestPage_Text
                          name={`guests.${index}.allergyDetails`}
                          label="Write your allergies here"
                        />
                      )}
                      {guestDetails.allowedPlusOne === "true" &&
                        guest.type === "plusOne" && (
                          <div>
                            <button
                              className="w-full py-2 bg-red-100 text-red-600 rounded"
                              type="button"
                              onClick={() => remove(index)}
                            >
                              Remove plus one
                            </button>
                          </div>
                        )}
                      {guestDetails.allowedPlusOne === "true" &&
                        fields.length === 1 && (
                          <div>
                            <button
                              className="w-full py-2 bg-green-100 rounded text-green-500"
                              type="button"
                              onClick={() => append(guestBasic)}
                            >
                              Add your plus one
                            </button>
                          </div>
                        )}
                    </div>
                  );
                })}
                <p className="text-left w-full font-bold">
                  Why not give us some song choices for the big day?
                </p>

                <SpotifyList result={songs} removeTrack={true} />
                <SpotifyLookup />
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="bg-emerald-400 text-white rounded-lg p-4"
                >
                  {isSubmitted ? "Submitted" : "Submit"}
                </button>
              </>
            )}
          </form>
        </FormProvider>
        {!isComing && !isPendingAttendance && (
          <div className={`text-blush text-center`}>
            Sorry to hear you can&apos;t make it!
            <br />
            We&apos;ll miss you and hope to celebrate together soon!
          </div>
        )}
      </div>
    </section>
  );
};

export default GuestPage;
