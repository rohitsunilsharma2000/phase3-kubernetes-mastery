'use client';

import { useState } from 'react';

interface Props {
  onCreate: (name: string) => void;
}

export default function ItemForm({ onCreate }: Props) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreate(name);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 my-4">
      <input
        type="text"
        value={name}
        placeholder="Enter item name"
        onChange={(e) => setName(e.target.value)}
        className="border px-4 py-2 rounded w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
}
