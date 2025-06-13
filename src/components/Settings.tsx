
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

interface FormErrors {
  familyName?: string;
  timezone?: string;
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

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!familySettings.familyName.trim()) {
      newErrors.familyName = "Family name is required";
    }

    if (!familySettings.timezone.trim()) {
      newErrors.timezone = "Timezone is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveSettings = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully",
    });
  };

  const handleInputChange = (field: keyof typeof familySettings, value: string) => {
    setFamilySettings(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SettingsIcon className="h-6 w-6 text-gray-600" />
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        </div>
        <Badge variant="outline" className="text-sm">
          {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)} Access
        </Badge>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        {hasPermission("family") && (
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="familyName">
                  Family Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="familyName"
                  value={familySettings.familyName}
                  onChange={(e) => handleInputChange('familyName', e.target.value)}
                  className={errors.familyName ? "border-red-500" : ""}
                  placeholder="Enter family name"
                />
                {errors.familyName && (
                  <p className="text-sm text-red-500">{errors.familyName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">
                  Timezone <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="timezone"
                  value={familySettings.timezone}
                  onChange={(e) => handleInputChange('timezone', e.target.value)}
                  className={errors.timezone ? "border-red-500" : ""}
                  placeholder="e.g., America/New_York"
                />
                {errors.timezone && (
                  <p className="text-sm text-red-500">{errors.timezone}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  value={familySettings.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  placeholder="e.g., USD"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notification Settings */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {hasPermission("meals") && (
              <div className="flex items-center justify-between">
                <div className="space-y-1">
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
                <div className="space-y-1">
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
                <div className="space-y-1">
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
              <div className="space-y-1">
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
      </div>

      {/* Role & Permissions - Full Width */}
      {hasPermission("all") && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Role & Permissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label>Current Role</Label>
                <p className="text-sm text-gray-500 mb-2">Your current access level in the family hub</p>
                <Badge variant="secondary" className="text-sm">
                  {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}
                </Badge>
              </div>
              
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
        <Button 
          onClick={handleSaveSettings} 
          className="bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
};

export default Settings;
