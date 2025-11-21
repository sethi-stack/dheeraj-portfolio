/**
 * Design Patterns Used:
 * 1. Command: To encapsulate requests as objects (e.g., turning on a light), allowing for parameterization and queuing.
 * 2. Mediator: To reduce chaotic dependencies between devices. The Hub acts as a mediator.
 * 3. Observer: To allow devices or apps to react to changes in other devices (e.g., sensor detecting motion).
 */

// ==============================================================================
// 1. Command Pattern
// ==============================================================================

// Receiver
class SmartLight {
  constructor(public name: string) {}

  turnOn(): void {
    console.log(`${this.name} is now ON.`);
  }

  turnOff(): void {
    console.log(`${this.name} is now OFF.`);
  }
}

// Command Interface
interface Command {
  execute(): void;
}

// Concrete Commands
class TurnOnLightCommand implements Command {
  constructor(private light: SmartLight) {}

  execute(): void {
    this.light.turnOn();
  }
}

class TurnOffLightCommand implements Command {
  constructor(private light: SmartLight) {}

  execute(): void {
    this.light.turnOff();
  }
}

// Invoker
class RemoteControl {
  private command: Command | null = null;

  setCommand(command: Command): void {
    this.command = command;
  }

  pressButton(): void {
    if (this.command) {
      this.command.execute();
    } else {
      console.log('No command assigned to this button.');
    }
  }
}

// ==============================================================================
// 2. Mediator Pattern
// ==============================================================================

interface Mediator {
  notify(sender: object, event: string): void;
}

class SmartHomeHub implements Mediator {
  private light: SmartLight;
  private thermostat: Thermostat;

  constructor(light: SmartLight, thermostat: Thermostat) {
    this.light = light;
    this.thermostat = thermostat;
  }

  notify(sender: object, event: string): void {
    if (event === 'motionDetected') {
      console.log('Hub: Motion detected. Coordinating actions...');
      this.light.turnOn();
      this.thermostat.setTemperature(22);
    }
  }
}

class Thermostat {
  setTemperature(temp: number): void {
    console.log(`Thermostat set to ${temp} degrees.`);
  }
}

// ==============================================================================
// 3. Observer Pattern
// ==============================================================================

interface Observer {
  update(data: any): void;
}

class MotionSensor {
  private observers: Observer[] = [];
  private mediator: Mediator;

  constructor(mediator: Mediator) {
    this.mediator = mediator;
  }

  // Observer Management
  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  // Trigger Event
  detectMotion(): void {
    console.log('MotionSensor: Motion detected!');
    // Notify Mediator
    this.mediator.notify(this, 'motionDetected');
    // Notify direct observers (e.g., Mobile App)
    this.notifyObservers();
  }

  private notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update('Motion detected at ' + new Date().toLocaleTimeString());
    }
  }
}

class MobileApp implements Observer {
  update(data: any): void {
    console.log(`MobileApp Notification: ${data}`);
  }
}

// ==============================================================================
// Usage Example
// ==============================================================================

function runSmartHome() {
  console.log('--- Smart Home Demo ---');

  // Setup Devices
  const livingRoomLight = new SmartLight('Living Room Light');
  const thermostat = new Thermostat();
  const hub = new SmartHomeHub(livingRoomLight, thermostat);
  const motionSensor = new MotionSensor(hub);
  const userPhone = new MobileApp();

  // 1. Command Pattern: User uses a remote to turn on the light
  const remote = new RemoteControl();
  const lightOn = new TurnOnLightCommand(livingRoomLight);
  remote.setCommand(lightOn);
  console.log('[User Action] Pressing remote button:');
  remote.pressButton();

  console.log('\n[System Action] Motion Sensor triggers:');
  // 2. Observer Pattern: Mobile App subscribes to Sensor
  motionSensor.addObserver(userPhone);

  // 3. Mediator Pattern: Sensor detects motion -> notifies Hub -> Hub turns on light & sets temp
  motionSensor.detectMotion();
}

runSmartHome();
