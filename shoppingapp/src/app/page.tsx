"use client"

import { useState } from "react";
import { shoppingData, categories } from "./data";


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Header */}
      <nav className="bg-white shadow p-4 flex justify-center">
        <h1 className="text-xl font-bold">Shopping App</h1>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 space-y-4">
        {categories.map((category) => {
          const items = shoppingData.filter(
            (item) => item.category === category.name
          );

          return (
            <div
              key={category.name}
              className="rounded shadow overflow-hidden"
              style={{ backgroundColor: category.bgColor }}
            >
              {/* Kategorie Header */}
              <div className="w-full text-left p-4">
                <span className="font-semibold text-lg">{category.name}</span>
              </div>

              {/* Items */}
              {items.length > 0 ? (
                <ul className="p-4 space-y-2 border-t border-gray-300">
                  {items.map((item) => (
                    <li
                      key={item.name}
                      className="p-2 bg-white rounded shadow-sm flex justify-between items-center"
                    >
                      {item.name}
                      <input type="checkbox" />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-gray-500 border-t border-gray-300">
                  Keine Artikel
                </div>
              )}
            </div>
          );
        })}
      </main>

      {/* Floating Button */}
      <button className="fixed bottom-6 right-6 bg-blue-500 text-white w-16 h-16 rounded-full shadow-lg text-2xl flex items-center justify-center">
        +
      </button>
    </div>
  );
}
