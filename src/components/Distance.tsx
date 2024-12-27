import { formatDistanceToNowStrict, format } from "date-fns";

export const Distance = () => {
  const date = process.env.WEDDING_DATE;
  const formatted = formatDistanceToNowStrict(
    format(date || "", "dd/MM/yyyy"),
    {
      unit: "day",
    }
  );

  return formatted;
};
