/**
 * Design Patterns Used:
 * 1. Decorator: To dynamically add responsibilities (ingredients like Milk, Sugar) to an object (Coffee) and calculate cost.
 * 2. Builder: To construct a complex Order object step-by-step.
 * 3. Chain of Responsibility: To pass the order through a series of handlers (Validation -> Payment -> Preparation).
 */

// ==============================================================================
// 1. Decorator Pattern
// ==============================================================================

// Component Interface
interface Beverage {
  getDescription(): string;
  cost(): number;
}

// Concrete Component
class Espresso implements Beverage {
  getDescription(): string {
    return 'Espresso';
  }

  cost(): number {
    return 2.0;
  }
}

// Decorator Base Class
abstract class BeverageDecorator implements Beverage {
  protected beverage: Beverage;

  constructor(beverage: Beverage) {
    this.beverage = beverage;
  }

  abstract getDescription(): string;
  abstract cost(): number;
}

// Concrete Decorators
class Milk extends BeverageDecorator {
  getDescription(): string {
    return this.beverage.getDescription() + ', Milk';
  }

  cost(): number {
    return this.beverage.cost() + 0.5;
  }
}

class Mocha extends BeverageDecorator {
  getDescription(): string {
    return this.beverage.getDescription() + ', Mocha';
  }

  cost(): number {
    return this.beverage.cost() + 0.8;
  }
}

// ==============================================================================
// 2. Builder Pattern
// ==============================================================================

class Order {
  public customerName: string;
  public tableNumber: number;
  public beverage: Beverage;
  public notes: string;

  constructor(builder: OrderBuilder) {
    this.customerName = builder.customerName;
    this.tableNumber = builder.tableNumber;
    this.beverage = builder.beverage;
    this.notes = builder.notes;
  }

  showOrder(): void {
    console.log(
      `Order for ${this.customerName} (Table ${this.tableNumber}): ${this.beverage.getDescription()} - $${this.beverage.cost().toFixed(2)} [Notes: ${this.notes}]`
    );
  }
}

class OrderBuilder {
  public customerName: string = 'Guest';
  public tableNumber: number = 0;
  public beverage: Beverage;
  public notes: string = '';

  constructor(beverage: Beverage) {
    this.beverage = beverage;
  }

  setCustomerName(name: string): OrderBuilder {
    this.customerName = name;
    return this;
  }

  setTableNumber(number: number): OrderBuilder {
    this.tableNumber = number;
    return this;
  }

  setNotes(notes: string): OrderBuilder {
    this.notes = notes;
    return this;
  }

  build(): Order {
    return new Order(this);
  }
}

// ==============================================================================
// 3. Chain of Responsibility Pattern
// ==============================================================================

interface Handler {
  setNext(handler: Handler): Handler;
  handle(order: Order): void;
}

abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  handle(order: Order): void {
    if (this.nextHandler) {
      this.nextHandler.handle(order);
    }
  }
}

class ValidationHandler extends AbstractHandler {
  handle(order: Order): void {
    if (!order.customerName || !order.beverage) {
      console.log('Validation Failed: Missing customer name or beverage.');
      return;
    }
    console.log('Validation Passed.');
    super.handle(order);
  }
}

class PaymentHandler extends AbstractHandler {
  handle(order: Order): void {
    console.log(`Payment Processed: $${order.beverage.cost().toFixed(2)}`);
    super.handle(order);
  }
}

class PreparationHandler extends AbstractHandler {
  handle(order: Order): void {
    console.log(`Preparing ${order.beverage.getDescription()}... Ready!`);
    super.handle(order);
  }
}

// ==============================================================================
// Usage Example
// ==============================================================================

function runCoffeeShop() {
  console.log('--- Coffee Shop Demo ---');

  // 1. Decorator: Create a complex beverage
  let myDrink: Beverage = new Espresso();
  myDrink = new Milk(myDrink);
  myDrink = new Mocha(myDrink);

  // 2. Builder: Create the order
  const order = new OrderBuilder(myDrink)
    .setCustomerName('Alice')
    .setTableNumber(5)
    .setNotes('Extra hot')
    .build();

  order.showOrder();

  console.log('\n--- Processing Order ---');

  // 3. Chain of Responsibility: Process the order
  const validator = new ValidationHandler();
  const payment = new PaymentHandler();
  const barista = new PreparationHandler();

  validator.setNext(payment).setNext(barista);

  validator.handle(order);
}

runCoffeeShop();
