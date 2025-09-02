import { Carrot, Apple, Cookie, Bath, CupSoda, Snowflake, Drumstick, AlertTriangle, CircleQuestionMark } from "lucide-react";

// Automaticly select a category based on the item name
// When no category is found, "Other" is used
export const shoppingData = [
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
];

// Categories for dropdown
export const categories = [
  { name: "Vegetables", bgColor: "#d1fae5", icon: Carrot },
  { name: "Fruits", bgColor: "#fef9c3", icon: Apple },
  { name: "Sweets & Snacks", bgColor: "#fbcfe8", icon: Cookie },
  { name: "Hygiene", bgColor: "#e9d5ff", icon: Bath },
  { name: "Beverages", bgColor: "#bfdbfe", icon: CupSoda },
  { name: "Frozen", bgColor: "#cffafe", icon: Snowflake },
  { name: "Meat", bgColor: "#fecaca", icon: Drumstick },
  { name: "Other", bgColor: "#e5e7eb", icon: CircleQuestionMark },
];