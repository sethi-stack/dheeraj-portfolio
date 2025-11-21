/**
 * Pub/Sub System
 *
 * Design Patterns Used:
 * 1. Observer: The core pattern where `Topic` (Subject) notifies `Subscriber`s (Observers).
 * 2. Singleton: The `PubSubService` is a Singleton to manage topics globally.
 *
 * Requirements:
 * 1. Publishers send messages to a topic.
 * 2. Subscribers subscribe to a topic.
 * 3. When a message is published, all subscribers receive it.
 */

// --- Interfaces ---

export interface Message {
  payload: string;
  timestamp: number;
}

export interface Subscriber {
  getId(): string;
  onMessage(topic: string, message: Message): void;
}

// --- Core Classes ---

export class Topic {
  private name: string;
  private subscribers: Set<Subscriber>;

  constructor(name: string) {
    this.name = name;
    this.subscribers = new Set();
  }

  subscribe(subscriber: Subscriber): void {
    this.subscribers.add(subscriber);
    console.log(`Subscriber ${subscriber.getId()} subscribed to ${this.name}`);
  }

  unsubscribe(subscriber: Subscriber): void {
    this.subscribers.delete(subscriber);
    console.log(`Subscriber ${subscriber.getId()} unsubscribed from ${this.name}`);
  }

  // Pattern: Observer
  // Notify all observers (subscribers) of the new message.
  publish(message: Message): void {
    for (const subscriber of this.subscribers) {
      subscriber.onMessage(this.name, message);
    }
  }

  getName(): string {
    return this.name;
  }
}

export class PubSubService {
  private static instance: PubSubService;
  private topics: Map<string, Topic>;

  private constructor() {
    this.topics = new Map();
  }

  // Pattern: Singleton
  public static getInstance(): PubSubService {
    if (!PubSubService.instance) {
      PubSubService.instance = new PubSubService();
    }
    return PubSubService.instance;
  }

  createTopic(name: string): Topic {
    if (this.topics.has(name)) {
      return this.topics.get(name)!;
    }
    const topic = new Topic(name);
    this.topics.set(name, topic);
    return topic;
  }

  publish(topicName: string, payload: string): void {
    const topic = this.topics.get(topicName);
    if (topic) {
      const message: Message = { payload, timestamp: Date.now() };
      topic.publish(message);
    } else {
      console.log(`Topic ${topicName} does not exist.`);
    }
  }
}

// --- Usage Example ---

export class ConcreteSubscriber implements Subscriber {
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  getId(): string {
    return this.id;
  }

  onMessage(topic: string, message: Message): void {
    console.log(`[${this.id}] received message from ${topic}: ${message.payload}`);
  }
}
