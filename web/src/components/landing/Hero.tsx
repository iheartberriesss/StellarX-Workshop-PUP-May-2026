'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenVault: () => void;
  onSignIn: () => void;
}

export default function Hero({ onOpenVault, onSignIn }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#243B53] px-6 pb-20 pt-32 md:px-12 md:pb-32 md:pt-48 lg:px-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-[#84A98C]/10 via-[#243B53] to-[#243B53]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="mb-6 flex items-center justify-center gap-4 text-xs font-medium uppercase tracking-[0.2em] text-[#E9C46A] md:text-sm">
            <span className="h-px w-8 bg-[#E9C46A]/50" />
            AfterLife Care · Powered by Stellar
            <span className="h-px w-8 bg-[#E9C46A]/50" />
          </p>

          <h1 className="mb-8 font-serif text-4xl leading-tight text-white md:text-6xl lg:text-7xl">
            Your family will grieve your death.{' '}
            <br className="hidden md:block" />
            <span className="italic text-white/80">
              Don&apos;t make them pay for it, too.
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-3xl text-lg font-light leading-relaxed text-white/70 md:text-xl">
            A sudden funeral can instantly push the people you love up to ₱100,000 into deep debt. Stop leaving your final expenses to chance—and to them. With our secure, blockchain-powered time-locked vaults, you can quietly save a small amount each month. Your funds are entirely unalterable and guaranteed to release to your family only when they need it most.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={onOpenVault}
              className="flex items-center justify-center gap-2 rounded-full bg-[#E9C46A] px-8 py-4 font-semibold text-[#243B53] transition-colors hover:bg-white"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={onSignIn}
              className="flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Sign In
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}