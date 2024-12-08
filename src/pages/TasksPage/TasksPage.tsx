import { useTasks } from '../../hooks/useTasks';
import { ActionTypes, Task } from '../../types';
import AddEditUser from '../../modals/AddEditUser/AddEditUser';
import { useState } from 'react';

import {
    PageContainer,
    PageHeader,
    TaskList,
    TaskItem,
    TaskText,
    TaskActions,
    AddButton,
} from './TasksPage.styles';

const TasksPage = () => {
    const { state: tasks, dispatch } = useTasks();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);

    const handleAddTask = () => {
        setCurrentTask(null);
        setIsModalOpen(true);
    };

    const handleEditTask = (task: Task) => {
        setCurrentTask(task);
        setIsModalOpen(true);
    };

    const handleDeleteTask = (id: string) => {
        dispatch({ type: ActionTypes.DELETE_TASK, payload: id });
    };

    const handleTaskSubmit = (task: Task) => {
        if (currentTask) {
            dispatch({ type: ActionTypes.UPDATE_TASK, payload: task });
        } else {
            dispatch({ type: ActionTypes.ADD_TASK, payload: task });
        }
        setIsModalOpen(false);
    };

    return (
        <PageContainer>
            <AddEditUser
                isOpen={isModalOpen}
                closeModal={setIsModalOpen}
                task={currentTask}
                onSubmit={handleTaskSubmit}
            />
            <PageHeader>Tasks</PageHeader>
            <TaskList>
                {tasks.map((task) => (
                    <TaskItem key={task.id}>
                        <TaskText>
                            <strong>{task.title}</strong> - {task.description}
                        </TaskText>
                        <TaskActions>
                            <button className="edit" onClick={() => handleEditTask(task)}>
                                Edit
                            </button>
                            <button className="delete" onClick={() => handleDeleteTask(task.id)}>
                                Delete
                            </button>
                        </TaskActions>
                    </TaskItem>
                ))}
            </TaskList>
            <AddButton onClick={handleAddTask}>Add Task</AddButton>
        </PageContainer>
    );
};

export default TasksPage;
