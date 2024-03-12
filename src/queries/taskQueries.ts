import { FieldValues } from "react-hook-form";
import { API } from "../utils/API";
import { toast } from "react-toastify";

export type Task = {
  id?: number;
  title: string;
  createdDate: Date;
  description: string;
  startDate: Date;
  endDate: Date;
  modifiedDate: Date;
};

export const getTasks = async (): Promise<Task[]> => {
  return await API.get("api/tasks")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      toast.error(error.response.data);
    });
};

export const createTask = async (task: FieldValues): Promise<Task> => {
  return await API.post("api/tasks", task)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      toast.error(error.response.data);
    });
};
