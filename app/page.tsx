"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { money, round2 } from "@/lib/money";
import type { Friend, ItemAssignment, ReceiptData, ReceiptItem } from "@/lib/types";
import { demoReceipt, emptyReceipt } from "@/data/demoReceipt";
import { capitalizeWords } from "@/utils/text";
import FoodIcon from "@/components/FoodIcon";
import Avatar from "@/components/Avatar";
import { uid, itemSignature } from "@/utils/receipt";




type UploadImage = {
  id: string;
  file: File;
  previewUrl: string;
};

export default function Home() {
  const [receipt, setReceipt] = useState<ReceiptData>(emptyReceipt);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [newFriend, setNewFriend] = useState("");
  const [payerId, setPayerId] = useState("");
  const [assignments, setAssignments] = useState<Record<string, ItemAssignment>>({});
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [uploads, setUploads] = useState<UploadImage[]>([]);

  const [manualItemName, setManualItemName] = useState("");
const [manualItemQuantity, setManualItemQuantity] = useState("1");
const [manualItemPrice, setManualItemPrice] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("cartsplit-friends");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Friend[];
        setFriends(parsed);
        if (parsed[0]) setPayerId(parsed[0].id);
      } catch {
        // ignore invalid saved state
      }
    }
  }, []);

  useEffect(() => {
    if (friends.length) localStorage.setItem("cartsplit-friends", JSON.stringify(friends));
    else localStorage.removeItem("cartsplit-friends");
    if (!friends.some((friend) => friend.id === payerId)) setPayerId(friends[0]?.id || "");
  }, [friends, payerId]);

  const clearAll = () => {
  uploads.forEach((upload) => URL.revokeObjectURL(upload.previewUrl));

  setReceipt(emptyReceipt);
  setFriends([]);
  setNewFriend("");
  setAssignments({});
  setUploads([]);
  setMessage("");

  localStorage.removeItem("cartsplit-friends");
};

  const initAssignments = (items: ReceiptItem[]) => {
    const next: Record<string, ItemAssignment> = {};
    items.forEach((item) => {
      next[item.id] = { shared: false, sharedWith: [], quantities: {} };
    });
    setAssignments(next);
  };

  const replaceScannedReceipt = (data: ReceiptData) => {
    const oldBySignature = new Map<string, ItemAssignment>();
    receipt.items.forEach((item) => {
      const assignment = assignments[item.id];
      if (assignment) oldBySignature.set(itemSignature(item), assignment);
    });

    const nextAssignments: Record<string, ItemAssignment> = {};
    data.items.forEach((item) => {
      nextAssignments[item.id] = oldBySignature.get(itemSignature(item)) || {
        shared: false,
        sharedWith: [],
        quantities: {},
      };
    });

    setReceipt(data);
    setAssignments(nextAssignments);
  };

  const useDemo = () => {
    setReceipt(demoReceipt);
    initAssignments(demoReceipt.items);
    setMessage("Demo receipt loaded — add friends and assign the items.");
  };

  const queueImages = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files || []).filter((file) => file.type.startsWith("image/"));
    if (!selected.length) return;

    setUploads((current) => {
      const existingKeys = new Set(current.map((upload) => `${upload.file.name}|${upload.file.size}|${upload.file.lastModified}`));
      const additions = selected
        .filter((file) => !existingKeys.has(`${file.name}|${file.size}|${file.lastModified}`))
        .slice(0, Math.max(0, 8 - current.length))
        .map((file) => ({ id: uid(), file, previewUrl: URL.createObjectURL(file) }));
      return [...current, ...additions].slice(0, 8);
    });

    setMessage("Images added. Add more if the order spans multiple screenshots, then scan them together.");
    event.target.value = "";
  };

  const removeUpload = (id: string) => {
    setUploads((current) => {
      const target = current.find((upload) => upload.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return current.filter((upload) => upload.id !== id);
    });
  };

  const clearUploads = () => {
    uploads.forEach((upload) => URL.revokeObjectURL(upload.previewUrl));
    setUploads([]);
  };

  const scanReceipt = async () => {
    if (!uploads.length) {
      setMessage("Add at least one receipt photo or screenshot first.");
      return;
    }

    setBusy(true);
    setMessage(`Reading ${uploads.length} image${uploads.length > 1 ? "s" : ""} with Gemini and removing overlaps…`);
    try {
      const form = new FormData();
      uploads.forEach((upload) => form.append("receipts", upload.file, upload.file.name));

      const response = await fetch("/api/scan-receipt", { method: "POST", body: form });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Receipt scan failed.");

      replaceScannedReceipt(data);
      setMessage(
        `Merged ${uploads.length} image${uploads.length > 1 ? "s" : ""} into ${data.items?.length || 0} unique items. Review anything that looks off.`
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not scan receipt.");
    } finally {
      setBusy(false);
    }
  };

  const addFriend = () => {
    const name = newFriend.trim();
    if (!name || friends.some((friend) => friend.name.toLowerCase() === name.toLowerCase())) return;
    const friend = { id: uid(), name };
    setFriends((prev) => [...prev, friend]);
    if (!payerId) setPayerId(friend.id);
    setNewFriend("");
  };

  const addItem = () => {
  const name = manualItemName.trim();

  if (!name) {
    setMessage("Enter an item name first.");
    return;
  }

  const quantity = Math.max(1, Number(manualItemQuantity) || 1);
  const totalPrice = Math.max(0, Number(manualItemPrice) || 0);

  const item: ReceiptItem = {
    id: uid(),
    name: capitalizeWords(name),
    quantity,
    totalPrice,
    category: "Grocery",
    confidence: 1,
  };

  setReceipt((prev) => ({
    ...prev,
    items: [...prev.items, item],
  }));

  setAssignments((prev) => ({
    ...prev,
    [item.id]: {
      shared: false,
      sharedWith: [],
      quantities: {},
    },
  }));

  setManualItemName("");
  setManualItemQuantity("1");
  setManualItemPrice("");
};

  const updateItem = (id: string, patch: Partial<ReceiptItem>) => {
    setReceipt((prev) => ({ ...prev, items: prev.items.map((item) => (item.id === id ? { ...item, ...patch } : item)) }));
  };

  const removeItem = (id: string) => {
    setReceipt((prev) => ({ ...prev, items: prev.items.filter((item) => item.id !== id) }));
    setAssignments((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const setQuantity = (item: ReceiptItem, friendId: string, delta: number) => {
    setAssignments((prev) => {
      const assignment = prev[item.id] || { shared: false, sharedWith: [], quantities: {} };
      const current = assignment.quantities[friendId] || 0;
      const assignedOther = Object.entries(assignment.quantities).reduce(
        (sum, [id, qty]) => (id === friendId ? sum : sum + qty),
        0
      );
      const maxForFriend = Math.max(
  0,
  item.quantity - assignedOther
);
      const nextQty = Math.min(maxForFriend, Math.max(0, current + delta));
      return {
        ...prev,
        [item.id]: { ...assignment, shared: false, quantities: { ...assignment.quantities, [friendId]: nextQty } },
      };
    });
  };

  const toggleShared = (itemId: string, friendId: string) => {
    setAssignments((prev) => {
      const assignment = prev[itemId] || { shared: true, sharedWith: [], quantities: {} };
      const exists = assignment.sharedWith.includes(friendId);
      return {
        ...prev,
        [itemId]: {
          ...assignment,
          shared: true,
          sharedWith: exists
            ? assignment.sharedWith.filter((id) => id !== friendId)
            : [...assignment.sharedWith, friendId],
        },
      };
    });
  };

  const splitEveryone = (itemId: string) => {
    setAssignments((prev) => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || { quantities: {} }),
        shared: true,
        sharedWith: friends.map((friend) => friend.id),
        quantities: {},
      },
    }));
  };

  const itemSubtotal = useMemo(
    () => round2(receipt.items.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0)),
    [receipt.items]
  );
  const extras = round2(
    Number(receipt.tax || 0) +
      Number(receipt.deliveryFee || 0) +
      Number(receipt.serviceFee || 0) +
      Number(receipt.tip || 0) -
      Number(receipt.discount || 0)
  );

  const totals = useMemo(() => {
    const resultCents: Record<string, number> = Object.fromEntries(friends.map((friend) => [friend.id, 0]));

    const distributeCents = (totalCents: number, ids: string[]) => {
      if (!ids.length) return;
      const sign = totalCents < 0 ? -1 : 1;
      const absolute = Math.abs(totalCents);
      const base = Math.floor(absolute / ids.length) * sign;
      const remainder = absolute % ids.length;
      ids.forEach((id, index) => {
        resultCents[id] = (resultCents[id] || 0) + base + (index < remainder ? sign : 0);
      });
    };

    receipt.items.forEach((item) => {
      const assignment = assignments[item.id];
      if (!assignment) return;
      const itemCents = Math.round(Number(item.totalPrice || 0) * 100);

      if (assignment.shared && assignment.sharedWith.length) {
        const selectedInFriendOrder = friends
          .filter((friend) => assignment.sharedWith.includes(friend.id))
          .map((friend) => friend.id);
        distributeCents(itemCents, selectedInFriendOrder);
      } else if (!assignment.shared && item.quantity > 0) {
        const unitBase = Math.floor(itemCents / item.quantity);
        const extraPennies = itemCents % item.quantity;
        let unitIndex = 0;

        friends.forEach((friend) => {
          const qty = assignment.quantities[friend.id] || 0;
          for (let i = 0; i < qty; i += 1) {
            const unitCents = unitBase + (unitIndex < extraPennies ? 1 : 0);
            resultCents[friend.id] = (resultCents[friend.id] || 0) + unitCents;
            unitIndex += 1;
          }
        });
      }
    });

    if (friends.length) distributeCents(Math.round(extras * 100), friends.map((friend) => friend.id));

    return Object.fromEntries(Object.entries(resultCents).map(([id, cents]) => [id, cents / 100]));
  }, [friends, receipt.items, assignments, extras]);

  const assignedAmount = round2(Object.values(totals).reduce((sum, value) => sum + value, 0));
  const expectedTotal = round2(itemSubtotal + extras);

  const unassigned = receipt.items.filter((item) => {
    const assignment = assignments[item.id];
    if (!assignment) return true;
    if (assignment.shared) return assignment.sharedWith.length === 0;
    const used = Object.values(assignment.quantities).reduce((sum, qty) => sum + qty, 0);
    return used < item.quantity;
  });

  const sendToSplitwise = async () => {
    if (!friends.length || !payerId || unassigned.length) return;
    setBusy(true);
    setMessage("Sending exact shares to Splitwise…");
    try {
      const response = await fetch("/api/splitwise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: `${receipt.merchant || "Grocery"} groceries`,
          payerName: friends.find((friend) => friend.id === payerId)?.name,
          total: expectedTotal,
          shares: friends.map((friend) => ({ name: friend.name, owed: totals[friend.id] || 0 })),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Splitwise failed.");
      setMessage("Added to Splitwise ✓");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not add to Splitwise.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="page-shell">


      <section className="hero">
        <div className="tabby-logo-wrap">
  <img
    src="/tabby.png"
    alt="Tabby"
    className="tabby-logo"
  />
  <p className="hassle-free">It's Hassle Free!</p>
</div>
        <div className="hero-stats">
          <div className="sticker-card"><strong>{uploads.length}</strong><span>images</span></div>
          <div className="sticker-card"><strong>{receipt.items.length}</strong><span>items</span></div>
          <div className="sticker-card"><strong>{friends.length}</strong><span>friends</span></div>
        </div>

        <div className="upload-actions">
          <label className="primary-button upload-button">
            Take photo
            <input type="file" accept="image/*" capture="environment" onChange={queueImages} disabled={busy} />
          </label>
          <label className="secondary-button upload-button">
             Add screenshots
            <input type="file" accept="image/*" multiple onChange={queueImages} disabled={busy} />
          </label>
          <button className="ghost-button" onClick={useDemo}>Try demo</button>
          <button className="ghost-button" onClick={clearAll}>
  Clear all
</button>
        </div>

        {!!uploads.length && (
          <div className="upload-board">
            <div className="upload-board-head">
              <div>
                <strong>{uploads.length} image{uploads.length > 1 ? "s" : ""} ready</strong>
                <span>Overlapping items will be counted once.</span>
              </div>
              <button onClick={clearUploads} disabled={busy}>Clear</button>
            </div>
            <div className="upload-strip">
              {uploads.map((upload, index) => (
                <div className="upload-thumb" key={upload.id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={upload.previewUrl} alt={`Receipt screenshot ${index + 1}`} />
                  <span>{index + 1}</span>
                  <button onClick={() => removeUpload(upload.id)} aria-label={`Remove image ${index + 1}`}>×</button>
                </div>
              ))}
              {uploads.length < 8 && (
                <label className="upload-more">
                  <span>＋</span>
                  <small>Add more</small>
                  <input type="file" accept="image/*" multiple onChange={queueImages} disabled={busy} />
                </label>
              )}
            </div>
            <button className="scan-batch-button" onClick={scanReceipt} disabled={busy}>
              {busy ? "Reading your cart…" : `✨ Scan ${uploads.length} image${uploads.length > 1 ? "s" : ""} together`}
            </button>
          </div>
        )}

        {message && <div className="status-bubble">{message}</div>}
      </section>

      <section className="workspace">
        <div className="section-heading">
          <div>
            <p className="step-kicker">01 · REVIEW</p>
            <h2>{receipt.merchant || "Your receipt"}</h2>
          </div>

        </div>
        <div className="manual-item-form">
  <input
    type="text"
    placeholder="Item name"
    value={manualItemName}
    onChange={(event) =>
      setManualItemName(capitalizeWords(event.target.value))
    }
  />

  <input
    type="number"
    min="1"
    placeholder="Qty"
    value={manualItemQuantity}
    onChange={(event) => setManualItemQuantity(event.target.value)}
  />

  <input
    type="number"
    min="0"
    step="0.01"
    placeholder="Price"
    value={manualItemPrice}
    onChange={(event) => setManualItemPrice(event.target.value)}
  />

  <button onClick={addItem}>＋ Add</button>
</div>

        <div className="receipt-card">
          {receipt.items.length === 0 ? (
            <div className="empty-state">
              <span>🧾</span>
              <strong>No receipt yet</strong>
              <p>Add one or more screenshots above, then scan them together.</p>
            </div>
          ) : (
            receipt.items.map((item) => (
              <div className="review-item" key={item.id}>
                <FoodIcon item={item} />
                <div className="item-main">
                  <input
  className="item-name"
  value={item.name}
  onChange={(event) =>
    updateItem(item.id, {
      name: capitalizeWords(event.target.value),
    })
  }
/>
                  <div className="item-meta">
                    {item.category || "Grocery"}
                    {item.confidence && item.confidence < 0.75 ? <span className="uncertain"> · check this</span> : null}
                  </div>
                </div>
                <label className="mini-field">
                  Qty
                  <input
  type="number"
  min="1"
  step="1"
  value={item.quantity || ""}
  onChange={(event) => {
    const value = event.target.value;

    updateItem(item.id, {
      quantity: value === "" ? 0 : Number(value),
    });
  }}
  onBlur={() => {
    if (!item.quantity || item.quantity < 1) {
      updateItem(item.id, { quantity: 1 });
    }
  }}
/>
                  </label>
                <label className="mini-field">
                  Price
                 <input
  type="number"
  min="0"
  step="0.01"
  value={item.totalPrice === 0 ? "" : item.totalPrice}
  onChange={(event) => {
    const value = event.target.value;

    updateItem(item.id, {
      totalPrice: value === "" ? 0 : Number(value),
    });
  }}
/> </label>
                <button className="trash-button" onClick={() => removeItem(item.id)} aria-label={`Delete ${item.name}`}>×</button>
              </div>
            ))
          )}
          {!!receipt.items.length && <div className="receipt-total-row"><span>Items subtotal</span><strong>{money(itemSubtotal)}</strong></div>}
        </div>

        <div className="section-heading friends-heading">
          <div>
            <p className="step-kicker">02 · FRIENDS</p>
            <h2>Who&apos;s in this cart?</h2>
          </div>
        </div>
        <div className="friends-panel">
          <div className="friend-input">
            <input
  placeholder="Friend’s name"
  value={newFriend}
  onChange={(event) =>
    setNewFriend(capitalizeWords(event.target.value))
  }
  onKeyDown={(event) => event.key === "Enter" && addFriend()}
/>
            <button onClick={addFriend}>Add</button>
          </div>
          <div className="friend-chips">
            {friends.map((friend) => (
              <button key={friend.id} className="friend-chip" onClick={() => setFriends((prev) => prev.filter((entry) => entry.id !== friend.id))}>
                <Avatar name={friend.name} />
                <span className="friend-chip-name">{friend.name}</span>
                <span className="friend-chip-close">×</span>
              </button>
            ))}
            {!friends.length && <span className="hint">Add everyone who participated. Extra charges are split equally across this group.</span>}
          </div>
          {!!friends.length && (
            <label className="payer-row">
              <span>Who paid?</span>
              <select value={payerId} onChange={(event) => setPayerId(event.target.value)}>
                {friends.map((friend) => (
                  <option key={friend.id} value={friend.id}>{friend.name}</option>
                ))}
              </select>
            </label>
          )}
        </div>

        {!!receipt.items.length && !!friends.length && (
          <>
            <div className="section-heading friends-heading">
              <div>
                <p className="step-kicker">03 · SPLIT</p>
                <h2>Who got what?</h2>
              </div>
              <span className="helper-text">Use quantities or mark an item shared.</span>
            </div>
            <div className="assignment-list">
              {receipt.items.map((item) => {
                const assignment = assignments[item.id] || { shared: false, sharedWith: [], quantities: {} };
                const assignedQty = Object.values(assignment.quantities).reduce((sum, qty) => sum + qty, 0);
                return (
                  <article className="assignment-card" key={item.id}>
                    <div className="assignment-title">
                      <div className="assignment-title-main">
                        <FoodIcon item={item} large />
                        <div>
                          <h3>{item.name}</h3>
                          <p>{item.quantity} unit{item.quantity !== 1 ? "s" : ""} · {money(item.totalPrice)}</p>
                        </div>
                      </div>
                      <button
                        className={assignment.shared ? "mode-button active" : "mode-button"}
                        onClick={() =>
                          setAssignments((prev) => ({
                            ...prev,
                            [item.id]: {
                              ...assignment,
                              shared: !assignment.shared,
                              sharedWith: !assignment.shared ? assignment.sharedWith : [],
                              quantities: !assignment.shared ? {} : assignment.quantities,
                            },
                          }))
                        }
                      >
                        {assignment.shared ? "Shared" : "Make shared"}
                      </button>
                    </div>
                    {assignment.shared ? (
                      <>
                        <div className="shared-actions">
                          <button onClick={() => splitEveryone(item.id)}>Share with everyone</button>
                          <span>{assignment.sharedWith.length ? `${money(item.totalPrice / assignment.sharedWith.length)} each` : "Select people"}</span>
                        </div>
                        <div className="share-grid">
                          {friends.map((friend) => (
                            <button key={friend.id} onClick={() => toggleShared(item.id, friend.id)} className={assignment.sharedWith.includes(friend.id) ? "person-toggle selected" : "person-toggle"}>
                              <div className="person-toggle-main">
                                <Avatar name={friend.name} />
                                <span>{friend.name}</span>
                              </div>
                              <span>{assignment.sharedWith.includes(friend.id) ? "✓" : "+"}</span>
                            </button>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="quantity-grid">
                          {friends.map((friend) => {
                            const qty = assignment.quantities[friend.id] || 0;
                            return (
                              <div className="quantity-person" key={friend.id}>
                                <div>
                                  <Avatar name={friend.name} />
                                  <strong>{friend.name}</strong>
                                </div>
                                <div className="counter">
                                  <button onClick={() => setQuantity(item, friend.id, -1)}>−</button>
                                  <span>{qty}</span>
                                  <button onClick={() => setQuantity(item, friend.id, 1)}>＋</button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className={assignedQty === item.quantity ? "assignment-progress complete" : "assignment-progress"}>
                          <span>{assignedQty} / {item.quantity} assigned</span>
                          <strong>{assignedQty === item.quantity ? "✓" : `${item.quantity - assignedQty} left`}</strong>
                        </div>
                      </>
                    )}
                  </article>
                );
              })}
            </div>
          </>
        )}

        {!!friends.length && (
          <>
            <div className="section-heading friends-heading">
              <div>
                <p className="step-kicker">04 · TOTALS</p>
                <h2>Final split</h2>
              </div>
            </div>
            <div className="summary-layout">
              <div className="fees-card">
                <h3>Shared equally</h3>
                {[
                  ["Tax", "tax"],
                  ["Delivery", "deliveryFee"],
                  ["Service fee", "serviceFee"],
                  ["Tip", "tip"],
                  ["Discount", "discount"],
                ].map(([label, key]) => (
                  <label key={key}>
                    <span>{label}</span>
                    <div>
                      $<input type="number" min="0" step="0.01" value={receipt[key as keyof ReceiptData] as number} onChange={(event) => setReceipt((prev) => ({ ...prev, [key]: Math.max(0, Number(event.target.value)) }))} />
                    </div>
                  </label>
                ))}
                <div className="fee-total"><span>Net shared extras</span><strong>{money(extras)}</strong></div>
              </div>
              <div className="final-card">
                {friends.map((friend) => (
                  <div className="total-person" key={friend.id}>
                    <div>
                      <Avatar name={friend.name} large />
                      <span>
                        <strong>{friend.name}</strong>
                        {friend.id === payerId && <small>Paid the bill</small>}
                      </span>
                    </div>
                    <strong>{money(totals[friend.id] || 0)}</strong>
                  </div>
                ))}
                <div className="grand-total"><span>Assigned total</span><strong>{money(assignedAmount)}</strong></div>
                <div className="match-note"><span>Receipt math</span><strong>{money(expectedTotal)}</strong></div>
                {unassigned.length ? <p className="warning">Assign all items before sending to Splitwise. {unassigned.length} item{unassigned.length > 1 ? "s are" : " is"} incomplete.</p> : null}
                {/* <button className="splitwise-button" disabled={busy || !!unassigned.length} onClick={sendToSplitwise}>S ↗ Add exact split to Splitwise</button> */}
              </div>
            </div>
          </>
        )}
      </section>

      <footer>Made for carts where “I only got two tomatoes” matters. 🍅</footer>
    </main>
  );
}
