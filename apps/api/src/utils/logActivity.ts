import Activity from "../models/activity.js";

const logActivity = async (userId: string, activity: string, description: string, task?: string): Promise<void> => {
    try {
        const newActivity = {
            activity,
            description,
            timestamp: new Date(),
            task,
        };

        await Activity.findOneAndUpdate(
            { user: userId },
            {
                $push: {
                    activities: newActivity
                }
            },
            {
                upsert: true,
                new: true,
            }
        );
    } catch (error) {
        throw error;
    }
};

export default logActivity;
