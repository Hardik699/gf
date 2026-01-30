// System Assets API
export const systemAssetsAPI = {
  async getAll() {
    const response = await fetch("/api/system-assets");
    return response.json();
  },

  async getByCategory(category: string) {
    const response = await fetch(`/api/system-assets/category/${category}`);
    return response.json();
  },

  async getById(id: string) {
    const response = await fetch(`/api/system-assets/${id}`);
    return response.json();
  },

  async create(data: any) {
    const response = await fetch("/api/system-assets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async update(id: string, data: any) {
    const response = await fetch(`/api/system-assets/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async delete(id: string) {
    const response = await fetch(`/api/system-assets/${id}`, {
      method: "DELETE",
    });
    return response.json();
  },
};

// PC/Laptop API
export const pcLaptopsAPI = {
  async getAll() {
    const response = await fetch("/api/pc-laptops");
    return response.json();
  },

  async getById(id: string) {
    const response = await fetch(`/api/pc-laptops/${id}`);
    return response.json();
  },

  async create(data: any) {
    const response = await fetch("/api/pc-laptops", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async update(id: string, data: any) {
    const response = await fetch(`/api/pc-laptops/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async delete(id: string) {
    const response = await fetch(`/api/pc-laptops/${id}`, {
      method: "DELETE",
    });
    return response.json();
  },
};

// Employees API
export const employeesAPI = {
  async getAll() {
    const response = await fetch("/api/employees");
    return response.json();
  },

  async getById(id: string) {
    const response = await fetch(`/api/employees/${id}`);
    return response.json();
  },

  async create(data: any) {
    const response = await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async update(id: string, data: any) {
    const response = await fetch(`/api/employees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async delete(id: string) {
    const response = await fetch(`/api/employees/${id}`, {
      method: "DELETE",
    });
    return response.json();
  },

  async assignPCLaptop(id: string, pcLaptopId: string) {
    const response = await fetch(`/api/employees/${id}/assign-pc-laptop`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pcLaptopId }),
    });
    return response.json();
  },

  async assignAssets(id: string, assetIds: string[]) {
    const response = await fetch(`/api/employees/${id}/assign-assets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assetIds }),
    });
    return response.json();
  },
};
