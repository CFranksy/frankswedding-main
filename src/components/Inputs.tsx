import { useFormContext } from "react-hook-form";

type InputTypes = {
  name: string;
  label?: string;
  disabled?: boolean;
  width?: "full" | "half";
  required?: boolean;
  allowPending?: boolean;
};

export const GuestPage_Text = ({ name, label }: InputTypes) => {
  const { register } = useFormContext();
  return (
    <div className="w-full flex justify-center items-center">
      <textarea
        {...register(name as `guests.${number}.${string}`)}
        className="w-full rounded-lg px-2 py-1"
        placeholder={label}
        rows={3}
      />
    </div>
  );
};

export const GuestPage_Input = ({
  name,
  label,
  disabled,
  width,
  required,
}: InputTypes) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error =
    //@ts-ignore
    errors.guests?.[parseInt(name.split(".")[1])]?.[name.split(".")[2]];

  return (
    <div className="flex w-full gap-5">
      <label htmlFor={name} className="flex items-center font-bold">
        {label}*
      </label>
      <input
        type="text"
        className={`w-full p-2 rounded-lg border border-slate-400 text-blush ${
          error ? "border-red-500" : "border-slate-400"
        }`}
        {...register(name as `guests.${number}.${string}`, {
          required: required,
        })}
        disabled={disabled}
      />
    </div>
  );
};

export const GuestPage_Checkbox = ({
  name,
  label,
  width,
  required,
  allowPending,
}: InputTypes) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error =
    //@ts-ignore
    errors.guests?.[parseInt(name.split(".")[1])]?.[name.split(".")[2]];

  return (
    <div className={`flex w-full justify-center font-bold text-left w-full`}>
      {label && <h3 className="w-1/2">{label}*</h3>}
      <label
        className={`cursor-pointer bg-gray-100 border-gray-100 p-4 rounded-l-xl has-[:checked]:text-green-500 has-[:checked]:bg-green-100 has-[:checked]:border-green-700 ${
          width === "full" ? "w-1/2" : "w-1/4"
        } ${
          error ? "border-l-2 border-t-2 border-b-2 border-red-500" : ""
        } text-center`}
      >
        <input
          type="radio"
          {...register(name as `guests.${number}.${string}`, {
            required: required,
          })}
          className="hidden"
          value={"true"}
        />
        <div className="font-normal">Yes</div>
      </label>
      {allowPending && (
        <label
          className={`cursor-pointer bg-gray-100 border-gray-100 p-4 has-[:checked]:text-white has-[:checked]:bg-gray-700 has-[:checked]:border-gray-700 ${
            width === "full" ? "w-1/2" : "w-1/4"
          } ${
            error ? "border-l-2 border-t-2 border-b-2 border-red-500" : ""
          } text-center`}
        >
          <input
            type="radio"
            {...register(name as `guests.${number}.${string}`, {
              required: required,
            })}
            className="hidden"
            value={"pending"}
          />
          <div className="font-normal">Pending</div>
        </label>
      )}
      <label
        className={`cursor-pointer bg-gray-100 border-gray-100 p-4 rounded-r-xl has-[:checked]:text-red-500 has-[:checked]:bg-red-100 has-[:checked]:border-red-700 ${
          width === "full" ? "w-1/2" : "w-1/4"
        } ${
          error ? "border-r-2 border-t-2 border-b-2 border-red-500" : ""
        } text-center`}
      >
        <input
          type="radio"
          {...register(name as `guests.${number}.${string}`, {
            required: required,
          })}
          className="hidden"
          value={"false"}
        />
        <div className="font-normal">No</div>
      </label>
    </div>
  );
};
