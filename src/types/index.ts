import avatar from "../components/Avatar";

export interface devices {
  id: number;
  name: string;
  status: boolean;
  image: any;
  onPress?: () => void;
  feed_name: string;
}
export interface users {
  id: number;
  name: string;
  avatar: any;
  email: string;
  permissions: string;
}

export  type avatarName = "dog_avatar" | "woman_avatar" | "man_avatar" | "man2_avatar"
export interface IAvatar {
  dog_avatar: any;
  woman_avatar: any;
  man_avatar: any;
  man2_avatar: any;
}
