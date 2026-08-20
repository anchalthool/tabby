import { NextResponse } from "next/server";

type Share = { name: string; owed: number };
type SplitwiseUser = { id: number; first_name?: string; last_name?: string; email?: string };

const API = "https://secure.splitwise.com/api/v3.0";
const norm = (value: string) => value.trim().toLowerCase().replace(/\s+/g, " ");
const fullName = (user: SplitwiseUser) => `${user.first_name || ""} ${user.last_name || ""}`.trim();

async function splitwiseFetch(path: string, token: string, init?: RequestInit) {
  const response = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init?.headers || {}),
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error || `Splitwise request failed (${response.status})`);
  return data;
}

export async function POST(request: Request) {
  try {
    const token = process.env.SPLITWISE_ACCESS_TOKEN;
    if (!token) {
      return NextResponse.json({ error: "SPLITWISE_ACCESS_TOKEN is not configured." }, { status: 503 });
    }

    const body = (await request.json()) as {
      description: string;
      payerName: string;
      shares: Share[];
      total: number;
    };

    if (!body.shares?.length || !body.total || !body.payerName) {
      return NextResponse.json({ error: "Missing Splitwise expense details." }, { status: 400 });
    }

    const [meData, friendsData] = await Promise.all([
      splitwiseFetch("/get_current_user", token),
      splitwiseFetch("/get_friends", token),
    ]);

    const users: SplitwiseUser[] = [meData.user, ...(friendsData.friends || [])];
    const matchUser = (name: string) => {
      const target = norm(name);
      return users.find((u) => {
        const full = norm(fullName(u));
        const first = norm(u.first_name || "");
        return full === target || first === target;
      });
    };

    const resolved = body.shares.map((share) => ({ ...share, user: matchUser(share.name) }));
    const unresolved = resolved.filter((entry) => !entry.user).map((entry) => entry.name);
    if (unresolved.length) {
      return NextResponse.json(
        { error: `Couldn't match these names to Splitwise: ${unresolved.join(", ")}. Use their Splitwise first/full names.` },
        { status: 400 }
      );
    }

    const payer = matchUser(body.payerName);
    if (!payer) {
      return NextResponse.json({ error: `Couldn't match payer ${body.payerName} to Splitwise.` }, { status: 400 });
    }

const expenseBody = {
  cost: body.total.toFixed(2),
  description: body.description || "Grocery split",
  currency_code: "USD",

  users: resolved.map((entry) => ({
    user_id: entry.user!.id,

    paid_share:
      entry.user!.id === payer.id
        ? body.total.toFixed(2)
        : "0.00",

    owed_share: entry.owed.toFixed(2),
  })),
};

const result = await splitwiseFetch("/create_expense", token, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(expenseBody),
});

    if (result.errors && Object.keys(result.errors).length) {
      return NextResponse.json({ error: "Splitwise rejected the expense.", details: result.errors }, { status: 400 });
    }

    return NextResponse.json({ success: true, expense: result.expenses?.[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Splitwise request failed." }, { status: 500 });
  }
}
