import { Schema, model, Document, Types } from "mongoose";

interface RecentActivity {
    task?: string;
    action: string;
    description: string;
    timestamp: Date;
}

interface ActivityModel extends Document {
    user: Types.ObjectId;
    activities: RecentActivity[],
}

const ActivitySchema = new Schema<ActivityModel>({
    user: { type: Schema.Types.ObjectId, ref: "users" },
    activities: [
        {
            task: { type: String, default: null },
            action: { type: String, default: "Update"},
            description: { type: String },
            timestamp: { type: Date, default: Date.now },
        },
    ],
});

const Activity = model<ActivityModel>("activity", ActivitySchema);

export default Activity;