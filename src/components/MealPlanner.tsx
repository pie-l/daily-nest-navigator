import { useState } from "react";
import { Plus, Sparkles, Clock, Users, ChefHat } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const MealPlanner = () => {
  const [selectedWeek, setSelectedWeek] = useState("current");
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [showMealDialog, setShowMealDialog] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("");
  const [newMeal, setNewMeal] = useState({
    type: "",
    day: "",
    dish: "",
    notes: "",
    cuisine: "American",
    time: "30 mins",
    servings: 3
  });
  const { toast } = useToast();

  const cuisinePreferences = ["Italian", "Mexican", "Asian", "Mediterranean", "American", "Indian"];
  
  const [weeklyMeals, setWeeklyMeals] = useState({
    Monday: {
      breakfast: { dish: "Overnight Oats", cuisine: "American", time: "15 mins", servings: 3 },
      lunch: { dish: "Caesar Salad", cuisine: "Italian", time: "20 mins", servings: 3 },
      dinner: { dish: "Chicken Stir Fry", cuisine: "Asian", time: "30 mins", servings: 3 }
    },
    Tuesday: {
      breakfast: { dish: "Avocado Toast", cuisine: "Mediterranean", time: "10 mins", servings: 3 },
      lunch: { dish: "Quesadillas", cuisine: "Mexican", time: "15 mins", servings: 3 },
      dinner: { dish: "Spaghetti Carbonara", cuisine: "Italian", time: "25 mins", servings: 3 }
    },
    Wednesday: {
      breakfast: { dish: "Smoothie Bowl", cuisine: "American", time: "10 mins", servings: 3 },
      lunch: { dish: "Poke Bowl", cuisine: "Asian", time: "20 mins", servings: 3 },
      dinner: { dish: "Tacos", cuisine: "Mexican", time: "30 mins", servings: 3 }
    },
    Thursday: {
      breakfast: { dish: "Pancakes", cuisine: "American", time: "20 mins", servings: 3 },
      lunch: { dish: "Greek Salad", cuisine: "Mediterranean", time: "15 mins", servings: 3 },
      dinner: { dish: "Butter Chicken", cuisine: "Indian", time: "45 mins", servings: 3 }
    },
    Friday: {
      breakfast: { dish: "French Toast", cuisine: "American", time: "25 mins", servings: 3 },
      lunch: { dish: "Sushi Bowls", cuisine: "Asian", time: "30 mins", servings: 3 },
      dinner: { dish: "Pizza Night", cuisine: "Italian", time: "40 mins", servings: 3 }
    },
    Saturday: {
      breakfast: { dish: "Breakfast Burrito", cuisine: "Mexican", time: "20 mins", servings: 3 },
      lunch: { dish: "Caprese Sandwich", cuisine: "Italian", time: "10 mins", servings: 3 },
      dinner: { dish: "BBQ Night", cuisine: "American", time: "60 mins", servings: 3 }
    },
    Sunday: {
      breakfast: { dish: "Brunch Spread", cuisine: "American", time: "45 mins", servings: 3 },
      lunch: { dish: "Leftover Magic", cuisine: "Mixed", time: "15 mins", servings: 3 },
      dinner: { dish: "Meal Prep Sunday", cuisine: "Mixed", time: "90 mins", servings: 6 }
    }
  });

  const [aiSuggestions, setAiSuggestions] = useState([
    { dish: "Teriyaki Salmon Bowl", cuisine: "Asian", time: "25 mins", servings: 3, type: "dinner" },
    { dish: "Mediterranean Wrap", cuisine: "Mediterranean", time: "15 mins", servings: 3, type: "lunch" },
    { dish: "Veggie Omelet", cuisine: "American", time: "12 mins", servings: 3, type: "breakfast" }
  ]);

  const generateAISuggestions = () => {
    const suggestions = [
      { dish: "Moroccan Chicken Tagine", cuisine: "Mediterranean", time: "45 mins", servings: 3, type: "dinner" },
      { dish: "Korean Bibimbap", cuisine: "Asian", time: "35 mins", servings: 3, type: "lunch" },
      { dish: "Shakshuka", cuisine: "Mediterranean", time: "20 mins", servings: 3, type: "breakfast" },
      { dish: "Thai Green Curry", cuisine: "Asian", time: "30 mins", servings: 3, type: "dinner" },
      { dish: "Caprese Stuffed Chicken", cuisine: "Italian", time: "40 mins", servings: 3, type: "dinner" },
      { dish: "Mexican Breakfast Bowl", cuisine: "Mexican", time: "18 mins", servings: 3, type: "breakfast" }
    ];
    
    const randomSuggestions = suggestions.sort(() => 0.5 - Math.random()).slice(0, 3);
    setAiSuggestions(randomSuggestions);
    
    toast({
      title: "AI Suggestions Generated!",
      description: "Fresh meal suggestions based on your family preferences.",
    });
  };

  const handleSuggestedMealClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setSelectedDay("");
    setSelectedMealType("");
    setShowMealDialog(true);
  };

  const confirmAddSuggestedMeal = () => {
    if (!selectedDay || !selectedMealType || !selectedSuggestion) {
      toast({
        title: "Missing Information",
        description: "Please select both day and meal type.",
        variant: "destructive",
      });
      return;
    }

    const updatedWeeklyMeals = { ...weeklyMeals };
    updatedWeeklyMeals[selectedDay][selectedMealType] = {
      dish: selectedSuggestion.dish,
      cuisine: selectedSuggestion.cuisine,
      time: selectedSuggestion.time,
      servings: selectedSuggestion.servings
    };
    
    setWeeklyMeals(updatedWeeklyMeals);
    setShowMealDialog(false);
    
    toast({
      title: "Meal Added!",
      description: `${selectedSuggestion.dish} added to ${selectedDay} ${selectedMealType}.`,
    });
  };

  const saveMeal = () => {
    if (!newMeal.type || !newMeal.day || !newMeal.dish) {
      toast({
        title: "Missing Information",
        description: "Please fill in meal type, day, and dish name.",
        variant: "destructive",
      });
      return;
    }

    const updatedWeeklyMeals = { ...weeklyMeals };
    const dayName = newMeal.day.charAt(0).toUpperCase() + newMeal.day.slice(1);
    
    updatedWeeklyMeals[dayName][newMeal.type] = {
      dish: newMeal.dish,
      cuisine: newMeal.cuisine,
      time: newMeal.time,
      servings: newMeal.servings
    };
    
    setWeeklyMeals(updatedWeeklyMeals);
    setNewMeal({
      type: "",
      day: "",
      dish: "",
      notes: "",
      cuisine: "American",
      time: "30 mins",
      servings: 3
    });
    setShowAddMeal(false);
    
    toast({
      title: "Meal Saved!",
      description: `${newMeal.dish} has been added to your meal plan.`,
    });
  };

  const getCuisineColor = (cuisine: string) => {
    const colors = {
      Italian: "bg-red-100 text-red-800",
      Mexican: "bg-yellow-100 text-yellow-800",
      Asian: "bg-green-100 text-green-800",
      Mediterranean: "bg-blue-100 text-blue-800",
      American: "bg-purple-100 text-purple-800",
      Indian: "bg-orange-100 text-orange-800",
      Mixed: "bg-gray-100 text-gray-800"
    };
    return colors[cuisine] || colors.Mixed;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Weekly Meal Planner</h2>
          <p className="text-gray-600">Plan nutritious meals for your family</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => setShowAddMeal(!showAddMeal)}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Meal
          </Button>
        </div>
      </div>

      {/* AI Meal Suggestions */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <Sparkles className="h-5 w-5" />
            AI Meal Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-medium mb-2">Family Preferences</h4>
              <div className="flex flex-wrap gap-2">
                {cuisinePreferences.map((cuisine) => (
                  <Badge key={cuisine} variant="outline" className="border-purple-200">
                    {cuisine}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Smart Suggestions</h4>
              <div className="space-y-3">
                {aiSuggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-purple-100">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{suggestion.dish}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getCuisineColor(suggestion.cuisine)} variant="secondary">
                          {suggestion.cuisine}
                        </Badge>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {suggestion.time}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {suggestion.servings}
                        </span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleSuggestedMealClick(suggestion)}
                      className="ml-2 border-purple-200 text-purple-700 hover:bg-purple-50"
                    >
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Button 
            onClick={generateAISuggestions}
            variant="outline" 
            className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Generate New Suggestions
          </Button>
        </CardContent>
      </Card>

      {/* Meal Selection Dialog */}
      <Dialog open={showMealDialog} onOpenChange={setShowMealDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add {selectedSuggestion?.dish}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Day</label>
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a day" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(weeklyMeals).map((day) => (
                    <SelectItem key={day} value={day}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Meal Time</label>
              <Select value={selectedMealType} onValueChange={setSelectedMealType}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose meal time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMealDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmAddSuggestedMeal}>
              Add Meal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Meal Form */}
      {showAddMeal && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-700">Add New Meal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Meal Type</label>
                <Select value={newMeal.type} onValueChange={(value) => setNewMeal({...newMeal, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select meal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="snack">Snack</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Day</label>
                <Select value={newMeal.day} onValueChange={(value) => setNewMeal({...newMeal, day: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(weeklyMeals).map((day) => (
                      <SelectItem key={day} value={day.toLowerCase()}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Dish Name</label>
              <Input 
                placeholder="Enter dish name" 
                value={newMeal.dish}
                onChange={(e) => setNewMeal({...newMeal, dish: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Notes</label>
              <Textarea 
                placeholder="Add any special instructions or ingredients..." 
                value={newMeal.notes}
                onChange={(e) => setNewMeal({...newMeal, notes: e.target.value})}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={saveMeal} className="bg-green-600 hover:bg-green-700">Save Meal</Button>
              <Button variant="outline" onClick={() => setShowAddMeal(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Meal Grid */}
      <div className="grid gap-4">
        {Object.entries(weeklyMeals).map(([day, meals]) => (
          <Card key={day} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg">{day}</span>
                <Badge variant="outline" className="text-xs">
                  {Object.keys(meals).length} meals
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {Object.entries(meals).map(([mealType, meal]) => (
                  <div key={mealType} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium capitalize text-sm">{mealType}</h4>
                      <ChefHat className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-gray-900">{meal.dish}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <Badge className={getCuisineColor(meal.cuisine)} variant="secondary">
                          {meal.cuisine}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {meal.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {meal.servings}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MealPlanner;
