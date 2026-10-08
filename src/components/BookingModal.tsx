import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Sparkles, CreditCard, Dumbbell } from 'lucide-react';
import { PRICING_PLANS } from '../data/gymData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialPlan = 'pro',
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState(initialPlan);
  const [prevInitialPlan, setPrevInitialPlan] = useState(initialPlan);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [memberId, setMemberId] = useState('IF-2026-8492');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    startDate: '2026-10-15',
  });

  // Adjust state during render when props change (standard React recommended pattern)
  if (initialPlan !== prevInitialPlan) {
    setPrevInitialPlan(initialPlan);
    setSelectedPlanId(initialPlan);
  }

  if (!isOpen) return null;

  const currentPlan = PRICING_PLANS.find((p) => p.id === selectedPlanId) || PRICING_PLANS[1];
  const price = billingCycle === 'monthly' ? currentPlan.monthlyPrice : currentPlan.annualPrice;

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    setMemberId(`IF-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark-950/90 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-dark-900 border border-gold-400/30 rounded-2xl shadow-2xl shadow-black/90 p-4 sm:p-7 md:p-8 z-10 my-4 sm:my-8">
        {/* Decorative gold hairline */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300">
                MEMBERSHIP INITIATION
              </span>
            </div>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight mb-6">
              SECURE YOUR IRONFORGE ACCESS
            </h3>

            {/* Plan Selector Pills */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 mb-5 sm:mb-6">
              {PRICING_PLANS.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`p-2 sm:p-3 rounded-xl border text-left transition-all ${
                    selectedPlanId === plan.id
                      ? 'bg-gold-400/15 border-gold-400 shadow-gold-sm'
                      : 'bg-dark-950 border-white/10 hover:border-white/20'
                  }`}
                >
                  <p className="font-display font-bold text-[11px] sm:text-xs uppercase text-white mb-0.5 truncate">
                    {plan.name}
                  </p>
                  <p className="text-[10px] sm:text-[11px] font-mono text-gold-300 truncate">
                    ₹{(billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice).toLocaleString()}/mo
                  </p>
                </button>
              ))}
            </div>

            {/* Billing Cycle Toggle in modal */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-dark-950 border border-white/10 mb-6 text-xs">
              <span className="text-zinc-300 font-medium">Billing Period:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold ${
                    billingCycle === 'monthly' ? 'bg-white/20 text-white' : 'text-zinc-400'
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold ${
                    billingCycle === 'annual' ? 'bg-gold-400 text-dark-950 font-bold' : 'text-zinc-400'
                  }`}
                >
                  Annual (Save 20%)
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleComplete} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Vikram Singhania"
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-white/10 focus:border-gold-400 focus:outline-none text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-white/10 focus:border-gold-400 focus:outline-none text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-white/10 focus:border-gold-400 focus:outline-none text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Requested Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-white/10 focus:border-gold-400 focus:outline-none text-sm text-white"
                />
              </div>

              {/* Order Summary Strip */}
              <div className="p-4 rounded-xl bg-dark-950 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-xs text-white font-bold uppercase">{currentPlan.name} Membership</p>
                  <p className="text-[11px] text-zinc-400">Zero joining fee • 7-day cancellation refund</p>
                </div>
                <div className="text-right">
                  <p className="font-display font-extrabold text-xl text-gold-300">
                    ₹{price.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-zinc-400 font-mono">Billed {billingCycle}</p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 text-dark-950 font-display font-extrabold text-xs uppercase tracking-[0.2em] shadow-gold-sm hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <CreditCard className="w-4 h-4" />
                <span>CONFIRM & GENERATE MEMBER PASS</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>Encrypted registration. Payment collected at club check-in or via secure link.</span>
              </div>
            </form>
          </div>
        ) : (
          /* Success Member Pass View */
          <div className="py-6 flex flex-col items-center text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-gold-400/15 border-2 border-gold-400 flex items-center justify-center text-gold-400 shadow-gold-glow">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-display font-extrabold text-2xl text-white uppercase tracking-tight">
                WELCOME TO THE FORGE
              </h3>
              <p className="text-xs text-gold-300 uppercase tracking-widest mt-1 font-mono">
                MEMBERSHIP PASS ACTIVATED
              </p>
            </div>

            {/* Luxury Member Digital Card Preview */}
            <div className="w-full max-w-md rounded-2xl bg-gradient-to-br from-zinc-800 via-dark-950 to-dark-950 p-6 border border-gold-400/40 shadow-2xl relative text-left overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-full blur-2xl" />
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-5 h-5 text-gold-400" />
                  <span className="font-display font-extrabold tracking-widest text-sm text-white">
                    IRONFORGE
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-gold-400 text-dark-950 text-[10px] font-extrabold uppercase tracking-wider font-mono">
                  {currentPlan.name} VIP
                </span>
              </div>

              <div className="space-y-1 mb-6">
                <p className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">ATHLETE NAME</p>
                <p className="font-display font-bold text-lg text-white">{formData.name || 'Athletic Member'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-4 border-t border-white/10">
                <div>
                  <span className="text-[9px] text-zinc-400 block uppercase">START DATE</span>
                  <span className="text-zinc-200">{formData.startDate}</span>
                </div>
                <div>
                  <span className="text-[9px] text-zinc-400 block uppercase">MEMBER ID</span>
                  <span className="text-gold-300">{memberId}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-zinc-400 max-w-md">
              A copy of your digital credential and confirmation instructions have been sent to <span className="text-white font-mono">{formData.email}</span>. Please present this card at concierge upon arrival.
            </p>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl bg-white/10 hover:bg-gold-400 hover:text-dark-950 text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              CLOSE WINDOW
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
