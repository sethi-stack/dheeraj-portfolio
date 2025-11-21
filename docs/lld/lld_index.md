# Low Level Design (LLD)

This section covers Object-Oriented Design (OOD) principles, Design Patterns, and practical implementations of common LLD interview problems.

## 🧱 SOLID Principles

### 1. Single Responsibility Principle (SRP)
**"A class should have only one reason to change."**
- **Bad**: A `User` class that handles authentication, database saving, and email sending.
- **Good**: `User` (data), `AuthService` (logic), `UserRepository` (db), `EmailService` (notification).

### 2. Open/Closed Principle (OCP)
**"Software entities should be open for extension, but closed for modification."**
- **Bad**: Modifying a `Shape` class to add a new shape type.
- **Good**: Using an interface `Shape` and creating new classes `Circle`, `Square` that implement it.

### 3. Liskov Substitution Principle (LSP)
**"Objects of a superclass should be replaceable with objects of its subclasses without breaking the application."**
- **Bad**: A `Square` class inheriting from `Rectangle` and changing the behavior of `setWidth` to also set height (violates expected behavior).

### 4. Interface Segregation Principle (ISP)
**"Clients should not be forced to depend upon interfaces that they do not use."**
- **Bad**: A massive `Worker` interface with `work()`, `eat()`, `sleep()`. Robots don't eat.
- **Good**: Split into `Workable`, `Eatable`.

### 5. Dependency Inversion Principle (DIP)
**"Depend on abstractions, not on concretions."**
- **Bad**: A `Service` directly instantiating a `MySQLDatabase` class.
- **Good**: A `Service` depending on a `Database` interface. Inject `MySQLDatabase` at runtime.

---

## 🎨 Design Patterns

### Creational
**1. Singleton**
- **Concept**: Ensure a class has only one instance and provide a global point of access to it.
- **When to use**: Logging, Database connections, Configuration settings.
- **Pros**: Controlled access to sole instance.
- **Cons**: Global state can be hard to test; violates SRP (controls its own creation).
- **Implementation**: [Parking Lot](./implementations/parking_lot.ts), [Pub/Sub](./implementations/pub_sub.ts).

**2. Factory Method**
- **Concept**: Define an interface for creating an object, but let subclasses decide which class to instantiate.
- **When to use**: When a class doesn't know beforehand the exact types of objects it needs to create.
- **Pros**: Decouples creator from concrete products.
- **Cons**: Can lead to many subclasses.
- **Implementation**: [Payment System](./implementations/payment_system.ts).

**3. Builder**
- **Concept**: Construct complex objects step-by-step.
- **When to use**: When an object has many optional parameters or complex construction logic.
- **Pros**: Fluent interface, clear separation of construction and representation.
- **Cons**: More verbose for simple objects.
- **Implementation**: [Coffee Shop](./implementations/coffee_shop.ts).

### Structural
**1. Adapter**
- **Concept**: Convert the interface of a class into another interface clients expect.
- **When to use**: Integrating legacy code or 3rd party libraries with different interfaces.
- **Pros**: Reusability of existing code.
- **Cons**: Complexity increases with more adapters.
- **Implementation**: [Payment System](./implementations/payment_system.ts).

**2. Decorator**
- **Concept**: Attach new responsibilities to an object dynamically.
- **When to use**: Adding features (logging, compression, encryption) to streams or UI components.
- **Pros**: Flexible alternative to subclassing.
- **Cons**: Can result in many small objects.
- **Implementation**: [Coffee Shop](./implementations/coffee_shop.ts).

**3. Facade**
- **Concept**: Provide a unified interface to a set of interfaces in a subsystem.
- **When to use**: Simplifying a complex library or API.
- **Pros**: Decouples clients from subsystem components.
- **Cons**: Facade can become a "god object".

### Behavioral
**1. Observer**
- **Concept**: Define a one-to-many dependency so that when one object changes state, all its dependents are notified.
- **When to use**: Event handling, Pub/Sub systems, UI updates.
- **Pros**: Open/Closed Principle (add new subscribers without changing publisher).
- **Cons**: Subscribers might not be notified in specific order; memory leaks if not unsubscribed.
- **Implementation**: [Pub/Sub System](./implementations/pub_sub.ts), [Smart Home](./implementations/smart_home.ts).

**2. Strategy**
- **Concept**: Define a family of algorithms, encapsulate each one, and make them interchangeable.
- **When to use**: Sorting strategies, Payment methods, Compression algorithms.
- **Pros**: Switches algorithms at runtime; eliminates conditional statements.
- **Cons**: Clients must know the differences between strategies.
- **Implementation**: [Payment System](./implementations/payment_system.ts).

**3. Command**
- **Concept**: Encapsulate a request as an object, allowing for parameterization, queuing, and logging.
- **When to use**: GUI buttons, Undo/Redo functionality, Job queues.
- **Pros**: Decouples invoker from receiver.
- **Cons**: Many command classes.
- **Implementation**: [Smart Home](./implementations/smart_home.ts).

**4. Mediator**
- **Concept**: Define an object that encapsulates how a set of objects interact.
- **When to use**: Chat rooms, Air traffic control, Complex GUI forms.
- **Pros**: Reduces coupling between components (they talk to mediator, not each other).
- **Cons**: Mediator can become a "god object".
- **Implementation**: [Smart Home](./implementations/smart_home.ts).

**5. Chain of Responsibility**
- **Concept**: Pass a request along a chain of handlers.
- **When to use**: Request processing pipelines (Auth -> Validation -> Logging).
- **Pros**: Decouples sender and receiver; flexible chain.
- **Cons**: Request might fall off the end unhandled.
- **Implementation**: [Coffee Shop](./implementations/coffee_shop.ts).

---

## 🛠️ Implementations

We provide TypeScript implementations for common LLD problems:

- [Parking Lot](./implementations/parking_lot.ts)
- [Pub/Sub System](./implementations/pub_sub.ts)
- [Payment System](./implementations/payment_system.ts)
- [Smart Home](./implementations/smart_home.ts)
- [Coffee Shop](./implementations/coffee_shop.ts)
