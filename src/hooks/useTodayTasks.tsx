import { useEffect, useState } from "react";
import { Task } from "../queries/taskQueries";

export const useTodayTasks = (tasks: Task[]): Task[] => {
  const isToday = (date: Date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const [todayTasks, setTodayTasks] = useState<Task[]>([]);

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => isToday(task.startDate));
    setTodayTasks(filteredTasks);
  }, [tasks]);

  return todayTasks;
};
