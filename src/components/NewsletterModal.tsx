import React, { useState } from 'react';
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    if (!consent) {
      setErrorMessage('Please accept the privacy policy');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setEmail('');
      setConsent(false);
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 2000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full md:max-w-md transform scale-100 opacity-100 transition-all h-full md:h-auto">
        <div className="bg-white md:rounded-2xl shadow-xl h-full md:h-auto" style={{
          background: 'url(https://sshrqjjozepszwesrtio.supabase.co/storage/v1/object/sign/artwork/light%20and%20dark.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnR3b3JrL2xpZ2h0IGFuZCBkYXJrLmpwZyIsImlhdCI6MTc0MTgyMDcwNywiZXhwIjoyMDU3MTgwNzA3fQ.hAIBiCp3EnINIizRzUt21hsZQcDDYnG5UcBKXcqlzI4) center/cover no-repeat',
          backgroundColor: 'rgba(147, 51, 234, 0.95)',
          backgroundBlendMode: 'overlay'
        }}>
          <div className="relative p-6">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-3xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-2">
                Join Our Creative Universe
              </h3>
              <p className="text-gray-600 text-lg md:text-base">
                Subscribe to receive weekly art inspirations, exclusive offers, and behind-the-scenes peeks into our creative process.
              </p>
            </div>

            {status === 'success' ? (
              <div className="text-center py-6">
                <CheckCircle className="w-20 h-20 md:w-16 md:h-16 text-green-500 mx-auto mb-6 md:mb-4" />
                <h4 className="text-2xl md:text-xl font-semibold text-gray-900 mb-4 md:mb-2">
                  Welcome Aboard!
                </h4>
                <p className="text-gray-600 text-lg md:text-base">
                  Get ready for a journey through art and imagination.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-4 md:py-3 text-lg md:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    disabled={status === 'loading'}
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="consent" className="text-sm text-gray-600">
                    I agree to receive marketing emails and accept the{' '}
                    <a href="/privacy" className="text-purple-600 hover:text-purple-700 underline">
                      privacy policy
                    </a>
                  </label>
                </div>

                {errorMessage && (
                  <div className="flex items-center space-x-2 text-red-600 text-sm">
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full px-6 py-4 md:py-3 text-lg md:text-base bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Subscribe Now</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}