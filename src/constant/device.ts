import { devices } from "../types";

export const LivingRoom: devices[] = [
  {
    id: 1,
    name: "Lamp",
    status: false,
    image: require("../assets/images/lamp.png"),
  }
];

export const BedRoom: devices[] = [
  {
    id: 5,
    name: "Fan",
    status: false,
    image: require("../assets/images/lamp_bed.png"),
  }
];

export const ParkingGarage: devices[] = [
  {
    id: 9,
    name: "Lamp Garage",
    status: true,
    image: require("../assets/images/lamp_gara.png"),
  }
];
