
import { useState } from "react";
import { Calendar, ChefHat, ShoppingCart, Users, Car, Settings as SettingsIcon, Plus, Clock, CheckCircle, Shield, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MealPlanner from "@/components/MealPlanner";
import ShoppingList from "@/components/ShoppingList";
import ActivityCalendar from "@/components/ActivityCalendar";
import TransportDashboard from "@/components/TransportDashboard";
import Settings from "@/components/Settings";
import LoginScreen from "@/components/LoginScreen";
import UserProfile from "@/components/UserProfile";
import { useAuth } from "@/contexts/AuthContext";
import { useSettings } from "@/contexts/SettingsContext";

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const { familySettings } = useSettings();
  const [activeView, setActiveView] = useState("dashboard");

  // If not authenticated, show login screen
  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  const familyMembers = [
    { name: "Sarah", role: "Parent", avatar: "👩‍💼" },
    { name: "Mike", role: "Parent", avatar: "👨‍💼" },
    { name: "Emma", role: "Child", avatar: "👧", age: 8 }
  ];

  const upcomingActivities = [
    { title: "Emma's Soccer Practice", time: "4:00 PM", date: "Today", type: "sports" },
    { title: "Piano Lesson", time: "10:00 AM", date: "Tomorrow", type: "music" },
    { title: "Parent-Teacher Meeting", time: "6:00 PM", date: "Friday", type: "meeting" }
  ];

  const todaysMeals = [
    { meal: "Breakfast", dish: "Pancakes with berries", status: "completed" },
    { meal: "Lunch", dish: "Chicken Caesar Salad", status: "planned" },
    { meal: "Dinner", dish: "Spaghetti Bolognese", status: "planned" }
  ];

  // Role-based navigation configuration
  const getRoleBasedNavigation = (role: string) => {
    const baseItems = [
      { id: "dashboard", label: "Dashboard", icon: Users, roles: ["admin", "parent", "cook", "driver", "child"] },
    ];

    const roleSpecificItems = [
      { id: "meals", label: "Meal Planning", icon: ChefHat, roles: ["admin", "parent", "cook"] },
      { id: "shopping", label: "Shopping", icon: ShoppingCart, roles: ["admin", "parent", "cook"] },
      { id: "calendar", label: "Calendar", icon: Calendar, roles: ["admin", "parent", "driver"] },
      { id: "transport", label: "Transport", icon: Car, roles: ["admin", "parent", "driver"] },
      { id: "activities", label: "My Activities", icon: BookOpen, roles: ["child"] },
      { id: "settings", label: "Settings", icon: SettingsIcon, roles: ["admin", "parent"] },
    ];

    return [...baseItems, ...roleSpecificItems].filter(item => item.roles.includes(role));
  };

  const renderRoleBasedDashboard = () => {
    switch (user?.role) {
      case "admin":
        return renderAdminDashboard();
      case "parent":
        return renderParentDashboard();
      case "cook":
        return renderCookDashboard();
      case "driver":
        return renderDriverDashboard();
      case "child":
        return renderChildDashboard();
      default:
        return renderParentDashboard();
    }
  };

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Shield className="h-6 w-6 text-purple-600" />
            Administrator Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600">7</div>
              <div className="text-sm text-gray-600">Meals Planned</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600">Shopping Items</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-orange-600">5</div>
              <div className="text-sm text-gray-600">Activities</div>
            </div>
          </div>
        </CardContent>
      </Card>
      {renderCommonDashboardCards()}
    </div>
  );

  const renderParentDashboard = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Users className="h-6 w-6 text-blue-600" />
            {familySettings.familyName} Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            {familyMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-1">{member.avatar}</div>
                <div className="font-medium text-sm">{member.name}</div>
                <Badge variant="secondary" className="text-xs">{member.role}</Badge>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600">7</div>
              <div className="text-sm text-gray-600">Meals Planned</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600">Shopping Items</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-purple-600">5</div>
              <div className="text-sm text-gray-600">Activities</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-sm text-gray-600">Tasks Due</div>
            </div>
          </div>
        </CardContent>
      </Card>
      {renderCommonDashboardCards()}
    </div>
  );

  const renderCookDashboard = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <ChefHat className="h-6 w-6 text-orange-600" />
            Kitchen Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-orange-600">7</div>
              <div className="text-sm text-gray-600">Meals to Prepare</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-gray-600">Shopping Items</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600">3</div>
              <div className="text-sm text-gray-600">Recipes Ready</div>
            </div>
          </div>
        </CardContent>
      </Card>
      {renderMealsCard()}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-blue-600" />
            Shopping List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">Fresh tomatoes</span>
              <Badge variant="outline">Needed</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">Ground beef</span>
              <Badge variant="outline">Needed</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">Pasta</span>
              <Badge variant="outline">In stock</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDriverDashboard = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Car className="h-6 w-6 text-green-600" />
            Transport Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600">5</div>
              <div className="text-sm text-gray-600">Upcoming Trips</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600">2</div>
              <div className="text-sm text-gray-600">Today's Routes</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-orange-600">450</div>
              <div className="text-sm text-gray-600">Miles This Week</div>
            </div>
          </div>
        </CardContent>
      </Card>
      {renderActivitiesCard()}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5 text-green-600" />
            Today's Routes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-sm">School Drop-off</div>
                <div className="text-sm text-gray-600">8:00 AM - Emma</div>
              </div>
              <Badge variant="outline">Scheduled</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-sm">Soccer Practice</div>
                <div className="text-sm text-gray-600">4:00 PM - Emma</div>
              </div>
              <Badge variant="outline">Scheduled</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderChildDashboard = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <BookOpen className="h-6 w-6 text-pink-600" />
            My Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-pink-600">3</div>
              <div className="text-sm text-gray-600">Today's Activities</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-purple-600">2</div>
              <div className="text-sm text-gray-600">Homework Tasks</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-sm text-gray-600">Fun Activities</div>
            </div>
          </div>
        </CardContent>
      </Card>
      {renderMealsCard()}
      {renderActivitiesCard()}
    </div>
  );

  const renderMealsCard = () => (
    <Card className="shadow-lg border-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <ChefHat className="h-5 w-5 text-orange-600" />
          Today's Meals
        </CardTitle>
        {(user?.role === "admin" || user?.role === "parent" || user?.role === "cook") && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setActiveView("meals")}
            className="hover:bg-orange-50"
          >
            View All
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {todaysMeals.map((meal, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div>
              <div className="font-medium text-sm">{meal.meal}</div>
              <div className="text-sm text-gray-600">{meal.dish}</div>
            </div>
            {meal.status === "completed" ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <Clock className="h-5 w-5 text-orange-500" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const renderActivitiesCard = () => (
    <Card className="shadow-lg border-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          Upcoming Activities
        </CardTitle>
        {(user?.role === "admin" || user?.role === "parent" || user?.role === "driver") && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setActiveView("calendar")}
            className="hover:bg-blue-50"
          >
            View Calendar
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {upcomingActivities.map((activity, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div>
              <div className="font-medium text-sm">{activity.title}</div>
              <div className="text-sm text-gray-600">{activity.date} at {activity.time}</div>
            </div>
            <Badge variant="outline" className="text-xs">
              {activity.type}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const renderCommonDashboardCards = () => (
    <div className="grid md:grid-cols-2 gap-6">
      {renderMealsCard()}
      {renderActivitiesCard()}
    </div>
  );

  // Get navigation items based on current user role
  const navItems = getRoleBasedNavigation(user?.role || "parent");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🏠</div>
              <h1 className="text-xl font-bold text-gray-900">Family Hub</h1>
            </div>
            <div className="flex items-center gap-4">
              <UserProfile onSettingsClick={() => setActiveView("settings")} />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  activeView === item.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === "dashboard" && renderRoleBasedDashboard()}
        {activeView === "meals" && (user?.role === "admin" || user?.role === "parent" || user?.role === "cook") && <MealPlanner />}
        {activeView === "shopping" && (user?.role === "admin" || user?.role === "parent" || user?.role === "cook") && <ShoppingList />}
        {activeView === "calendar" && (user?.role === "admin" || user?.role === "parent" || user?.role === "driver") && <ActivityCalendar />}
        {activeView === "transport" && (user?.role === "admin" || user?.role === "parent" || user?.role === "driver") && <TransportDashboard />}
        {activeView === "activities" && user?.role === "child" && <ActivityCalendar />}
        {activeView === "settings" && (user?.role === "admin" || user?.role === "parent") && <Settings currentRole={user?.role || "parent"} onClose={() => setActiveView("dashboard")} />}
      </main>
    </div>
  );
};

export default Index;
