import React from 'react';

interface ToastContainerProps {
  toasts: string[];
}

export default function ToastContainer({ toasts }: ToastContainerProps) {
  return (
    <div
      aria-live="assertive"
      className="fixed bottom-6 right-6 flex flex-col gap-2 max-w-xs z-50"
    >
      {toasts.map((toast, idx) => (
        <div
          key={idx}
          className="bg-purple-600 text-white px-4 py-2 rounded shadow-lg animate-fadeIn"
          role="alert"
        >
          {toast}
        </div>
      ))}
      <style jsx>{`
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(10px);}
          to {opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
}
