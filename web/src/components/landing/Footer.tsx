'use client';

import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#243B53] px-6 py-16 text-white/70 md:px-12 lg:px-24">
      <div className="mx-auto mb-12 grid max-w-7xl gap-12 border-b border-white/10 pb-12 md:grid-cols-4">
        {/* Logo & Description */}
        <div className="col-span-1 md:col-span-2">
          <div className="mb-6 flex items-center gap-3 text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E9C46A]/50">
              <Shield className="h-4 w-4 text-[#E9C46A]" />
            </div>
            <span className="font-serif text-xl font-semibold tracking-wide">
              AfterLife Care
            </span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed">
            Dignified, secure, and unalterable. We ensure your final wishes are honored and your family is protected when they need it most, powered by the Stellar network.
          </p>
        </div>

        {/* Platform Links */}
        <div>
          <h4 className="mb-4 font-serif text-white">Platform</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="transition-colors hover:text-[#E9C46A]">
                How it Works
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-[#E9C46A]">
                Security
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-[#E9C46A]">
                Smart Contracts
              </a>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="mb-4 font-serif text-white">Company</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="transition-colors hover:text-[#E9C46A]">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-[#E9C46A]">
                Contact Support
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-[#E9C46A]">
                Legal
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between text-xs md:flex-row">
        <p>© 2026 AfterLife Care. All rights reserved.</p>
        <div className="mt-4 flex gap-6 md:mt-0">
          <a href="#" className="transition-colors hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="transition-colors hover:text-white">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
