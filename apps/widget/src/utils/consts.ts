import moment from "moment";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
export const CLIENT_BASE_URL = process.env.NEXT_PUBLIC_CLIENT_BASE_URL || "http://localhost:3000";

export const meta = {
  title: "Vbusy Widget",
  description: "A task manager web widget builder",
  icon: "/favicon.ico",
  url: "https://vbusy-widget.vercel.app",
  color: "#181926",
  creator: "enna-ai",
};

export const formatDueDate = (date: string) => moment(date).format("MMM Do YYYY");

export const priorityColors = {
  low: "#a6da95",
  medium: "#f5a97f",
  high: "#ed8796",
} as any;
