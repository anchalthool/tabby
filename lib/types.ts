export type ReceiptItem = {
  id: string;
  name: string;
  quantity: number;
  totalPrice: number;
  category?: string;
  confidence?: number;
};

export type ReceiptData = {
  merchant: string;
  items: ReceiptItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  serviceFee: number;
  tip: number;
  discount: number;
  total: number;
};

export type Friend = {
  id: string;
  name: string;
};

export type ItemAssignment = {
  shared: boolean;
  sharedWith: string[];
  quantities: Record<string, number>;
};
