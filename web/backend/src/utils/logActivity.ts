import Activity from "../models/activity.model";

const logActivity = async (userId: string, action: string, description: string, task?: string): Promise<void> => {
    try {
        const newActivity = {
            action,
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