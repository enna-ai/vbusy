export const FILTER_ALL = "All";
export const FILTER_COMPLETED = "Completed";
export const FILTER_ARCHIVED = "Archived";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/";

export enum ENDPOINTS {
    AuthLogin = "api/v1/users/login",
    AuthLogout = "api/v1/users/logout",
    AuthRegister = "api/v1/users/register",
    UserSettings = "api/v1/users/settings",
    UserProfile = "api/v1/users/profile",
    Onboarding = "api/v1/users/onboarding",
    User = "api/v1/users",
    Task = "api/v1/tasks",
    Activity = "api/v1/activity"
}
