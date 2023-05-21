import { devices } from "../types";

export const LivingRoom = [
  {
    id: 1,
    name: "Lamp",
    status: false,
    image: require("../assets/images/lamp.png"),
  }
];

export const BedRoom = [
  {
    id: 5,
    name: "Fan",
    status: false,
    image: require("../assets/images/lamp_bed.png"),
  }
];

export const ParkingGarage = [
  {
    id: 9,
    name: "Lamp Garage",
    status: true,
    image: require("../assets/images/lamp_gara.png"),
  }
];



export const K_OPTIONS = [
  {
    id: 1,
    item: "Living Room",
  },
  {
    id: 2,
    item: "Bedroom",
  },
  {
    id: 3,
    item: "Kitchen",
  }
]
export enum deviceState {
  ON = "1",
  OFF = "0",
}
export  function changeRoomVietToEng(room: string) {
  switch (room) {
    case "Phòng khách":
      return "Living Room";
    case "Phòng ngủ":
      return "Bedroom";
    case "Nhà xe":
      return "Parking Garage";
    default:
      return "Living Room";
  }
}