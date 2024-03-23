import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import { useDispatch, useSelector } from "react-redux";
import { TaskStore } from "../store/store";
import { Task, fetchTasks, setSelectedTask } from "../redux/taskSlice";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { CreateTaskModal } from "../components/Modals/CreateTaskModal";
import { toast } from "react-toastify";

export const HomePage = () => {
  const { tasks } = useSelector((state: TaskStore) => state.taskStore);
  const dispatch: ThunkDispatch<Task, Task, Action> = useDispatch();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openModal = (publicId: string) => {
    const resultTask = tasks.find((task) => task.id == Number(publicId));
    resultTask ?
      dispatch(setSelectedTask(resultTask))
      :
      toast.error("Task not found!");

    setIsCreateModalOpen(true);
  }

  const closeModal = () => {
    dispatch(setSelectedTask(null));
    setIsCreateModalOpen(false);
  }

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <>
      <CreateTaskModal isOpen={isCreateModalOpen} onClose={closeModal} />
      <FullCalendar
        events={tasks as EventSourceInput}
        plugins={[dayGridPlugin]}
        eventDataTransform={function (eventData) {
          return {
            ...eventData,
            start: eventData.startDate, // Itt átnevezed a startDate-t start-ra
          };
        }}
        eventClick={(e) => openModal(e.event._def.publicId)}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
      />
      {/* <Outlet /> */}
      {/* </div> */}
    </>
  );
};
