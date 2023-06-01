import { devices } from "../types";

export const LivingRoom = [
  {
    id: 1,
    name: "Lamp",
    status: false,
    image: require("../assets/images/lamp.png"),
  },
  {
    id: 2,
    name: "Televison",
    status: false,
    image: require("../assets/images/tivi.png"),
  },
  {
    id: 3,
    name: "Curtain",
    status: false,
    image: require("../assets/images/Curtain.jpg"),
  },
  {
    id: 4,
    name: "Camera",
    status: false,
    image: require("../assets/images/camera.png"),
  }
];

export const BedRoom = [
  {
    id: 5,
    name: "Fan",
    status: false,
    image: require("../assets/images/lamp_bed.png"),
  },
  {
    id: 6,
    name: "Air Puriffier",
    status: false,
    image: require("../assets/images/maylockhongkhi.png"),
  },
  {
    id: 7,
    name: "Curtain",
    status: false,
    image: require("../assets/images/remphongngu.png"),
  },
  {
    id: 8,
    name: "Refregerator",
    status: false,
    image: require("../assets/images/tulanh.png"),
  }

];

export const ParkingGarage = [
  {
    id: 9,
    name: "Door Garage",
    status: false,
    image: require("../assets/images/cuacuon.png"),
  },
  {

    id: 10,
    name: "Lamp Garage",
    status: false,
    image: require("../assets/images/lamp_gara.png"),
  },
  {

    id: 11,
    name: "Camera",
    status: false,
    image: require("../assets/images/cameragarage.png"),
  },
  {

    id: 12,
    name: "Aluminum",
    status: false,
    image: require("../assets/images/bell.png"),
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
interface IFeed {
    [key: string]: string;
}
export const topic : IFeed= {
  door: "HuuHanh/f/smart-home.door",
  face: "HuuHanh/f/smart-home.face-recognition",
  fan: "HuuHanh/f/smart-home.fan-livingroom",
  humidity: "HuuHanh/f/smart-home.humidity",
  temperature: "HuuHanh/f/smart-home.temperature",
  light_bedroom: "HuuHanh/f/smart-home.light-bedroom",
  light_livingroom: "HuuHanh/f/smart-home.light-livingroom",
}