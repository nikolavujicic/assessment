
import { State, Action, ActionTypes } from '../../types';

export const initialState: State = [];

const tasksReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionTypes.ADD_TASK:
            return [...state, action.payload];
        case ActionTypes.DELETE_TASK:
            console.log(action)
            return state.filter(task => task.id !== action.payload);
        case ActionTypes.UPDATE_TASK:
            return state.map(task =>
                task.id === action.payload.id ? { ...task, ...action.payload } : task
            );
        default:
            throw new Error(`Unknown action type`);
    }
};


export default tasksReducer;