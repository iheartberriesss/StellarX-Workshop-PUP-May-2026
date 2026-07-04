'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TierOption, PreferencesState } from '@/lib/types';
import { tierOptions } from '@/lib/constants';

interface DetailsStepProps {
  preferences: PreferencesState;
  selectedTier: TierOption | null;
  onPreferenceChange: (key: keyof PreferencesState, value: string) => void;
  onTierSelect: (tier: TierOption) => void;
  onContinue: () => void;
}

export default function DetailsStep({
  selectedTier,
  onTierSelect,
  onContinue,
}: DetailsStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mx-auto max-w-3xl"
    >
      <div className="mb-10 text-center">
        <h2 className="mb-4 font-serif text-3xl text-[#243B53] md:text-4xl">
          Select Service Target Budget
        </h2>
        <p className="text-lg text-[#2D3142]/80">
          Choose a pre-calculated coverage bracket that matches your long-term goal requirements.
        </p>
      </div>

      <div className="space-y-8">
        {/* Tier Selection */}
        <div className="rounded-2xl bg-[#243B53] p-6 text-white shadow-lg md:p-8">
          <h3 className="mb-2 font-serif text-2xl text-[#E9C46A] flex items-center gap-1">
            What is your budget? <span className="text-red-500 text-xl font-sans">*</span>
          </h3>
          <p className="mb-6 text-sm text-white/70">
            Choose a target goal tier for your smart contract to secure.
          </p>

          <div className="space-y-4">
            {tierOptions.map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => onTierSelect(tier)}
                className={`w-full rounded-xl border p-5 text-left transition-all ${selectedTier?.id === tier.id ? 'border-[#E9C46A] bg-white/10 shadow-[0_0_15px_rgba(233,196,106,0.2)]' : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'}`}
              >
                <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div className="font-serif text-lg text-white">{tier.name}</div>
                  <div className="inline-block w-fit rounded-full bg-[#E9C46A]/10 px-3 py-1 text-sm font-medium text-[#E9C46A]">
                    {tier.price}
                  </div>
                </div>
                <div className="text-sm leading-relaxed text-white/60">{tier.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end border-t border-[#243B53]/10 pt-6">
          <button
            type="button"
            onClick={onContinue}
            disabled={!selectedTier}
            className="flex items-center gap-2 rounded-xl bg-[#E9C46A] px-8 py-4 font-semibold text-[#243B53] shadow-sm transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue to Digital Identity <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}