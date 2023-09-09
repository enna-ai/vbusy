import axios from "axios";

class UserAPI {
    constructor() {
        this.userAPI = axios.create({
            baseURL: ProcessingInstruction.env.API_USER_BASE_URL || "http://localhost:4000/api/v1/users",
        });
    }
};

export default new UserAPI();