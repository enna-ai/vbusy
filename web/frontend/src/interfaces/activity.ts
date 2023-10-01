interface RecentActivities {
    task?: string;
    description: string;
    timestamp: Date;
}

export interface Activity {
    activities: RecentActivities[];
}