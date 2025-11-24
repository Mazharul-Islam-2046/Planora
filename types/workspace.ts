import { ITask } from "./task";
import { IUser } from "./user";

export interface IWorkspace {
    id?: string;
    name: string;
    description?: string;
    memberIds?: IUser[];
    adminId?: IUser;
    moderatorIds?: IUser[];
    tasks?: ITask[];
    createdAt?: Date;
    updatedAt?: Date;
}