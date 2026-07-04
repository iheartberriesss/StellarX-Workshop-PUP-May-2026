'use client';

import { useEffect, useState } from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  Plus,
  Pencil,
  Clock3,
  FileText,
} from 'lucide-react';

interface ActiveVault {
  goal: string;
  beneficiary: string;
  publicKey: string;
  location: string;
}

interface DashboardProps {
  activeVault?: ActiveVault | null;
}

export default function Dashboard({ activeVault }: DashboardProps) {
  const [showActivationModal, setShowActivationModal] = useState(false);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [topUpLoading, setTopUpLoading] = useState(false);
  const [topUpError, setTopUpError] = useState('');

  const isActive = activeVault !== null && activeVault !== undefined;

  const goal = activeVault?.goal ?? '₱ 100,000';
  const numericGoal = Number(goal.replace(/[₱,\s]/g, '')) || 100000;

  const [savedAmount, setSavedAmount] = useState(isActive ? 1000 : 45000);
  const [walletBalance, setWalletBalance] = useState(isActive ? 4000 : 0);

  const [transactions, setTransactions] = useState([
    {
      title: 'Contract Deployed',
      date: 'July 3, 2026 • 10:24 AM',
      description:
        'Your rule-protected vault contract was created and linked to your Stellar wallet.',
    },
    {
      title: 'Initial Deposit Recorded',
      date: 'July 3, 2026 • 10:27 AM',
      description: '₱1,000 was deposited to activate and secure your vault.',
    },
  ]);

  const progressValue = isActive
    ? Math.min((savedAmount / numericGoal) * 100, 100)
    : 45;

  const saved = `₱ ${savedAmount.toLocaleString()}`;
  const progress = `${progressValue}%`;
  const progressLabel = `${Math.round(progressValue)}%`;

  useEffect(() => {
    if (isActive) {
      setShowActivationModal(true);
    }
  }, [isActive]);

  const handleTopUp = async () => {
    const amount = Number(topUpAmount.replace(/,/g, ''));

    if (!amount || amount <= 0) {
      setTopUpError('Please enter a valid amount.');
      return;
    }

    if (amount > walletBalance) {
      setTopUpError('This amount is higher than your available wallet balance.');
      return;
    }

    setTopUpLoading(true);
    setTopUpError('');

    try {
      /**
       * Temporary transfer simulation.
       *
       * Later, replace this with your real Freighter/Soroban transfer:
       *
       * await topUpVault({
       *   publicKey: activeVault.publicKey,
       *   amount: amount.toString(),
       * });
       */
      await new Promise((resolve) => setTimeout(resolve, 800));

      const transactionDate = new Date().toLocaleString('en-PH', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });

      setSavedAmount((prev) => prev + amount);
      setWalletBalance((prev) => prev - amount);

      setTransactions((prev) => [
        {
          title: 'Wallet Top Up Recorded',
          date: transactionDate,
          description: `₱${amount.toLocaleString()} was transferred from your Freighter wallet into your protected vault.`,
        },
        ...prev,
      ]);

      setTopUpAmount('');
      setShowTopUpModal(false);
    } finally {
      setTopUpLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#84A98C]/10 px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        {/* Primary Vault Dashboard */}
        <div className="relative rounded-2xl border border-[#243B53]/5 bg-white p-8 shadow-xl">
          <div className="absolute left-0 top-0 h-2 w-full rounded-t-2xl bg-[#84A98C]" />

          {/* Header */}
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-1 text-sm uppercase tracking-wider text-[#2D3142]/70">
                Primary Vault
              </p>
              <h3 className="font-serif text-2xl text-[#243B53]">
                Final Expenses
              </h3>
            </div>

            <div className="w-fit rounded-full border border-[#84A98C]/30 bg-[#84A98C]/10 px-4 py-2">
              <span className="flex items-center gap-2 text-sm font-medium text-[#243B53]">
                <CheckCircle2 className="h-3 w-3 text-[#84A98C]" />
                {isActive ? 'Active / Secured' : 'Sample'}
              </span>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="mb-2 flex items-end justify-between">
              <span className="font-serif text-4xl text-[#243B53]">
                {saved}
              </span>
              <span className="mb-1 text-sm text-[#2D3142]/70">
                of {goal} goal
              </span>
            </div>

            <div className="mb-4 rounded-xl bg-[#FAF7F2] px-4 py-3">
              <p className="text-sm text-[#2D3142]/70">
                Available in wallet:{' '}
                <span className="font-semibold text-[#243B53]">
                  ₱{walletBalance.toLocaleString()}
                </span>
              </p>
            </div>

            <div className="h-3 w-full overflow-hidden rounded-full bg-[#FAF7F2]">
              <div
                className="h-full rounded-full bg-[#84A98C]"
                style={{ width: progress }}
              />
            </div>

            <p className="mt-2 text-right text-xs text-[#2D3142]/70">
              {progressLabel} Complete
            </p>
          </div>

          {/* Management Actions */}
          <div className="mb-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-[#243B53]/5 bg-[#FAF7F2] p-5">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-1 text-xs uppercase tracking-wider text-[#2D3142]/60">
                    Add Funds
                  </p>
                  <h4 className="font-serif text-xl text-[#243B53]">
                    Top up your vault
                  </h4>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#84A98C]/15">
                  <Plus className="h-4 w-4 text-[#84A98C]" />
                </div>
              </div>

              <p className="mb-5 text-sm leading-6 text-[#2D3142]/70">
                Add another contribution from your connected Freighter wallet.
                This will increase your saved balance and update your vault progress.
              </p>

              <button
                onClick={() => setShowTopUpModal(true)}
                disabled={walletBalance <= 0}
                className="w-full rounded-full bg-[#243B53] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#243B53]/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Top Up Vault
              </button>
            </div>

            <div className="rounded-xl border border-[#243B53]/5 bg-[#FAF7F2] p-5">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-1 text-xs uppercase tracking-wider text-[#2D3142]/60">
                    Target Goal
                  </p>
                  <h4 className="font-serif text-xl text-[#243B53]">
                    {goal}
                  </h4>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E9C46A]/15">
                  <Pencil className="h-4 w-4 text-[#C9972E]" />
                </div>
              </div>

              <p className="mb-3 text-sm leading-6 text-[#2D3142]/70">
                Your target goal can only be adjusted once per year to protect
                the long-term purpose of the vault.
              </p>

              <div className="mb-5 flex items-center gap-2 text-xs text-[#2D3142]/60">
                <Clock3 className="h-3 w-3" />
                Next available adjustment: January 1, 2027
              </div>

              <button className="w-full rounded-full border border-[#243B53]/15 bg-white px-6 py-3 text-sm font-semibold text-[#243B53] transition-colors hover:bg-[#243B53]/5">
                Edit Goal
              </button>
            </div>
          </div>

          {/* Health Indicators */}
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-[#243B53]/5 bg-white p-4">
              <p className="mb-1 text-xs text-[#2D3142]/70">
                Network Reserve
              </p>
              <p className="flex items-center gap-2 font-medium text-[#243B53]">
                <ShieldCheck className="h-4 w-4 text-[#84A98C]" />
                Healthy
              </p>
              <p className="mt-1 text-xs text-[#2D3142]/60">
                Maintenance fees covered
              </p>
            </div>

            <div className="rounded-xl border border-[#243B53]/5 bg-white p-4">
              <p className="mb-1 text-xs text-[#2D3142]/70">
                Beneficiary
              </p>
              <p className="font-medium text-[#243B53]">
                {activeVault?.beneficiary ?? 'Maria Santos'}
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs text-[#84A98C]">
                <CheckCircle2 className="h-3 w-3" />
                {isActive ? 'Active - Verified' : 'Verified'}
              </p>
            </div>

            <div className="rounded-xl border border-[#243B53]/5 bg-white p-4">
              <p className="mb-1 text-xs text-[#2D3142]/70">
                Next Contribution
              </p>
              <p className="font-medium text-[#243B53]">
                {isActive ? 'Optional top-up' : '₱ 1,500'}
              </p>
              <p className="mt-1 text-xs text-[#2D3142]/60">
                {activeVault?.location
                  ? activeVault.location
                  : 'Monthly reminder enabled'}
              </p>
            </div>
          </div>

          {/* Proof of Record */}
          <div className="rounded-xl border border-[#243B53]/5 bg-[#FAF7F2] p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="mb-1 text-xs uppercase tracking-wider text-[#2D3142]/60">
                  Proof of Record
                </p>
                <h4 className="font-serif text-xl text-[#243B53]">
                  Vault History
                </h4>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#84A98C]/15">
                <FileText className="h-4 w-4 text-[#84A98C]" />
              </div>
            </div>

            <div className="space-y-4">
              {transactions.map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-xl bg-white p-4"
                >
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#84A98C]/15">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#84A98C]" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                      <p className="font-medium text-[#243B53]">
                        {transaction.title}
                      </p>
                      <p className="text-xs text-[#2D3142]/60">
                        {transaction.date}
                      </p>
                    </div>

                    <p className="mt-1 text-sm text-[#2D3142]/70">
                      {transaction.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Up Modal */}
      {showTopUpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#243B53]/40 px-6">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
            <h3 className="mb-3 font-serif text-2xl text-[#243B53]">
              Top Up from Wallet
            </h3>

            <p className="mb-6 text-sm leading-6 text-[#2D3142]/70">
              Choose how much you want to add from your connected Freighter wallet.
              Once confirmed, this amount will be transferred into your protected vault.
            </p>

            <div className="mb-5 rounded-xl bg-[#FAF7F2] p-4">
              <p className="mb-1 text-xs uppercase tracking-wider text-[#2D3142]/60">
                Available in wallet
              </p>
              <p className="font-serif text-2xl text-[#243B53]">
                ₱{walletBalance.toLocaleString()}
              </p>
            </div>

            <label className="mb-2 block text-sm font-medium text-[#243B53]">
              Amount to add
            </label>

            <input
              value={topUpAmount}
              onChange={(e) => {
                setTopUpAmount(e.target.value);
                setTopUpError('');
              }}
              placeholder="Example: 500"
              inputMode="numeric"
              className="mb-3 w-full rounded-xl border border-[#243B53]/10 bg-[#FAF7F2] px-4 py-3 text-[#243B53] outline-none focus:border-[#84A98C]"
            />

            {topUpError && (
              <p className="mb-4 text-sm text-red-500">
                {topUpError}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowTopUpModal(false);
                  setTopUpAmount('');
                  setTopUpError('');
                }}
                disabled={topUpLoading}
                className="flex-1 rounded-full border border-[#243B53]/15 bg-white px-6 py-3 text-sm font-semibold text-[#243B53] transition-colors hover:bg-[#243B53]/5 disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                onClick={handleTopUp}
                disabled={topUpLoading}
                className="flex-1 rounded-full bg-[#243B53] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#243B53]/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {topUpLoading ? 'Confirming Transfer...' : 'Confirm Top Up'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activation Success Modal */}
      {showActivationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#243B53]/40 px-6">
          <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#84A98C]/15">
              <CheckCircle2 className="h-8 w-8 text-[#84A98C]" />
            </div>

            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[#84A98C]">
              Vault Activated
            </p>

            <h3 className="mb-3 font-serif text-2xl text-[#243B53]">
              Your vault is active.
            </h3>

            <p className="mb-6 text-sm leading-6 text-[#2D3142]/70">
              Your initial ₱1,000 contribution has been recorded. Your vault is
              now secured and ready for future contributions.
            </p>

            <button
              onClick={() => setShowActivationModal(false)}
              className="rounded-full bg-[#243B53] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#243B53]/90"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}
    </section>
  );
}