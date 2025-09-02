"use client";

import { useState, useEffect } from "react";
import { categories } from "./data";

export default function Home() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [items, setItems] = useState<{ name: string; category: string }[]>([]);

  useEffect(() => {
    setItems([
      { name: "Banana", category: "Fruits" },
      { name: "Apple", category: "Fruits" },
      { name: "Carrot", category: "Vegetables" },
      { name: "Broccoli", category: "Vegetables" },
      { name: "Chocolate Bar", category: "Sweets & Snacks" },
      { name: "Potato Chips", category: "Sweets & Snacks" },
      { name: "Shampoo", category: "Hygiene" },
      { name: "Toothpaste", category: "Hygiene" },
      { name: "Orange Juice", category: "Beverages" },
      { name: "Mineral Water", category: "Beverages" },
      { name: "Frozen Pizza", category: "Frozen" },
      { name: "Ice Cream", category: "Frozen" },
      { name: "Chicken Breast", category: "Meat" },
      { name: "Ground Beef", category: "Meat" },
    ]);
  }, []);

  const toggleItem = (itemName: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Header */}
      <nav className="bg-white shadow p-4 flex justify-center">
        <h1 className="text-xl font-bold">Shopping App</h1>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 space-y-4">
        {categories.map((category) => {
          const filteredItems = items.filter(
            (item) => item.category === category.name
          );

          return (
            <div
              key={category.name}
              className="rounded shadow overflow-hidden"
              style={{ backgroundColor: category.bgColor }}
            >
              {/* Category Header */}
              <div className="w-full text-left p-4">
                <span className="font-semibold text-lg">{category.name}</span>
              </div>

              {/* Items */}
              {filteredItems.length > 0 ? (
                <ul className="p-4 space-y-2 border-t border-gray-300">
                  {filteredItems.map((item) => (
                    <li
                      key={item.name}
                      className="p-2 bg-white rounded shadow-sm flex justify-between items-center cursor-pointer"
                      onClick={() => toggleItem(item.name)}
                    >
                      {item.name}
                      <input
                        type="checkbox"
                        checked={!!checkedItems[item.name]}
                        readOnly
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-gray-500 border-t border-gray-300">
                  No Items
                </div>
              )}
            </div>
          );
        })}
        <button className="bg-blue-500 text-white p-2 rounded w-full cursor-pointer">
          Mark List as Done
        </button>
      </main>

      {/* Floating Button */}
      <button className="fixed bottom-6 right-6 bg-blue-500 text-white w-12 h-12 rounded-full shadow-lg text-2xl flex items-center justify-center">
        +
      </button>
    </div>
  );
}
