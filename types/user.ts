import { IWorkspace } from "./workspace";

export interface IUser {
    id?: string;
    name: string;
    email: string;
    emailVerified?: boolean;
    image?: string;
    adminWorkspaces?: IWorkspace[];
    moderatorWorkspaceIds?: IWorkspace[];
    workspaces?: IWorkspace[];
    accounts?: [string];
    authenthicator?: [string];
    tasksAssigned?: [string];
    createdAt?: Date;
    updatedAt?: Date;
}



