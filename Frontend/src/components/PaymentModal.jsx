import React, { useState } from 'react';
import { useUIStore } from '../store/UIStore';

const PaymentModal = ({ isOpen, onClose, billAmount, billType }) => {
  const showToast = useUIStore((state) => state.showToast);
  const [loading, setLoading] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate Payment Gateway Delay
    setTimeout(() => {
      setLoading(false);
      showToast(`${billType} Payment of ${billAmount} Successful!`, 'success');
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-blue-900 p-6 text-white text-left">
          <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">Secure Checkout</p>
          <h2 className="text-2xl font-bold mt-1">Pay {billType}</h2>
          <div className="mt-4 bg-blue-800/50 p-3 rounded-xl flex justify-between items-center">
            <span className="text-sm font-medium">Total Amount</span>
            <span className="text-xl font-black">{billAmount}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <form onSubmit={handlePayment} className="p-6 space-y-4 text-left">
          <label className="block text-sm font-bold text-slate-700 mb-2">Select Payment Method</label>
          
          <div className="space-y-3">
            {['UPI (Google Pay, PhonePe)', 'Credit / Debit Card', 'Net Banking'].map((method) => (
              <label key={method} className="flex items-center gap-3 p-4 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition">
                <input type="radio" name="payment" required className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-slate-700">{method}</span>
              </label>
            ))}
          </div>

          <div className="pt-4 space-y-3">
            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : `Pay Now`}
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="w-full py-2 text-sm font-bold text-slate-400 hover:text-slate-600"
            >
              Cancel Transaction
            </button>
          </div>
        </form>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-center gap-4">
          <span className="text-[10px] font-bold text-slate-400">🔒 SSL SECURED</span>
          <span className="text-[10px] font-bold text-slate-400">🛡️ GOVT ENCRYPTED</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;