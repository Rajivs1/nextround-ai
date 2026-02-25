import { useEffect } from 'react';

export default function SubmissionModal({ isOpen, onClose, type, title, message, details }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="w-16 h-16 mx-auto mb-4 bg-yellow-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      case 'info':
        return (
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          border: 'border-green-500/30',
          button: 'bg-green-500 hover:bg-green-600',
          text: 'text-green-400'
        };
      case 'error':
        return {
          border: 'border-red-500/30',
          button: 'bg-red-500 hover:bg-red-600',
          text: 'text-red-400'
        };
      case 'warning':
        return {
          border: 'border-yellow-500/30',
          button: 'bg-yellow-500 hover:bg-yellow-600',
          text: 'text-yellow-400'
        };
      case 'info':
        return {
          border: 'border-blue-500/30',
          button: 'bg-blue-500 hover:bg-blue-600',
          text: 'text-blue-400'
        };
      default:
        return {
          border: 'border-gray-500/30',
          button: 'bg-gray-500 hover:bg-gray-600',
          text: 'text-gray-400'
        };
    }
  };

  const colors = getColors();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className={`bg-black rounded-2xl border ${colors.border} shadow-2xl max-w-md w-full transform transition-all animate-scaleIn`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {getIcon()}
          
          <h2 className={`text-2xl font-bold text-center mb-3 ${colors.text}`}>
            {title}
          </h2>
          
          <p className="text-gray-300 text-center mb-4 leading-relaxed">
            {message}
          </p>

          {details && (
            <div className="bg-black/50 rounded-lg p-4 mb-4 border border-gray-700">
              <div className="space-y-2 text-sm">
                {details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className={`mt-0.5 ${colors.text}`}>•</span>
                    <span className="text-gray-400">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            className={`w-full py-3 ${colors.button} text-white font-semibold rounded-xl transition-all transform hover:scale-105 active:scale-95`}
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}




