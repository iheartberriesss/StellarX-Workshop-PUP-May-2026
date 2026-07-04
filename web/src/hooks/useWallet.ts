'use client';

import { useCallback, useState } from 'react';
import {
  getAddress,
  isConnected,
  setAllowed,
  signMessage,
} from '@stellar/freighter-api';

export interface WalletState {
  publicKey: string | null;
  connecting: boolean;
  error: string | null;
  connect: () => Promise<string | null>;
  signChallenge: (message: string) => Promise<{
    signedMessage: string | null;
    signerAddress: string;
  } | null>;
  depositAndLock: () => Promise<boolean>;
  disconnect: () => void;
}

export function useWallet(): WalletState {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    setConnecting(true);
    setError(null);

    try {
      const connected = await isConnected();

      if (!connected) {
        const allowed = await setAllowed();
        if ((allowed as { error?: string; isAllowed?: boolean }).error || !(allowed as { isAllowed?: boolean }).isAllowed) {
          throw new Error(
            (allowed as { error?: string }).error ?? 'Freighter access was not approved.',
          );
        }
      }

      const addr = await getAddress();
      if ((addr as { error?: string }).error) {
        throw new Error((addr as { error?: string }).error ?? 'Freighter connect failed.');
      }

      if (!(addr as { address?: string }).address) {
        throw new Error('Freighter did not return an address.');
      }

      setPublicKey((addr as { address: string }).address);
      return (addr as { address: string }).address;
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Freighter connect failed.';
      setError(message);
      return null;
    } finally {
      setConnecting(false);
    }
  }, []);

  const signChallenge = useCallback(
    async (message: string) => {
      if (!publicKey) return null;

      const result = await signMessage(message, {
        address: publicKey,
      });

      if ((result as { error?: string }).error) {
        throw new Error(
          (result as { error?: string }).error ?? 'Message signing failed.',
        );
      }

      return {
        signedMessage: (result as { signedMessage?: string }).signedMessage ?? null,
        signerAddress:
          (result as { signerAddress?: string }).signerAddress ?? publicKey,
      };
    },
    [publicKey],
  );

  const depositAndLock = useCallback(async () => {
    setError('Deposit flow is not wired yet.');
    return false;
  }, []);

  const disconnect = useCallback(() => {
    setPublicKey(null);
    setError(null);
  }, []);

  return {
    publicKey,
    connecting,
    error,
    connect,
    signChallenge,
    depositAndLock,
    disconnect,
  };
}