"use client";

import { Trash2 } from "lucide-react";

export function DeleteUserButton() {
  return (
    <button 
      type="submit" 
      className="p-2 rounded-lg text-danger-500 hover:text-white hover:bg-danger-500 border border-transparent hover:border-danger-600 transition-all flex items-center gap-2 text-xs font-bold"
      onClick={(e) => {
        if (!window.confirm("Are you sure you want to permanently delete this user? This action cannot be undone.")) {
          e.preventDefault();
        }
      }}
    >
      <Trash2 className="w-4 h-4" /> Delete User
    </button>
  );
}
