export interface StripeCustomer {
  existingStripeCustomer?: boolean;
  error?: { message: string };
}

export interface SetupIntent {
  intent_secret?: string;
  error?: { message: string };
}
