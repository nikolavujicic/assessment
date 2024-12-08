import { Task } from "./tasks"

export type AddEditUserType = {
    isOpen: boolean
    closeModal: (isOpen: boolean) => void
    task: Task | null
    onSubmit: (task: Task) => void
}