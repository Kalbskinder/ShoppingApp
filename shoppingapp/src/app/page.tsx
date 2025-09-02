"use client";

import { useState, useEffect } from "react";
import { categories } from "./data";

export default function Home() {
  const [items, setItems] = useState<{ name: string; category: string, quantity: number, checked: boolean }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Mock items
  useEffect(() => {
    setItems([
      { name: "Banana", category: "Fruits", quantity: 2, checked: false },
      { name: "Apple", category: "Fruits", quantity: 1, checked: false },
      { name: "Carrot", category: "Vegetables", quantity: 3, checked: false },
      { name: "Broccoli", category: "Vegetables", quantity: 1, checked: false },
      { name: "Chocolate Bar", category: "Sweets & Snacks", quantity: 1, checked: false },
      { name: "Potato Chips", category: "Sweets & Snacks", quantity: 1, checked: false },
      { name: "Shampoo", category: "Hygiene", quantity: 1, checked: false },
      { name: "Toothpaste", category: "Hygiene", quantity: 1, checked: false },
      { name: "Orange Juice", category: "Beverages", quantity: 1, checked: false },
      { name: "Mineral Water", category: "Beverages", quantity: 1, checked: false },
      { name: "Frozen Pizza", category: "Frozen", quantity: 1, checked: false },
      { name: "Ice Cream", category: "Frozen", quantity: 1, checked: false },
      { name: "Chicken Breast", category: "Meat", quantity: 1, checked: false },
      { name: "Ground Beef", category: "Meat", quantity: 1, checked: false },
    ]);
  }, []);

  const markListAsDone = () => {
    setItems([]);
    setModalVisible(false);
  };

  const ShoppingItem = (item: { name: string; category: string, quantity: number, checked: boolean }) => {
    return (
      <li
        key={item.name}
        className="p-2 bg-white rounded shadow-sm flex justify-between items-center cursor-pointer"
        onClick={() => toggleItem(item.name)}
      >
        <div className="flex-1">{item.name}</div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500 mr-2">{item.quantity}</div>
          <input
            type="checkbox"
            checked={item.checked}
            readOnly
          />
        </div>
      </li>
    )
  }

  const ConfirmMarkAsDoneModal = () => {
    return (
      <div className="fixed top-0 left-0 w-full h-full modal-bg flex justify-center items-center">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-lg font-semibold">Are you sure you want to delete all items from the list?</p>
          <div className="flex justify-center mt-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded mr-2 cursor-pointer" onClick={markListAsDone}>Yes</button>  
            <button className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer" onClick={() => {setModalVisible(false)}}>No</button>
          </div>
        </div>
      </div>
    )
  }

  const toggleItem = (itemName: string) => {
    setItems((prev) => {
      const updatedItems = prev.map((item) => {
        if (item.name === itemName) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });
      return updatedItems;
    });
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
                    <ShoppingItem key={item.name} {...item} />
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
        <button className="bg-blue-500 text-white p-2 rounded w-full cursor-pointer" onClick={() => setModalVisible(true)}>
          Reset List
        </button>
      </main>

      {/* Modal */}
      { modalVisible ? <ConfirmMarkAsDoneModal /> : null }

      {/* Floating Button */}
      <button className="fixed bottom-6 right-6 bg-blue-500 text-white w-12 h-12 rounded-full shadow-lg text-2xl flex items-center justify-center">
        +
      </button>
    </div>
  );
}
