
import { useState } from "react";
import { ChevronDown, User, ChefHat, Car, Shield, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RoleSelectorProps {
  currentRole: string;
  onRoleChange: (role: string) => void;
}

const RoleSelector = ({ currentRole, onRoleChange }: RoleSelectorProps) => {
  const roles = [
    { id: "parent", label: "Parent", icon: User, color: "text-blue-600" },
    { id: "cook", label: "Cook", icon: ChefHat, color: "text-orange-600" },
    { id: "driver", label: "Driver", icon: Car, color: "text-green-600" },
    { id: "admin", label: "Admin", icon: Shield, color: "text-purple-600" },
    { id: "child", label: "Child", icon: Crown, color: "text-pink-600" },
  ];

  const currentRoleData = roles.find(role => role.id === currentRole) || roles[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <currentRoleData.icon className={`h-4 w-4 ${currentRoleData.color}`} />
          <span className="hidden sm:inline">{currentRoleData.label}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {roles.map((role) => (
          <DropdownMenuItem
            key={role.id}
            onClick={() => onRoleChange(role.id)}
            className={`flex items-center gap-2 cursor-pointer ${
              currentRole === role.id ? "bg-gray-100" : ""
            }`}
          >
            <role.icon className={`h-4 w-4 ${role.color}`} />
            {role.label}
            {currentRole === role.id && (
              <span className="ml-auto text-xs text-gray-500">Active</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleSelector;
