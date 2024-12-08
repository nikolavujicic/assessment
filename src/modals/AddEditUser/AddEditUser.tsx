import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Task, AddEditUserType } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { ModalOverlay, ModalContent, ModalForm } from './AddEditUser.styles';

function AddEditUser({ isOpen, closeModal, task: existingTask, onSubmit }: AddEditUserType) {
    if (!isOpen) return null;

    const [task, setTask] = useState<Task>({ title: '', description: '', id: uuidv4() });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (existingTask) {
            setTask(existingTask);
        }
    }, [existingTask]);

    const onTaskSubmitted = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        if (!task.title.trim() || !task.description?.trim()) return;
        onSubmit(task);
    };

    const onInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTask((prev) => ({ ...prev, [name]: value }));
    };

    const onClickedOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            closeModal(false);
        }
    };

    return createPortal(
        <ModalOverlay onClick={onClickedOutside}>
            <ModalContent>
                <ModalForm onSubmit={onTaskSubmitted}>
                    <input
                        value={task.title}
                        name="title"
                        onChange={onInputChanged}
                        placeholder="Task Title"
                    />
                    {submitted && !task.title.trim() && (
                        <p className="error">Title is required</p>
                    )}
                    <input
                        value={task.description}
                        name="description"
                        onChange={onInputChanged}
                        placeholder="Task Description"
                    />
                    {submitted && !task.description?.trim() && (
                        <p className="error">Description is required</p>
                    )}
                    <button type="submit">
                        {existingTask ? 'Update Task' : 'Add Task'}
                    </button>
                </ModalForm>
            </ModalContent>
        </ModalOverlay>,
        document.getElementById('modal')!
    );
}

export default AddEditUser;
