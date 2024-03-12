import { useEffect, useState } from "react";
import { Task, getTasks } from "../queries/taskQueries";
import { Header } from "../components/Header";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { CalendarLeftSide } from "../components/CalendarLeftSide";
import { EventSourceInput } from "@fullcalendar/core/index.js";

export const HomePage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks().then((data) => {
      setTasks(data);
    });
  }, []);

  return (
    <>
      <div className="border-b mb-2">
        <Header />
      </div>
      <div className="flex h-[calc(100vh-73px)] mr-3">
        <div className="w-[256px] p-4">
          <CalendarLeftSide tasks={tasks} />
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
