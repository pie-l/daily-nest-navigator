
import { useState } from "react";
import { User, Shield, ChefHat, Car, Crown, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("parent");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const roles = [
    { id: "admin", label: "Administrator", icon: Shield, color: "text-purple-600", description: "Full system access" },
    { id: "parent", label: "Parent", icon: User, color: "text-blue-600", description: "Manage family activities" },
    { id: "cook", label: "Cook", icon: ChefHat, color: "text-orange-600", description: "Meal planning & shopping" },
    { id: "driver", label: "Driver", icon: Car, color: "text-green-600", description: "Transportation management" },
    { id: "child", label: "Child", icon: Crown, color: "text-pink-600", description: "View activities & meals" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password, selectedRole);
      if (success) {
        toast({
          title: "Login Successful",
          description: `Welcome back! You're logged in as ${roles.find(r => r.id === selectedRole)?.label}`,
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Try password: password123",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedRoleData = roles.find(role => role.id === selectedRole);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🏠</div>
          <h1 className="text-3xl font-bold text-gray-900">Family Hub</h1>
          <p className="text-gray-600 mt-2">Welcome back to your family dashboard</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <p className="text-center text-gray-600">Choose your role and enter your credentials</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Select Your Role</Label>
                <RadioGroup value={selectedRole} onValueChange={setSelectedRole} className="grid grid-cols-1 gap-3">
                  {roles.map((role) => (
                    <div key={role.id} className="flex items-center space-x-3">
                      <RadioGroupItem value={role.id} id={role.id} />
                      <Label
                        htmlFor={role.id}
                        className="flex items-center gap-3 cursor-pointer flex-1 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <role.icon className={`h-5 w-5 ${role.color}`} />
                        <div className="flex-1">
                          <div className="font-medium">{role.label}</div>
                          <div className="text-sm text-gray-500">{role.description}</div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Current Role Display */}
              {selectedRoleData && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <selectedRoleData.icon className={`h-6 w-6 ${selectedRoleData.color}`} />
                    <div>
                      <div className="font-medium">Logging in as {selectedRoleData.label}</div>
                      <div className="text-sm text-gray-600">{selectedRoleData.description}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Demo Credentials */}
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Demo:</strong> Use any email and password: <code>password123</code>
                </p>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Family Hub - Connecting families, one task at a time</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
