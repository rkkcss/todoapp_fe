import { Tooltip } from "@chakra-ui/react";
import { GrClose } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { Task, deleteTask } from "../redux/taskSlice";
import { useDispatch } from "react-redux";
import { PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";

type Props = {
  task: Task;
  openModal: (task: Task) => void;
};

export const LeftMenuTaskItem = ({ task, openModal }: Props) => {
  const dispatch: ThunkDispatch<string, number, PayloadAction> = useDispatch();

  const deleteTaskHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteTask(task.id));
  }

  return (
    <li
      onClick={() => openModal(task)}
      className="flex 
        gap-3 
        justify-between 
        items-center 
        group 
        p-2 
        hover:rounded 
        hover:outline 
        hover:outline-2
        hover:outline-purple-600 
        cursor-pointer 
        h-[38px] 
        w-full"
    >
      <Tooltip label={task.title}>
        <p className="font-medium text-lg text-nowrap truncate">{task.title}</p>
      </Tooltip>
      <div className="hidden group-hover:flex gap-3 bg-white">
        <Tooltip label="Delete task">
          <div onClick={deleteTaskHandler} className="p-1.5 rounded-full hover:bg-gray-200 cursor-pointer group">
            <GrClose className="text-lg" />
          </div>
        </Tooltip>
        <Tooltip label="Task settings">
          <div className="p-1.5 rounded-full hover:bg-gray-200 cursor-pointer">
            <IoSettingsOutline className="text-lg" />
          </div>
        </Tooltip>
      </div>
    </li>
  );
};
