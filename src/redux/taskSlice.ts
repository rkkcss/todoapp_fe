import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTasks } from "../queries/taskQueries"
import { API } from "../utils/API";
import { toast } from "react-toastify";
import { FieldValues } from "react-hook-form";
import { AxiosError } from "axios";

export type Task = {
    id: number;
    title: string;
    createdDate: Date;
    description: string;
    startDate: Date;
    endDate: Date;
    modifiedDate: Date;
};

export type TaskState = {
    tasks: Task[],
    todaysTasks: Task[],
    selectedTask: null | Task,
}

const initialState: TaskState = {
    tasks: [],
    todaysTasks: [],
    selectedTask: null,
}

export const fetchTasks = createAsyncThunk<Task[]>("getTasks", async () => {
    return await getTasks();
});

export const deleteTask = createAsyncThunk<number, number>(
    "deleteTask",
    async (id: number) => {
        try {
            const response = await API.delete(`api/task/${id}`);
            toast.success(response.data);
            return id;
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                toast.error(axiosError.response.data as string);
                throw axiosError.response.data;
            } else {
                toast.error(axiosError.message as string);
                throw axiosError.message;
            }
        }
    }
);



export const createTask = createAsyncThunk<Task, FieldValues>("createTask", async (task: FieldValues): Promise<Task> => {
    return await API.post("api/task", task)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            toast.error(error.response.data);
        });
});

// Filtering tasks and set todays tasks
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

const tasksSlice = createSlice({
    name: "taskStore",
    initialState,
    reducers: {
        setSelectedTask(state, action: PayloadAction<Task | null>) {
            state.selectedTask = action.payload;
        },
        addTask(state, action: PayloadAction<Task>) {
            state.tasks.push(action.payload);
        },
        setTodaysTasks(state, action: PayloadAction<Task[]>) {
            state.todaysTasks = action.payload;
        }

    },
    extraReducers(builder) {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;
                state.todaysTasks = action.payload.filter((task) => isToday(task.startDate));
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                console.log('deleteaction', action);
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
                state.todaysTasks = state.tasks.filter((task) => isToday(task.startDate));
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
                state.todaysTasks = state.tasks.filter((task) => isToday(task.startDate));
            });
    },
});

export const { setSelectedTask, setTodaysTasks } = tasksSlice.actions;

export default tasksSlice.reducer;