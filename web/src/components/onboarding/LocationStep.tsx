'use client';

import { motion } from 'framer-motion';
import { Fingerprint } from 'lucide-react';

interface LocationStepProps {
  location: string;
  onLocationChange: (value: string) => void;
  onContinue: () => void;
}

export default function LocationStep({
  location,
  onLocationChange,
  onContinue,
}: LocationStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mx-auto max-w-2xl"
    >
      <div className="mb-10 text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#84A98C]">
          Step 1 of 3
        </p>
        <h2 className="mb-4 font-serif text-3xl text-[#243B53] md:text-4xl">
          Digital Identity
        </h2>
        <p className="text-lg text-[#2D3142]/80">
          Set the verified identity that will own this vault.
        </p>
      </div>

      <div className="rounded-2xl border border-[#243B53]/5 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-[#243B53]">
            Legal Name or Digital ID
          </label>
          <div className="relative">
            <Fingerprint className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#243B53]/40" />
            <input
              type="text"
              placeholder="e.g., Juan Dela Cruz or verified profile ID"
              value={location}
              onChange={(event) => onLocationChange(event.target.value)}
              className="w-full rounded-xl border border-[#243B53]/10 bg-[#FAF7F2] py-4 pl-12 pr-4 font-medium text-[#243B53] transition-all focus:border-[#84A98C] focus:outline-none focus:ring-1 focus:ring-[#84A98C]"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onContinue}
            disabled={!location}
            className="rounded-xl bg-[#243B53] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#243B53]/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue to Budget Selection
          </button>
        </div>
      </div>
    </motion.div>
  );
}