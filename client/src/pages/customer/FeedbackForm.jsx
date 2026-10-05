import React, { useState } from 'react';
import { Star, CheckCircle } from 'lucide-react';

export default function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 max-w-md mx-auto">
        <CheckCircle size={64} className="text-green-500 mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
        <p className="text-gray-600 text-center">Your feedback helps us improve our service.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-6 max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center mt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Rate your experience</h2>
        <p className="text-gray-500 mb-8">How was your food at Paradise Biryani?</p>

        <div className="flex justify-center gap-2 mb-8">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <button
                type="button"
                key={starValue}
                className={`text-4xl transition-colors ${starValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-200'}`}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(rating)}
              >
                <Star className="fill-current" size={40} />
              </button>
            );
          })}
        </div>

        <textarea 
          placeholder="Tell us what you loved or what we can improve..."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm mb-6 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all min-h-[120px]"
        ></textarea>

        <button 
          onClick={() => setSubmitted(true)}
          disabled={!rating}
          className="w-full bg-orange-600 disabled:bg-gray-300 text-white py-4 rounded-xl font-bold text-lg transition-colors"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}
