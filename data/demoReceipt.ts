import type { ReceiptData } from "@/lib/types";

export const demoReceipt: ReceiptData = {
  merchant: "Walmart",
  items: [
    {
      id: "demo-1",
      name: "Roma Tomatoes",
      quantity: 6,
      totalPrice: 4.44,
      category: "Produce",
      confidence: 0.98,
    },
    {
      id: "demo-2",
      name: "Whole Milk",
      quantity: 1,
      totalPrice: 3.49,
      category: "Dairy",
      confidence: 0.99,
    },
    {
      id: "demo-3",
      name: "Paper Towels",
      quantity: 1,
      totalPrice: 11.97,
      category: "Household",
      confidence: 0.95,
    },
    {
      id: "demo-4",
      name: "Avocados",
      quantity: 4,
      totalPrice: 5.96,
      category: "Produce",
      confidence: 0.96,
    },
  ],

  subtotal: 25.86,
  tax: 1.62,
  deliveryFee: 4.99,
  serviceFee: 2,
  tip: 0,
  discount: 0,
  total: 34.47,
};

export const emptyReceipt: ReceiptData = {
  merchant: "Bill Check",
  items: [],
  subtotal: 0,
  tax: 0,
  deliveryFee: 0,
  serviceFee: 0,
  tip: 0,
  discount: 0,
  total: 0,
};