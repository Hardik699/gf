import mongoose, { Schema, Document } from "mongoose";

export interface ISystemAsset extends Document {
  category: string;
  serialNumber?: string;
  vendorName?: string;
  companyName?: string;
  purchaseDate?: Date;
  warrantyEndDate?: Date;
  // RAM specific fields
  ramSize?: string;
  ramType?: string;
  // Motherboard specific fields
  processorModel?: string;
  // Storage specific fields
  storageType?: string;
  storageCapacity?: string;
  // Vonage specific fields
  vonageNumber?: string;
  vonageExtCode?: string;
  vonagePassword?: string;
  createdAt: Date;
  updatedAt: Date;
}

const systemAssetSchema = new Schema<ISystemAsset>(
  {
    category: {
      type: String,
      required: true,
      enum: [
        "mouse",
        "keyboard",
        "motherboard",
        "ram",
        "storage",
        "power-supply",
        "headphone",
        "camera",
        "monitor",
        "vonage",
      ],
    },
    serialNumber: String,
    vendorName: String,
    companyName: String,
    purchaseDate: Date,
    warrantyEndDate: Date,
    ramSize: String,
    ramType: String,
    processorModel: String,
    storageType: String,
    storageCapacity: String,
    vonageNumber: String,
    vonageExtCode: String,
    vonagePassword: String,
  },
  { timestamps: true }
);

export const SystemAsset =
  mongoose.models.SystemAsset ||
  mongoose.model<ISystemAsset>("SystemAsset", systemAssetSchema);
