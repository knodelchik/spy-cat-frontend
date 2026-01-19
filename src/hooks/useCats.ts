import { useState, useCallback } from 'react';
import { Cat, CatFormData } from '../types';

const API_URL = 'http://127.0.0.1:8000/cats/';

export function useCats() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Для сповіщень
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
  };

  const closeToast = () => setToast(null);

  const fetchCats = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch cats');
      const data = await res.json();
      setCats(data);
    } catch (err) {
      console.error(err);
      showToast('Server connection failed', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  const addCat = async (data: CatFormData) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        // Якщо помилка валідації породи
        if (errorData.breed) throw new Error(`Breed Error: ${errorData.breed[0]}`);
        throw new Error('Failed to create cat');
      }

      await fetchCats();
      showToast('Agent recruited successfully!', 'success');
      return true; // Повертаємо true, якщо успіх
    } catch (err: any) {
      showToast(err.message, 'error');
      return false;
    }
  };

  const deleteCat = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}${id}/`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      
      setCats((prev) => prev.filter((cat) => cat.id !== id));
      showToast('Agent removed from database', 'success');
    } catch (err) {
      showToast('Could not delete agent', 'error');
    }
  };

  const updateSalary = async (id: number, newSalary: number) => {
    try {
      const res = await fetch(`${API_URL}${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ salary: newSalary }),
      });
      if (!res.ok) throw new Error('Failed to update');
      
      await fetchCats();
      showToast('Salary updated', 'success');
    } catch (err) {
      showToast('Update failed', 'error');
    }
  };

  return { 
    cats, 
    loading, 
    fetchCats, 
    addCat, 
    deleteCat, 
    updateSalary,
    toast,
    closeToast
  };
}