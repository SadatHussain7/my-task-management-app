import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  status: "To Do" | "In Progress" | "Done";
  dueDate?: Date;
  user: mongoose.Schema.Types.ObjectId;
  [key: string]: any;
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done"],
      default: "To Do",
    },
    dueDate: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);
