import { useEffect } from "react";
import { Header } from "../components/Header";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { CalendarLeftSide } from "../components/CalendarLeftSide";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import { useDispatch, useSelector } from "react-redux";
import { TaskStore } from "../store/store";
import { Task, fetchTasks } from "../redux/taskSlice";
import { PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";

export const HomePage = () => {
  const { tasks } = useSelector((state: TaskStore) => state.taskStore);
  const dispatch: ThunkDispatch<Task, Task, PayloadAction> = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <>
      <div className="border-b mb-2">
        <Header />
      </div>
      <div className="flex h-[calc(100vh-73px)] mr-3">
        <div className="w-[256px] p-4">
          <CalendarLeftSide />
        </div>
        <FullCalendar
          events={tasks as EventSourceInput}
          plugins={[dayGridPlugin]}
          eventDataTransform={function (eventData) {
            return {
              ...eventData,
              start: eventData.startDate, // Itt átnevezed a startDate-t start-ra
            };
          }}
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,dayGridWeek,dayGridDay",
          }}
        />
      </div>
    </>
  );
};
