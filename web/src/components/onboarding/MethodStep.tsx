'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calculator, ArrowRight, Check } from 'lucide-react';

interface MethodStepProps {
  customGoal: string;
  onCustomGoalChange: (value: string) => void;
  onSelectCustom: () => void;
  onSelectCalculator: () => void;
}

export default function MethodStep({
  customGoal,
  onCustomGoalChange,
  onSelectCustom,
  onSelectCalculator,
}: MethodStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mx-auto max-w-4xl"
    >
      <div className="mb-12 text-center">
        <h2 className="mb-4 font-serif text-3xl text-[#243B53] md:text-4xl">
          Choose Your Setup Method
        </h2>
        <p className="text-lg text-[#2D3142]/80">
          Select how you would like to determine your vault's target goal.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* OPTION A: CUSTOM GOAL */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#243B53]/10 bg-white p-6 shadow-sm md:p-8">
          <div className="space-y-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#84A98C]/10 text-[#84A98C]">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#243B53] mb-2">
                Option A: Set My Own Savings Goal
              </h3>
              <p className="text-sm leading-relaxed text-[#2D3142]/70">
                I already know how much I want to save for my final expenses.
              </p>
            </div>

            {/* Input Container */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-medium text-[#243B53]/50">₱</span>
              <input
                type="text"
                placeholder="12,345"
                value={customGoal}
                onChange={(e) => onCustomGoalChange(e.target.value)}
                className="h-14 w-full rounded-xl border border-[#243B53]/10 bg-[#FAF7F2] pl-9 pr-4 font-medium text-[#243B53] outline-none transition focus:border-[#84A98C]"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={onSelectCustom}
            disabled={!customGoal.trim()}
            className={`mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-xl font-semibold text-sm transition-all ${
              customGoal.trim()
                ? 'bg-[#243B53] text-white hover:bg-[#1C2F42] shadow-sm cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Skip to Digital Identity
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* OPTION B: CALCULATOR (FIXED HEIGHT & ALIGNED) */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#243B53]/10 bg-white p-6 shadow-sm md:p-8">
          <div className="space-y-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E9C46A]/10 text-[#E9C46A]">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#243B53] mb-2">
                Option B: Use the Funeral Cost Estimator
              </h3>
              <p className="text-sm leading-relaxed text-[#2D3142]/70">
                Don't know how much it costs? Estimate your final expenses based on real local provider data.
              </p>
            </div>

            {/* Fill Container to perfectly match Option A's input box height and layout */}
            <div className="flex h-14 w-full items-center gap-2 rounded-xl border border-dashed border-[#243B53]/10 bg-[#FAF7F2]/30 px-4">
              <Check className="h-4 w-4 text-[#84A98C] shrink-0" />
              <p className="text-xs font-medium text-[#243B53]/70">
                Select curated budget tiers based on Philippine averages.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onSelectCalculator}
            className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#E9C46A] font-semibold text-sm text-[#243B53] shadow-sm transition-colors hover:bg-[#dfba5f]"
          >
            See Estimation
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}