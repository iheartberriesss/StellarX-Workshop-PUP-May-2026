'use client';

import React, { useEffect, useState } from 'react';

// Types and constants
import { ViewState, OnboardingStep, PreferencesState, TierOption } from '@/lib/types';
import { useWallet } from '@/hooks/useWallet';

// Landing page components
import LandingNav from '@/components/landing/LandingNav';
import Hero from '@/components/landing/Hero';
import Trust from '@/components/landing/Trust';
import Features from '@/components/landing/Features';
import Dashboard from '@/components/landing/Dashboard';
import Footer from '@/components/landing/Footer';

// Onboarding components
import OnboardingNav from '@/components/onboarding/OnboardingNav';
import MethodStep from '@/components/onboarding/MethodStep';
import DetailsStep from '@/components/onboarding/DetailsStep';
import ReviewStep from '@/components/onboarding/ReviewStep';
import DigitalIdentity from '@/components/onboarding/DigitalIdentity';

function OnboardingProgress({ step }: { step: OnboardingStep }) {
  const steps = [
    {
      number: '1',
      label: 'Plan Selection',
      active: step === 'method' || step === 'details',
      completed: step === 'identity' || step === 'review',
    },
    {
      number: '2',
      label: 'Digital Identity',
      active: step === 'identity',
      completed: step === 'review',
    },
    {
      number: '3',
      label: 'Final Security',
      active: step === 'review',
      completed: false,
    },
  ];

  return (
    <div className="mx-auto mb-10 flex max-w-4xl items-center justify-center gap-4">
      {steps.map((item, index) => (
        <React.Fragment key={item.number}>
          <div className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold ${
                item.active || item.completed
                  ? 'border-[#84A98C] bg-[#84A98C] text-white'
                  : 'border-[#243B53]/20 bg-white text-[#243B53]/50'
              }`}
            >
              {item.number}
            </div>

            <span
              className={`hidden text-sm font-medium md:inline ${
                item.active || item.completed
                  ? 'text-[#243B53]'
                  : 'text-[#243B53]/40'
              }`}
            >
              {item.label}
            </span>
          </div>

          {index < steps.length - 1 && (
            <div
              className={`h-px w-10 md:w-20 ${
                item.completed ? 'bg-[#84A98C]' : 'bg-[#243B53]/20'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function Home() {
const {
  publicKey,
  connecting,
  error: walletError,
  connect,
  signChallenge,
  depositAndLock,
  disconnect,
} = useWallet();

  const [view, setView] = useState<ViewState>('landing');
  const [step, setStep] = useState<OnboardingStep>('method');
  const [customGoal, setCustomGoal] = useState('');
  const [location, setLocation] = useState('');
  const [vaultFunded, setVaultFunded] = useState(false);

  const [sessionPublicKey, setSessionPublicKey] = useState<string | null>(null);

  // Lifted Identity and Beneficiary States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [beneficiary, setBeneficiary] = useState('');

  const [preferences, setPreferences] = useState<PreferencesState>({
    religion: '',
    serviceType: '',
    wakeLength: '',
    wakeVenue: '',
    restingPlace: '',
  });

  const [selectedTier, setSelectedTier] = useState<TierOption | null>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem('userPublicKey');
    const savedVaultFunded = localStorage.getItem('vaultFunded');

    if (savedKey && savedVaultFunded === 'true') {
      setSessionPublicKey(savedKey);
      setVaultFunded(true);
      setView('dashboard');
    }
  }, []);

  const activePublicKey = publicKey ?? sessionPublicKey;

  const handleGetStarted = () => {
    setView('onboarding');
    setStep('method');
    window.scrollTo(0, 0);
  };

const handleSignIn = async () => {
  try {
    const connectedAddress = publicKey ?? (await connect());
    if (!connectedAddress) return;

    const challenge = `Sign in to AfterLife Care
Wallet: ${connectedAddress}
Timestamp: ${Date.now()}`;

    const signed = await signChallenge(challenge);
    if (!signed?.signedMessage) {
      throw new Error('Signature was not created.');
    }

    const res = await fetch('/api/auth/freighter-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        publicKey: connectedAddress,
        challenge,
        signedMessage: signed.signedMessage,
        signerAddress: signed.signerAddress,
      }),
    });

    if (!res.ok) {
      throw new Error('Login verification failed.');
    }

    const data = await res.json();

    setSessionPublicKey(connectedAddress);
    setVaultFunded(Boolean(data.vaultExists));

    localStorage.setItem('userPublicKey', connectedAddress);
    localStorage.setItem('vaultFunded', String(Boolean(data.vaultExists)));

    setView('dashboard');
    window.scrollTo(0, 0);
  } catch (error) {
    console.error('Sign in failed:', error);
  }
};

  const handleLockVault = async () => {
    const connectedAddress = publicKey ?? (await connect());

    if (!connectedAddress) return;

    setSessionPublicKey(connectedAddress);
    setView('dashboard');
    window.scrollTo(0, 0);
  };

  const handleVaultFunded = () => {
    const keyToSave = publicKey ?? sessionPublicKey;

    if (!keyToSave) return;

    localStorage.setItem('userPublicKey', keyToSave);
    localStorage.setItem('vaultFunded', 'true');

    setSessionPublicKey(keyToSave);
    setVaultFunded(true);
  };

  const handleBack = () => {
    if (step === 'method') {
      setView('landing');
    } else if (step === 'details') {
      setStep('method');
    } else if (step === 'identity') {
      if (customGoal && !selectedTier) {
        setStep('method');
      } else {
        setStep('details');
      }
    } else if (step === 'review') {
      setStep('identity');
    }

    window.scrollTo(0, 0);
  };

  const updatePreference = (key: keyof PreferencesState, value: string) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const finalGoal = selectedTier
    ? `₱${selectedTier.value.toLocaleString()}`
    : customGoal
      ? `₱${Number(customGoal.replace(/,/g, '') || 0).toLocaleString()}`
      : '₱0';

  if (view === 'dashboard' && activePublicKey) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] font-sans text-[#243B53] selection:bg-[#E9C46A]/30">
        <OnboardingNav step="method" publicKey={activePublicKey} />

        <Dashboard
          activeVault={{
            goal: finalGoal,
            beneficiary,
            publicKey: activePublicKey,
            location: fullName || location,
          }}
          vaultFunded={vaultFunded}
          onVaultFunded={handleVaultFunded}
        />

        <Footer />
      </div>
    );
  }

  if (view === 'onboarding') {
    return (
      <div className="flex min-h-screen flex-col bg-[#FAF7F2] font-sans text-[#243B53] selection:bg-[#E9C46A]/30">
        <OnboardingNav step={step} publicKey={activePublicKey} />

        <main className="flex-grow px-6 py-12 md:px-12">
          <OnboardingProgress step={step} />

          {step === 'method' && (
            <MethodStep
              customGoal={customGoal}
              onCustomGoalChange={setCustomGoal}
              onSelectCustom={() => {
                setSelectedTier(null);
                setStep('identity');
                window.scrollTo(0, 0);
              }}
              onSelectCalculator={() => {
                setCustomGoal('');
                setStep('details');
                window.scrollTo(0, 0);
              }}
            />
          )}

          {step === 'details' && (
            <DetailsStep
              preferences={preferences}
              selectedTier={selectedTier}
              onPreferenceChange={updatePreference}
              onTierSelect={setSelectedTier}
              onContinue={() => {
                if (selectedTier) {
                  setStep('identity');
                  window.scrollTo(0, 0);
                }
              }}
            />
          )}

          {step === 'identity' && (
            <DigitalIdentity
              fullName={fullName}
              setFullName={setFullName}
              email={email}
              setEmail={setEmail}
              contactNumber={contactNumber}
              setContactNumber={setContactNumber}
              beneficiary={beneficiary}
              setBeneficiary={setBeneficiary}
              onBack={() => {
                if (customGoal && !selectedTier) {
                  setStep('method');
                } else {
                  setStep('details');
                }
                window.scrollTo(0, 0);
              }}
              onContinue={() => {
                setStep('review');
                window.scrollTo(0, 0);
              }}
            />
          )}

          {step === 'review' && (
            <ReviewStep
              finalGoal={finalGoal}
              location={fullName}
              fullName={fullName}
              email={email}
              contactNumber={contactNumber}
              selectedTier={selectedTier}
              preferences={preferences}
              publicKey={activePublicKey}
              connecting={connecting}
              walletError={walletError}
              beneficiary={beneficiary}
              onBeneficiaryChange={setBeneficiary}
              onConfirm={handleLockVault}
            />
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans text-[#243B53] selection:bg-[#E9C46A]/30">
      <LandingNav onGetStarted={handleGetStarted} onSignIn={handleSignIn} />
      <Hero onOpenVault={handleGetStarted} onSignIn={handleSignIn} />
      <Trust />
      <Features />
      <Footer />
    </div>
  );
}