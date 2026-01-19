import { useEffect } from 'react';

type ToastType = 'success' | 'error';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
      <div className="bg-black text-white text-sm px-6 py-3 rounded-lg shadow-xl flex items-center gap-3">
        <span>{type === 'success' ? '✨' : '❌'}</span>
        <span>{message}</span>
      </div>
    </div>
  );
}