import { Schema, model, Document, Types } from "mongoose";

interface TaskLabel {
  name: string;
  color?: string;
}

interface LabelModel extends Document {
  user: Types.ObjectId,
  labels: TaskLabel[],
}

const LabelSchema = new Schema<LabelModel>({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  labels: [
    {
      name: { type: String, default: null },
      color: { type: String, default: "#000000" },
    }
  ]
}, {
  timestamps: true,
});

const Label = model<LabelModel>("label", LabelSchema);

export default Label;
