"use client";

import { FormFields } from "@/app/rsvp/[guestname]/page";
import { UPDATE_Guests } from "@/functions/guests";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import {
  useForm,
  useFieldArray,
  FormProvider,
  SubmitHandler,
} from "react-hook-form";
import { GuestPage_Checkbox, GuestPage_Input, GuestPage_Text } from "./Inputs";
import { Guest } from "../../types";

type Props = {
  open: boolean;
  partyId?: string;
  setIsOpen: (value: boolean) => void;
  setUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: Guest | {};
};

const blankData: Guest = {
  attending: "pending",
  allowedPlusOne: "false",
  guests: [
    {
      name: "",
      allergies: "",
      allergyDetails: "",
      type: "original",
    },
  ],
};

const newGuestOBJ = {
  name: "",
  type: "original",
  allergies: "",
  allergyDetails: "",
};

export const NEW_EDIT_Guest = ({
  open,
  setUpdateList,
  setIsOpen,
  initialData,
}: Props) => {
  const methods = useForm<FormFields>({ defaultValues: initialData });
  const { control, handleSubmit, watch, setValue, reset } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "guests",
  });

  useEffect(() => {
    if (!(initialData as Guest)?._id) {
      reset(blankData);
    }
  }, [open, initialData]);

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  // Ensure one guest field is always present
  useEffect(() => {
    if (fields.length === 0) append(newGuestOBJ);
  }, [fields, append]);

  const submitForm: SubmitHandler<FormFields> = async (data) => {
    try {
      await UPDATE_Guests(data);
      setUpdateList((prev: boolean) => !prev);
      setIsOpen(false);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  if (!open) return <></>;

  return (
    <FormProvider {...methods}>
      <div
        className={`bg-white border border-t-4 border-t-slate-600 absolute bottom-0 h-[88%] left-0 w-full py-4 z-[9999]`}
      >
        <form
          className="space-y-4 h-full flex flex-col"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="flex justify-evenly">
            <label className="block text-sm font-medium text-lg">
              Attending Status *
              <GuestPage_Checkbox name="attending" width="full" allowPending />
            </label>
            <label className="block text-sm font-medium text-lg">
              Allow Plus One *
              <GuestPage_Checkbox name="allowedPlusOne" width="full" required />
            </label>
          </div>

          {/* Scrollable container for guest fields */}
          <div className="h-full overflow-auto">
            {fields.map((field, index) => {
              const hasAllergies =
                watch(`guests.${index}.allergies`) === "true";
              return (
                <div
                  key={field.id}
                  className="space-y-2 border-b border-gray-300 pb-4 mb-4 relative px-2"
                >
                  <label className="text-lg font-semibold">
                    Guest {index + 1}
                  </label>
                  <GuestPage_Input
                    name={`guests.${index}.name`}
                    label="Name"
                    required
                  />
                  <div className="flex items-center gap-10">
                    <label className="font-semibold w-1/4">Allergies *</label>
                    <GuestPage_Checkbox
                      name={`guests.${index}.allergies`}
                      width="full"
                      required
                    />
                  </div>

                  {hasAllergies && (
                    <div>
                      <GuestPage_Text
                        name={`guests.${index}.allergyDetails`}
                        label="Write allergies here"
                        required
                      />
                    </div>
                  )}

                  {index > 0 && (
                    <button
                      type="button"
                      className="text-red-500 text-md w-full text-end pt-4"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-evenly">
            <button type="button" onClick={() => append(newGuestOBJ)}>
              Add guests
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
              }}
              className="bg-red-400 text-white px-4 py-2 rounded"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};
