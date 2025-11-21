/**
 * Design Patterns Used:
 * 1. Strategy: To handle different payment algorithms (CreditCard, PayPal, Crypto) interchangeably.
 * 2. Factory: To create the appropriate payment strategy based on user input.
 * 3. Adapter: To integrate a legacy third-party payment system with an incompatible interface.
 */

// ==============================================================================
// 1. Strategy Pattern
// ==============================================================================

// Strategy Interface
interface PaymentStrategy {
  pay(amount: number): void;
}

// Concrete Strategy 1: Credit Card
class CreditCardPayment implements PaymentStrategy {
  constructor(private cardNumber: string, private cvv: string) {}

  pay(amount: number): void {
    console.log(`Paid $${amount} using Credit Card ending in ${this.cardNumber.slice(-4)}.`);
  }
}

// Concrete Strategy 2: PayPal
class PayPalPayment implements PaymentStrategy {
  constructor(private email: string) {}

  pay(amount: number): void {
    console.log(`Paid $${amount} using PayPal account ${this.email}.`);
  }
}

// ==============================================================================
// 2. Adapter Pattern
// ==============================================================================

// Legacy Third-Party System (Incompatible Interface)
class LegacyBankSystem {
  public processTransaction(accountID: string, totalAmount: number): void {
    console.log(`Processing transaction of $${totalAmount} for account ${accountID} via Legacy Bank.`);
  }
}

// Adapter to make LegacyBankSystem compatible with PaymentStrategy
class LegacyBankAdapter implements PaymentStrategy {
  private legacyBank: LegacyBankSystem;
  private accountId: string;

  constructor(accountId: string) {
    this.legacyBank = new LegacyBankSystem();
    this.accountId = accountId;
  }

  pay(amount: number): void {
    // Adapting the 'pay' call to 'processTransaction'
    this.legacyBank.processTransaction(this.accountId, amount);
  }
}

// ==============================================================================
// 3. Factory Pattern
// ==============================================================================

type PaymentType = 'credit_card' | 'paypal' | 'legacy_bank';

class PaymentFactory {
  public static createPaymentMethod(type: PaymentType, details: any): PaymentStrategy {
    switch (type) {
      case 'credit_card':
        return new CreditCardPayment(details.cardNumber, details.cvv);
      case 'paypal':
        return new PayPalPayment(details.email);
      case 'legacy_bank':
        return new LegacyBankAdapter(details.accountId);
      default:
        throw new Error('Unknown payment method type.');
    }
  }
}

// ==============================================================================
// Usage Example
// ==============================================================================

class PaymentProcessor {
  private strategy: PaymentStrategy;

  constructor(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  public process(amount: number): void {
    this.strategy.pay(amount);
  }
}

// Client Code
function runPaymentSystem() {
  console.log('--- Payment System Demo ---');

  // 1. Pay with Credit Card
  const ccPayment = PaymentFactory.createPaymentMethod('credit_card', { cardNumber: '1234567812345678', cvv: '123' });
  const processor1 = new PaymentProcessor(ccPayment);
  processor1.process(100);

  // 2. Pay with PayPal
  const ppPayment = PaymentFactory.createPaymentMethod('paypal', { email: 'user@example.com' });
  const processor2 = new PaymentProcessor(ppPayment);
  processor2.process(55.50);

  // 3. Pay with Legacy Bank (via Adapter)
  const bankPayment = PaymentFactory.createPaymentMethod('legacy_bank', { accountId: 'ACC-998877' });
  const processor3 = new PaymentProcessor(bankPayment);
  processor3.process(5000);
}

runPaymentSystem();
