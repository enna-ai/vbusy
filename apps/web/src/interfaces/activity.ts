export interface RecentActivities {
  activity: "delete" | "create" | "update" | "purge" | "archive";
  task?: string;
  description: string;
  timestamp: Date;
}

export interface Activity {
  activities: RecentActivities[];
}
