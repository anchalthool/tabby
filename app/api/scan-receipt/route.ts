import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";
const MAX_IMAGES = 8;
const MAX_FILE_SIZE = 8 * 1024 * 1024;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";

export const runtime = "nodejs";

const receiptSchema = {
  type: Type.OBJECT,
  properties: {
    merchant: { type: Type.STRING },
    items: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
  name: { type: Type.STRING },
  quantity: { type: Type.NUMBER },
  totalPrice: { type: Type.NUMBER },
  category: { type: Type.STRING },
},
required: ["name", "quantity", "totalPrice", "category"],
      },
    },
    subtotal: { type: Type.NUMBER },
    tax: { type: Type.NUMBER },
    deliveryFee: { type: Type.NUMBER },
    serviceFee: { type: Type.NUMBER },
    tip: { type: Type.NUMBER },
    discount: { type: Type.NUMBER },
    total: { type: Type.NUMBER },
  },
  required: [
    "merchant",
    "items",
    "subtotal",
    "tax",
    "deliveryFee",
    "serviceFee",
    "tip",
    "discount",
    "total",
  ],
};

export async function POST(request: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not configured." }, { status: 503 });
    }

    const formData = await request.formData();
    const files = formData.getAll("receipts").filter((value): value is File => value instanceof File);

    if (!files.length) {
      const legacyFile = formData.get("receipt");
      if (legacyFile instanceof File) files.push(legacyFile);
    }

    if (!files.length) {
      return NextResponse.json({ error: "At least one receipt image is required." }, { status: 400 });
    }

    if (files.length > MAX_IMAGES) {
      return NextResponse.json({ error: "Please upload at most 8 screenshots/photos at a time." }, { status: 400 });
    }

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json({ error: "Every upload must be an image or screenshot." }, { status: 400 });
      }


if (file.size > MAX_FILE_SIZE) {
  return NextResponse.json(
    { error: `${file.name} is larger than 8 MB.` },
    { status: 400 }
  );
}
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const imageParts = await Promise.all(
      files.map(async (file) => ({
        inlineData: {
          mimeType: file.type,
          data: Buffer.from(await file.arrayBuffer()).toString("base64"),
        },
      }))
    );

    const prompt = `These ${files.length} images are screenshots/photos from ONE grocery order or receipt.
They may overlap heavily because a long cart can require several screenshots.

Your job is to reconstruct ONE deduplicated order from all images.

Critical overlap rule:
- If the same visible line item appears in more than one screenshot because the screenshots overlap, include it ONLY ONCE.
- Use item name, quantity, price, neighboring items, and screen position/context to recognize overlaps.
- Do NOT remove a legitimate repeated purchase merely because two different line items have the same product name. Only collapse records when they are the same order line shown again in overlapping images.
- If screenshot 2 repeats the bottom of screenshot 1 and then continues with new products, keep the repeated section once and keep every new product.

Extraction rules:
- Extract every purchasable line item from the reconstructed order.
- Resolve abbreviations into short human-friendly names when reasonably confident.
- quantity = number of units visible for that order line. For weighted goods where individual pieces are unknown, use 1.
- totalPrice = total price of that line, not the per-unit price, before order-level tax/fees.
- Return order-level tax, delivery fee, service fee, tip, discount, subtotal and total only once, even if summary information appears in several screenshots.
- Discounts must be positive numbers in the discount field; use 0 when absent.
- If the order total is visible, preserve that printed total.
- Money values should be plain numeric values in the receipt currency; this app currently treats them as USD.

Return only the structured response.`;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [...imageParts, { text: prompt }],
      config: {
        responseMimeType: "application/json",
        responseSchema: receiptSchema,
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    parsed.items = (parsed.items || []).map(
  (item: Record<string, unknown>, index: number) => ({
    ...item,
    id: `scan-${Date.now()}-${index}`,
    confidence: 1,
  })
);

    return NextResponse.json(parsed);
  } catch (error) {
  console.error(error);

  const message =
    error instanceof Error
      ? error.message
      : "Could not read these images.";

  const lowerMessage = message.toLowerCase();

  if (
    lowerMessage.includes("429") ||
    lowerMessage.includes("quota") ||
    lowerMessage.includes("rate limit")
  ) {
    return NextResponse.json(
      {
        error:
          "Free receipt scans are temporarily used up. Please try again later.",
      },
      { status: 429 }
    );
  }

  return NextResponse.json(
    { error: "Could not read these images." },
    { status: 500 }
  );
}
}
