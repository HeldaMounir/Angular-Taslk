import { Subtasks } from "./subtask.model";

export interface Task{
    title: string;
   description: string;
    status: string
    subtasks: Subtasks[]
}