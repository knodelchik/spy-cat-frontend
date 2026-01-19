'use client';

import { useEffect } from 'react';
import Header from '../src/components/Header';
import CatCard from '../src/components/CatCard';
import CatForm from '../src/components/CatForm';
import Toast from '../src/components/Toast';
import { useCats } from '../src/hooks/useCats'; // Імпортуємо наш хук
export default function Home() {
  const { cats, loading, fetchCats, addCat, deleteCat, updateSalary, toast, closeToast } = useCats();

  useEffect(() => {
    fetchCats();
  }, [fetchCats]);

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans pb-20 text-zinc-900">
      <Header />
      
      <main className="container mx-auto px-6 py-12 max-w-5xl">
        
        <CatForm onAdd={addCat} />

        <div className="mb-8 flex items-end justify-between border-b border-zinc-200 pb-4">
          <h2 className="text-xl font-bold tracking-tight">Active Agents</h2>
          <span className="text-sm text-zinc-400 font-medium">
            {cats.length} records found
          </span>
        </div>

        {loading && cats.length === 0 && (
          <div className="text-center py-20 text-zinc-400 animate-pulse text-sm">Synchronizing with HQ...</div>
        )}

        {!loading && cats.length === 0 && (
           <div className="text-center py-20">
              <p className="text-zinc-400 text-sm">Database is empty.</p>
           </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cats.map((cat) => (
            <CatCard
              key={cat.id}
              cat={cat}
              onDelete={deleteCat}
              onUpdateSalary={updateSalary}
            />
          ))}
        </div>
      </main>

      {toast && (
        <Toast message={toast.msg} type={toast.type} onClose={closeToast} />
      )}
    </div>
  );
}