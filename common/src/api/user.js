import axios from "axios";

class UserAPI {
    constructor() {
        this.userAPI = axios.create({
            baseURL: process.env.API_USER_BASE_URL || "http://localhost:4000/api/v1/users/",
        });
    }

    async makeRequest(method, url, data, headers) {
        try {
            const response = await this.userAPI.request({
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
            console.error(error.message);
        }
    }

    async getUserProfile(token) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        return this.makeRequest("get", "profile", null, headers);
    }

    async login(email, password) {
        const credentials = {
            email,
            password,
        };

        return this.makeRequest("post", "login", credentials);
    }

    async logout() {
        return this.makeRequest("post", "logout")
    }

    async register() {
        return this.makeRequest("post", "register");
    }
};

export default new UserAPI();