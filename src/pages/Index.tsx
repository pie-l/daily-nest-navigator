
import { useState } from "react";
import { Calendar, ChefHat, ShoppingCart, Users, Car, Settings, Plus, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MealPlanner from "@/components/MealPlanner";
import ShoppingList from "@/components/ShoppingList";
import ActivityCalendar from "@/components/ActivityCalendar";
import RoleSelector from "@/components/RoleSelector";

const Index = () => {
  const [currentRole, setCurrentRole] = useState("parent");
  const [activeView, setActiveView] = useState("dashboard");

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

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Family Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Users className="h-6 w-6 text-blue-600" />
            Johnson Family Dashboard
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

      <div className="grid md:grid-cols-2 gap-6">
        {/* Today's Meals */}
        <Card className="shadow-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-orange-600" />
              Today's Meals
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setActiveView("meals")}
              className="hover:bg-orange-50"
            >
              View All
            </Button>
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

        {/* Upcoming Activities */}
        <Card className="shadow-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Upcoming Activities
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setActiveView("calendar")}
              className="hover:bg-blue-50"
            >
              View Calendar
            </Button>
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
      </div>

      {/* Quick Actions */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-green-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              onClick={() => setActiveView("meals")}
              className="h-20 flex flex-col gap-2 bg-orange-500 hover:bg-orange-600"
            >
              <ChefHat className="h-6 w-6" />
              Plan Meals
            </Button>
            <Button 
              onClick={() => setActiveView("shopping")}
              className="h-20 flex flex-col gap-2 bg-green-500 hover:bg-green-600"
            >
              <ShoppingCart className="h-6 w-6" />
              Shopping List
            </Button>
            <Button 
              onClick={() => setActiveView("calendar")}
              className="h-20 flex flex-col gap-2 bg-blue-500 hover:bg-blue-600"
            >
              <Calendar className="h-6 w-6" />
              Add Activity
            </Button>
            <Button 
              variant="outline"
              className="h-20 flex flex-col gap-2 hover:bg-gray-50"
            >
              <Car className="h-6 w-6" />
              Transport
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

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
              <RoleSelector currentRole={currentRole} onRoleChange={setCurrentRole} />
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-3">
            {[
              { id: "dashboard", label: "Dashboard", icon: Users },
              { id: "meals", label: "Meal Planning", icon: ChefHat },
              { id: "shopping", label: "Shopping", icon: ShoppingCart },
              { id: "calendar", label: "Calendar", icon: Calendar },
            ].map((item) => (
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
        {activeView === "dashboard" && renderDashboard()}
        {activeView === "meals" && <MealPlanner />}
        {activeView === "shopping" && <ShoppingList />}
        {activeView === "calendar" && <ActivityCalendar />}
      </main>
    </div>
  );
};

export default Index;
