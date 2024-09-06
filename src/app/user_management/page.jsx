"use client";

import MainLayout from "@/components/layouts/MainLayout";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateUser from "@/components/tabs/user_management/CreateUser";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const UserManagementPage = () => {
  const [activeUserManagementTab, setActiveUserManagementTab] =
    useState("searchUser");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get("token");
      if (!token) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }, [router]);

  const renderTabContent = (tab) => {
    switch (tab) {
      case "userManagement":
        return (
          <Tabs defaultValue="searchUser" className="w-full">
            <TabsList>
              <TabsTrigger
                value="searchUser"
                onClick={() => setActiveUserManagementTab("searchUser")}
              >
                Search User
              </TabsTrigger>
              <TabsTrigger
                value="createUser"
                onClick={() => setActiveUserManagementTab("createUser")}
              >
                Create User
              </TabsTrigger>
            </TabsList>
            <TabsContent value="createUser">
              <CreateUser/>
            </TabsContent>
            <TabsContent value="searchUser">
              <Card>
                <CardHeader>
                  <CardTitle>Search User</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Input type="text" placeholder="Search users..." />
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>John Doe</TableCell>
                        <TableCell>john@example.com</TableCell>
                        <TableCell>Admin</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="mr-2">
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Jane Smith</TableCell>
                        <TableCell>jane@example.com</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="mr-2">
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        );
      case "roleManagement":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Role Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role Name</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Admin</TableCell>
                    <TableCell>Full Access</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="mr-2">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Limited Access</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="mr-2">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">User Management</h1>
        <Tabs defaultValue="userManagement" className="w-full">
          <TabsList className="grid w-fit grid-cols-2">
            <TabsTrigger value="userManagement">User Management</TabsTrigger>
            <TabsTrigger value="roleManagement">Role Management</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            {["userManagement", "roleManagement"].map((tab) => (
              <TabsContent
                key={tab}
                value={tab}
                className="bg-secondary p-2 rounded-lg"
              >
                {renderTabContent(tab)}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default UserManagementPage;
