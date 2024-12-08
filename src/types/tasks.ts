import { ActionTypes } from "./actionTypes";

export interface Task {
    id: string;
    title: string;
    description?: string;
}

export type State = Task[];

export type Action =
    | { type: ActionTypes.ADD_TASK; payload: Task }
    | { type: ActionTypes.DELETE_TASK; payload: string }
    | { type: ActionTypes.UPDATE_TASK; payload: Task };