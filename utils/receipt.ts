import type { ReceiptItem } from "@/lib/types";

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function itemSignature(item: ReceiptItem) {
  return `${item.name.trim().toLowerCase()}|${Number(
    item.quantity || 0
  )}|${Number(item.totalPrice || 0).toFixed(2)}`;
}