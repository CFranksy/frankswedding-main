type ScheduleData = {
  start: string;
  end: string;
  title: string;
  description?: string;
  location: string;
  icon?: string;
};

export type ScheduleBody = {
  [date: string]: ScheduleData[];
};

export type GuestItem = {
  name: string;
  type: "original" | "plusOne";
  allergies: string;
  allergyDetails: string;
};

export type Guest = {
  _id?: string;
  guests: GuestItem[];
  allowedPlusOne: "pending" | "true" | "false";
  attending: "pending" | "true" | "false";
};
