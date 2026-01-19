import { useState } from 'react';
import { Cat } from '../types';

interface CatCardProps {
  cat: Cat;
  onDelete: (id: number) => void;
  onUpdateSalary: (id: number, newSalary: number) => Promise<void>;
}

export default function CatCard({ cat, onDelete, onUpdateSalary }: CatCardProps) {
  // Стан для режиму редагування
  const [isEditing, setIsEditing] = useState(false);
  const [tempSalary, setTempSalary] = useState(cat.salary);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await onUpdateSalary(cat.id, tempSalary);
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempSalary(cat.salary); // Повернути старе значення
    setIsEditing(false);
  };

  return (
    <div className="group bg-white rounded-xl border border-zinc-100 p-6 hover:shadow-lg hover:border-zinc-200 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-zinc-900">{cat.name}</h3>
          <p className="text-sm text-zinc-500">{cat.breed}</p>
        </div>
        <div className="bg-zinc-100 text-zinc-600 text-xs font-bold px-2 py-1 rounded">
          LVL {cat.years_of_experience}
        </div>
      </div>
      
      <div className="mb-6 h-16 flex flex-col justify-center">
        {isEditing ? (
          // --- РЕЖИМ РЕДАГУВАННЯ ---
          <div className="flex items-center gap-2 animate-fade-in">
            <span className="text-zinc-400 text-xl">$</span>
            <input 
              type="number" 
              value={tempSalary}
              onChange={(e) => setTempSalary(Number(e.target.value))}
              className="w-full bg-zinc-50 border border-zinc-300 rounded px-2 py-1 text-lg font-medium outline-none focus:ring-2 focus:ring-black"
              autoFocus
            />
          </div>
        ) : (
          // --- РЕЖИМ ПЕРЕГЛЯДУ ---
          <>
            <p className="text-2xl font-light text-zinc-900 tracking-tight">
              ${cat.salary.toLocaleString()}
            </p>
            <p className="text-xs text-zinc-400 mt-1 uppercase">Annual Salary</p>
          </>
        )}
      </div>

      <div className="flex gap-3 border-t border-zinc-100 pt-4">
        {isEditing ? (
          // Кнопки Save / Cancel
          <>
            <button 
              onClick={handleSave} 
              disabled={isSaving}
              className="flex-1 bg-black text-white text-xs py-2 rounded hover:bg-zinc-800 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button 
              onClick={handleCancel} 
              className="flex-1 bg-zinc-100 text-zinc-600 text-xs py-2 rounded hover:bg-zinc-200"
            >
              Cancel
            </button>
          </>
        ) : (
          // Кнопки Edit / Delete
          <div className="flex gap-4 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs font-semibold text-zinc-600 hover:text-black transition-colors"
            >
              Edit Salary
            </button>
            <button
              onClick={() => onDelete(cat.id)}
              className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}