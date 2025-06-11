
import { useState } from "react";
import { Settings as SettingsIcon, User, Shield, Bell, Palette, Lock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface SettingsProps {
  currentRole: string;
  onClose: () => void;
}

const Settings = ({ currentRole, onClose }: SettingsProps) => {
  const [notifications, setNotifications] = useState({
    mealReminders: true,
    activityAlerts: true,
    shoppingUpdates: false,
    weeklyDigest: true
  });

  const [familySettings, setFamilySettings] = useState({
    familyName: "Johnson Family",
    timezone: "America/New_York",
    currency: "USD"
  });

  const { toast } = useToast();

  const rolePermissions = {
    admin: ["all"],
    parent: ["meals", "activities", "shopping", "family"],
    cook: ["meals", "shopping"],
    driver: ["activities"],
    child: ["activities", "view-only"]
  };

  const hasPermission = (permission: string) => {
    return rolePermissions[currentRole]?.includes(permission) || rolePermissions[currentRole]?.includes("all");
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SettingsIcon className="h-6 w-6 text-gray-600" />
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        </div>
        <Badge variant="outline" className="text-sm">
          {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)} Access
        </Badge>
      </div>

      {/* Profile Settings */}
      {hasPermission("family") && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="familyName">Family Name</Label>
                <Input
                  id="familyName"
                  value={familySettings.familyName}
                  onChange={(e) => setFamilySettings(prev => ({ ...prev, familyName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input
                  id="timezone"
                  value={familySettings.timezone}
                  onChange={(e) => setFamilySettings(prev => ({ ...prev, timezone: e.target.value }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {hasPermission("meals") && (
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="meal-reminders">Meal Reminders</Label>
                <p className="text-sm text-gray-500">Get notified about upcoming meals</p>
              </div>
              <Switch
                id="meal-reminders"
                checked={notifications.mealReminders}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, mealReminders: checked }))}
              />
            </div>
          )}
          
          {hasPermission("activities") && (
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="activity-alerts">Activity Alerts</Label>
                <p className="text-sm text-gray-500">Get notified about activities and schedule changes</p>
              </div>
              <Switch
                id="activity-alerts"
                checked={notifications.activityAlerts}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, activityAlerts: checked }))}
              />
            </div>
          )}

          {hasPermission("shopping") && (
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="shopping-updates">Shopping Updates</Label>
                <p className="text-sm text-gray-500">Get notified about shopping list changes</p>
              </div>
              <Switch
                id="shopping-updates"
                checked={notifications.shoppingUpdates}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, shoppingUpdates: checked }))}
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="weekly-digest">Weekly Digest</Label>
              <p className="text-sm text-gray-500">Receive a weekly summary email</p>
            </div>
            <Switch
              id="weekly-digest"
              checked={notifications.weeklyDigest}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, weeklyDigest: checked }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Role & Permissions */}
      {hasPermission("all") && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Role & Permissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Current Role</Label>
                <p className="text-sm text-gray-500 mb-2">Your current access level in the family hub</p>
                <Badge variant="secondary" className="text-sm">
                  {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}
                </Badge>
              </div>
              
              <Separator />
              
              <div>
                <Label>Family Members</Label>
                <p className="text-sm text-gray-500 mb-3">Manage family member roles and permissions</p>
                <div className="space-y-2">
                  {[
                    { name: "Sarah", role: "Parent", email: "sarah@johnson.com" },
                    { name: "Mike", role: "Parent", email: "mike@johnson.com" },
                    { name: "Emma", role: "Child", email: "emma@johnson.com" },
                  ].map((member) => (
                    <div key={member.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                      <Badge variant="outline">{member.role}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;
