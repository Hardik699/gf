import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit2, Users, ArrowLeft } from "lucide-react";
import AppNav from "@/components/Navigation";
import { employeesAPI } from "@/lib/api";

interface Employee {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  position?: string;
  department?: string;
  employeeId?: string;
  createdAt: string;
}

export default function EmployeesManagement() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    employeeId: "",
  });

  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const role = localStorage.getItem("userRole");

    if (!isAuthenticated) {
      navigate("/login");
    } else if (role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  // Load employees
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const result = await employeesAPI.getAll();
      if (result.success) {
        setEmployees(result.data);
        setError("");
      } else {
        setError("Failed to load employees");
      }
    } catch (err) {
      setError("Error loading employees");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Name and email are required");
      return;
    }

    try {
      setLoading(true);
      const result = await employeesAPI.create(formData);
      if (result.success) {
        setEmployees([result.data, ...employees]);
        setFormData({
          name: "",
          email: "",
          phone: "",
          position: "",
          department: "",
          employeeId: "",
        });
        setError("");
      } else {
        setError(result.message || "Failed to create employee");
      }
    } catch (err) {
      setError("Error creating employee");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      const result = await employeesAPI.delete(id);
      if (result.success) {
        setEmployees(employees.filter((emp) => emp._id !== id));
        setError("");
      } else {
        setError("Failed to delete employee");
      }
    } catch (err) {
      setError("Error deleting employee");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-deep-900 via-blue-deep-800 to-slate-900">
      <AppNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Employees Management
            </h1>
            <p className="text-slate-400">
              Manage employees and their assignments
            </p>
          </div>
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Employee Form */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Plus className="h-5 w-5 text-blue-400" />
                <span>Add New Employee</span>
              </CardTitle>
              <CardDescription className="text-slate-400">
                Add a new employee to the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateEmployee} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-300">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-300">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1234567890"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeId" className="text-slate-300">
                    Employee ID
                  </Label>
                  <Input
                    id="employeeId"
                    name="employeeId"
                    type="text"
                    placeholder="EMP-001"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position" className="text-slate-300">
                    Position
                  </Label>
                  <Input
                    id="position"
                    name="position"
                    type="text"
                    placeholder="Software Engineer"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="text-slate-300">
                    Department
                  </Label>
                  <Input
                    id="department"
                    name="department"
                    type="text"
                    placeholder="IT"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {loading ? "Creating..." : "Create Employee"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Employees List */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-400" />
                <span>Employees</span>
                <Badge
                  variant="secondary"
                  className="bg-slate-700 text-slate-300"
                >
                  {employees.length}
                </Badge>
              </CardTitle>
              <CardDescription className="text-slate-400">
                View and manage all employees
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading && !employees.length ? (
                <p className="text-slate-400 text-center py-8">
                  Loading employees...
                </p>
              ) : employees.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">No employees added yet</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {employees.map((employee) => (
                    <div
                      key={employee._id}
                      className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-slate-700"
                    >
                      <div className="flex-1">
                        <p className="text-white font-medium">
                          {employee.name}
                        </p>
                        <p className="text-slate-400 text-sm">
                          {employee.email}
                        </p>
                        {employee.position && (
                          <p className="text-slate-500 text-xs">
                            {employee.position}
                          </p>
                        )}
                      </div>
                      <Button
                        onClick={() => handleDeleteEmployee(employee._id)}
                        variant="outline"
                        size="sm"
                        className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
