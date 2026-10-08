import React, { useState } from 'react';
import { Check, X, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { PRICING_PLANS } from '../data/gymData';

interface MembershipProps {
  onSelectPlan: (planId: string) => void;
}

export const Membership: React.FC<MembershipProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section id="membership" className="py-16 sm:py-24 md:py-32 bg-dark-950 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[340px] sm:w-[500px] md:w-[700px] h-[300px] sm:h-[350px] bg-gold-400/5 blur-[120px] sm:blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300">
              TRANSPARENT MEMBERSHIP
            </span>
          </div>

          <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[1.12] mb-3 sm:mb-4">
            CHOOSE YOUR LEVEL.
          </h2>

          <p className="text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed px-2">
            No initiation fees. No hidden maintenance charges. Cancel or pause anytime with 14 days notice.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-6 sm:mt-8 inline-flex items-center bg-dark-900 border border-white/10 rounded-full p-1 sm:p-1.5 shadow-xl max-w-full">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3.5 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all min-h-[40px] ${
                billingCycle === 'monthly'
                  ? 'bg-gold-400 text-dark-950 shadow-gold-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Billed Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-3.5 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 min-h-[40px] ${
                billingCycle === 'annual'
                  ? 'bg-gold-400 text-dark-950 shadow-gold-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Billed Annually</span>
              <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* 1 col on mobile, 3 cols on desktop (lg). On tablet, max-w-2xl centered or 3 cols */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-8 items-stretch max-w-lg lg:max-w-none mx-auto">
          {PRICING_PLANS.map((plan) => {
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                  plan.isPopular
                    ? 'bg-dark-900/98 border-2 border-gold-400 shadow-2xl shadow-gold-400/10 lg:-translate-y-3 mt-4 lg:mt-0'
                    : 'bg-dark-900/80 border border-white/10 hover:border-white/25 shadow-xl'
                } p-5 sm:p-7 md:p-8 lg:p-9`}
              >
                {/* Popular Highlight Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 text-dark-950 text-[10px] sm:text-[11px] font-display font-extrabold uppercase tracking-[0.2em] px-3.5 sm:px-4 py-1.5 rounded-full shadow-gold-sm flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3.5 h-3.5 fill-dark-950 flex-shrink-0" />
                    <span>RECOMMENDED TIER</span>
                  </div>
                )}

                <div>
                  {/* Tier Title & Description */}
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-wide">
                      {plan.name}
                    </h3>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                      Tier 0{plan.id === 'basic' ? '1' : plan.id === 'pro' ? '2' : '3'}
                    </span>
                  </div>

                  <p className="text-zinc-400 text-xs sm:text-sm min-h-[36px] mb-5 sm:mb-6 leading-relaxed">
                    {plan.tagline}
                  </p>

                  {/* Price Block */}
                  <div className="pb-5 sm:pb-6 mb-5 sm:mb-6 border-b border-white/10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-zinc-400 text-base sm:text-lg font-bold">₹</span>
                      <span className="font-display font-extrabold text-3xl xs:text-4xl sm:text-4xl md:text-5xl text-white tracking-tight">
                        {price.toLocaleString()}
                      </span>
                      <span className="text-zinc-400 text-xs sm:text-sm font-medium">/ month</span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-zinc-400 mt-1 font-mono">
                      {billingCycle === 'annual' ? 'Billed annually (₹' + (price * 12).toLocaleString() + '/yr)' : 'Flexible month-to-month billing'}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-6 sm:mb-8">
                    <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      Included Privileges:
                    </p>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 sm:gap-3">
                        {feature.included ? (
                          <div className="w-4 h-4 rounded-full bg-gold-400/10 border border-gold-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-gold-400" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <X className="w-3 h-3 text-zinc-600" />
                          </div>
                        )}
                        <span
                          className={`text-xs leading-relaxed ${
                            feature.included ? 'text-zinc-200' : 'text-zinc-600 line-through'
                          }`}
                        >
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Action Button */}
                <div className="pt-2">
                  <button
                    onClick={() => onSelectPlan(plan.id)}
                    className={`w-full min-h-[48px] py-3.5 rounded-xl font-display font-extrabold text-xs uppercase tracking-[0.18em] transition-all duration-200 flex items-center justify-center gap-2 active:scale-98 ${
                      plan.isPopular
                        ? 'bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 text-dark-950 shadow-gold-sm hover:opacity-95'
                        : 'bg-white/10 hover:bg-gold-400 hover:text-dark-950 text-white border border-white/15 hover:border-gold-400'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="mt-3.5 flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-zinc-400 text-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                    <span>Includes 7-Day Money-Back Guarantee</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
