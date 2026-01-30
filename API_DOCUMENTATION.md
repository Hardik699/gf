# MongoDB API Documentation

## Overview
All data is now saved to MongoDB. No data is stored locally. The application uses the following MongoDB connection:
- **Connection String**: `mongodb+srv://hardik:Hardik1@infoseum.a4beisu.mongodb.net/?appName=Infoseum`
- **Database**: Infoseum

## Base URL
`http://localhost:8080/api`

---

## System Assets API

### Get All System Assets
- **Endpoint**: `GET /system-assets`
- **Description**: Retrieves all system assets from the database
- **Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "ObjectId",
      "category": "mouse|keyboard|motherboard|ram|storage|power-supply|headphone|camera|monitor|vonage",
      "serialNumber": "string",
      "vendorName": "string",
      "companyName": "string",
      "purchaseDate": "ISO Date",
      "warrantyEndDate": "ISO Date",
      "ramSize": "string (for RAM)",
      "ramType": "string (for RAM)",
      "processorModel": "string (for motherboard)",
      "storageType": "string (for storage)",
      "storageCapacity": "string (for storage)",
      "vonageNumber": "string (for vonage)",
      "vonageExtCode": "string (for vonage)",
      "vonagePassword": "string (for vonage)",
      "createdAt": "ISO Date",
      "updatedAt": "ISO Date"
    }
  ]
}
```

### Get Assets by Category
- **Endpoint**: `GET /system-assets/category/:category`
- **Parameters**: 
  - `category`: mouse, keyboard, motherboard, ram, storage, power-supply, headphone, camera, monitor, vonage
- **Response**: Same structure as above, filtered by category

### Get Single Asset
- **Endpoint**: `GET /system-assets/:id`
- **Parameters**: 
  - `id`: MongoDB ObjectId of the asset
- **Response**: Single asset object

### Create System Asset
- **Endpoint**: `POST /system-assets`
- **Method**: POST
- **Body**:
```json
{
  "category": "mouse|keyboard|motherboard|ram|storage|power-supply|headphone|camera|monitor|vonage",
  "serialNumber": "string",
  "vendorName": "string",
  "companyName": "string",
  "purchaseDate": "ISO Date (optional)",
  "warrantyEndDate": "ISO Date (optional)",
  "ramSize": "string (for RAM only)",
  "ramType": "string (for RAM only)",
  "processorModel": "string (for motherboard only)",
  "storageType": "string (for storage only)",
  "storageCapacity": "string (for storage only)",
  "vonageNumber": "string (for vonage only)",
  "vonageExtCode": "string (for vonage only)",
  "vonagePassword": "string (for vonage only)"
}
```

### Update System Asset
- **Endpoint**: `PUT /system-assets/:id`
- **Parameters**: 
  - `id`: MongoDB ObjectId
- **Body**: Same as Create (partial update supported)

### Delete System Asset
- **Endpoint**: `DELETE /system-assets/:id`
- **Parameters**: 
  - `id`: MongoDB ObjectId
- **Response**: 
```json
{
  "success": true,
  "message": "Asset deleted successfully"
}
```

---

## PC/Laptop Configuration API

### Get All PC/Laptops
- **Endpoint**: `GET /pc-laptops`
- **Description**: Retrieves all PC/Laptop configurations with populated asset details
- **Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "ObjectId",
      "mouseId": { ...asset },
      "keyboardId": { ...asset },
      "motherboardId": { ...asset },
      "cameraId": { ...asset },
      "headphoneId": { ...asset },
      "powerSupplyId": { ...asset },
      "storageId": { ...asset },
      "ramId": { ...asset },
      "ramId2": { ...asset },
      "createdAt": "ISO Date",
      "updatedAt": "ISO Date"
    }
  ]
}
```

### Get Single PC/Laptop
- **Endpoint**: `GET /pc-laptops/:id`
- **Parameters**: 
  - `id`: MongoDB ObjectId
- **Response**: Single PC/Laptop configuration with populated assets

### Create PC/Laptop Configuration
- **Endpoint**: `POST /pc-laptops`
- **Body**:
```json
{
  "mouseId": "ObjectId (optional)",
  "keyboardId": "ObjectId (optional)",
  "motherboardId": "ObjectId (optional)",
  "cameraId": "ObjectId (optional)",
  "headphoneId": "ObjectId (optional)",
  "powerSupplyId": "ObjectId (optional)",
  "storageId": "ObjectId (optional)",
  "ramId": "ObjectId (optional)",
  "ramId2": "ObjectId (optional)"
}
```

### Update PC/Laptop Configuration
- **Endpoint**: `PUT /pc-laptops/:id`
- **Parameters**: 
  - `id`: MongoDB ObjectId
- **Body**: Same as Create (partial update supported)

### Delete PC/Laptop Configuration
- **Endpoint**: `DELETE /pc-laptops/:id`
- **Parameters**: 
  - `id`: MongoDB ObjectId

---

## Employees API

### Get All Employees
- **Endpoint**: `GET /employees`
- **Description**: Retrieves all employees with their assigned PC/Laptop and assets
- **Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "ObjectId",
      "name": "string",
      "email": "string",
      "phone": "string (optional)",
      "position": "string (optional)",
      "department": "string (optional)",
      "employeeId": "string (optional)",
      "pcLaptopId": { ...pcLaptopConfig },
      "assignedAssets": [ {...asset}, {...asset} ],
      "createdAt": "ISO Date",
      "updatedAt": "ISO Date"
    }
  ]
}
```

### Get Single Employee
- **Endpoint**: `GET /employees/:id`
- **Parameters**: 
  - `id`: MongoDB ObjectId
- **Response**: Single employee with populated PC/Laptop and assets

### Create Employee
- **Endpoint**: `POST /employees`
- **Body**:
```json
{
  "name": "string (required)",
  "email": "string (required, unique)",
  "phone": "string (optional)",
  "position": "string (optional)",
  "department": "string (optional)",
  "employeeId": "string (optional, unique)",
  "pcLaptopId": "ObjectId (optional)",
  "assignedAssets": ["ObjectId1", "ObjectId2"] (optional)
}
```

### Update Employee
- **Endpoint**: `PUT /employees/:id`
- **Parameters**: 
  - `id`: MongoDB ObjectId
- **Body**: Same as Create (partial update supported)

### Delete Employee
- **Endpoint**: `DELETE /employees/:id`
- **Parameters**: 
  - `id`: MongoDB ObjectId

### Assign PC/Laptop to Employee
- **Endpoint**: `POST /employees/:id/assign-pc-laptop`
- **Parameters**: 
  - `id`: MongoDB ObjectId (Employee ID)
- **Body**:
```json
{
  "pcLaptopId": "ObjectId"
}
```

### Assign Assets to Employee
- **Endpoint**: `POST /employees/:id/assign-assets`
- **Parameters**: 
  - `id`: MongoDB ObjectId (Employee ID)
- **Body**:
```json
{
  "assetIds": ["ObjectId1", "ObjectId2", "ObjectId3"]
}
```

---

## Data Models

### SystemAsset
- **Collection**: `systemassets`
- **Fields**:
  - `_id`: ObjectId (auto-generated)
  - `category`: String (enum: mouse, keyboard, motherboard, ram, storage, power-supply, headphone, camera, monitor, vonage)
  - `serialNumber`: String
  - `vendorName`: String
  - `companyName`: String
  - `purchaseDate`: Date
  - `warrantyEndDate`: Date
  - `ramSize`: String (RAM only)
  - `ramType`: String (RAM only)
  - `processorModel`: String (Motherboard only)
  - `storageType`: String (Storage only)
  - `storageCapacity`: String (Storage only)
  - `vonageNumber`: String (Vonage only)
  - `vonageExtCode`: String (Vonage only)
  - `vonagePassword`: String (Vonage only)
  - `createdAt`: Date (auto)
  - `updatedAt`: Date (auto)

### PCLaptop
- **Collection**: `pclaptops`
- **Fields**:
  - `_id`: ObjectId (auto-generated)
  - `mouseId`: ObjectId (ref: SystemAsset)
  - `keyboardId`: ObjectId (ref: SystemAsset)
  - `motherboardId`: ObjectId (ref: SystemAsset)
  - `cameraId`: ObjectId (ref: SystemAsset)
  - `headphoneId`: ObjectId (ref: SystemAsset)
  - `powerSupplyId`: ObjectId (ref: SystemAsset)
  - `storageId`: ObjectId (ref: SystemAsset)
  - `ramId`: ObjectId (ref: SystemAsset)
  - `ramId2`: ObjectId (ref: SystemAsset)
  - `createdAt`: Date (auto)
  - `updatedAt`: Date (auto)

### Employee
- **Collection**: `employees`
- **Fields**:
  - `_id`: ObjectId (auto-generated)
  - `name`: String (required)
  - `email`: String (required, unique)
  - `phone`: String
  - `position`: String
  - `department`: String
  - `employeeId`: String (unique)
  - `pcLaptopId`: ObjectId (ref: PCLaptop)
  - `assignedAssets`: [ObjectId] (ref: SystemAsset)
  - `createdAt`: Date (auto)
  - `updatedAt`: Date (auto)

---

## Frontend API Usage

The frontend has a utility file `client/lib/api.ts` with helper functions for all API calls:

```typescript
import { systemAssetsAPI, pcLaptopsAPI, employeesAPI } from "@/lib/api";

// System Assets
await systemAssetsAPI.getAll();
await systemAssetsAPI.getByCategory("mouse");
await systemAssetsAPI.create(data);
await systemAssetsAPI.update(id, data);
await systemAssetsAPI.delete(id);

// PC/Laptops
await pcLaptopsAPI.getAll();
await pcLaptopsAPI.create(data);
await pcLaptopsAPI.update(id, data);
await pcLaptopsAPI.delete(id);

// Employees
await employeesAPI.getAll();
await employeesAPI.create(data);
await employeesAPI.update(id, data);
await employeesAPI.delete(id);
await employeesAPI.assignPCLaptop(id, pcLaptopId);
await employeesAPI.assignAssets(id, assetIds);
```

---

## Pages Available

1. **Home Page** (`/`) - Main dashboard
2. **Login Page** (`/login`) - User authentication
3. **Admin Dashboard** (`/admin`) - User management
4. **HR Dashboard** (`/hr`) - HR features
5. **IT Dashboard** (`/deshbord`) - IT operations
6. **System Info** (`/system-info`) - Browse hardware categories
7. **PC/Laptop Info** (`/pc-laptop-info`) - Manage PC/Laptop configurations
8. **Employees Management** (`/employees`) - Manage employees
9. **System Info Detail** (`/system-info/:slug`) - View detailed category info

---

## Notes

- All timestamps use ISO 8601 format
- ObjectId fields can be null/optional unless marked required
- Emails and employee IDs must be unique
- Cascade delete is not implemented - related records must be cleaned up manually
- All endpoints return JSON responses with `success` and `data/message` fields
