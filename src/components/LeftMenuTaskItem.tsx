import { Task } from "../queries/taskQueries";
import { Tooltip } from "@chakra-ui/react";
import { GrClose } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";

type Props = {
  task: Task;
};

export const LeftMenuTaskItem = ({ task }: Props) => {
  return (
    <li
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
          <div className="p-1.5 rounded-full hover:bg-gray-200 cursor-pointer group">
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
