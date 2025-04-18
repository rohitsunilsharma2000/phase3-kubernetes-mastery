'use client';

import { Item } from '@/types/item';

interface Props {
  items: Item[];
  onDelete: (id: number) => void;
}

export default function ItemList({ items, onDelete }: Props) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
          <span>{item.name}</span>
          <button
            onClick={() => onDelete(item.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
