import { useState } from "react";
import { Plus, Check, Trash2, ShoppingCart, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const ShoppingList = () => {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([
    { id: 1, name: "Chicken breast", category: "Meat", completed: false, addedBy: "Sarah" },
    { id: 2, name: "Broccoli", category: "Vegetables", completed: true, addedBy: "Mike" },
    { id: 3, name: "Rice", category: "Grains", completed: false, addedBy: "AI Suggestion" },
    { id: 4, name: "Milk", category: "Dairy", completed: false, addedBy: "Emma" },
    { id: 5, name: "Bananas", category: "Fruits", completed: false, addedBy: "Sarah" },
    { id: 6, name: "Bread", category: "Bakery", completed: true, addedBy: "Cook" },
    { id: 7, name: "Eggs", category: "Dairy", completed: false, addedBy: "AI Suggestion" },
    { id: 8, name: "Tomatoes", category: "Vegetables", completed: false, addedBy: "Mike" },
  ]);

  const categories = ["Fruits", "Vegetables", "Meat", "Dairy", "Grains", "Bakery", "Snacks"];

  const addItem = () => {
    if (newItem.trim()) {
      const newId = Math.max(...items.map(item => item.id)) + 1;
      setItems([...items, {
        id: newId,
        name: newItem,
        category: "Uncategorized",
        completed: false,
        addedBy: "You"
      }]);
      setNewItem("");
    }
  };

  const toggleItem = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const generateFromMeals = () => {
    const mealItems = [
      { name: "Pasta", category: "Grains" },
      { name: "Parmesan cheese", category: "Dairy" },
      { name: "Bell peppers", category: "Vegetables" },
      { name: "Olive oil", category: "Pantry" },
    ];
    
    const newItems = mealItems.map(item => ({
      id: Math.max(...items.map(i => i.id)) + Math.random(),
      name: item.name,
      category: item.category,
      completed: false,
      addedBy: "AI Suggestion"
    }));
    
    setItems([...items, ...newItems]);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Fruits: "bg-red-100 text-red-800",
      Vegetables: "bg-green-100 text-green-800",
      Meat: "bg-orange-100 text-orange-800",
      Dairy: "bg-blue-100 text-blue-800",
      Grains: "bg-yellow-100 text-yellow-800",
      Bakery: "bg-purple-100 text-purple-800",
      Snacks: "bg-pink-100 text-pink-800",
      Pantry: "bg-gray-100 text-gray-800",
      Uncategorized: "bg-gray-100 text-gray-800"
    };
    return colors[category] || colors.Uncategorized;
  };

  const completedItems = items.filter(item => item.completed);
  const pendingItems = items.filter(item => !item.completed);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Shopping List</h2>
          <p className="text-gray-600">
            {pendingItems.length} items remaining • {completedItems.length} completed
          </p>
        </div>
      </div>

      {/* Add Item */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Input
              placeholder="Add item to shopping list..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addItem()}
              className="bg-white"
            />
            <Button onClick={addItem} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Shopping Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-blue-600">{items.length}</div>
          <div className="text-sm text-gray-600">Total Items</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-orange-600">{pendingItems.length}</div>
          <div className="text-sm text-gray-600">To Buy</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-green-600">{completedItems.length}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
          <div className="text-sm text-gray-600">Categories</div>
        </Card>
      </div>

      {/* Pending Items */}
      {pendingItems.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-orange-600" />
              Items to Buy ({pendingItems.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Checkbox
                    checked={item.completed}
                    onCheckedChange={() => toggleItem(item.id)}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getCategoryColor(item.category)} variant="secondary">
                        {item.category}
                      </Badge>
                      <span className="text-xs text-gray-500">Added by {item.addedBy}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteItem(item.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completed Items */}
      {completedItems.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              Completed Items ({completedItems.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {completedItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg opacity-75">
                  <Checkbox
                    checked={item.completed}
                    onCheckedChange={() => toggleItem(item.id)}
                  />
                  <div className="flex-1">
                    <div className="font-medium line-through text-gray-600">{item.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getCategoryColor(item.category)} variant="secondary">
                        {item.category}
                      </Badge>
                      <span className="text-xs text-gray-500">Added by {item.addedBy}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteItem(item.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ShoppingList;
