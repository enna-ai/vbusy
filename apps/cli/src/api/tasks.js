import axios from "axios";

class TaskAPI {
    constructor() {
        this.api = axios.create({
            baseURL: process.env.API_TASK_BASE_URL || "http://localhost:8080/api/v1/",
        });
    }

    async makeRequest(method, url, data, headers) {
        try {
            const response = await this.api.request({
                method,
                url,
                data,
                headers,
            });

            if (response.status !== 200) {
                throw new Error(`Request failed with status code ${response.status}`);
            }

            return response.data;
        } catch (error) {
            console.log(error.response.data.error);
        }
    }

    async createTask(newTask, taskPriority, taskDueDate, token) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const data = {
            task: newTask,
            priority: taskPriority,
            dueDate: taskDueDate,
        };

        return this.makeRequest("post", "tasks", data, headers);
    }

    async getTasks(token) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.makeRequest("get", "tasks", null, headers);
    }

    async getTask(taskId, token) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.makeRequest("get", `tasks/${taskId}`, null, headers);
    }

    async deleteTask(taskId, token) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.makeRequest("delete", `tasks/${taskId}`, null, headers);
    }

    async updateTask(taskId, content, token) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const data = {
            task: content,
        };

        return this.makeRequest("patch", `tasks/${taskId}`, data, headers);
    }

    async completeTask(taskId, token) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.makeRequest("put", `tasks/${taskId}/complete`, null, headers);
    }

    async updateTaskDueDate(taskId, date, token) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const data = {
            dueDate: date,
        };

        return this.makeRequest("put", `tasks/${taskId}/due`, data, headers);
    }

    async updateTaskPriority(taskId, taskPriority, token) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const data = {
            priority: taskPriority,
        };

        return this.makeRequest("put", `tasks/${taskId}/priority`, data, headers);
    }

    async archiveTask(taskId, token) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.makeRequest("put", `tasks/${taskId}/archive`, null, headers);
    }

    async purgeTasks(userId, token) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.makeRequest("delete", `tasks/${userId}/purge`, null, headers);
    }
};

export default new TaskAPI();
