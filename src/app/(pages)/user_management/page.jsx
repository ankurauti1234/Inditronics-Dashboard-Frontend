"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";
import MainLayout from "@/components/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateUser from "@/components/tabs/user_management/CreateUser";
import EditUserRoleDialog from "@/components/dialogs/EditUserRoleDialog";
import SearchUser from "@/components/tabs/user_management/SearchUser";
import RoleManagement from "@/components/tabs/user_management/RoleManagement";
import { cn } from "@/lib/utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const UserManagementPage = () => {
  const [activeTab, setActiveTab] = useState("searchUser");
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
      fetchUsers();
    }
  }, [router]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("An error occurred while fetching users.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditUserRole = (user) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleRoleUpdate = () => {
    fetchUsers();
  };

  const renderUserManagement = () => (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className=" bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50 bg-transparent border">
        <TabsTrigger
          className="data-[state=active]:text-primary"
          value="searchUser"
        >
          Search User
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:text-primary"
          value="createUser"
        >
          Create User
        </TabsTrigger>
      </TabsList>
      <TabsContent value="searchUser">
        <SearchUser onEditUserRole={handleEditUserRole} />
      </TabsContent>
      <TabsContent value="createUser">
        <CreateUser onUserCreated={fetchUsers} />
      </TabsContent>
    </Tabs>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className={cn(
            "w-16 h-16 border-4 border-dashed rounded-full animate-spin",
            "border-gray-400 border-t-transparent"
          )}
        ></div>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="">
        <h1 className="text-2xl font-bold mb-6">User Management</h1>
        <Tabs defaultValue="userManagement" className="w-full">
          <TabsList className="grid w-fit grid-cols-2  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50 bg-transparent border">
            <TabsTrigger
              className="data-[state=active]:text-primary"
              value="userManagement"
            >
              User Management
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:text-primary"
              value="roleManagement"
            >
              Role Management
            </TabsTrigger>
          </TabsList>
          <div className="mt-6 ">
            <TabsContent
              value="userManagement"
              className="bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50 border p-2 rounded-lg"
            >
              {renderUserManagement()}
            </TabsContent>
            <TabsContent
              value="roleManagement"
              className="bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50 border p-2 rounded-lg"
            >
              <RoleManagement />
            </TabsContent>
          </div>
        </Tabs>
      </div>
      <EditUserRoleDialog
        open={isEditDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        user={selectedUser}
        onRoleUpdate={handleRoleUpdate}
      />
    </MainLayout>
  );
};

export default UserManagementPage;
