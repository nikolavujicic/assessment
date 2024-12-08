import { render, screen, fireEvent } from '@testing-library/react';
import TasksPage from './TasksPage';
import { useTasks } from '../../hooks/useTasks';
import { ActionTypes } from '../../types';
import { vi, expect } from 'vitest';

vi.mock('../../hooks/useTasks', () => ({
    useTasks: vi.fn(),
}));

describe('TasksPage', () => {
    const mockDispatch = vi.fn();

    beforeEach(() => {
        // @ts-ignore
        (useTasks as jest.Mock).mockReturnValue({
            state: [
                { id: '1', title: 'Task 1', description: 'Description 1' },
                { id: '2', title: 'Task 2', description: 'Description 2' },
            ],
            dispatch: mockDispatch,
        });

        const modalRoot = document.createElement('div');
        modalRoot.setAttribute('id', 'modal');
        document.body.appendChild(modalRoot);
    });

    afterEach(() => {
        vi.clearAllMocks();
        const modalRoot = document.getElementById('modal');
        if (modalRoot) {
            document.body.removeChild(modalRoot);
        }
    });

    it('renders the list of tasks', () => {
        render(<TasksPage />);
        expect(screen.getByText('Tasks')).toBeInTheDocument();
        expect(screen.getByText(/Task 1/)).toBeInTheDocument();
        expect(screen.getByText(/Task 2/)).toBeInTheDocument();
        expect(screen.getByText(/Description 1/)).toBeInTheDocument();
        expect(screen.getByText(/Description 2/)).toBeInTheDocument();
    });

    it('opens the modal to add a new task', () => {
        render(<TasksPage />);
        fireEvent.click(screen.getByText('Add Task'));
        expect(screen.getByPlaceholderText('Task Title')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Task Description')).toBeInTheDocument();
    });

    it('opens the modal to edit a task', () => {
        render(<TasksPage />);
        fireEvent.click(screen.getAllByText('Edit')[0]);
        expect(screen.getByDisplayValue('Task 1')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Description 1')).toBeInTheDocument();
    });

    it('dispatches delete action when deleting a task', () => {
        render(<TasksPage />);
        fireEvent.click(screen.getAllByText('Delete')[0]);
        expect(mockDispatch).toHaveBeenCalledWith({
            type: ActionTypes.DELETE_TASK,
            payload: '1',
        });
    });

    it('dispatches add action when submitting a new task', () => {
        render(<TasksPage />);
        fireEvent.click(screen.getByText('Add Task'));
        fireEvent.change(screen.getByPlaceholderText('Task Title'), {
            target: { value: 'New Task' },
        });
        fireEvent.change(screen.getByPlaceholderText('Task Description'), {
            target: { value: 'New Description' },
        });
        fireEvent.click(screen.getAllByText('Add Task')[0])
        expect(mockDispatch).toHaveBeenCalledWith({
            type: ActionTypes.ADD_TASK,
            payload: { id: expect.any(String), title: 'New Task', description: 'New Description' },
        });
    });

    it('dispatches update action when editing a task', () => {
        render(<TasksPage />);
        fireEvent.click(screen.getAllByText('Edit')[0]);
        fireEvent.change(screen.getByPlaceholderText('Task Title'), {
            target: { value: 'Updated Task' },
        });
        fireEvent.change(screen.getByPlaceholderText('Task Description'), {
            target: { value: 'Updated Description' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'Update Task' }));
        expect(mockDispatch).toHaveBeenCalledWith({
            type: ActionTypes.UPDATE_TASK,
            payload: { id: '1', title: 'Updated Task', description: 'Updated Description' },
        });
    });
});
