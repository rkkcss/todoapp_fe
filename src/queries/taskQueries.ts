import { FieldValues } from "react-hook-form";
import { API } from "../utils/API";
import { toast } from "react-toastify";
import { Task } from "../redux/taskSlice";

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
  return await API.post("api/task", task)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      toast.error(error.response.data);
    });
};
