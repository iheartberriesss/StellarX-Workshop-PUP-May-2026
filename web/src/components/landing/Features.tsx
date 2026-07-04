'use client';

import {
  TrendingUp,
  Lock,
  HeartHandshake,
  Bell,
  Users,
  FileText,
} from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: TrendingUp,
      title: 'Set a Savings Goal',
      desc: 'Choose a target amount that fits your needs, such as ₱50,000, ₱75,000, or ₱100,000.',
    },
    {
      icon: Lock,
      title: 'Locked Deposit',
      desc: 'Start with a ₱1,000 initial contribution to activate your dedicated, rule-protected vault.',
    },
    {
      icon: HeartHandshake,
      title: 'Save Anytime',
      desc: 'Add money whenever you can. Your funds are locked and cannot be withdrawn casually.',
    },
    {
      icon: Bell,
      title: 'Gentle Reminders',
      desc: 'Receive discreet email, SMS, or app notifications reminding you to contribute monthly.',
    },
    {
      icon: Users,
      title: 'Beneficiary Setup',
      desc: 'Name the specific family members or trusted individuals who can claim the payout.',
    },
    {
      icon: FileText,
      title: 'Conditional Release',
      desc: 'Funds are strictly released only when the maturity date is reached or a verified death certificate is approved.',
    },
  ];

  return (
    <section
  id="features"
  className="scroll-mt-24 bg-[#FAF7F2] px-6 py-24 md:px-12 lg:px-24"
>
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-[#E9C46A]/50"></div>
            <div className="h-2 w-2 rotate-45 bg-[#E9C46A]/50"></div>
            <div className="h-px w-12 bg-[#E9C46A]/50"></div>
          </div>
          <h2 className="mb-6 font-serif text-3xl text-[#243B53] md:text-5xl">
            A dignified way to prepare.
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#2D3142]/70">
            We combine financial discipline, family protection, and conditional smart-contract release to ensure your final wishes are honored without burdening your loved ones.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[#243B53]/5 bg-white p-8 shadow-[0_4px_20px_-4px_rgba(36,59,83,0.05)] transition-colors hover:border-[#84A98C]/30"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#E9C46A]/20 bg-[#FFFBF0] text-[#243B53]">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-3 font-serif text-xl text-[#243B53]">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-[#2D3142]/70">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
