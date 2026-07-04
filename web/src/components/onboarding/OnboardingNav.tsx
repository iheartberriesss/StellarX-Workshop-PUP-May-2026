'use client';

import { Shield } from 'lucide-react';
import { OnboardingStep } from '@/lib/types';

interface OnboardingNavProps {
  step: OnboardingStep;
  publicKey?: string | null;
}

function shortenAddress(publicKey: string) {
  return `${publicKey.slice(0, 6)}...${publicKey.slice(-6)}`;
}

export default function OnboardingNav({ publicKey }: OnboardingNavProps) {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-[#243B53]/5 bg-white px-6 py-6 md:px-12">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E9C46A] bg-[#243B53]">
          <Shield className="h-4 w-4 text-[#E9C46A]" />
        </div>
        <span className="font-serif text-xl font-semibold tracking-wide text-[#243B53]">
          AfterLife Care
        </span>
      </div>

      <div className="flex items-center gap-4">
        {publicKey ? (
          <div className="hidden rounded-full border border-[#84A98C]/30 bg-[#84A98C]/10 px-3 py-1.5 font-mono text-xs font-medium text-[#243B53] sm:block">
            {shortenAddress(publicKey)}
          </div>
        ) : null}
      </div>
    </nav>
  );
}