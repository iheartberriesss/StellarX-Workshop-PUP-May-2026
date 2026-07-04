'use client';

import { Shield } from 'lucide-react';

interface LandingNavProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export default function LandingNav({ onGetStarted, onSignIn }: LandingNavProps) {
  return (
    <nav className="absolute left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 text-white md:px-12 lg:px-24">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E9C46A]/50">
          <Shield className="h-4 w-4 text-[#E9C46A]" />
        </div>
        <span className="font-serif text-xl font-semibold tracking-wide">
          AfterLife Care
        </span>
      </div>

      <div className="hidden items-center gap-8 text-sm font-medium text-white/90 md:flex">
        <a href="#howItWorks" className="transition-colors hover:text-[#E9C46A]">
          How it Works
        </a>
        <a href="#features" className="transition-colors hover:text-[#E9C46A]">
          Features
        </a>
        <a href="#beneficiaries" className="transition-colors hover:text-[#E9C46A]">
          Beneficiaries
        </a>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onSignIn}
          className="rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
        >
          Sign In
        </button>

        <button
          type="button"
          onClick={onGetStarted}
          className="rounded-full bg-[#E9C46A] px-4 py-2 text-sm font-semibold text-[#243B53] transition hover:opacity-90"
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}