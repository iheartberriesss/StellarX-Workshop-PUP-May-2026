'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BadgeCheck,
  Fingerprint,
  Link2,
  Lock,
  Mail,
  Phone,
  Shield,
  User,
  Wallet,
  X,
  Info,
} from 'lucide-react';
import { TierOption, PreferencesState } from '@/lib/types';

interface ReviewStepProps {
  finalGoal: string;
  location: string;
  fullName: string;
  email: string;
  contactNumber: string;
  selectedTier: TierOption | null;
  preferences: PreferencesState;
  publicKey: string | null;
  connecting: boolean;
  walletError: string | null;
  beneficiary: string;
  onBeneficiaryChange: (value: string) => void;
  onConfirm: () => Promise<void>;
}

function shortenAddress(publicKey: string) {
  return `${publicKey.slice(0, 6)}...${publicKey.slice(-6)}`;
}

export default function ReviewStep({
  finalGoal,
  location,
  fullName,
  email,
  contactNumber,
  selectedTier,
  preferences,
  publicKey,
  connecting,
  walletError,
  beneficiary,
  onBeneficiaryChange,
  onConfirm,
}: ReviewStepProps) {
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const customization = [
    preferences.serviceType,
    preferences.wakeLength,
    preferences.wakeVenue,
    preferences.restingPlace,
  ]
    .filter(Boolean)
    .join(', ');

  const handleButtonClick = () => {
    setShowExplanationModal(true);
  };

  const handleConfirmWallet = async () => {
    try {
      setSubmitting(true);
      setShowExplanationModal(false);
      await onConfirm();
    } finally {
      setSubmitting(false);
    }
  };

  const busy = connecting || submitting;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mx-auto max-w-6xl"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="space-y-6 lg:col-span-7">
          <div>
            <h2 className="mb-3 font-serif text-3xl text-[#243B53] md:text-4xl">
              Secure Your Legacy
            </h2>
            <p className="text-base leading-relaxed text-[#2D3142]/75">
              Verify your identity and link your permanent digital vault to the Stellar blockchain.
            </p>
          </div>

          <div className="rounded-2xl border border-[#243B53]/10 bg-white p-6 shadow-sm md:p-8">
            <div className="space-y-5">
              <label className="block text-sm font-medium text-[#2D3142]/80">
                Full Legal Name
                <div className="relative mt-2">
                  <input
                    type="text"
                    value={fullName}
                    readOnly
                    className="h-12 w-full rounded-lg border border-[#243B53]/20 bg-[#FAF7F2] px-4 pr-12 font-medium text-[#243B53] outline-none"
                  />
                  <User className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#243B53]/35" />
                </div>
              </label>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block text-sm font-medium text-[#2D3142]/80">
                  Email Address
                  <div className="relative mt-2">
                    <input
                      type="email"
                      value={email}
                      readOnly
                      className="h-12 w-full rounded-lg border border-[#243B53]/20 bg-[#FAF7F2] px-4 pr-12 text-[#243B53] outline-none"
                    />
                    <Mail className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#243B53]/35" />
                  </div>
                </label>
                <label className="block text-sm font-medium text-[#2D3142]/80">
                  Contact Number
                  <div className="relative mt-2">
                    <input
                      type="tel"
                      value={contactNumber}
                      readOnly
                      className="h-12 w-full rounded-lg border border-[#243B53]/20 bg-[#FAF7F2] px-4 pr-12 text-[#243B53] outline-none"
                    />
                    <Phone className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#243B53]/35" />
                  </div>
                </label>
              </div>

              <label className="block text-sm font-medium text-[#2D3142]/80">
                Release Beneficiary
                <div className="relative mt-2">
                  <input
                    type="text"
                    value={beneficiary}
                    onChange={(e) => onBeneficiaryChange(e.target.value)}
                    className="h-12 w-full rounded-lg border border-[#243B53]/20 bg-[#FAF7F2] px-4 text-[#243B53] outline-none"
                  />
                </div>
              </label>

              <div className="border-t border-[#243B53]/10 pt-5">
                <div className="flex gap-4 rounded-xl bg-[#84A98C]/10 p-5">
                  <Shield className="mt-0.5 h-5 w-5 shrink-0 text-[#2F6F45]" />
                  <div>
                    <p className="font-semibold text-[#2F6F45]">Privacy Encryption Enabled</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#2D3142]/75">
                      Your data is hashed and stored using bank-grade encryption standards.
                      Only your designated beneficiaries can request access decryption.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-red-100 bg-red-50 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-red-100 bg-white shadow-sm">
              <Lock className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-red-900">Stellar Security Notice</h4>
              <p className="text-sm leading-relaxed text-red-800/80">
                By continuing, you will initiate a Soroban smart contract. This vault requires
                a mandatory ₱1,000 initial activation deposit before proceeding. These funds
                are time-locked and can only be released under the contract’s approved conditions.
              </p>
            </div>
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:col-span-5">
          <div className="relative overflow-hidden rounded-2xl bg-[#243B53] p-7 text-white shadow-xl">
            <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border-[28px] border-white/5" />
            <div className="relative z-10">
              <h3 className="mb-7 flex items-center gap-2 font-serif text-2xl text-white">
                <Wallet className="h-5 w-5 text-[#E9C46A]" />
                Vault Summary
              </h3>

              <div className="mb-8">
                <p className="text-sm text-white/70">Target Protection Goal</p>
                <p className="mt-1 font-serif text-5xl font-semibold text-white">{finalGoal}</p>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-[2%] rounded-full bg-[#84A98C]" />
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/10 p-5">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <span className="text-sm text-white/85">Initial Activation Deposit</span>
                  <span className="font-semibold text-white">₱1,000.00</span>
                </div>
                <div className="space-y-3 border-l border-white/15 pl-4 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-white/70">Soroban Contract Gas</span>
                    <span className="font-medium text-[#84A98C]">₱0.05</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/70">Stellar Network Reserve</span>
                    <span className="font-medium text-[#84A98C]">₱1.00</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/70">Security Audit Fee</span>
                    <span className="font-medium text-[#E9C46A]">Covered</span>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/15 pt-5">
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="font-semibold text-white">Total Deposit Due</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                        Signed on Stellar
                      </p>
                    </div>
                    <p className="font-serif text-2xl font-semibold text-white">₱1,000.00</p>
                  </div>
                </div>
              </div>

              {customization ? (
                <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                    Funeral Customization
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">{customization}</p>
                </div>
              ) : null}

              {selectedTier ? (
                <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                    Selected Tier
                  </p>
                  <p className="mt-2 font-semibold text-white">{selectedTier.name}</p>
                  <p className="mt-1 text-sm text-white/70">{selectedTier.price}</p>
                </div>
              ) : null}

              {publicKey ? (
                <div className="mt-4 rounded-xl border border-[#84A98C]/30 bg-[#84A98C]/10 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                    Stellar Wallet
                  </p>
                  <p className="mt-2 font-mono text-sm text-white">
                    {shortenAddress(publicKey)}
                  </p>
                </div>
              ) : null}

              <button
                type="button"
                onClick={handleButtonClick}
                disabled={busy}
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-[#E9C46A] px-6 py-4 font-semibold text-[#243B53] shadow-lg transition-colors hover:bg-[#84A98C] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Link2 className="h-5 w-5" />
                {busy ? 'Waiting for Freighter...' : 'Proceed to Connect Wallet'}
              </button>

              <p className="mt-5 text-center text-xs leading-relaxed text-white/65">
                Confirm smart contract activation to secure your ₱1,000 initial deposit.
              </p>

              {walletError ? (
                <p className="mt-4 text-center text-sm text-red-200">{walletError}</p>
              ) : null}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#243B53]/10 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#84A98C]/15">
                <Fingerprint className="h-5 w-5 text-[#243B53]" />
              </div>
              <div>
                <p className="font-semibold text-[#243B53]">Immutable Record</p>
                <p className="text-sm text-[#2D3142]/70">Verified by Soroban Smart Contracts</p>
              </div>
            </div>
            <BadgeCheck className="h-5 w-5 text-[#2F6F45]" />
          </div>
        </aside>
      </div>

      <AnimatePresence>
        {showExplanationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md overflow-hidden rounded-2xl border border-[#243B53]/10 bg-white p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2 text-[#243B53]">
                  <Info className="h-5 w-5 text-[#84A98C]" />
                  <h3 className="font-serif text-xl font-semibold">
                    Confirm Initial Activation Deposit
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowExplanationModal(false)}
                  className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="my-5 space-y-3 text-sm leading-relaxed text-[#2D3142]/80">
                <p>
                  Before proceeding, please confirm that you are ready to continue with the
                  required <strong>₱1,000 initial activation deposit</strong>.
                </p>
                <p>
                  This deposit is required to activate your vault and complete the wallet connection
                  process.
                </p>
                <p className="font-medium text-[#243B53]">
                  Once confirmed, you will be redirected to Freighter to approve the transaction.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleConfirmWallet}
                  disabled={busy}
                  className="w-full rounded-xl bg-[#243B53] py-3 font-semibold text-white shadow-md transition-colors hover:bg-[#1C2F42] disabled:opacity-70"
                >
                  {busy ? 'Processing...' : 'Yes, Proceed'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowExplanationModal(false)}
                  className="w-full rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}