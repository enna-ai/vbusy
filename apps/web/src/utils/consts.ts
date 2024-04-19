export const FILTER_ALL = "All";
export const FILTER_COMPLETED = "Completed";
export const FILTER_ARCHIVED = "Archived";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/";

export const meta = {
  title: "Vbusy",
  description: "A versatile task manager app",
  icon: "/favicon.ico",
  banner: "/banner.png",
  url: "https://vbusy.vercel.app",
  color: "#181926",
  creator: "enna-ai",
  keywords: ["Task Manager", "Productivity", "Vbusy"],
};

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

export const priorityColors = {
  create: "#a6da95",
  update: "#f5a97f",
  delete: "#ed8796",
  purge: "#ed8796",
  archive: "#7dc4e4",
} as any;

export const formatTimestamp = (timestamp: Date) => {
  const now = new Date();
  const time = new Date(timestamp);
  const timeDifference = now.getTime() - time.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 7) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      const formattedDate = time.toLocaleDateString(undefined, options as Intl.DateTimeFormatOptions);
      return formattedDate;
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
};
