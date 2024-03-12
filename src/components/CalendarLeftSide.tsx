import { Button } from "@chakra-ui/react";
import { RiTodoLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { CreateTaskModal } from "./Modals/CreateTaskModal";
import { useState } from "react";
import { Task } from "../queries/taskQueries";
import { useTodayTasks } from "../hooks/useTodayTasks";
import { LeftMenuTaskItem } from "./LeftMenuTaskItem";

type Props = {
  tasks: Task[];
};

export const CalendarLeftSide = ({ tasks }: Props) => {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const todayTasks = useTodayTasks(tasks);

  return (
    <>
      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
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
          {todayTasks.map((task) => (
            <LeftMenuTaskItem key={task.id} task={task} />
          ))}
        </ul>
      </div>
    </>
  );
};
