import { ISubtask } from "./subtask";

export interface ITask {
    id?: string;
    title: string;
    description?: string;
    subtasks?: ISubtask[];
    status: string;
    workspaceId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}