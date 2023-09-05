import process from "node:process";
import axios from "axios";

class TaskAPI {
    constructor() {
        this.api = axios.create({
            baseURL: process.env.API_BASE_URL || "http://localhost:4000/api/v1/",
        });
    }

    async makeRequest(method, url, data) {
        try {
            const response = await this.api.request({
                method,
                url,
                data,
            });

            if (response.status !== 200) {
                throw new Error(`Request failed with status code ${response.status}`);
            }

            return response.data;
        } catch (error) {
            console.error(error.message);
        }
    }

    async createTask(newTask) {
        const data = {
            task: newTask,
        };

        return this.makeRequest("post", "tasks", data);
    }

    async getTasks() {
        return this.makeRequest("get", "tasks");
    }

    async getTask(taskId) {
        return this.makeRequest("get", `task/${taskId}`);
    }

    async deleteTask(taskId) {
        return this.makeRequest("delete", `task/${taskId}`);
    }

    async updateTask(taskId, content) {
        const data = {
            task: content,
        };

        return this.makeRequest("put", `task/${taskId}`, data);
    }

    async completeTask(taskId) {
        return this.makeRequest("put", `task/${taskId}/complete`);
    }

    async updateTaskDueDate(taskId, date) {
        const data = {
            dueDate: date,
        };

        return this.makeRequest("put", `task/${taskId}/due`, data);
    }

    async updateTaskPriority(taskId, taskPriority) {
        const data = {
            priority: taskPriority,
        };

        return this.makeRequest("put", `task/${taskId}/priority`, data);
    }
};

export default new TaskAPI();