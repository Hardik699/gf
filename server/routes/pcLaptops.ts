import express, { Router, RequestHandler } from "express";
import { PCLaptop } from "../models/PCLaptop";

const router = Router();

// Get all PC/Laptops
export const getAllPCLaptops: RequestHandler = async (req, res) => {
  try {
    const pcLaptops = await PCLaptop.find()
      .populate([
        "mouseId",
        "keyboardId",
        "motherboardId",
        "cameraId",
        "headphoneId",
        "powerSupplyId",
        "storageId",
        "ramId",
        "ramId2",
      ])
      .sort({ createdAt: -1 });
    res.json({ success: true, data: pcLaptops });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch PC/Laptops",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get single PC/Laptop
export const getPCLaptop: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const pcLaptop = await PCLaptop.findById(id).populate([
      "mouseId",
      "keyboardId",
      "motherboardId",
      "cameraId",
      "headphoneId",
      "powerSupplyId",
      "storageId",
      "ramId",
      "ramId2",
    ]);
    if (!pcLaptop) {
      return res
        .status(404)
        .json({ success: false, message: "PC/Laptop not found" });
    }
    res.json({ success: true, data: pcLaptop });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch PC/Laptop",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Create PC/Laptop
export const createPCLaptop: RequestHandler = async (req, res) => {
  try {
    const {
      mouseId,
      keyboardId,
      motherboardId,
      cameraId,
      headphoneId,
      powerSupplyId,
      storageId,
      ramId,
      ramId2,
    } = req.body;

    const pcLaptop = new PCLaptop({
      mouseId,
      keyboardId,
      motherboardId,
      cameraId,
      headphoneId,
      powerSupplyId,
      storageId,
      ramId,
      ramId2,
    });

    const savedPCLaptop = await pcLaptop.save();
    const populatedPCLaptop = await savedPCLaptop.populate([
      "mouseId",
      "keyboardId",
      "motherboardId",
      "cameraId",
      "headphoneId",
      "powerSupplyId",
      "storageId",
      "ramId",
      "ramId2",
    ]);

    res.status(201).json({ success: true, data: populatedPCLaptop });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create PC/Laptop",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update PC/Laptop
export const updatePCLaptop: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const pcLaptop = await PCLaptop.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate([
      "mouseId",
      "keyboardId",
      "motherboardId",
      "cameraId",
      "headphoneId",
      "powerSupplyId",
      "storageId",
      "ramId",
      "ramId2",
    ]);
    if (!pcLaptop) {
      return res
        .status(404)
        .json({ success: false, message: "PC/Laptop not found" });
    }
    res.json({ success: true, data: pcLaptop });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update PC/Laptop",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Delete PC/Laptop
export const deletePCLaptop: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const pcLaptop = await PCLaptop.findByIdAndDelete(id);
    if (!pcLaptop) {
      return res
        .status(404)
        .json({ success: false, message: "PC/Laptop not found" });
    }
    res.json({ success: true, message: "PC/Laptop deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete PC/Laptop",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Routes
router.get("/", getAllPCLaptops);
router.get("/:id", getPCLaptop);
router.post("/", createPCLaptop);
router.put("/:id", updatePCLaptop);
router.delete("/:id", deletePCLaptop);

export default router;
