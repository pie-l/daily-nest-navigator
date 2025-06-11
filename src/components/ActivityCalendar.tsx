
import { useState } from "react";
import { Plus, Calendar, Clock, MapPin, User, Car } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ActivityCalendar = () => {
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState("current");

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const activities = {
    Monday: [
      {
        id: 1,
        title: "Piano Lesson",
        time: "4:00 PM - 5:00 PM",
        location: "Music Academy",
        type: "music",
        assignedTo: "Emma",
        driver: "Sarah",
        color: "bg-purple-100 text-purple-800 border-purple-200"
      }
    ],
    Tuesday: [
      {
        id: 2,
        title: "Soccer Practice",
        time: "5:30 PM - 7:00 PM",
        location: "Community Park",
        type: "sports",
        assignedTo: "Emma",
        driver: "Mike",
        color: "bg-green-100 text-green-800 border-green-200"
      }
    ],
    Wednesday: [
      {
        id: 3,
        title: "Art Class",
        time: "3:00 PM - 4:30 PM",
        location: "Art Studio Downtown",
        type: "creative",
        assignedTo: "Emma",
        driver: "Sarah",
        color: "bg-pink-100 text-pink-800 border-pink-200"
      }
    ],
    Thursday: [
      {
        id: 4,
        title: "Swimming Lesson",
        time: "6:00 PM - 7:00 PM",
        location: "Aquatic Center",
        type: "sports",
        assignedTo: "Emma",
        driver: "Mike",
        color: "bg-blue-100 text-blue-800 border-blue-200"
      }
    ],
    Friday: [
      {
        id: 5,
        title: "Playdate",
        time: "2:00 PM - 4:00 PM",
        location: "Friend's House",
        type: "social",
        assignedTo: "Emma",
        driver: "Sarah",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200"
      }
    ],
    Saturday: [
      {
        id: 6,
        title: "Soccer Game",
        time: "9:00 AM - 11:00 AM",
        location: "Sports Complex",
        type: "sports",
        assignedTo: "Emma",
        driver: "Mike",
        color: "bg-green-100 text-green-800 border-green-200"
      },
      {
        id: 7,
        title: "Family Movie Night",
        time: "7:00 PM - 9:00 PM",
        location: "Home",
        type: "family",
        assignedTo: "Everyone",
        driver: "N/A",
        color: "bg-orange-100 text-orange-800 border-orange-200"
      }
    ],
    Sunday: [
      {
        id: 8,
        title: "Family Brunch",
        time: "11:00 AM - 1:00 PM",
        location: "Downtown Cafe",
        type: "family",
        assignedTo: "Everyone",
        driver: "Mike",
        color: "bg-orange-100 text-orange-800 border-orange-200"
      }
    ]
  };

  const getActivityTypeIcon = (type: string) => {
    const icons = {
      music: "🎵",
      sports: "⚽",
      creative: "🎨",
      social: "👥",
      family: "👨‍👩‍👧",
      academic: "📚"
    };
    return icons[type] || "📅";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Activity Calendar</h2>
          <p className="text-gray-600">Manage Emma's weekly activities and schedule</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => setShowAddActivity(!showAddActivity)}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Activity
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            View Month
          </Button>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-blue-600">
            {Object.values(activities).flat().length}
          </div>
          <div className="text-sm text-gray-600">Total Activities</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-green-600">
            {Object.values(activities).flat().filter(a => a.type === "sports").length}
          </div>
          <div className="text-sm text-gray-600">Sports</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-purple-600">
            {Object.values(activities).flat().filter(a => a.type === "music").length}
          </div>
          <div className="text-sm text-gray-600">Music</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-orange-600">
            {Object.values(activities).flat().filter(a => a.type === "family").length}
          </div>
          <div className="text-sm text-gray-600">Family Time</div>
        </Card>
      </div>

      {/* Add Activity Form */}
      {showAddActivity && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-700">Add New Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Activity Name</label>
                <Input placeholder="Enter activity name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="family">Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Day</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {weekDays.map((day) => (
                      <SelectItem key={day} value={day.toLowerCase()}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Time</label>
                <Input type="time" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">End Time</label>
                <Input type="time" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input placeholder="Enter location" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Assigned To</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select family member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emma">Emma</SelectItem>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="parents">Parents Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Driver</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select driver" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarah">Sarah</SelectItem>
                    <SelectItem value="mike">Mike</SelectItem>
                    <SelectItem value="carpool">Carpool</SelectItem>
                    <SelectItem value="na">Not Applicable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Notes</label>
              <Textarea placeholder="Add any special instructions or notes..." />
            </div>
            <div className="flex gap-2">
              <Button className="bg-blue-600 hover:bg-blue-700">Save Activity</Button>
              <Button variant="outline" onClick={() => setShowAddActivity(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Calendar */}
      <div className="grid gap-4">
        {weekDays.map((day) => (
          <Card key={day} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg">{day}</span>
                <Badge variant="outline" className="text-xs">
                  {activities[day]?.length || 0} activities
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activities[day]?.length > 0 ? (
                <div className="space-y-3">
                  {activities[day].map((activity) => (
                    <div key={activity.id} className={`p-4 rounded-lg border-2 ${activity.color} hover:shadow-md transition-shadow cursor-pointer`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{getActivityTypeIcon(activity.type)}</span>
                            <h4 className="font-medium">{activity.title}</h4>
                          </div>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3" />
                              {activity.time}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3 w-3" />
                              {activity.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="h-3 w-3" />
                              {activity.assignedTo}
                            </div>
                            {activity.driver !== "N/A" && (
                              <div className="flex items-center gap-2">
                                <Car className="h-3 w-3" />
                                Driver: {activity.driver}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No activities scheduled</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActivityCalendar;
