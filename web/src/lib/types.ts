// ViewState controls whether the app displays the landing page or the full onboarding flow.
export type ViewState = 'landing' | 'onboarding' | 'dashboard';

export type OnboardingStep =
  | 'method'
  | 'location'
  | 'details'
  | 'identity'
  | 'review';
  
// A tier option represents a preset goal range with a title, price label, description, and numeric value.
export type TierOption = {
  id: string;
  name: string;
  price: string;
  desc: string;
  value: number;
};

// Preferences collected during the calculator flow
export type PreferencesState = {
  religion: string;
  serviceType: string;
  wakeLength: string;
  wakeVenue: string;
  restingPlace: string;
};
