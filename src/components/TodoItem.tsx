"use client";

import { useState } from "react";
import { Todo } from "@/types/todo";

type Props = {
  todo: Todo;
  onToggle: (id: number) => Promise<void>;
  onUpdate: (id: number, title: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleSave = async () => {
    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== todo.title) {
      await onUpdate(todo.id, trimmed);
    }
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditTitle(todo.title);
      setEditing(false);
    }
  };

  return (
    <li className="flex items-center gap-3 p-3 bg-white rounded shadow-sm border">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-5 w-5 accent-blue-500"
      />
      {editing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 border-b-2 border-blue-400 outline-none px-1 py-0.5"
        />
      ) : (
        <span
          onDoubleClick={() => setEditing(true)}
          className={`flex-1 cursor-pointer ${
            todo.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {todo.title}
        </span>
      )}
      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-400 hover:text-red-600 text-sm"
        aria-label="Delete todo"
      >
        Delete
      </button>
    </li>
  );
}
