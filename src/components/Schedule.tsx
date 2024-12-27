import Data from "@/../public/info.json";
import { ScheduleBody, ScheduleData } from "../../types";
import SCHEDULE_Item from "./SCHEDULE_Item";
import React from "react";
import { formatDate } from "date-fns";

const Schedule = () => {
  const scheduleData: ScheduleBody = Data.schedule as ScheduleBody;

  return (
    <div className="sm:w-full w-[95%] ">
      {Object.keys(scheduleData).map((date: string) => {
        const dateData = scheduleData[date];
        return (
          <React.Fragment key={date}>
            <h3 className="w-full bg-white border-t-black border-t-[1px] mt-2 leading-[0.1em] mb-8">
              <span className="bg-white px-2 sm:px-8">
                {formatDate(date, "EEEE do LLLL")}
              </span>
            </h3>
            <div className="flex flex-col gap-10 divide-y">
              {dateData.map((data: ScheduleData, key: number) => {
                return (
                  <div key={key} className="py-2">
                    <SCHEDULE_Item data={data} />
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Schedule;
