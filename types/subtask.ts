import { ITask } from "./task"
import { IUser } from "./user"


export enum SubtaskStatus {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}
export interface ISubtask {
    id: string
    title: string
    description?: string
    taskId: ITask
    status: SubtaskStatus
    assignedToId?: string
    assignedTo?: IUser
    createdAt?: Date
    updatedAt?: Date
}