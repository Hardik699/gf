import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPCLaptop extends Document {
  mouseId?: Types.ObjectId;
  keyboardId?: Types.ObjectId;
  motherboardId?: Types.ObjectId;
  cameraId?: Types.ObjectId;
  headphoneId?: Types.ObjectId;
  powerSupplyId?: Types.ObjectId;
  storageId?: Types.ObjectId;
  ramId?: Types.ObjectId;
  ramId2?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const pcLaptopSchema = new Schema<IPCLaptop>(
  {
    mouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SystemAsset",
    },
    keyboardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SystemAsset",
    },
    motherboardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SystemAsset",
    },
    cameraId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SystemAsset",
    },
    headphoneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SystemAsset",
    },
    powerSupplyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SystemAsset",
    },
    storageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SystemAsset",
    },
    ramId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SystemAsset",
    },
    ramId2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SystemAsset",
    },
  },
  { timestamps: true }
);

export const PCLaptop =
  mongoose.models.PCLaptop || mongoose.model<IPCLaptop>("PCLaptop", pcLaptopSchema);
