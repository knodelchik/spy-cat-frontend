import { useState } from 'react';
import { CatFormData } from '../types';

interface CatFormProps {
  onAdd: (data: CatFormData) => Promise<boolean>;
}

export default function CatForm({ onAdd }: CatFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    years_of_experience: '' as number | '',
    salary: '' as number | '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- НОВА ФУНКЦІЯ ВАЛІДАЦІЇ ---
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Дозволяємо тільки літери та пробіли (Regex: ^[a-zA-Z\s]*$)
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setFormData({ ...formData, name: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const success = await onAdd({
      name: formData.name,
      breed: formData.breed,
      years_of_experience: Number(formData.years_of_experience),
      salary: Number(formData.salary),
    });

    setIsSubmitting(false);
    if (success) {
      setFormData({ name: '', breed: '', years_of_experience: '', salary: '' });
    }
  };

  const inputClass = "w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200";
  const labelClass = "block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2";

  return (
    <div className="mb-12">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-zinc-100">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6 tracking-tight">Recruit New Agent</h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          
          <div>
            <label className={labelClass}>Code Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Bond (No numbers allowed)"
              className={inputClass}
              value={formData.name}
              onChange={handleNameChange} // Використовуємо нову функцію
            />
          </div>
          
          <div>
            <label className={labelClass}>Breed</label>
            <input
              type="text"
              required
              placeholder="e.g. Siamese"
              className={inputClass}
              value={formData.breed}
              onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
            />
            <p className="mt-2 text-xs text-zinc-500">
              ⚠️ Validation via <a href="https://thecatapi.com/breeds" target="_blank" className="underline hover:text-black">TheCatAPI</a>
            </p>
          </div>

          <div>
            <label className={labelClass}>Experience (Years)</label>
            <input
              type="number"
              required
              min="0"
              className={inputClass}
              value={formData.years_of_experience}
              onChange={(e) => setFormData({ 
                ...formData, 
                years_of_experience: e.target.value === '' ? '' : Number(e.target.value) 
              })}
            />
          </div>

          <div>
            <label className={labelClass}>Salary ($)</label>
            <input
              type="number"
              required
              min="0"
              className={inputClass}
              value={formData.salary}
              onChange={(e) => setFormData({ 
                ...formData, 
                salary: e.target.value === '' ? '' : Number(e.target.value) 
              })}
            />
          </div>

          <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-4 rounded-lg font-medium text-sm hover:bg-zinc-800 active:scale-[0.99] transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Confirm Recruitment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}