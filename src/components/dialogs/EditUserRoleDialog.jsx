import { useEffect, useState } from "react"; // Import useEffect
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Import Select components
import Cookies from "js-cookie"; // Ensure Cookies is imported

const EditUserRoleDialog = ({ open, onClose, user, onRoleUpdate }) => {
  const [role, setRole] = useState(""); // Initialize role as an empty string

  useEffect(() => {
    if (user) {
      setRole(user.role); // Set role when user is available
    }
  }, [user]); // Run effect when user changes

  const handleSubmit = async () => {
    // Call API to update user role
    const response = await fetch(
      `https://apmapis.webdevava.live/api/users/${user._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({ role }),
      }
    );

    if (response.ok) {
      onRoleUpdate(); // Refresh user list
      onClose(); // Close dialog
    } else {
      // Handle error
      console.error("Failed to update role");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User Role</DialogTitle>
        </DialogHeader>
        <Select value={role} onValueChange={setRole} placeholder="Select role">
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Moderator">Moderator</SelectItem>
            <SelectItem value="Visitor">Visitor</SelectItem>
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save</Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserRoleDialog;
