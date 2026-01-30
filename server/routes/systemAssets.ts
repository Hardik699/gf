import express, { Router, RequestHandler } from "express";
import { SystemAsset } from "../models/SystemAsset";

const router = Router();

// Get all system assets
export const getAllAssets: RequestHandler = async (req, res) => {
  try {
    const assets = await SystemAsset.find().sort({ createdAt: -1 });
    res.json({ success: true, data: assets });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch assets",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get assets by category
export const getAssetsByCategory: RequestHandler = async (req, res) => {
  try {
    const { category } = req.params;
    const assets = await SystemAsset.find({ category }).sort({ createdAt: -1 });
    res.json({ success: true, data: assets });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch assets",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get single asset
export const getAsset: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const asset = await SystemAsset.findById(id);
    if (!asset) {
      return res
        .status(404)
        .json({ success: false, message: "Asset not found" });
    }
    res.json({ success: true, data: asset });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch asset",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Create system asset
export const createAsset: RequestHandler = async (req, res) => {
  try {
    const { category, serialNumber, vendorName, companyName, ...rest } =
      req.body;

    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Category is required" });
    }

    const asset = new SystemAsset({
      category,
      serialNumber,
      vendorName,
      companyName,
      ...rest,
    });

    const savedAsset = await asset.save();
    res.status(201).json({ success: true, data: savedAsset });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create asset",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update system asset
export const updateAsset: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const asset = await SystemAsset.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!asset) {
      return res
        .status(404)
        .json({ success: false, message: "Asset not found" });
    }
    res.json({ success: true, data: asset });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update asset",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Delete system asset
export const deleteAsset: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const asset = await SystemAsset.findByIdAndDelete(id);
    if (!asset) {
      return res
        .status(404)
        .json({ success: false, message: "Asset not found" });
    }
    res.json({ success: true, message: "Asset deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete asset",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Routes
router.get("/", getAllAssets);
router.get("/category/:category", getAssetsByCategory);
router.get("/:id", getAsset);
router.post("/", createAsset);
router.put("/:id", updateAsset);
router.delete("/:id", deleteAsset);

export default router;
