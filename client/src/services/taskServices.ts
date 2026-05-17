import API from "./api"

export const getTasks = async () => {
    const response = await API.get("/tasks/")
    return response.data
}
export const createTask = async (taskData: any) => {
    const response = await API.post("/tasks", taskData)
    return response.data
}
export const deleteTask = async (taskId: number) => {
    const response = await API.delete(`/tasks/${taskId}`)
    return response.data
}