export interface devices {
  id: number;
  name: string;
  status: boolean;
  image: any;
  onPress?: () => void;
}
export interface users {
  id: number;
  name: string;
  avatar: any;
  email: string;
  permissions: string;
}
