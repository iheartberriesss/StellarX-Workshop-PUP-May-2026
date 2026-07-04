'use client';

import { useState } from 'react';

interface ConnectWalletProps {
  publicKey: string | null;
  connecting: boolean;
  error: string | null;
  connect: () => Promise<string | null>;
  disconnect: () => void;
}

export default function ConnectWallet({
  publicKey,
  connecting,
  error,
  connect,
  disconnect,
}: ConnectWalletProps) {
  const [copied, setCopied] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const copy = async () => {
    if (!publicKey) return;
    await navigator.clipboard.writeText(publicKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleConnectClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmConnect = async () => {
    try {
      setConfirming(true);
      setShowConfirm(false);
      await connect();
    } finally {
      setConfirming(false);
    }
  };

  if (publicKey) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={copy}
          title="Copy full address"
          className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
        >
          {copied ? 'Copied' : `${publicKey.slice(0, 6)}...${publicKey.slice(-4)}`}
        </button>

        <button
          onClick={disconnect}
          className="rounded-xl bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        onClick={handleConnectClick}
        disabled={connecting || confirming}
        className="rounded-xl bg-emerald-500 px-5 py-3 font-medium text-white hover:bg-emerald-600 disabled:opacity-50"
      >
        {connecting || confirming ? 'Please wait...' : 'Sign In'}
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl bg-[#1b1b1b] p-6 text-white shadow-xl">
            <h2 className="text-xl font-semibold">Confirm Sign In</h2>
            <p className="mt-2 text-sm text-white/70">
              This will connect your wallet and open your vault.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmConnect}
                disabled={confirming}
                className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-50"
              >
                {confirming ? 'Connecting...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}