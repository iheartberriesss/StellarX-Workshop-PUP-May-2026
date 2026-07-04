'use client';

import { Lock, Shield, CheckCircle2 } from 'lucide-react';

export default function Trust() {
  return (
    <div className="border-t border-white/5 bg-[#243B53] px-6 py-6">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-8 text-sm text-white/60 md:gap-16">
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-[#84A98C]" />
          <span>Stellar Blockchain Secured</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-[#84A98C]" />
          <span>Unalterable Smart Contracts</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#84A98C]" />
          <span>Verified Beneficiary Payouts</span>
        </div>
      </div>
    </div>
  );
}
