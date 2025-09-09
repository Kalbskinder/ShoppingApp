"use client";

import { useState, useEffect } from "react";
import { categories } from "./data";
import { ShoppingCart } from "lucide-react";

export default function Home() {
  const [items, setItems] = useState<{ name: string; category: string; quantity: number; checked: boolean }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [addNewProductVisible, setAddNewProductVisible] = useState(false);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);

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

  const deleteItem = (itemName: string) => {
    setItems((prev) => prev.filter((item) => item.name !== itemName));
  };

  const toggleItem = (itemName: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.name === itemName ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const ShoppingItem = (item: { name: string; category: string; quantity: number; checked: boolean }) => {
    return (
      <li
        key={item.name}
        className="p-2 bg-white rounded shadow-sm flex justify-between items-center cursor-pointer"
        onClick={() => toggleItem(item.name)}
      >
        <div className="flex-1">{item.name}</div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500">{item.quantity}</div>
          <input
            type="checkbox"
            checked={item.checked}
            readOnly
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="ml-2 text-red-500 hover:text-red-700"
            onClick={(e) => {
              e.stopPropagation();
              deleteItem(item.name);
            }}
            aria-label="Delete item"
            type="button"
          >
            {/* Trash icon SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </li>
    );
  };

  const ConfirmMarkAsDoneModal = () => {
    return (
      <div className="fixed top-0 left-0 w-full h-full modal-bg flex justify-center items-center">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-lg font-semibold">Are you sure you want to delete all items from the list?</p>
          <div className="flex justify-center mt-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded mr-2 cursor-pointer" onClick={markListAsDone}>
              Yes
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer" onClick={() => setModalVisible(false)}>
              No
            </button>
          </div>
        </div>
      </div>
    );
  };

  const AddNewProduct = () => {
    const handleCreate = () => {
      const usedCategory = category ? category : "Other";
      if (productName && quantity > 0) {
        setItems((prev) => [
          ...prev,
          { name: productName, category: usedCategory, quantity, checked: false },
        ]);
        setAddNewProductVisible(false);
        setProductName("");
        setCategory("");
        setQuantity(1);
      }
    };

    const handleCancel = () => {
      setAddNewProductVisible(false);
      setProductName("");
      setCategory("");
      setQuantity(1);
    };

    return (
      <div className="fixed top-0 left-0 w-full h-full modal-bg flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-xl shadow flex flex-col gap-4 min-w-[320px]">
          <input
            className="border border-gray-300 rounded px-3 py-2 text-lg font-handwriting outline-none"
            placeholder="Product"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            autoFocus
          />
          <select
            className="border border-gray-300 rounded px-3 py-2 text-lg font-handwriting outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Category
            </option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <button
              className="text-red-500 text-2xl px-2"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              type="button"
            >
              -
            </button>
            <input
              className="border border-gray-300 rounded w-12 text-center text-lg font-handwriting"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            />
            <button
              className="text-green-600 text-2xl px-2"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
              type="button"
            >
              +
            </button>
          </div>
          <div className="flex justify-end gap-2">
            <button
              className="bg-gray-400 text-white px-6 py-2 rounded shadow font-handwriting text-lg"
              onClick={handleCancel}
              type="button"
            >
              cancel
            </button>
            <button
              className="bg-blue-400 text-white px-6 py-2 rounded shadow font-handwriting text-lg"
              onClick={handleCreate}
              disabled={!productName}
              type="button"
            >
              create
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Header */}
      <nav className="bg-white shadow p-4 flex justify-center flex-col items-center">
        <h1 className="text-xl font-bold flex items-center space-x-2">
          <ShoppingCart />
          <span>Shopping App</span>
        </h1>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 space-y-4">
        {categories.map((category) => {
          const filteredItems = items.filter((item) => item.category === category.name);

          return (
            <div
              key={category.name}
              className="rounded shadow overflow-hidden"
              style={{ backgroundColor: category.bgColor }}
            >
              {/* Category Header */}
              <div className="w-full text-left p-4">
                <div className="flex flex-row space-x-2 items-center">
                  <category.icon size={18} />
                  <span className="font-semibold text-lg">{category.name}</span>
                </div>
              </div>

              {/* Items */}
              {filteredItems.length > 0 ? (
                <ul className="p-4 space-y-2 border-t border-gray-300">
                  {filteredItems.map((item) => (
                    <ShoppingItem key={item.name} {...item} />
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-gray-500 border-t border-gray-300">No Items</div>
              )}
            </div>
          );
        })}
        <button className="bg-blue-500 text-white p-2 rounded w-full cursor-pointer" onClick={() => setModalVisible(true)}>
          Reset List
        </button>
      </main>

      {/* Modal */}
      {modalVisible ? <ConfirmMarkAsDoneModal /> : null}
      {addNewProductVisible ? <AddNewProduct /> : null}

      {/* Floating Button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-500 text-white w-12 h-12 rounded-full shadow-lg text-2xl flex items-center justify-center"
        onClick={() => setAddNewProductVisible(true)}
      >
        +
      </button>
    </div>
  );
}
