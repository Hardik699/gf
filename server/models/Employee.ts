import mongoose, { Schema, Document, Types } from "mongoose";

export interface IEmployee extends Document {
  name: string;
  email: string;
  phone?: string;
  position?: string;
  department?: string;
  employeeId?: string;
  pcLaptopId?: Types.ObjectId;
  assignedAssets?: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const employeeSchema = new Schema<IEmployee>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: String,
    position: String,
    department: String,
    employeeId: {
      type: String,
      unique: true,
      sparse: true,
    },
    pcLaptopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PCLaptop",
    },
    assignedAssets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SystemAsset",
      },
    ],
  },
  { timestamps: true },
);

export const Employee =
  mongoose.models.Employee ||
  mongoose.model<IEmployee>("Employee", employeeSchema);
