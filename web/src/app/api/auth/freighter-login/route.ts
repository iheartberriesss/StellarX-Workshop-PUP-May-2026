import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { Keypair } from '@stellar/stellar-sdk';

export const runtime = 'nodejs';

type LoginBody = {
  publicKey?: string;
  challenge?: string;
  signedMessage?: string;
  signerAddress?: string;
};

const SIGN_MESSAGE_PREFIX = 'Stellar Signed Message:\n';
const CHALLENGE_MAX_AGE_MS = 5 * 60 * 1000; // 5 minutes

function hashFreighterMessage(message: string): Buffer {
  return createHash('sha256').update(SIGN_MESSAGE_PREFIX + message).digest();
}

function extractTimestamp(challenge: string): number | null {
  const match = challenge.match(/Timestamp:\s*(\d+)/i);
  if (!match) return null;

  const ts = Number(match[1]);
  return Number.isFinite(ts) ? ts : null;
}

function extractWallet(challenge: string): string | null {
  const match = challenge.match(/Wallet:\s*([A-Z0-9]+)/i);
  return match?.[1] ?? null;
}

async function lookupVaultByPublicKey(_publicKey: string) {
  // Replace this with your real vault lookup:
  // - database query
  // - contract query
  // - indexed on-chain record
  //
  // For now, this returns false so login verification works
  // and your UI can route to onboarding until you connect storage.
  return false;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LoginBody;
    const { publicKey, challenge, signedMessage, signerAddress } = body;

    if (!publicKey || !challenge || !signedMessage) {
      return NextResponse.json(
        { ok: false, error: 'Missing publicKey, challenge, or signedMessage.' },
        { status: 400 },
      );
    }

    if (signerAddress && signerAddress !== publicKey) {
      return NextResponse.json(
        { ok: false, error: 'Signer address does not match public key.' },
        { status: 400 },
      );
    }

    const challengeWallet = extractWallet(challenge);
    if (challengeWallet && challengeWallet !== publicKey) {
      return NextResponse.json(
        { ok: false, error: 'Challenge wallet does not match public key.' },
        { status: 400 },
      );
    }

    const timestamp = extractTimestamp(challenge);
    if (!timestamp) {
      return NextResponse.json(
        { ok: false, error: 'Invalid challenge timestamp.' },
        { status: 400 },
      );
    }

    if (Date.now() - timestamp > CHALLENGE_MAX_AGE_MS) {
      return NextResponse.json(
        { ok: false, error: 'Challenge expired. Please sign in again.' },
        { status: 401 },
      );
    }

    let keypair: Keypair;
    try {
      keypair = Keypair.fromPublicKey(publicKey);
    } catch {
      return NextResponse.json(
        { ok: false, error: 'Invalid Stellar public key.' },
        { status: 400 },
      );
    }

    const messageHash = hashFreighterMessage(challenge);
    const signature = Buffer.from(signedMessage, 'base64');

    const isValid = keypair.verify(messageHash, signature);

    if (!isValid) {
      return NextResponse.json(
        { ok: false, error: 'Signature verification failed.' },
        { status: 401 },
      );
    }

    const vaultExists = await lookupVaultByPublicKey(publicKey);

    const response = NextResponse.json({
      ok: true,
      verified: true,
      publicKey,
      vaultExists,
    });

    return response;
  } catch (error) {
    console.error('Freighter login error:', error);

    return NextResponse.json(
      { ok: false, error: 'Internal server error.' },
      { status: 500 },
    );
  }
}