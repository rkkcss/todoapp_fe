import { Button } from "@chakra-ui/react";
import { RiTodoLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { CreateTaskModal } from "./Modals/CreateTaskModal";
import { useState } from "react";
import { LeftMenuTaskItem } from "./LeftMenuTaskItem";
import noDataSvg from "../assets/no-data-icon.svg";
import { Task, setSelectedTask } from "../redux/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { TaskStore } from "../store/store";

export const CalendarLeftSide = () => {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const { todaysTasks } = useSelector((state: TaskStore) => state.taskStore);
  const dispatch = useDispatch();

  const openTaskModal = (task: Task) => {
    dispatch(setSelectedTask(task));
    setIsCreateTaskModalOpen(true);
  }

  const closeTaskModal = () => {
    setIsCreateTaskModalOpen(false);
    dispatch(setSelectedTask(null));
  }

  return (
    <>
      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={closeTaskModal}
      />
      <Button
        leftIcon={<IoMdAdd className="text-2xl" />}
        colorScheme="purple"
        variant="solid"
        onClick={() => setIsCreateTaskModalOpen(true)}
      >
        Create
      </Button>

      <div className="py-4"></div>
      <div className="flex text-xl items-center gap-2 mb-6">
        <RiTodoLine />
        <p className="font-semibold">Todos for today</p>
      </div>
      <div>
        <ul className="flex flex-col gap-1">
          {todaysTasks.length > 0 ? todaysTasks.map((task) => (
            <LeftMenuTaskItem key={task.id} task={task} openModal={openTaskModal} />
          ))
            : (
              <p className="text-gray-500 flex flex-col items-center">
                <img src={noDataSvg} alt="No data" className="w-8" />
                No tasks for today
              </p>
            )
          }
        </ul>
      </div>
    </>
  );
};
