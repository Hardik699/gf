import express, { Router, RequestHandler } from "express";
import { Employee } from "../models/Employee";

const router = Router();

// Get all employees
export const getAllEmployees: RequestHandler = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("pcLaptopId")
      .populate("assignedAssets")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: employees });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch employees",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get single employee
export const getEmployee: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id)
      .populate("pcLaptopId")
      .populate("assignedAssets");
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res.json({ success: true, data: employee });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch employee",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Create employee
export const createEmployee: RequestHandler = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      position,
      department,
      employeeId,
      pcLaptopId,
      assignedAssets,
    } = req.body;

    if (!name || !email) {
      return res
        .status(400)
        .json({ success: false, message: "Name and email are required" });
    }

    const employee = new Employee({
      name,
      email,
      phone,
      position,
      department,
      employeeId,
      pcLaptopId,
      assignedAssets,
    });

    const savedEmployee = await employee.save();
    const populatedEmployee = await savedEmployee
      .populate("pcLaptopId")
      .populate("assignedAssets");

    res.status(201).json({ success: true, data: populatedEmployee });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create employee",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update employee
export const updateEmployee: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    })
      .populate("pcLaptopId")
      .populate("assignedAssets");
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res.json({ success: true, data: employee });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update employee",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Delete employee
export const deleteEmployee: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res.json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete employee",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Assign PC/Laptop to employee
export const assignPCLaptop: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { pcLaptopId } = req.body;

    const employee = await Employee.findByIdAndUpdate(
      id,
      { pcLaptopId },
      { new: true },
    )
      .populate("pcLaptopId")
      .populate("assignedAssets");

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    res.json({ success: true, data: employee });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to assign PC/Laptop",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Assign assets to employee
export const assignAssets: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { assetIds } = req.body;

    const employee = await Employee.findByIdAndUpdate(
      id,
      { assignedAssets: assetIds },
      { new: true },
    )
      .populate("pcLaptopId")
      .populate("assignedAssets");

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    res.json({ success: true, data: employee });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to assign assets",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Routes
router.get("/", getAllEmployees);
router.get("/:id", getEmployee);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
router.post("/:id/assign-pc-laptop", assignPCLaptop);
router.post("/:id/assign-assets", assignAssets);

export default router;
