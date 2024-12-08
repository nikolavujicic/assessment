import { ReactNode, createContext, useReducer, Dispatch } from 'react';
import tasksReducer, { initialState } from './tasksReducer';
import { State, Action } from '../../types'


export const TasksContext = createContext<{
    state: State;
    dispatch: Dispatch<Action>;
} | null>(null);

function TasksContextProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(tasksReducer, initialState);

    return (
        <TasksContext.Provider value={{ state, dispatch }}>
            {children}
        </TasksContext.Provider>
    );
}

export default TasksContextProvider;
