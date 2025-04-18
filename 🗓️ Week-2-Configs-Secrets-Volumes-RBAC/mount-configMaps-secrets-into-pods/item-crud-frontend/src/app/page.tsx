'use client'; // required for using hooks

import React, { useEffect, useState } from 'react';
import ItemForm from '@/components/ItemForm';
import ItemList from '@/components/ItemList';
import { Item } from '@/types/item';

// const API_URL = 'http://localhost:3001/items';
// const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/items';

const API_URL =
  typeof window !== 'undefined'
    ? 'http://localhost:3001/items' // when in browser
    : process.env.NEXT_PUBLIC_API_URL ?? 'http://item-backend-service:3001/items';

export default function Page() {
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setItems(data);
  };

  const createItem = async (name: string) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const newItem = await res.json();
    setItems([...items, newItem]);
  };

  const deleteItem = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    setItems(items.filter((item) => item.id !== id));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Item CRUD App</h1>
      <ItemForm onCreate={createItem} />
      <ItemList items={items} onDelete={deleteItem} />
    </main>
  );
}
