
import { Car, MapPin, Clock, Route, Fuel, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TransportDashboard = () => {
  const todaysRoutes = [
    {
      id: 1,
      title: "School Drop-off",
      passenger: "Emma",
      time: "8:00 AM",
      status: "completed",
      destination: "Lincoln Elementary",
      distance: "2.5 miles"
    },
    {
      id: 2,
      title: "Soccer Practice Pickup",
      passenger: "Emma",
      time: "4:00 PM",
      status: "scheduled",
      destination: "Community Sports Center",
      distance: "5.2 miles"
    },
    {
      id: 3,
      title: "Piano Lesson",
      passenger: "Emma",
      time: "6:30 PM",
      status: "scheduled",
      destination: "Music Academy",
      distance: "3.8 miles"
    }
  ];

  const vehicles = [
    {
      id: 1,
      name: "Family SUV",
      model: "Honda CR-V 2022",
      fuelLevel: 75,
      status: "available",
      lastService: "2 weeks ago"
    },
    {
      id: 2,
      name: "Sedan",
      model: "Toyota Camry 2021",
      fuelLevel: 45,
      status: "in-use",
      lastService: "1 month ago"
    }
  ];

  const upcomingMaintenance = [
    {
      vehicle: "Honda CR-V",
      service: "Oil Change",
      dueDate: "Next week",
      mileage: "95,000 miles"
    },
    {
      vehicle: "Toyota Camry",
      service: "Tire Rotation",
      dueDate: "2 weeks",
      mileage: "78,500 miles"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Route className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-gray-600">Today's Trips</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">23.5</div>
                <div className="text-sm text-gray-600">Miles Today</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Fuel className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">60%</div>
                <div className="text-sm text-gray-600">Avg Fuel Level</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">2.5</div>
                <div className="text-sm text-gray-600">Hours Driving</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Routes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Route className="h-5 w-5 text-blue-600" />
            Today's Routes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {todaysRoutes.map((route) => (
            <div key={route.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="font-bold text-sm">{route.time}</div>
                  <Badge 
                    variant={route.status === "completed" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {route.status}
                  </Badge>
                </div>
                <div>
                  <div className="font-medium">{route.title}</div>
                  <div className="text-sm text-gray-600">
                    {route.passenger} → {route.destination}
                  </div>
                  <div className="text-sm text-gray-500">{route.distance}</div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <MapPin className="h-4 w-4 mr-1" />
                Navigate
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Vehicle Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5 text-green-600" />
              Vehicle Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium">{vehicle.name}</div>
                    <div className="text-sm text-gray-600">{vehicle.model}</div>
                  </div>
                  <Badge 
                    variant={vehicle.status === "available" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {vehicle.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Fuel className="h-4 w-4 text-orange-500" />
                    <span>{vehicle.fuelLevel}%</span>
                  </div>
                  <div className="text-gray-600">
                    Last service: {vehicle.lastService}
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full" 
                      style={{ width: `${vehicle.fuelLevel}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Maintenance Reminders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              Maintenance Reminders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingMaintenance.map((item, index) => (
              <div key={index} className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-orange-800">{item.service}</div>
                    <div className="text-sm text-orange-600">{item.vehicle}</div>
                    <div className="text-sm text-gray-600">{item.mileage}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-orange-800">Due {item.dueDate}</div>
                    <Button variant="outline" size="sm" className="mt-1">
                      Schedule
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransportDashboard;
