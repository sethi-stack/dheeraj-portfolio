/**
 * Parking Lot System
 *
 * Design Patterns Used:
 * 1. Singleton: The `ParkingLot` class is a Singleton to ensure a single central manager.
 * 2. Factory (Simplified): The `Level` class acts as a factory for creating `ParkingSpot` instances.
 *
 * Requirements:
 * 1. Multiple levels.
 * 2. Different vehicle types (Car, Motorcycle, Truck).
 * 3. Different spot types (Compact, Large, Motorcycle).
 * 4. Calculate parking fees.
 */

// --- Enums ---

export enum VehicleType {
  MOTORCYCLE,
  CAR,
  TRUCK,
}

export enum SpotType {
  MOTORCYCLE,
  COMPACT,
  LARGE,
}

// --- Abstract Classes & Interfaces ---

export abstract class Vehicle {
  protected licensePlate: string;
  protected type: VehicleType;

  constructor(licensePlate: string, type: VehicleType) {
    this.licensePlate = licensePlate;
    this.type = type;
  }

  getType(): VehicleType {
    return this.type;
  }
}

export class Car extends Vehicle {
  constructor(licensePlate: string) {
    super(licensePlate, VehicleType.CAR);
  }
}

export class Motorcycle extends Vehicle {
  constructor(licensePlate: string) {
    super(licensePlate, VehicleType.MOTORCYCLE);
  }
}

export class Truck extends Vehicle {
  constructor(licensePlate: string) {
    super(licensePlate, VehicleType.TRUCK);
  }
}

// --- Core Classes ---

export class ParkingSpot {
  private id: string;
  private type: SpotType;
  private vehicle: Vehicle | null = null;

  constructor(id: string, type: SpotType) {
    this.id = id;
    this.type = type;
  }

  isFree(): boolean {
    return this.vehicle === null;
  }

  canFit(vehicle: Vehicle): boolean {
    if (this.type === SpotType.LARGE) return true;
    if (this.type === SpotType.COMPACT)
      return vehicle.getType() === VehicleType.CAR || vehicle.getType() === VehicleType.MOTORCYCLE;
    if (this.type === SpotType.MOTORCYCLE) return vehicle.getType() === VehicleType.MOTORCYCLE;
    return false;
  }

  park(vehicle: Vehicle): boolean {
    if (!this.canFit(vehicle) || !this.isFree()) return false;
    this.vehicle = vehicle;
    return true;
  }

  removeVehicle(): void {
    this.vehicle = null;
  }

  getId(): string {
    return this.id;
  }
}

export class Level {
  private id: number;
  private spots: ParkingSpot[];

  constructor(id: number, numSpots: number) {
    this.id = id;
    this.spots = [];
    // Initialize spots (simplified: 1/3 each type)
    for (let i = 0; i < numSpots; i++) {
      let type = SpotType.COMPACT;
      if (i < numSpots / 3) type = SpotType.MOTORCYCLE;
      else if (i > (numSpots * 2) / 3) type = SpotType.LARGE;
      this.spots.push(new ParkingSpot(`${id}-${i}`, type));
    }
  }

  findAvailableSpot(vehicle: Vehicle): ParkingSpot | null {
    for (const spot of this.spots) {
      if (spot.isFree() && spot.canFit(vehicle)) {
        return spot;
      }
    }
    return null;
  }
}

export class ParkingLot {
  private static instance: ParkingLot;
  private levels: Level[];

  private constructor() {
    this.levels = [];
  }

  // Pattern: Singleton
  // Ensures only one instance of ParkingLot exists.
  public static getInstance(): ParkingLot {
    if (!ParkingLot.instance) {
      ParkingLot.instance = new ParkingLot();
    }
    return ParkingLot.instance;
  }

  addLevel(level: Level): void {
    this.levels.push(level);
  }

  parkVehicle(vehicle: Vehicle): boolean {
    for (const level of this.levels) {
      const spot = level.findAvailableSpot(vehicle);
      if (spot) {
        spot.park(vehicle);
        console.log(`Vehicle parked at spot ${spot.getId()}`);
        return true;
      }
    }
    console.log("Parking Lot Full");
    return false;
  }
}
